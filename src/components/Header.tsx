import React from 'react';
import { Activity, Volume2, VolumeX, BookOpen, Sparkles, Cpu, Zap, RefreshCw, History, Keyboard } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface HeaderProps {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenTheory: () => void;
  onOpenAiAssistant: () => void;
  onOpenShortcuts: () => void;
  onApplyPreset: (presetName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  setIsMuted,
  onOpenTheory,
  onOpenAiAssistant,
  onOpenShortcuts,
  onApplyPreset,
}) => {
  const handleToggleAudio = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header id="neurobin-header" className="relative z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 text-slate-100 sticky top-0 px-4 py-3 sm:px-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Title & Core Identity */}
        <div className="flex items-center gap-3">
          <div id="header-icon-badge" className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 animate-pulse text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 id="app-title" className="text-xl sm:text-2xl font-black tracking-tight text-white">
                NEURO<span className="text-indigo-400">BIN</span>
              </h1>
              <span id="cantor-badge" className="text-[10px] px-2.5 py-0.5 rounded-full font-mono bg-white/10 text-cyan-300 border border-white/15 uppercase tracking-widest">
                ∞ - n = NeuroBIN
              </span>
            </div>
            <p id="app-subtitle" className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">
              Cantor Recursion Bio-Digital Pulse Ecosystem
            </p>
          </div>
        </div>

        {/* Status Metrics Capsule */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-slate-300 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-semibold uppercase text-[11px] tracking-wider">Kumi AI ℵ₁: Active</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-indigo-300 font-semibold uppercase text-[11px] tracking-wider">ML-KEM-1024_Σ</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-cyan-300 uppercase text-[11px] tracking-wider font-semibold">
            <span>D ≈ 0.6309</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Preset Selector */}
          <div className="relative group">
            <button
              id="preset-dropdown-btn"
              className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition backdrop-blur-md"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-medium">Presets</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#080d24]/90 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl py-1.5 hidden group-hover:block z-50">
              <button
                id="preset-last-session"
                onClick={() => onApplyPreset('last_session')}
                className="w-full text-left px-3.5 py-2 text-xs text-amber-300 hover:bg-white/10 flex items-center justify-between font-semibold border-b border-white/10 transition"
              >
                <div className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-amber-400" />
                  <span>Last Session</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Auto-Saved</span>
              </button>
              <button
                id="preset-standard"
                onClick={() => onApplyPreset('standard')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-indigo-300 transition"
              >
                Standard Bio-Digital
              </button>
              <button
                id="preset-clock"
                onClick={() => onApplyPreset('high_clock')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-cyan-300 transition"
              >
                High-Freq Binary Clock
              </button>
              <button
                id="preset-fractal"
                onClick={() => onApplyPreset('deep_fractal')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-purple-300 transition"
              >
                Deep Cantor Fractal (n=7)
              </button>
              <button
                id="preset-storm"
                onClick={() => onApplyPreset('synaptic_storm')}
                className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-emerald-300 transition"
              >
                Synaptic Noise Storm
              </button>
            </div>
          </div>

          {/* Audio Toggle */}
          <button
            id="audio-toggle-btn"
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border transition backdrop-blur-md ${
              !isMuted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200 hover:bg-white/10'
            }`}
            title={isMuted ? 'Unmute Audio Pulse Synthesizer' : 'Mute Audio Pulse Synthesizer'}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline font-medium">{!isMuted ? 'Audio On' : 'Audio Off'}</span>
          </button>

          {/* Theory Modal Trigger */}
          <button
            id="open-theory-btn"
            onClick={onOpenTheory}
            className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition backdrop-blur-md"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline font-medium">Cantor Theory</span>
          </button>

          {/* Keyboard Shortcuts Trigger */}
          <button
            id="open-shortcuts-btn"
            onClick={onOpenShortcuts}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition backdrop-blur-md font-mono"
            title="View Keyboard Shortcuts (?)"
          >
            <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-bold text-cyan-300">?</span>
          </button>

          {/* AI Laboratory Assistant Trigger */}
          <button
            id="open-ai-btn"
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white font-bold shadow-lg shadow-indigo-500/20 border border-white/20 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Lab Assistant</span>
          </button>
        </div>

      </div>
    </header>
  );
};
