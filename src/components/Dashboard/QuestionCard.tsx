import React, { useState, useEffect, useRef } from 'react';
import type { Question } from '../../types';
import { ChevronDown, ChevronUp, Edit2, Check, AlertTriangle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateMarks: (questionId: string, newMarks: number) => void;
  forceExpanded?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSelected,
  onSelect,
  onUpdateMarks,
  forceExpanded = false,
}) => {
  const [isExpandedInternal, setIsExpandedInternal] = useState(false);
  const [isEditingMarks, setIsEditingMarks] = useState(false);
  const [editedMarks, setEditedMarks] = useState(question.scoredMarks.toString());

  const cardRef = useRef<HTMLDivElement>(null);
  const isExpanded = forceExpanded || isSelected || isExpandedInternal;
  const isOutOfOrder = question.status === 'Out of Order';

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isSelected]);

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(editedMarks);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= question.maxMarks) {
      onUpdateMarks(question.id, parsed);
      setIsEditingMarks(false);
    }
  };

  const getScoreBadgeClass = () => {
    const ratio = question.scoredMarks / question.maxMarks;
    if (question.scoredMarks === 0 || question.status === 'Unanswered') {
      return 'bg-[#FEE2E2] text-[#DC2626] border-red-200';
    } else if (ratio >= 0.8) {
      return 'bg-[#E6F7ED] text-[#16A34A] border-green-200';
    } else {
      return 'bg-[#FFFBEB] text-[#D97706] border-amber-200';
    }
  };

  return (
    <div
      ref={cardRef}
      id={`qcard-${question.id}`}
      onClick={onSelect}
      className={`rounded-2xl border transition-all duration-200 cursor-pointer p-4 ${
        isSelected
          ? 'border-[#F05537] bg-white shadow-md ring-2 ring-orange-200'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        {/* Circle Number Badge & Question text */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
              isSelected
                ? 'bg-[#F05537] text-white shadow-xs'
                : 'bg-slate-700 text-white'
            }`}
          >
            {question.questionNumber}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm font-semibold text-slate-800 leading-snug pt-0.5">
              {question.text}
            </p>
            {isOutOfOrder && (
              <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <AlertTriangle size={11} className="text-amber-500 shrink-0" />
                <span>Attempted Out of Order</span>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Score Pill & Accordion arrow */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Score Badge / Inline Editor */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadgeClass()}`}
          >
            {isEditingMarks ? (
              <form onSubmit={handleSaveMarks} className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max={question.maxMarks}
                  value={editedMarks}
                  onChange={(e) => setEditedMarks(e.target.value)}
                  className="w-10 rounded border border-orange-400 bg-white px-1 py-0.5 text-center text-xs font-bold text-slate-800 focus:outline-none"
                  autoFocus
                />
                <span className="text-[10px] text-slate-500">/{question.maxMarks}</span>
                <button
                  type="submit"
                  className="rounded p-0.5 text-emerald-600 hover:bg-emerald-100"
                  title="Save marks"
                >
                  <Check size={12} />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-1">
                <span>
                  {question.scoredMarks}/{question.maxMarks}
                </span>
                <button
                  onClick={() => setIsEditingMarks(true)}
                  className="ml-0.5 text-slate-400 hover:text-slate-700"
                  title="Edit score"
                >
                  <Edit2 size={10} />
                </button>
              </div>
            )}
          </div>

          {/* Expand Toggle button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpandedInternal(!isExpandedInternal);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Container: AI Feedback Box matching Figma */}
      {isExpanded && question.mapping && (
        <div className="mt-3 bg-[#FFF8F6] border border-[#FFDEC9] rounded-xl p-3.5 space-y-2 animate-fade-in">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-900">AI Feedback</span>
            {question.mapping.pageIndex !== undefined && (
              <span className="text-[10px] font-semibold text-slate-500 bg-orange-100/60 px-2 py-0.5 rounded">
                Found on Page {question.mapping.pageIndex + 1}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            {question.mapping.aiFeedback}
          </p>

          {question.mapping.outOfOrderSequenceNote && (
            <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/80 font-medium">
              📌 {question.mapping.outOfOrderSequenceNote}
            </div>
          )}

          {question.mapping.extractedAnswerText && (
            <p className="text-[11px] text-slate-500 font-mono italic pt-1 border-t border-orange-100/80 leading-snug">
              Extracted response: "{question.mapping.extractedAnswerText}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};
