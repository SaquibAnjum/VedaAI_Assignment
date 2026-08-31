import React from 'react';
import type { Question } from '../../types';

interface BoundingBoxOverlayProps {
  pageIndex: number;
  questions: Question[];
  selectedQuestionId: string | null;
  onSelectQuestion: (questionId: string) => void;
  showOverlay: boolean;
}

export const BoundingBoxOverlay: React.FC<BoundingBoxOverlayProps> = ({
  pageIndex,
  questions,
  selectedQuestionId,
  onSelectQuestion,
  showOverlay,
}) => {
  if (!showOverlay) return null;

  // Filter questions that have an answer mapping on this page
  const pageQuestions = questions.filter(
    (q) => q.mapping && Number(q.mapping.pageIndex) === Number(pageIndex)
  );

  if (pageQuestions.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {pageQuestions.map((q) => {
        if (!q.mapping) return null;

        const { ymin, xmin, ymax, xmax } = q.mapping.boundingBox;
        const isSelected = selectedQuestionId === q.id;
        const isOutOfOrder = q.status === 'Out of Order';

        // Convert 0-1000 normalized scale to percentage
        const top = Math.max(0, Math.min(100, ymin / 10));
        const left = Math.max(0, Math.min(100, xmin / 10));
        const width = Math.max(2, Math.min(100 - left, (xmax - xmin) / 10));
        const height = Math.max(2, Math.min(100 - top, (ymax - ymin) / 10));

        return (
          <div
            key={q.id}
            id={`bbox-${q.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectQuestion(q.id);
            }}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
            className={`absolute pointer-events-auto cursor-pointer rounded-xl border-2 transition-all duration-300 ${
              isSelected
                ? isOutOfOrder
                  ? 'border-amber-500 bg-amber-500/20 ring-4 ring-amber-400/40 shadow-xl z-30 scale-[1.01]'
                  : 'border-[#22c55e] bg-emerald-500/20 ring-4 ring-emerald-400/50 shadow-xl z-30 scale-[1.01]'
                : isOutOfOrder
                ? 'border-amber-500/70 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500 z-20'
                : 'border-[#22c55e]/70 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-[#22c55e] z-20'
            }`}
            title={`Click to focus Question ${q.questionNumber}`}
          >
            {/* Tag Badge matching Figma */}
            <div
              className={`absolute -top-3.5 left-3 font-bold text-xs px-2.5 py-0.5 rounded-md shadow-md flex items-center gap-1.5 transition-all ${
                isSelected
                  ? isOutOfOrder
                    ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                    : 'bg-[#16a34a] text-white ring-2 ring-emerald-300'
                  : isOutOfOrder
                  ? 'bg-amber-500 text-white'
                  : 'bg-[#22c55e] text-white'
              }`}
            >
              <span>Q{q.questionNumber}.</span>
              <span className="opacity-90 font-mono text-[10px]">
                [{q.scoredMarks}/{q.maxMarks}m]
              </span>
              {isOutOfOrder && (
                <span className="bg-amber-900/40 text-amber-100 text-[9px] px-1 rounded">
                  Out of Order
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
