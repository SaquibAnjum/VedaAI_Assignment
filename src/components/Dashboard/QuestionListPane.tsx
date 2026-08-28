import React, { useState, useMemo } from 'react';
import type { Question } from '../../types';
import { QuestionCard } from './QuestionCard';
import { Search } from 'lucide-react';

interface QuestionListPaneProps {
  questions: Question[];
  selectedQuestionId: string | null;
  onSelectQuestion: (questionId: string) => void;
  onUpdateMarks: (questionId: string, newMarks: number) => void;
}

export const QuestionListPane: React.FC<QuestionListPaneProps> = ({
  questions,
  selectedQuestionId,
  onSelectQuestion,
  onUpdateMarks,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandAll, setExpandAll] = useState(false);

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return questions;
    const query = searchQuery.toLowerCase();
    return questions.filter(
      (q) =>
        q.questionNumber.toLowerCase().includes(query) ||
        q.text.toLowerCase().includes(query)
    );
  }, [questions, searchQuery]);

  return (
    <div className="flex h-full flex-col bg-slate-50 border-r border-slate-200 overflow-hidden">
      {/* Top Header Bar matching Figma */}
      <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between gap-3">
        <h2 className="text-sm md:text-base font-bold text-slate-900 truncate">
          Extracted Questions (from question paper)
        </h2>
        <button
          onClick={() => setExpandAll(!expandAll)}
          className="shrink-0 bg-white border border-slate-200 text-slate-700 font-semibold px-3 py-1.5 text-xs rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
        >
          {expandAll ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-white border-b border-slate-200">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search extracted questions..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-orange-400 focus:outline-none focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Question Cards Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs font-medium">
            No questions match search filter
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              isSelected={selectedQuestionId === question.id}
              onSelect={() => onSelectQuestion(question.id)}
              onUpdateMarks={onUpdateMarks}
              forceExpanded={expandAll}
            />
          ))
        )}
      </div>
    </div>
  );
};
