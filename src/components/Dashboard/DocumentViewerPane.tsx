import React, { useState, useRef, useEffect } from 'react';
import type { FileItem, Question, TargetSelection } from '../../types';
import { BoundingBoxOverlay } from './BoundingBoxOverlay';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

interface DocumentViewerPaneProps {
  ansFile: FileItem;
  questions: Question[];
  selectedQuestionId: string | null;
  onSelectQuestion: (questionId: string) => void;
  targetSelection: TargetSelection | null;
}

export const DocumentViewerPane: React.FC<DocumentViewerPaneProps> = ({
  ansFile,
  questions,
  selectedQuestionId,
  onSelectQuestion,
  targetSelection,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!targetSelection) return;
    const { questionId, pageIndex } = targetSelection;

    if (pageIndex >= 0 && pageIndex < ansFile.pages.length) {
      setCurrentPage(pageIndex);

      setTimeout(() => {
        const container = containerRef.current;
        const bboxEl = document.getElementById(`bbox-${questionId}`);

        if (container && bboxEl) {
          const containerRect = container.getBoundingClientRect();
          const bboxRect = bboxEl.getBoundingClientRect();
          const relativeTop = bboxRect.top - containerRect.top + container.scrollTop;
          const targetScrollTop = relativeTop - containerRect.height / 2 + bboxRect.height / 2;

          container.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth',
          });
        } else if (container && pageRefs.current[pageIndex]) {
          const pageEl = pageRefs.current[pageIndex]!;
          const containerRect = container.getBoundingClientRect();
          const pageRect = pageEl.getBoundingClientRect();
          const relativeTop = pageRect.top - containerRect.top + container.scrollTop;

          container.scrollTo({
            top: Math.max(0, relativeTop - 20),
            behavior: 'smooth',
          });
        }
      }, 80);
    }
  }, [targetSelection, ansFile.pages.length]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerCenter = container.scrollTop + container.clientHeight / 2;
    let closestPage = 0;
    let minDistance = Infinity;

    pageRefs.current.forEach((el, idx) => {
      if (!el) return;
      const elCenter = el.offsetTop + el.clientHeight / 2;
      const distance = Math.abs(containerCenter - elCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestPage = idx;
      }
    });

    if (closestPage !== currentPage) {
      setCurrentPage(closestPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const nextIdx = currentPage - 1;
      setCurrentPage(nextIdx);
      const container = containerRef.current;
      const pageEl = pageRefs.current[nextIdx];
      if (container && pageEl) {
        const containerRect = container.getBoundingClientRect();
        const pageRect = pageEl.getBoundingClientRect();
        const relativeTop = pageRect.top - containerRect.top + container.scrollTop;
        container.scrollTo({ top: Math.max(0, relativeTop - 20), behavior: 'smooth' });
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < ansFile.pages.length - 1) {
      const nextIdx = currentPage + 1;
      setCurrentPage(nextIdx);
      const container = containerRef.current;
      const pageEl = pageRefs.current[nextIdx];
      if (container && pageEl) {
        const containerRect = container.getBoundingClientRect();
        const pageRect = pageEl.getBoundingClientRect();
        const relativeTop = pageRect.top - containerRect.top + container.scrollTop;
        container.scrollTo({ top: Math.max(0, relativeTop - 20), behavior: 'smooth' });
      }
    }
  };

  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 15, 60));
  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 15, 200));

  return (
    <div className="flex h-full flex-col bg-[#3b3d40] text-white">
      {/* Top Header Bar matching Figma */}
      <div className="flex items-center justify-between gap-3 bg-[#18181b] px-4 py-2.5 border-b border-slate-700/60 shrink-0">
        {/* Left: Title */}
        <h2 className="text-sm font-bold text-slate-100">Answer Sheet</h2>

        {/* Center/Right: Zoom & Page Controls */}
        <div className="flex items-center gap-3">
          {/* Zoom controls */}
          <div className="flex items-center gap-2 bg-[#27272a] text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700/60 shadow-xs">
            <button
              onClick={handleZoomOut}
              className="text-slate-300 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <Minus size={14} />
            </button>
            <span className="w-9 text-center text-slate-200">{zoomLevel}%</span>
            <button
              onClick={handleZoomIn}
              className="text-slate-300 hover:text-white transition-colors"
              title="Zoom In"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Page navigation pill */}
          <div className="flex items-center gap-2 bg-[#27272a] text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700/60 shadow-xs">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-slate-200">
              Page {currentPage + 1} of {ansFile.pageCount}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === ansFile.pageCount - 1}
              className="text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Viewer Canvas */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="viewer-container flex-1 overflow-auto p-4 md:p-8 flex flex-col items-center gap-6"
      >
        {ansFile.pages.map((dataUrl, pageIdx) => (
          <div
            key={pageIdx}
            ref={(el) => { pageRefs.current[pageIdx] = el; }}
            style={{ width: `${zoomLevel}%`, maxWidth: '900px' }}
            className="relative rounded-xl bg-white shadow-2xl transition-all duration-300 overflow-hidden border border-slate-700/40"
          >
            {/* Page Header ribbon */}
            <div className="absolute top-2 right-3 z-30 rounded bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-slate-200 backdrop-blur-xs">
              Page {pageIdx + 1}
            </div>

            {/* Document Image */}
            <img
              src={dataUrl}
              alt={`Answer Sheet Page ${pageIdx + 1}`}
              className="w-full h-auto block select-none"
            />

            {/* Bounding Box Overlay Layer */}
            <BoundingBoxOverlay
              pageIndex={pageIdx}
              questions={questions}
              selectedQuestionId={selectedQuestionId}
              onSelectQuestion={onSelectQuestion}
              showOverlay={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
