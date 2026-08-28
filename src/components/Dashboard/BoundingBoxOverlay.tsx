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
    (q) => q.mapping && q.mapping.pageIndex === pageIndex
  );

  if (pageQuestions.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {pageQuestions.map((q) => {
        if (!q.mapping) return null;

        const { ymin, xmin, ymax, xmax } = q.mapping.boundingBox;
        const isSelected = selectedQuestionId === q.id;

        // Convert 0-1000 scale to percentage
        const top = ymin / 10;
        const left = xmin / 10;
        const width = (xmax - xmin) / 10;
        const height = (ymax - ymin) / 10;

        return (
          <div
            key={q.id}
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
            className={`absolute pointer-events-auto cursor-pointer rounded-lg border-2 transition-all duration-200 ${
              isSelected
                ? 'border-[#22c55e] bg-emerald-500/20 ring-2 ring-emerald-400 shadow-md'
                : 'border-[#22c55e]/80 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-[#22c55e]'
            }`}
            title={`Click to view Q${q.questionNumber}`}
          >
            {/* Tag Badge matching Figma (e.g. Q1., Q2.) */}
            <div className="absolute -top-3.5 left-2 bg-[#22c55e] text-white font-bold text-xs px-2 py-0.5 rounded shadow-sm">
              Q{q.questionNumber}.
            </div>
          </div>
        );
      })}
    </div>
  );
};
