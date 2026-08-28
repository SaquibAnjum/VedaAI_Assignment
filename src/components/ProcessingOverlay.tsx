import React from 'react';
import type { ProcessingProgress } from '../types';

interface ProcessingOverlayProps {
  progress: ProcessingProgress;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ progress }) => {
  if (progress.status === 'idle' || progress.status === 'completed') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md animate-fade-in">
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-sm px-6">
        {/* Animated Orange Sparkle Stars Cluster matching Figma */}
        <div className="relative flex items-center justify-center w-24 h-24 my-2">
          {/* Main central star */}
          <div className="text-[#F05537] text-6xl animate-pulse-star">
            ✦
          </div>
          {/* Top-right small star */}
          <div className="absolute top-1 right-2 text-orange-400 text-2xl animate-pulse-star delay-100">
            ✦
          </div>
          {/* Bottom-left small star */}
          <div className="absolute bottom-2 left-3 text-orange-300 text-xl animate-pulse-star delay-200">
            ✦
          </div>
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-xl -z-10" />
        </div>

        {/* Heading & Subtitle matching Figma */}
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Extracting...
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            This may take a while
          </p>
        </div>

        {/* Real-time processing message */}
        {progress.message && (
          <p className="text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 mt-2 font-mono">
            {progress.message}
          </p>
        )}

        {/* Error message handling if any */}
        {progress.status === 'error' && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
            <p className="font-bold">Extraction Error</p>
            <p className="text-[11px] mt-0.5">{progress.errorDetails}</p>
          </div>
        )}
      </div>
    </div>
  );
};
