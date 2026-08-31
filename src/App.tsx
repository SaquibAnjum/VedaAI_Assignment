import { useState, useEffect, useMemo } from 'react';
import type { FileItem, Question, ProcessingProgress } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FileUploadSection } from './components/FileUploadSection';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SummaryReportModal } from './components/SummaryReportModal';
import {
  getStoredApiKey,
  extractQuestionsWithGemini,
  mapAndEvaluateAnswersWithGemini,
  calculateScoreSummary,
} from './services/geminiService';
import {
  SAMPLE_QUESTIONS,
  getSampleQuestionPaperFile,
  getSampleAnswerSheetFile,
} from './data/sampleData';
import { extractTextFromPdf } from './services/pdfService';

export function App() {
  const [qpFile, setQpFile] = useState<FileItem | null>(null);
  const [ansFile, setAnsFile] = useState<FileItem | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [hasApiKey, setHasApiKey] = useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('exams');

  const [processingProgress, setProcessingProgress] = useState<ProcessingProgress>({
    status: 'idle',
    currentStep: 0,
    totalSteps: 4,
    message: '',
  });

  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const key = getStoredApiKey();
    setHasApiKey(!!key);
  }, []);

  const handleKeySaved = () => {
    const key = getStoredApiKey();
    setHasApiKey(!!key);
  };

  // Load sample dataset for instant out-of-the-box live demo
  const handleLoadSample = () => {
    setQpFile(getSampleQuestionPaperFile());
    setAnsFile(getSampleAnswerSheetFile());
    setQuestions(SAMPLE_QUESTIONS);
  };

  // Full AI Multimodal Extraction & Spatial Mapping Pipeline
  const handleStartProcessing = async () => {
    if (!qpFile || !ansFile) return;

    try {
      setProcessingProgress({
        status: 'rendering_pdf',
        currentStep: 1,
        totalSteps: 4,
        message: 'Preprocessing document pages...',
      });

      await new Promise((resolve) => setTimeout(resolve, 800));

      setProcessingProgress({
        status: 'extracting_questions',
        currentStep: 2,
        totalSteps: 4,
        message: 'Extracting questions and sub-parts...',
      });

      let qpText: string[] | undefined;
      if (qpFile.rawFile && qpFile.isPdf) {
        try {
          qpText = await extractTextFromPdf(qpFile.rawFile);
        } catch (e) {
          console.warn('Could not extract PDF text layer:', e);
        }
      }

      const extractedQuestions = await extractQuestionsWithGemini(qpFile.pages, undefined, qpText);

      setProcessingProgress({
        status: 'mapping_answers',
        currentStep: 3,
        totalSteps: 4,
        message: 'Mapping handwritten answers to questions...',
      });

      const mappedQuestions = await mapAndEvaluateAnswersWithGemini(
        extractedQuestions,
        ansFile.pages
      );

      setProcessingProgress({
        status: 'completed',
        currentStep: 4,
        totalSteps: 4,
        message: 'Extraction & Mapping Complete!',
      });

      setQuestions(mappedQuestions);
    } catch (error) {
      console.error(error);
      setProcessingProgress({
        status: 'error',
        currentStep: 0,
        totalSteps: 4,
        message: 'Processing failed.',
        errorDetails: error instanceof Error ? error.message : String(error),
      });
    }
  };

  // Inline Marks Editor Handler
  const handleUpdateMarks = (questionId: string, newMarks: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId
          ? { ...q, scoredMarks: newMarks, isCustomEdited: true }
          : q
      )
    );
  };

  const handleReset = () => {
    setQpFile(null);
    setAnsFile(null);
    setQuestions([]);
    setProcessingProgress({ status: 'idle', currentStep: 0, totalSteps: 4, message: '' });
  };

  const summary = useMemo(() => calculateScoreSummary(questions), [questions]);
  const hasEvaluatedData = questions.length > 0 && ansFile !== null;

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-900 flex flex-col font-sans">
      {/* Figma Sidebar Navigation */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeNav={activeNav}
        onSelectNav={setActiveNav}
      />

      {/* Main App Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-0 md:ml-64'
        }`}
      >
        <Header
          hasApiKey={hasApiKey}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          onLoadSample={handleLoadSample}
          onReset={handleReset}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          hasEvaluatedData={hasEvaluatedData}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <main className="flex-1 overflow-y-auto">
          {hasEvaluatedData && ansFile ? (
            <Dashboard
              questions={questions}
              ansFile={ansFile}
              onUpdateMarks={handleUpdateMarks}
            />
          ) : (
            <FileUploadSection
              qpFile={qpFile}
              ansFile={ansFile}
              onQpFileChange={setQpFile}
              onAnsFileChange={setAnsFile}
              onStartProcessing={handleStartProcessing}
              onLoadSample={handleLoadSample}
              hasApiKey={hasApiKey}
            />
          )}
        </main>
      </div>

      {/* Figma Extracting Loading Overlay */}
      <ProcessingOverlay progress={processingProgress} />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={handleKeySaved}
      />

      {hasEvaluatedData && (
        <SummaryReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          questions={questions}
          summary={summary}
          qpFile={qpFile}
          ansFile={ansFile}
        />
      )}
    </div>
  );
}

export default App;
