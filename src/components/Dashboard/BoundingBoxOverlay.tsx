import React from 'react';
import type { Question, BoundingBox } from '../../types';

interface BoundingBoxOverlayProps {
  pageIndex: number;
  questions: Question[];
  selectedQuestionId: string | null;
  onSelectQuestion: (questionId: string) => void;
  showOverlay: boolean;
}

/**
 * Single, unified coordinate conversion utility.
 * Transforms 0..1000 normalized bounding box coordinates into CSS percentages relative to the page container.
 */
export function convertNormalizedToDisplay(bbox: BoundingBox) {
  const top = Math.max(0, Math.min(100, bbox.ymin / 10));
  const left = Math.max(0, Math.min(100, bbox.xmin / 10));
  const width = Math.max(1, Math.min(100 - left, (bbox.xmax - bbox.xmin) / 10));
  const height = Math.max(1, Math.min(100 - top, (bbox.ymax - bbox.ymin) / 10));
  return { top, left, width, height };
}

export const BoundingBoxOverlay: React.FC<BoundingBoxOverlayProps> = ({
  pageIndex,
  questions,
  selectedQuestionId,
  onSelectQuestion,
  showOverlay,
}) => {
  if (!showOverlay) return null;

  // Collect all boxes (primary and additional pages) for this pageIndex
  const boxesToRender: {
    question: Question;
    boundingBox: BoundingBox;
    isPrimary: boolean;
  }[] = [];

  questions.forEach((q) => {
    if (!q.mapping || !q.mapping.matched || !q.mapping.boundingBox || q.status === 'Unanswered') return;

    if (Number(q.mapping.pageIndex) === Number(pageIndex)) {
      boxesToRender.push({ question: q, boundingBox: q.mapping.boundingBox, isPrimary: true });
    }

    if (q.mapping.additionalPages) {
      q.mapping.additionalPages.forEach((ap) => {
        if (Number(ap.pageIndex) === Number(pageIndex) && ap.boundingBox) {
          boxesToRender.push({ question: q, boundingBox: ap.boundingBox, isPrimary: false });
        }
      });
    }
  });

  if (boxesToRender.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {boxesToRender.map(({ question: q, boundingBox, isPrimary }, boxIdx) => {
        const { top, left, width, height } = convertNormalizedToDisplay(boundingBox);
        const isSelected = selectedQuestionId === q.id;
        const isOutOfOrder = q.status === 'Out of Order';

        return (
          <div
            key={`${q.id}-${boxIdx}`}
            id={isPrimary ? `bbox-${q.id}` : `bbox-${q.id}-add-${boxIdx}`}
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
                  ? 'border-amber-500 bg-amber-500/25 ring-4 ring-amber-400/70 shadow-2xl z-30 scale-[1.01] animate-pulse'
                  : 'border-[#22c55e] bg-emerald-500/25 ring-4 ring-emerald-400/80 shadow-2xl z-30 scale-[1.01] animate-pulse'
                : isOutOfOrder
                ? 'border-amber-500/70 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500 z-20'
                : 'border-[#22c55e]/70 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-[#22c55e] z-20'
            }`}
            title={`Click to focus Question ${q.questionNumber}`}
          >
            {/* Tag Badge matching Figma */}
            <div
              className={`absolute -top-3.5 left-2 font-bold text-xs px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1 transition-all ${
                isSelected
                  ? isOutOfOrder
                    ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                    : 'bg-[#16a34a] text-white ring-2 ring-emerald-300'
                  : isOutOfOrder
                  ? 'bg-amber-500 text-white'
                  : 'bg-[#22c55e] text-white'
              }`}
            >
              <span>Q{q.questionNumber}</span>
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
