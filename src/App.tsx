import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PulseOscilloscope } from './components/PulseOscilloscope';
import { CantorVisualizer } from './components/CantorVisualizer';
import { ControlPanel } from './components/ControlPanel';
import { SignalCodex } from './components/SignalCodex';
import { TheoryModal } from './components/TheoryModal';
import { GeminiAssistant } from './components/GeminiAssistant';
import { SimulationParams } from './types';

export default function App() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);

  // Simulation Parameters state
  const [params, setParams] = useState<SimulationParams>({
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

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts if the user is typing in an input field
      if (e.target instanceof HTMLElement && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }

      // Alt + T -> Toggle Theory Modal
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsTheoryOpen(prev => !prev);
      }
      
      // Alt + A -> Toggle AI Assistant
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAiOpen(prev => !prev);
      }

      // Alt + R -> Reset Simulation Parameters
      if (e.altKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply Presets
  const handleApplyPreset = (presetName: string) => {
    switch (presetName) {
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
      
      {/* Ambient Frosted Light Orbs in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] bg-indigo-600/60 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] bg-emerald-600/50 rounded-full blur-[140px]"></div>
        <div className="absolute top-[35%] left-[40%] w-[350px] h-[350px] bg-cyan-500/40 rounded-full blur-[120px]"></div>
      </div>

      {/* Header Bar */}
      <Header
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenTheory={() => setIsTheoryOpen(true)}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        onApplyPreset={handleApplyPreset}
      />

      {/* Main Content Dashboard */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        
        {/* Real-time Oscilloscope */}
        <section id="oscilloscope-section">
          <PulseOscilloscope params={params} />
        </section>

        {/* Cantor Fractal Visualizer & Parameter Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

      </main>

      {/* Footer Info */}
      <footer className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md py-4 px-6 text-center text-xs text-slate-400 font-mono tracking-widest uppercase">
        Cantor-Recursion // NeuroBIN Bio-Digital Simulator v2.0.4-Alpha
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

    </div>
  );
}
