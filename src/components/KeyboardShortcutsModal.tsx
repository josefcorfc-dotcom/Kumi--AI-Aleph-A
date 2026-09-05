import React from 'react';
import { Keyboard, X, Sparkles, Command } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUT_ITEMS = [
  { key: '+ / =', description: 'Increase Cantor Depth (n)', category: 'Fractal Navigation' },
  { key: '- / _', description: 'Decrease Cantor Depth (n)', category: 'Fractal Navigation' },
  { key: 'Space', description: 'Toggle Cantor Timeline Animation (Play/Pause)', category: 'Animation' },
  { key: 'M', description: 'Toggle Audio Synthesizer Mute / Unmute', category: 'Audio' },
  { key: 'T', description: 'Open / Close Cantor Cantoriano Theory Codex', category: 'Modals & Drawers' },
  { key: 'A', description: 'Open / Close Kumi AI Assistant Drawer', category: 'Modals & Drawers' },
  { key: '? / K', description: 'Toggle Keyboard Shortcuts Cheat Sheet', category: 'General' },
  { key: 'Esc', description: 'Close any open modal or drawer', category: 'General' },
];

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="keyboard-shortcuts-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="keyboard-shortcuts-modal-card"
        className="bg-[#080d24] border border-indigo-500/30 w-full max-w-xl rounded-3xl p-6 shadow-2xl text-slate-100 flex flex-col gap-5 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Keyboard Navigation Shortcuts
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Rapid bio-digital exploration controls
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shortcut List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {SHORTCUT_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center justify-between gap-3 font-mono"
            >
              <div className="flex flex-col">
                <span className="text-xs text-slate-200 font-sans font-medium">{item.description}</span>
                <span className="text-[10px] text-indigo-400 uppercase tracking-wider">{item.category}</span>
              </div>
              <kbd className="bg-slate-900 border border-white/20 text-cyan-300 text-xs px-2.5 py-1 rounded-lg font-bold shadow-md whitespace-nowrap">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-2xl flex items-center gap-2 text-xs text-indigo-200 font-mono">
          <Sparkles className="w-4 h-4 text-indigo-300 shrink-0" />
          <span>Press <kbd className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-300">?</kbd> anywhere to open or dismiss this guide.</span>
        </div>
      </div>
    </div>
  );
};
