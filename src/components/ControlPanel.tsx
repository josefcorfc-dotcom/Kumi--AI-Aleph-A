import React from 'react';
import { Sliders, Cpu, Activity, Zap, Radio, ShieldAlert, HardDrive } from 'lucide-react';
import { SimulationParams } from '../types';

interface ControlPanelProps {
  params: SimulationParams;
  onChange: (updated: SimulationParams) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ params, onChange }) => {
  const updateField = <K extends keyof SimulationParams>(key: K, value: SimulationParams[K]) => {
    onChange({
      ...params,
      [key]: value,
    });
  };

  return (
    <div id="control-panel-container" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 relative overflow-hidden">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between bg-white/5 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-inner">
        <div className="flex items-center gap-2.5 text-white font-bold text-sm uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Bio-Digital Parameter Matrix</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-mono tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <HardDrive className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Auto-Saved to LocalStorage</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Section 1: Biological Neuronal Parameters */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider border-b border-white/10 pb-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Biological Neuron Dynamics</span>
          </div>

          {/* Resting Potential */}
          <div className="flex flex-col gap-1 text-xs font-mono">
            <div className="flex justify-between text-slate-200">
              <span>Resting Potential (V_rest)</span>
              <span className="text-emerald-300 font-bold">{params.restingPotentialMv} mV</span>
            </div>
            <input
              id="slider-vrest"
              type="range"
              min={-90}
              max={-50}
              step={1}
              value={params.restingPotentialMv}
              onChange={(e) => updateField('restingPotentialMv', Number(e.target.value))}
              className="accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Threshold */}
          <div className="flex flex-col gap-1 text-xs font-mono">
            <div className="flex justify-between text-slate-200">
              <span>Spike Threshold (V_th)</span>
              <span className="text-emerald-300 font-bold">{params.thresholdMv} mV</span>
            </div>
            <input
              id="slider-vth"
              type="range"
              min={-65}
              max={-35}
              step={1}
              value={params.thresholdMv}
              onChange={(e) => updateField('thresholdMv', Number(e.target.value))}
              className="accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Refractory Period */}
          <div className="flex flex-col gap-1 text-xs font-mono">
            <div className="flex justify-between text-slate-200">
              <span>Refractory Period</span>
              <span className="text-emerald-300 font-bold">{params.refractoryPeriodMs} ms</span>
            </div>
            <input
              id="slider-refractory"
              type="range"
              min={1}
              max={15}
              step={0.5}
              value={params.refractoryPeriodMs}
              onChange={(e) => updateField('refractoryPeriodMs', Number(e.target.value))}
              className="accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Section 2: Digital Binary Parameters */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider border-b border-white/10 pb-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Digital Clock & Encoding</span>
          </div>

          {/* Clock Frequency */}
          <div className="flex flex-col gap-1 text-xs font-mono">
            <div className="flex justify-between text-slate-200">
              <span>Clock Frequency</span>
              <span className="text-indigo-300 font-bold">{params.clockFreqHz} Hz</span>
            </div>
            <input
              id="slider-clock-freq"
              type="range"
              min={5}
              max={100}
              step={5}
              value={params.clockFreqHz}
              onChange={(e) => updateField('clockFreqHz', Number(e.target.value))}
              className="accent-indigo-400 cursor-pointer"
            />
          </div>

          {/* Encoding Mode Selector */}
          <div className="flex flex-col gap-1.5 text-xs font-mono">
            <span className="text-slate-300 uppercase text-[10px] tracking-wider">Pulse Encoding Protocol</span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['PWM', 'NRZ', 'SPIKE_TRAIN', 'MANCHESTER'] as const).map((enc) => (
                <button
                  key={enc}
                  id={`encoding-btn-${enc}`}
                  onClick={() => updateField('pulseEncoding', enc)}
                  className={`py-1.5 px-2.5 rounded-full text-[10px] font-bold border transition ${
                    params.pulseEncoding === enc
                      ? 'bg-indigo-500/30 text-indigo-200 border-indigo-400/50 shadow-md shadow-indigo-500/20'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {enc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Cantor Coupling & Noise Matrix */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-3.5">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider border-b border-white/10 pb-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Cantor Unified Coupling</span>
          </div>

          {/* Coupling Strength */}
          <div className="flex flex-col gap-1 text-xs font-mono">
            <div className="flex justify-between text-slate-200">
              <span>Bio-Digital Coupling (α)</span>
              <span className="text-cyan-300 font-bold">{(params.couplingStrength * 100).toFixed(0)}%</span>
            </div>
            <input
              id="slider-coupling"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={params.couplingStrength}
              onChange={(e) => updateField('couplingStrength', Number(e.target.value))}
              className="accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Synaptic Noise */}
          <div className="flex flex-col gap-1 text-xs font-mono">
            <div className="flex justify-between text-slate-200">
              <span>Synaptic / Gate Noise (σ)</span>
              <span className="text-cyan-300 font-bold">{(params.synapticNoise * 100).toFixed(0)}%</span>
            </div>
            <input
              id="slider-noise"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={params.synapticNoise}
              onChange={(e) => updateField('synapticNoise', Number(e.target.value))}
              className="accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Cantor Recursion Depth (n) */}
          <div className="flex flex-col gap-1 text-xs font-mono border-t border-white/10 pt-2.5">
            <div className="flex justify-between text-slate-200">
              <span>Cantor Depth (n)</span>
              <span className="text-indigo-300 font-bold">n = {params.cantorDepth} ({Math.pow(2, params.cantorDepth)} pulses)</span>
            </div>
            <input
              id="slider-control-cantor-depth"
              type="range"
              min={0}
              max={8}
              step={1}
              value={params.cantorDepth}
              onChange={(e) => updateField('cantorDepth', Number(e.target.value))}
              className="accent-indigo-400 cursor-pointer"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
