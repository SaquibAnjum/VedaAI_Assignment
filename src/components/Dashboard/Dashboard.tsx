import React, { useState } from 'react';
import type { Question, FileItem, TargetSelection } from '../../types';
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

  const [targetSelection, setTargetSelection] = useState<TargetSelection | null>(() => {
    const first = questions[0];
    if (first) {
      return {
        questionId: first.id,
        pageIndex: first.mapping?.pageIndex ?? 0,
        timestamp: Date.now(),
      };
    }
    return null;
  });

  const [mobileTab, setMobileTab] = useState<'questions' | 'answersheet'>('questions');

  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    const target = questions.find((q) => q.id === questionId);
    const pageIdx = target?.mapping?.pageIndex ?? 0;

    setTargetSelection({
      questionId,
      pageIndex: pageIdx,
      timestamp: Date.now(),
    });
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
        {/* Left Pane: Questions */}
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

        {/* Right Pane: Document Viewer */}
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
            targetSelection={targetSelection}
          />
        </div>
      </div>
    </div>
  );
};
