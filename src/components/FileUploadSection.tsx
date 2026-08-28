import React, { useState, useRef } from 'react';
import { Upload, X, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import type { FileItem } from '../types';
import { convertPdfToImages, convertImageToDataUrl } from '../services/pdfService';

interface FileUploadSectionProps {
  qpFile: FileItem | null;
  ansFile: FileItem | null;
  onQpFileChange: (fileItem: FileItem | null) => void;
  onAnsFileChange: (fileItem: FileItem | null) => void;
  onStartProcessing: () => void;
  onLoadSample: () => void;
  hasApiKey: boolean;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  qpFile,
  ansFile,
  onQpFileChange,
  onAnsFileChange,
  onStartProcessing,
  onLoadSample,
  hasApiKey: _hasApiKey,
}) => {
  const [qpLoading, setQpLoading] = useState(false);
  const [ansLoading, setAnsLoading] = useState(false);
  const [qpProgress, setQpProgress] = useState('');
  const [ansProgress, setAnsProgress] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const qpInputRef = useRef<HTMLInputElement>(null);
  const ansInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File, type: 'qp' | 'ans') => {
    setErrorMsg(null);
    const isQp = type === 'qp';
    const setLoading = isQp ? setQpLoading : setAnsLoading;
    const setProgress = isQp ? setQpProgress : setAnsProgress;
    const onFileChange = isQp ? onQpFileChange : onAnsFileChange;

    setLoading(true);
    try {
      let pages: string[] = [];
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

      if (isPdf) {
        setProgress('Rendering PDF pages...');
        pages = await convertPdfToImages(file, (current, total) => {
          setProgress(`Rendering Page ${current} of ${total}...`);
        });
      } else if (file.type.startsWith('image/')) {
        setProgress('Processing image...');
        const dataUrl = await convertImageToDataUrl(file);
        pages = [dataUrl];
      } else {
        throw new Error('Unsupported file format. Please upload PDF or image.');
      }

      const fileItem: FileItem = {
        id: `${type}-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        pageCount: pages.length,
        pages,
        isPdf,
        rawFile: file,
      };

      onFileChange(fileItem);
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Failed to process file.');
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, type: 'qp' | 'ans') => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0], type);
    }
  };

  const canStart = qpFile !== null && ansFile !== null && !qpLoading && !ansLoading;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12 flex flex-col items-center justify-center space-y-8 animate-fade-in">
      {/* Error alert */}
      {errorMsg && (
        <div className="w-full flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
          <AlertCircle size={16} className="shrink-0 text-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Hero Heading Section */}
      <div className="text-center space-y-2 max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 flex flex-wrap items-center justify-center gap-2">
          <span>Upload</span>
          <span className="bg-[#FFEFEA] text-[#F05537] px-3.5 py-1 rounded-2xl inline-block border border-orange-100/50">
            Question Paper &amp; Answer Sheets
          </span>
        </h1>
        <p className="text-xs md:text-sm font-medium text-slate-500">
          Upload both files to get started
        </p>
      </div>

      {/* Teacher Avatar Illustration */}
      <div className="relative flex items-center justify-center py-2">
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#FFE4DE] flex items-center justify-center p-3 border-4 border-orange-100 shadow-xs">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
            alt="Teacher Avatar"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-sm"
          />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-600 text-[10px] ring-2 ring-white">
            ✨
          </span>
          <span className="absolute bottom-1 -left-1 w-4 h-4 rounded-full bg-amber-400/30 flex items-center justify-center text-amber-600 text-[8px] ring-2 ring-white">
            ●
          </span>
        </div>
      </div>

      {/* Dual Drag and Drop Cards Grid */}
      <div className="w-full grid gap-6 md:grid-cols-2">
        {/* Card 1: Question Paper */}
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-6 md:p-8 flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px] transition-all hover:border-orange-400 relative">
          <input
            type="file"
            ref={qpInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], 'qp')}
            accept=".pdf,image/png,image/jpeg,image/webp"
            className="hidden"
          />

          {!qpFile ? (
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'qp')}
              onClick={() => qpInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center text-center cursor-pointer space-y-3"
            >
              {qpLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 size={28} className="animate-spin text-orange-500" />
                  <p className="text-xs font-semibold text-orange-600">{qpProgress}</p>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shadow-xs">
                    <Upload size={18} />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-slate-800">
                      Upload <span className="text-[#F05537]">Question Paper</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Max 10MB</p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full flex items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-200/80 relative">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs">
                  PDF
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[180px] sm:max-w-[220px]">
                    {qpFile.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {(qpFile.size / (1024 * 1024)).toFixed(1)}MB • {qpFile.pageCount} Pages
                  </p>
                </div>
              </div>
              <button
                onClick={() => onQpFileChange(null)}
                className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-rose-600 transition-colors shrink-0 shadow-xs"
                title="Remove Question Paper"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Card 2: Answer Sheet */}
        <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-6 md:p-8 flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px] transition-all hover:border-orange-400 relative">
          <input
            type="file"
            ref={ansInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], 'ans')}
            accept=".pdf,image/png,image/jpeg,image/webp"
            className="hidden"
          />

          {!ansFile ? (
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'ans')}
              onClick={() => ansInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center text-center cursor-pointer space-y-3"
            >
              {ansLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 size={28} className="animate-spin text-orange-500" />
                  <p className="text-xs font-semibold text-orange-600">{ansProgress}</p>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shadow-xs">
                    <Upload size={18} />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-slate-800">
                      Upload <span className="text-[#F05537]">Answer Sheet</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Max 10MB</p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full flex items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-200/80 relative">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs">
                  PDF
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate max-w-[180px] sm:max-w-[220px]">
                    {ansFile.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {(ansFile.size / (1024 * 1024)).toFixed(1)}MB • {ansFile.pageCount} Pages
                  </p>
                </div>
              </div>
              <button
                onClick={() => onAnsFileChange(null)}
                className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-rose-600 transition-colors shrink-0 shadow-xs"
                title="Remove Answer Sheet"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <button
          onClick={onStartProcessing}
          disabled={!canStart}
          className={`flex items-center gap-2 rounded-full px-8 py-3 text-xs font-bold transition-all shadow-md ${
            canStart
              ? 'bg-[#18181b] text-white hover:bg-black cursor-pointer transform hover:-translate-y-0.5'
              : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
          }`}
        >
          <span>Start Mapping</span>
          <ArrowRight size={14} />
        </button>

        <p className="text-[11px] text-slate-400 text-center font-medium">
          Once both files are uploaded, you'll be able to map answers with questions
        </p>
      </div>

      {/* Quick Demo Load trigger */}
      {!canStart && (
        <button
          onClick={onLoadSample}
          className="text-xs text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-4 pt-2"
        >
          Load instant sample assessment demo
        </button>
      )}
    </div>
  );
};
