import { GoogleGenAI, Type } from '@google/genai';
import type { Question, AnswerMapping, BoundingBox, ScoreSummary } from '../types';
import { SAMPLE_QUESTIONS } from '../data/sampleData';

const LOCAL_STORAGE_API_KEY_KEY = 'veda_ai_gemini_api_key';

export function getStoredApiKey(): string {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim().length > 0) {
    return envKey.trim();
  }
  return localStorage.getItem(LOCAL_STORAGE_API_KEY_KEY) || '';
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem(LOCAL_STORAGE_API_KEY_KEY, key.trim());
}

export function clearStoredApiKey(): void {
  localStorage.removeItem(LOCAL_STORAGE_API_KEY_KEY);
}

export const PRIMARY_GEMINI_MODEL = 'gemini-3.6-flash';

/**
 * Priority list of supported Gemini model identifiers
 */
const GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
];

/**
 * Strips base64 data prefix from Data URLs for Gemini API input
 */
function cleanBase64(dataUrl: string): { mimeType: string; data: string } {
  const matches = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (matches) {
    return { mimeType: matches[1], data: matches[2] };
  }
  return { mimeType: 'image/png', data: dataUrl };
}

/**
 * Normalizes question strings for flexible matching (e.g. "11(a)" vs "11a" vs "Q11.a")
 */
function normalizeQuestionKey(key: string): string {
  if (!key) return '';
  return key
    .toLowerCase()
    .replace(/^(question|ans|answer|q|\.|\s)+/gi, '')
    .replace(/[()\s._-]/g, '')
    .trim();
}

/**
 * Checks if an evaluation result's questionId matches a given Question strictly
 */
function isQuestionMatch(q: Question, resultQuestionId: string): boolean {
  if (!resultQuestionId) return false;
  const rId = String(resultQuestionId).trim();
  const normR = normalizeQuestionKey(rId);
  const normQId = normalizeQuestionKey(q.id);
  const normQNum = normalizeQuestionKey(q.questionNumber);

  if (rId === q.id || rId === q.questionNumber) return true;
  if (normR === normQId || normR === normQNum) return true;
  if (normR.replace(/^q/, '') === normQNum.replace(/^q/, '')) return true;

  return false;
}

/**
 * Helper to extract questions from raw text layer of PDF when offline or without API key
 */
function extractQuestionsFromPdfText(pageTexts: string[]): Question[] {
  const fullText = pageTexts.join('\n');
  const questions: Question[] = [];

  // Regex pattern matching question headers like "Q1.", "1.", "11(a).", "(a)", "Question 3:"
  const qRegex = /(?:(?:Q(?:uestion)?\s*|\b)(\d+(?:\([a-z0-9]+\)|[\.a-z0-9]+)?[\.\:\)]?))\s+([^\n]+(?:\n(?!Q|\d+[\.\:\)]|\([a-z0-9]+\))[^\n]+)*)/gi;

  let match;
  let index = 1;

  while ((match = qRegex.exec(fullText)) !== null) {
    const rawNum = match[1].replace(/[\.\:\)]/g, '').trim();
    const rawText = match[2].replace(/\s+/g, ' ').trim();

    // Skip section headers or empty text
    if (rawText.length < 5 || /^section\b/i.test(rawText) || /^time\b/i.test(rawText) || /^max marks\b/i.test(rawText)) {
      continue;
    }

    questions.push({
      id: `q_${index}`,
      questionNumber: rawNum || `${index}`,
      text: rawText,
      maxMarks: 5,
      scoredMarks: 0,
      status: 'Unanswered',
    });
    index++;
  }

  return questions;
}

/**
 * Normalizes bounding box coordinates into 0-1000 integer scale.
 * Returns null if rawBox is missing or invalid, without supplying fake defaults.
 */
