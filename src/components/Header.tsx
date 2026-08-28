import React from 'react';
import {
  ArrowLeft,
  FileText,
  HelpCircle,
  Bell,
  Plus,
  ChevronDown,
  Sparkles,
  Award
} from 'lucide-react';

interface HeaderProps {
  hasApiKey: boolean;
  onOpenApiKeyModal: () => void;
  onLoadSample: () => void;
  onReset: () => void;
  onOpenReportModal: () => void;
  hasEvaluatedData: boolean;
  isSidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  hasApiKey: _hasApiKey,
  onOpenApiKeyModal: _onOpenApiKeyModal,
  onLoadSample,
  onReset,
  onOpenReportModal,
  hasEvaluatedData,
  isSidebarCollapsed,
}) => {
  return (
    <header
      className={`h-14 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-all duration-300 flex items-center justify-between px-4 sm:px-6 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-0 md:ml-64'
      }`}
    >
      {/* Left side: Back Button & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="Back to Exams list / Reset"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <FileText size={15} className="text-slate-400" />
          <span className="text-slate-700 font-bold">Exams</span>
        </div>
      </div>

      {/* Right side: Actions, Notifications & Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Sample Load Action Button */}
        <button
          onClick={onLoadSample}
          className="hidden sm:flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600 hover:bg-orange-100 transition-colors"
          title="Load instant biology assessment sample"
        >
          <Sparkles size={13} />
          <span>Demo Sample</span>
        </button>

        {hasEvaluatedData && (
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow-xs hover:bg-orange-700 transition-colors"
          >
            <Award size={13} />
            <span className="hidden sm:inline">Report</span>
          </button>
        )}

        {/* Figma Help Icon */}
        <button
          className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="Help & Documentation"
        >
          <HelpCircle size={18} />
        </button>

        {/* Figma Notification Bell Icon with Dot Badge */}
        <button
          className="relative p-1.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>

        {/* Figma Add Icon */}
        <button
          onClick={onReset}
          className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="Create New Exam"
        >
          <Plus size={18} />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200 my-auto hidden sm:block" />

        {/* Profile Avatar & Dropdown */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Saquib"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden md:inline text-xs font-bold text-slate-800">
            Saquib
          </span>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
};
