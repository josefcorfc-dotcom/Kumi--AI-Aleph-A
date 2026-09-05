import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { PulseOscilloscope } from './components/PulseOscilloscope';
import { CantorVisualizer } from './components/CantorVisualizer';
import { ControlPanel } from './components/ControlPanel';
import { SignalCodex } from './components/SignalCodex';
import { TheoryModal } from './components/TheoryModal';
import { GeminiAssistant } from './components/GeminiAssistant';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { KumiAeaVisualizer } from './components/KumiAeaVisualizer';
import { SimulationParams, PulseDataPoint } from './types';
import { audioSynth } from './utils/audio';

const STORAGE_KEY = 'neurobin_last_session_params';

const DEFAULT_PARAMS: SimulationParams = {
  cantorDepth: 4,
  clockFreqHz: 25,
  restingPotentialMv: -70,
  thresholdMv: -55,
  peakMv: 30,
  refractoryPeriodMs: 4,
  synapticNoise: 0.15,
  couplingStrength: 0.5,
  pulseEncoding: 'PWM',
};

export default function App() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);

  // Shared pulse data buffer ref for session snapshots
  const pulseBufferRef = useRef<PulseDataPoint[]>([]);

  // Simulation Parameters state with localStorage recovery
  const [params, setParams] = useState<SimulationParams>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PARAMS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load last session from localStorage:', e);
    }
    return DEFAULT_PARAMS;
  });

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger hotkeys if user is typing in an input, textarea, or contentEditable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      // Key mappings
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setParams((prev) => {
          const nextDepth = Math.min(prev.cantorDepth + 1, 8);
          audioSynth.playSpikeClick(300 + nextDepth * 30);
          return { ...prev, cantorDepth: nextDepth };
        });
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setParams((prev) => {
          const nextDepth = Math.max(prev.cantorDepth - 1, 0);
          audioSynth.playSpikeClick(300 + nextDepth * 30);
          return { ...prev, cantorDepth: nextDepth };
        });
      } else if (e.code === 'Space') {
        e.preventDefault();
        const playBtn = document.getElementById('btn-timeline-play-toggle');
        if (playBtn) playBtn.click();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        const muted = audioSynth.toggleMute();
        setIsMuted(muted);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setIsTheoryOpen((prev) => !prev);
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setIsAiOpen((prev) => !prev);
      } else if (e.key === '?' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsTheoryOpen(false);
        setIsAiOpen(false);
        setIsShortcutsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-save simulation parameters to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
    } catch (e) {
      console.warn('Failed to save session to localStorage:', e);
    }
  }, [params]);

  // Apply Presets
  const handleApplyPreset = (presetName: string) => {
    switch (presetName) {
      case 'last_session': {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            setParams({ ...DEFAULT_PARAMS, ...JSON.parse(saved) });
          }
        } catch (e) {
          console.warn('Failed to apply last session preset:', e);
        }
        break;
      }
      case 'standard':
        setParams({
          cantorDepth: 4,
          clockFreqHz: 25,
          restingPotentialMv: -70,
          thresholdMv: -55,
          peakMv: 30,
          refractoryPeriodMs: 4,
          synapticNoise: 0.15,
          couplingStrength: 0.5,
          pulseEncoding: 'PWM',
        });
        break;
      case 'high_clock':
        setParams({
          cantorDepth: 5,
          clockFreqHz: 80,
          restingPotentialMv: -70,
          thresholdMv: -50,
          peakMv: 30,
          refractoryPeriodMs: 2,
          synapticNoise: 0.05,
          couplingStrength: 0.8,
          pulseEncoding: 'MANCHESTER',
        });
        break;
      case 'deep_fractal':
        setParams({
          cantorDepth: 7,
          clockFreqHz: 30,
          restingPotentialMv: -75,
          thresholdMv: -55,
          peakMv: 35,
          refractoryPeriodMs: 5,
          synapticNoise: 0.1,
          couplingStrength: 0.65,
          pulseEncoding: 'NRZ',
        });
        break;
      case 'synaptic_storm':
        setParams({
          cantorDepth: 3,
          clockFreqHz: 15,
          restingPotentialMv: -65,
          thresholdMv: -45,
          peakMv: 25,
          refractoryPeriodMs: 8,
          synapticNoise: 0.85,
          couplingStrength: 0.3,
          pulseEncoding: 'SPIKE_TRAIN',
        });
        break;
    }
  };

  return (
    <div id="neurobin-root" className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Ambient Frosted Light Orbs in Background (Dynamic color shifting based on pulseEncoding) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full blur-[140px] animate-pulse transition-all duration-1000 ease-in-out ${
            params.pulseEncoding === 'PWM'
              ? 'bg-indigo-600/70'
              : params.pulseEncoding === 'NRZ'
              ? 'bg-cyan-600/70'
              : params.pulseEncoding === 'SPIKE_TRAIN'
              ? 'bg-emerald-600/70'
              : 'bg-fuchsia-600/70'
          }`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full blur-[140px] transition-all duration-1000 ease-in-out ${
            params.pulseEncoding === 'PWM'
              ? 'bg-purple-600/60'
              : params.pulseEncoding === 'NRZ'
              ? 'bg-blue-600/60'
              : params.pulseEncoding === 'SPIKE_TRAIN'
              ? 'bg-teal-500/60'
              : 'bg-rose-600/60'
          }`}
        />
        <div
          className={`absolute top-[35%] left-[40%] w-[350px] h-[350px] rounded-full blur-[120px] transition-all duration-1000 ease-in-out ${
            params.pulseEncoding === 'PWM'
              ? 'bg-blue-500/50'
              : params.pulseEncoding === 'NRZ'
              ? 'bg-teal-400/50'
              : params.pulseEncoding === 'SPIKE_TRAIN'
              ? 'bg-lime-500/50'
              : 'bg-amber-500/50'
          }`}
        />
      </div>

      {/* Header Bar */}
      <Header
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenTheory={() => setIsTheoryOpen(true)}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onApplyPreset={handleApplyPreset}
      />

      {/* Main Content Dashboard */}
      <main className="relative z-10 flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Core NeuroBIN Simulation */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Real-time Oscilloscope */}
          <section id="oscilloscope-section">
            <PulseOscilloscope params={params} pulseBufferRef={pulseBufferRef} />
          </section>

          {/* Cantor Fractal Visualizer & Parameter Controls Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <section id="cantor-section">
              <CantorVisualizer
                depth={params.cantorDepth}
                onDepthChange={(newDepth) => setParams({ ...params, cantorDepth: newDepth })}
              />
            </section>

            <section id="control-panel-section">
              <ControlPanel
                params={params}
                onChange={(updated) => setParams(updated)}
              />
            </section>
          </div>

          {/* Text to NeuroBIN Signal Codex */}
          <section id="codex-section">
            <SignalCodex />
          </section>
        </div>

        {/* Right Column: KUMI AEA Architecture Side Visualizer */}
        <aside className="w-full lg:w-[350px] xl:w-[400px] flex-shrink-0">
          <KumiAeaVisualizer params={params} pulseBufferRef={pulseBufferRef} />
        </aside>

      </main>

      {/* Footer Info & Governance */}
      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md py-4 px-6 text-center text-xs text-slate-400 font-mono tracking-wide flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-semibold">Cantor-Recursion // NeuroBIN Bio-Digital Simulator</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400">gs://kumi-ai-firmamento-evidencias</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Copyright 2026 <strong className="text-slate-200">JOSÉ FRANCISCO CANTORIANO LEYVA</strong> (NEUROBIN ALEPH-Σ) — Apache License 2.0
        </div>
      </footer>

      {/* Theory & Proof Modal */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
      />

      {/* AI Assistant Drawer */}
      <GeminiAssistant
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        params={params}
      />

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

    </div>
  );
}