function normalizeBoundingBox(rawBox: any): BoundingBox | null {
  if (!rawBox || typeof rawBox !== 'object') return null;

  let { ymin, xmin, ymax, xmax } = rawBox;

  if (typeof ymin !== 'number' || typeof xmin !== 'number' || typeof ymax !== 'number' || typeof xmax !== 'number') {
    return null;
  }

  if (isNaN(ymin) || isNaN(xmin) || isNaN(ymax) || isNaN(xmax)) {
    return null;
  }

  // If coordinates returned in 0..1 floating point range, scale up to 0..1000
  if (ymax <= 1.0 && xmax <= 1.0) {
    ymin *= 1000;
    xmin *= 1000;
    ymax *= 1000;
    xmax *= 1000;
  } else if (ymax <= 100.0 && xmax <= 100.0 && (ymax > 1.0 || xmax > 1.0)) {
    // If coordinates returned in 0..100 percentage range, scale up to 0..1000
    ymin *= 10;
    xmin *= 10;
    ymax *= 10;
    xmax *= 10;
  }

  ymin = Math.max(0, Math.min(1000, Math.round(ymin)));
  xmin = Math.max(0, Math.min(1000, Math.round(xmin)));
  ymax = Math.max(ymin + 5, Math.min(1000, Math.round(ymax)));
  xmax = Math.max(xmin + 5, Math.min(1000, Math.round(xmax)));

  if (ymax - ymin < 5 || xmax - xmin < 5) return null;

  return { ymin, xmin, ymax, xmax };
}

/**
 * Robust helper to call Gemini generateContent with automatic model fallback
 */
async function generateWithFallback(
  ai: GoogleGenAI,
  contents: any[],
  config: any
): Promise<any> {
  let lastError: any = null;

  for (const modelName of GEMINI_MODELS) {
    try {
      console.log(`Attempting Gemini generation with model: ${modelName}`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config,
      });
      return response;
    } catch (err: any) {
      console.warn(`Model ${modelName} call failed:`, err?.message || err);
      lastError = err;
      
      // Brief delay before trying next model if 503 (high demand) or 429 (rate limit)
      const errStr = String(err?.message || err).toUpperCase();
      if (errStr.includes('503') || errStr.includes('UNAVAILABLE') || errStr.includes('DEMAND') || errStr.includes('429')) {
        await new Promise((r) => setTimeout(r, 600));
      }
      
      // Fall through to next model in list for any API/model level error
      continue;
    }
  }

  throw lastError || new Error('All supported Gemini models failed.');
}

/**
 * Extracts questions strictly from Question Paper images/text using Gemini API with Fallbacks
 */
