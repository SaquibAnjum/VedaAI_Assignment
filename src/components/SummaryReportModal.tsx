import React, { useEffect } from 'react';
import type { Question, ScoreSummary, FileItem } from '../types';
import { StatusBadge } from './ui/StatusBadge';
import { X, Printer, Download, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SummaryReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  summary: ScoreSummary;
  qpFile: FileItem | null;
  ansFile: FileItem | null;
}

export const SummaryReportModal: React.FC<SummaryReportModalProps> = ({
  isOpen,
  onClose,
  questions,
  summary,
  ansFile,
}) => {
  useEffect(() => {
    if (isOpen && summary.percentage >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen, summary.percentage]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const exportData = {
      exportTimestamp: new Date().toISOString(),
      studentAnswerSheet: ansFile?.name || 'Handwritten Answer Sheet',
      scoreSummary: summary,
      questions: questions.map((q) => ({
        id: q.id,
        questionNumber: q.questionNumber,
        text: q.text,
        maxMarks: q.maxMarks,
        scoredMarks: q.scoredMarks,
        status: q.status,
        pageIndex: q.mapping ? q.mapping.pageIndex + 1 : null,
        boundingBox: q.mapping?.boundingBox,
        extractedAnswerText: q.mapping?.extractedAnswerText,
        aiFeedback: q.mapping?.aiFeedback,
        rubricBreakdown: q.mapping?.rubricBreakdown,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VedaAI_Assessment_Report_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in print:bg-white print:p-0">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden print:max-h-none print:border-none print:bg-white print:text-black">
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Assessment Evaluation Report</h3>
              <p className="text-xs text-slate-400">Extracted &amp; Mapped via VedaAI Spatial Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Download size={14} />
              Export JSON
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors"
            >
              <Printer size={14} />
              Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Report Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 print:p-8">
          {/* Institution Header */}
          <div className="border-b border-slate-800 pb-4 print:border-black">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-extrabold text-white print:text-black">VedaAI Assessment Report</h1>
                <p className="text-xs text-slate-400 print:text-gray-600">Generated: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <span className="inline-block rounded-xl bg-indigo-600/20 border border-indigo-500/30 px-4 py-2 text-xl font-bold text-indigo-300 print:text-black print:border-black">
                  Grade: {summary.grade} ({summary.percentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Metric Summary Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 print:border-gray-300 print:bg-gray-50">
            <div>
              <p className="text-xs text-slate-400 print:text-gray-500 font-medium">TOTAL SCORE</p>
              <p className="text-xl font-bold text-indigo-300 print:text-black">{summary.totalScoredMarks} / {summary.totalMaxMarks}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 print:text-gray-500 font-medium">ATTEMPTED</p>
              <p className="text-xl font-bold text-emerald-400 print:text-black">{summary.answeredCount} / {summary.totalQuestions}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 print:text-gray-500 font-medium">OUT OF ORDER</p>
              <p className="text-xl font-bold text-amber-400 print:text-black">{summary.outOfOrderCount}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 print:text-gray-500 font-medium">UNANSWERED</p>
              <p className="text-xl font-bold text-rose-400 print:text-black">{summary.unansweredCount}</p>
            </div>
          </div>

          {/* Detailed Question Table */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 print:text-black mb-3">
              Detailed Question Breakdown
            </h4>

            <div className="overflow-x-auto rounded-xl border border-slate-800 print:border-gray-300">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 print:bg-gray-100 print:text-black uppercase font-semibold">
                  <tr>
                    <th className="p-3">Q#</th>
                    <th className="p-3">Question &amp; Feedback</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Page</th>
                    <th className="p-3 text-right">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-gray-300">
                  {questions.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-800/40 print:hover:bg-transparent">
                      <td className="p-3 font-bold text-slate-200 print:text-black">
                        Q{q.questionNumber}
                      </td>
                      <td className="p-3 space-y-1 max-w-md">
                        <p className="font-medium text-slate-200 print:text-black">{q.text}</p>
                        {q.mapping && (
                          <div className="text-[11px] text-indigo-300 print:text-gray-700 space-y-0.5">
                            <p><span className="font-semibold">AI Feedback:</span> {q.mapping.aiFeedback}</p>
                            {q.mapping.outOfOrderSequenceNote && (
                              <p className="text-amber-400 font-semibold">⚠️ {q.mapping.outOfOrderSequenceNote}</p>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <StatusBadge status={q.status} size="sm" />
                      </td>
                      <td className="p-3 text-center font-medium text-slate-400 print:text-black">
                        {q.mapping ? `P${q.mapping.pageIndex + 1}` : '—'}
                      </td>
                      <td className="p-3 text-right font-bold text-indigo-300 print:text-black">
                        {q.scoredMarks} / {q.maxMarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
