export type EvaluationStatus = 'Answered' | 'Unanswered' | 'Out of Order';

export interface BoundingBox {
  ymin: number; // 0 - 1000 scale
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface RubricItem {
  criterion: string;
  marksAwarded: number;
  maxMarks: number;
  comment: string;
}

export interface AnswerMapping {
  answerId: string | null;
  detectedQuestionId: string | null;
  pageIndex: number | null; // 0-indexed primary page
  boundingBox: BoundingBox | null;
  extractedAnswerText: string;
  aiFeedback: string;
  rubricBreakdown?: RubricItem[];
  confidenceScore: number; // 0.0 - 1.0
  matched: boolean;
  outOfOrderSequenceNote?: string;
  additionalPages?: { pageIndex: number; boundingBox: BoundingBox }[];
}

export interface Question {
  id: string;
  questionNumber: string; // e.g. "11(a)", "11(b)", "12"
  text: string;
  maxMarks: number;
  scoredMarks: number;
  status: EvaluationStatus;
  parentQuestionId?: string; // parent ID if sub-part (e.g. "q11" for "11(a)")
  subPartLabel?: string; // e.g. "a", "b", "i", "ii"
  mapping?: AnswerMapping;
  isCustomEdited?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  pageCount: number;
  pages: string[]; // Base64 Data URLs of rendered pages
  isPdf: boolean;
  rawFile?: File;
}

export type ProcessingStatus = 'idle' | 'rendering_pdf' | 'extracting_questions' | 'mapping_answers' | 'completed' | 'error';

export interface ProcessingProgress {
  status: ProcessingStatus;
  currentStep: number;
  totalSteps: number;
  message: string;
  errorDetails?: string;
}

export interface ScoreSummary {
  totalScoredMarks: number;
  totalMaxMarks: number;
  percentage: number;
  grade: string;
  answeredCount: number;
  unansweredCount: number;
  outOfOrderCount: number;
  totalQuestions: number;
}

export interface TargetSelection {
  questionId: string;
  pageIndex: number;
  timestamp: number;
}