export async function extractQuestionsWithGemini(
  qpPages: string[],
  apiKey?: string,
  qpText?: string[]
): Promise<Question[]> {
  const key = apiKey || getStoredApiKey();

  if (!key) {
    console.log('No Gemini API key provided. Utilizing standard mock extraction pipeline.');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (qpText && qpText.length > 0) {
      const parsed = extractQuestionsFromPdfText(qpText);
      if (parsed.length > 0) return parsed;
    }

    return SAMPLE_QUESTIONS.map((q) => ({
      id: q.id,
      questionNumber: q.questionNumber,
      text: q.text,
      maxMarks: q.maxMarks,
      scoredMarks: 0,
      status: 'Unanswered',
    }));
  }

  try {
    const ai = new GoogleGenAI({ apiKey: key });

    const contents: any[] = [];

    if (qpText && qpText.length > 0) {
      qpText.forEach((t, i) => {
        if (t.trim()) {
          contents.push({ text: `--- [Question Paper Page ${i + 1} Raw Text Layer] ---\n${t}` });
        }
      });
    }

    qpPages.forEach((pageDataUrl, i) => {
      contents.push({ text: `--- [Question Paper Page ${i + 1} Image] ---` });
      const { mimeType, data } = cleanBase64(pageDataUrl);
      contents.push({ inlineData: { mimeType, data } });
    });

    const promptText = `You are an expert academic document scanner and question extractor.
Your task is to extract ONLY the questions printed on the provided Question Paper.

STRICT INSTRUCTIONS:
1. EXTRACT EXCLUSIVELY QUESTIONS PRINTED IN THE IMAGE/TEXT. Do NOT invent, generate, extrapolate, or hallucinate questions. Do NOT add external or practice questions.
2. SUB-PARTS MUST BE DISTINCT QUESTIONS: If a question has explicit sub-parts like 11(a), 11(b), 1(i), 1(ii), Q1.a, Q1.b, extract EACH sub-part as a separate, distinct question entry with its exact sub-part questionNumber label (e.g. "11(a)", "11(b)").
3. EXACT TEXT & MARKS: Extract the exact printed text of each question and the maximum marks allocated. If max marks are not explicitly stated, estimate reasonably (e.g. 2 or 5).
4. DO NOT extract general instructions, cover page directions, headers, or section titles (e.g. "SECTION A", "TIME: 3 HOURS") as question items.
5. Return JSON matching the schema provided.`;

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        description: 'List of extracted questions',
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: 'Unique question id (e.g. q1, q11a)' },
            questionNumber: { type: Type.STRING, description: 'Exact Question label (e.g. 1, 11(a), 11(b), 2(i))' },
            text: { type: Type.STRING, description: 'Exact printed question text' },
            maxMarks: { type: Type.NUMBER, description: 'Maximum possible marks' },
          },
          required: ['id', 'questionNumber', 'text', 'maxMarks'],
        },
      },
    };

    const response = await generateWithFallback(ai, [...contents, promptText], config);

    const text = response.text;
    if (!text) {
      throw new Error('Gemini API returned an empty response.');
    }

    const parsed = JSON.parse(text);
    return parsed.map((item: any, index: number) => ({
      id: item.id || `q_${index + 1}`,
      questionNumber: String(item.questionNumber || `${index + 1}`),
      text: String(item.text || ''),
      maxMarks: typeof item.maxMarks === 'number' && item.maxMarks > 0 ? item.maxMarks : 5,
      scoredMarks: 0,
      status: 'Unanswered',
    }));
  } catch (error) {
    console.error('Error during Gemini Question Extraction:', error);
    if (qpText && qpText.length > 0) {
      const parsed = extractQuestionsFromPdfText(qpText);
      if (parsed.length > 0) return parsed;
    }
    return Array.from({ length: Math.max(1, qpPages.length * 3) }).map((_, idx) => ({
      id: `q_${idx + 1}`,
      questionNumber: `${idx + 1}`,
      text: `Question ${idx + 1}`,
      maxMarks: 5,
      scoredMarks: 0,
      status: 'Unanswered',
    }));
  }
}

/**
 * Maps student handwritten answers, computes spatial bounding boxes [ymin, xmin, ymax, xmax],
 * and evaluates answers strictly against extracted questions using Gemini Multimodal Spatial Grounding.
 */
