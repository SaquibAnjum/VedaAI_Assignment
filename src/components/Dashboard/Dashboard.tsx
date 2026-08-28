import React, { useState } from 'react';
import type { Question, FileItem } from '../../types';
import { QuestionListPane } from './QuestionListPane';
import { DocumentViewerPane } from './DocumentViewerPane';
import { FileText, Image as ImageIcon } from 'lucide-react';

interface DashboardProps {
  questions: Question[];
  ansFile: FileItem;
  onUpdateMarks: (questionId: string, newMarks: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  questions,
  ansFile,
  onUpdateMarks,
}) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    questions[0]?.id || null
  );

  const [targetPageIndex, setTargetPageIndex] = useState<number | null>(
    questions[0]?.mapping?.pageIndex ?? 0
  );

  const [mobileTab, setMobileTab] = useState<'questions' | 'answersheet'>('questions');

  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    const target = questions.find((q) => q.id === questionId);
    if (target?.mapping) {
      setTargetPageIndex(target.mapping.pageIndex);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] overflow-hidden">
      {/* Mobile Tab Switcher matching Figma Mobile view */}
      <div className="flex md:hidden bg-white border-b border-slate-200 p-2 gap-2 shrink-0">
        <button
          onClick={() => setMobileTab('questions')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
            mobileTab === 'questions'
              ? 'bg-[#18181b] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          <FileText size={14} />
          <span>Questions</span>
        </button>

        <button
          onClick={() => setMobileTab('answersheet')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
            mobileTab === 'answersheet'
              ? 'bg-[#18181b] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          <ImageIcon size={14} />
          <span>Answer Sheet</span>
        </button>
      </div>

      {/* Main Grid Viewport */}
      <div className="grid flex-1 grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Pane: Questions (Visible always on Desktop, or when Mobile Tab is 'questions') */}
        <div
          className={`h-full md:col-span-5 lg:col-span-5 overflow-hidden ${
            mobileTab === 'questions' ? 'block' : 'hidden md:block'
          }`}
        >
          <QuestionListPane
            questions={questions}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={handleSelectQuestion}
            onUpdateMarks={onUpdateMarks}
          />
        </div>

        {/* Right Pane: Document Viewer (Visible always on Desktop, or when Mobile Tab is 'answersheet') */}
        <div
          className={`h-full md:col-span-7 lg:col-span-7 overflow-hidden ${
            mobileTab === 'answersheet' ? 'block' : 'hidden md:block'
          }`}
        >
          <DocumentViewerPane
            ansFile={ansFile}
            questions={questions}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={handleSelectQuestion}
            targetPageIndex={targetPageIndex}
          />
        </div>
      </div>
    </div>
  );
};
