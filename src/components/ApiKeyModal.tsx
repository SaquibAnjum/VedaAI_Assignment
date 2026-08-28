import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, Check, Trash2, X, ExternalLink, Sparkles } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey, clearStoredApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeySaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredApiKey();
      setApiKey(stored);
      setIsSaved(!!stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setStoredApiKey(apiKey.trim());
      setIsSaved(true);
      onKeySaved();
      onClose();
    }
  };

  const handleClear = () => {
    clearStoredApiKey();
    setApiKey('');
    setIsSaved(false);
    onKeySaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-500/20 p-3 text-indigo-400 border border-indigo-500/30">
            <Key size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Gemini 1.5 Flash API Key</h3>
            <p className="text-xs text-slate-400">Required for live AI extraction & spatial grounding</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-300 font-medium">
              <ShieldCheck size={14} />
              <span>Secure Client-Side Storage</span>
            </div>
            <p className="leading-relaxed">
              Your key is stored strictly in your browser&apos;s <code className="text-indigo-400">localStorage</code> and is only transmitted directly to Google Gemini APIs.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-start gap-2">
            <Sparkles size={16} className="shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">No API Key? No problem!</span>
              <p className="mt-0.5 text-amber-200/80">
                You can use the built-in <strong className="text-amber-100">&quot;Load Sample Assessment&quot;</strong> button on the top header for an instant live evaluation demo with physics questions & student handwriting spatial mapping.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 pt-2">
            {isSaved ? (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors"
              >
                <Trash2 size={14} />
                Remove Key
              </button>
            ) : (
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:underline"
              >
                Get Gemini API Key <ExternalLink size={12} />
              </a>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!apiKey.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Check size={14} />
                Save Key
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