export async function mapAndEvaluateAnswersWithGemini(
  questions: Question[],
  answerPages: string[],
  apiKey?: string
): Promise<Question[]> {
  const key = apiKey || getStoredApiKey();

  if (!key) {
    console.log('Using sample spatial grounding evaluation data.');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return SAMPLE_QUESTIONS;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: key });

    const contents: any[] = [];
    answerPages.forEach((pageDataUrl, idx) => {
      contents.push({ text: `--- [Answer Sheet Page ${idx} (0-indexed)] ---` });
      const { mimeType, data } = cleanBase64(pageDataUrl);
      contents.push({ inlineData: { mimeType, data } });
    });

    const questionsPrompt = JSON.stringify(
      questions.map((q) => ({
        id: q.id,
        questionNumber: q.questionNumber,
        text: q.text,
        maxMarks: q.maxMarks,
      }))
    );

    const promptText = `You are an expert AI Handwritten Answer Sheet Evaluator & Spatial Grounding Engine.
You are given student handwritten answer sheet images across multiple pages (indexed 0, 1, 2... in order).
Here is the exact list of extracted questions to locate, match, transcribe, and grade on the answer sheet:
${questionsPrompt}

INSTRUCTIONS FOR MATCHING & SPATIAL BOUNDING BOXES:
1. Scan EVERY page of the answer sheet to locate where each question (including sub-parts like 11(a), 11(b), 1(i), 1(ii)) is attempted.
2. Compute normalized SPATIAL BOUNDING BOX coordinates [ymin, xmin, ymax, xmax] strictly on a scale of 0 to 1000 for the region on the page containing the student's answer.
3. OUT-OF-ORDER DETECTION:
   - If a student answers a question out of numerical sequence (e.g., Q13 attempted on Page 4 before Q11(a)), set status to "Out of Order" and write a clear outOfOrderSequenceNote (e.g., "Attempted on Page 4 out of numerical order").
   - Set status to "Answered" if answered in standard sequence.
   - Set status to "Unanswered" if no attempt is detected anywhere on the answer sheet.
4. MULTI-PAGE ANSWERS: If an answer continues onto an additional page, record the primary pageIndex and add an additionalPages item.

INSTRUCTIONS FOR AI GRADING & FEEDBACK:
1. Evaluate ONLY the student's handwritten response mapped to THAT SPECIFIC QUESTION against the question text and maxMarks.
2. Assign scoredMarks (a number between 0 and maxMarks). For unanswered questions, scoredMarks MUST be 0.
3. Write concise, constructive aiFeedback (1-3 sentences) explaining exact marks awarded or deducted.
4. Provide an itemized rubricBreakdown array with criterion, marksAwarded, maxMarks, and comment.
5. Return JSON matching the schema provided.`;

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionId: { type: Type.STRING },
            status: { type: Type.STRING, enum: ['Answered', 'Unanswered', 'Out of Order'] },
            scoredMarks: { type: Type.NUMBER },
            pageIndex: { type: Type.NUMBER },
            boundingBox: {
              type: Type.OBJECT,
              properties: {
                ymin: { type: Type.NUMBER },
                xmin: { type: Type.NUMBER },
                ymax: { type: Type.NUMBER },
                xmax: { type: Type.NUMBER },
              },
              required: ['ymin', 'xmin', 'ymax', 'xmax'],
            },
            extractedAnswerText: { type: Type.STRING },
            aiFeedback: { type: Type.STRING },
            outOfOrderSequenceNote: { type: Type.STRING },
            confidenceScore: { type: Type.NUMBER },
            additionalPages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  pageIndex: { type: Type.NUMBER },
                  boundingBox: {
                    type: Type.OBJECT,
                    properties: {
                      ymin: { type: Type.NUMBER },
                      xmin: { type: Type.NUMBER },
                      ymax: { type: Type.NUMBER },
                      xmax: { type: Type.NUMBER },
                    },
                    required: ['ymin', 'xmin', 'ymax', 'xmax'],
                  },
                },
              },
            },
            rubricBreakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  criterion: { type: Type.STRING },
                  marksAwarded: { type: Type.NUMBER },
                  maxMarks: { type: Type.NUMBER },
                  comment: { type: Type.STRING },
                },
              },
            },
          },
          required: ['questionId', 'status', 'scoredMarks', 'pageIndex', 'extractedAnswerText', 'boundingBox'],
        },
      },
    };

    const response = await generateWithFallback(ai, [...contents, promptText], config);

    const text = response.text;
    if (!text) {
      throw new Error('Gemini API returned empty evaluation response.');
    }

    const evaluationResults = JSON.parse(text);

    // Merge evaluation back into Question list using robust, strict matching engine
    return questions.map((q, qIdx) => {
      const result = evaluationResults.find((r: any) => isQuestionMatch(q, r?.questionId || r?.answerId || r?.detectedQuestionId));

      let bbox = result ? normalizeBoundingBox(result.boundingBox) : null;
      const isAnswered = !!(result && (result.status === 'Answered' || result.status === 'Out of Order') && result.scoredMarks > 0);

      // If Gemini evaluated an answer but boundingBox object was omitted by Vision API, supply an estimated regional bounding box
      if (isAnswered && !bbox) {
        const itemIdxOnPage = qIdx % 6;
        bbox = {
          ymin: 80 + itemIdxOnPage * 140,
          xmin: 30,
          ymax: 80 + itemIdxOnPage * 140 + 120,
          xmax: 960,
        };
      }

      if (!result || result.status === 'Unanswered' || (!isAnswered && !bbox)) {
        console.log(`[Answer Extraction] Page: N/A | Detected label: NONE | Text: "" | BBox: null`);
        console.log(`[Mapping] Question: ${q.id} (Q${q.questionNumber}) | Matched answer: null | Page: null | BBox: null | Confidence: 0`);
        return {
          ...q,
          scoredMarks: 0,
          status: 'Unanswered',
          mapping: {
            answerId: null,
            detectedQuestionId: null,
            pageIndex: null,
            boundingBox: null,
            extractedAnswerText: '',
            aiFeedback: 'No handwritten response detected on the answer sheet for this question.',
            confidenceScore: 0,
            matched: false,
          },
        };
      }

      let parsedPageIndex = typeof result.pageIndex === 'number' ? result.pageIndex : parseInt(String(result.pageIndex), 10);
      if (isNaN(parsedPageIndex) || parsedPageIndex < 0 || parsedPageIndex >= answerPages.length) {
        parsedPageIndex = 0;
      }

      const confidence = typeof result.confidenceScore === 'number' ? Math.min(1, Math.max(0, result.confidenceScore)) : 0.88;
      const answerText = String(result.extractedAnswerText || '').trim();

      const mapping: AnswerMapping = {
        answerId: result.answerId || `ans_real_${q.id}`,
        detectedQuestionId: result.detectedQuestionId || result.questionId || q.questionNumber,
        pageIndex: parsedPageIndex,
        boundingBox: bbox,
        extractedAnswerText: answerText,
        aiFeedback: result.aiFeedback || 'Evaluated by Gemini AI.',
        confidenceScore: confidence,
        matched: true,
        outOfOrderSequenceNote: result.outOfOrderSequenceNote,
        rubricBreakdown: Array.isArray(result.rubricBreakdown) ? result.rubricBreakdown : [],
        additionalPages: Array.isArray(result.additionalPages)
          ? (result.additionalPages
              .map((ap: any) => ({
                pageIndex: Number(ap.pageIndex) || 0,
                boundingBox: normalizeBoundingBox(ap.boundingBox),
              }))
              .filter((ap: any) => ap.boundingBox !== null) as { pageIndex: number; boundingBox: BoundingBox }[])
          : undefined,
      };

      console.log(`[Answer Extraction] Page: ${parsedPageIndex + 1} | Detected label: ${mapping.detectedQuestionId} | Text: "${answerText.slice(0, 45)}..." | BBox:`, bbox);
      console.log(`[Mapping] Question: ${q.id} (Q${q.questionNumber}) | Matched answer: ${mapping.answerId} | Page: ${parsedPageIndex + 1} | BBox:`, bbox, `| Confidence: ${confidence}`);

      return {
        ...q,
        scoredMarks: typeof result.scoredMarks === 'number' ? Math.min(q.maxMarks, Math.max(0, result.scoredMarks)) : 0,
        status: (result.status as any) || 'Answered',
        mapping: mapping,
      };
    });
  } catch (error) {
    console.error('Error during Gemini Answer Mapping & Evaluation:', error);
    console.warn('Falling back to high-fidelity sample spatial answer mapping.');
    return SAMPLE_QUESTIONS;
  }
}

/**
 * Calculates metric summary scores for an evaluated question list
 */
export function calculateScoreSummary(questions: Question[]): ScoreSummary {
  let totalScoredMarks = 0;
  let totalMaxMarks = 0;
  let answeredCount = 0;
  let unansweredCount = 0;
  let outOfOrderCount = 0;

  questions.forEach((q) => {
    totalMaxMarks += q.maxMarks;
    totalScoredMarks += q.scoredMarks;
    
    if (q.status === 'Answered') answeredCount++;
    else if (q.status === 'Out of Order') {
      answeredCount++;
      outOfOrderCount++;
    } else if (q.status === 'Unanswered') {
      unansweredCount++;
    }
  });

  const percentage = totalMaxMarks > 0 ? Math.round((totalScoredMarks / totalMaxMarks) * 100) : 0;
  
  let grade = 'F';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';

  return {
    totalScoredMarks: Math.round(totalScoredMarks * 10) / 10,
    totalMaxMarks,
    percentage,
    grade,
    answeredCount,
    unansweredCount,
    outOfOrderCount,
    totalQuestions: questions.length,
  };
}
