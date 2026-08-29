import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Activity, Zap, Eye, RotateCcw } from 'lucide-react';
import { SimulationParams, PulseDataPoint } from '../types';
import { createBioDigitalSimulator } from '../utils/neuro';
import { audioSynth } from '../utils/audio';

interface PulseOscilloscopeProps {
  params: SimulationParams;
  onSpikeOccurred?: (point: PulseDataPoint) => void;
}

export const PulseOscilloscope: React.FC<PulseOscilloscopeProps> = ({
  params,
  onSpikeOccurred,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showNeuro, setShowNeuro] = useState<boolean>(true);
  const [showBin, setShowBin] = useState<boolean>(true);
  const [showUnified, setShowUnified] = useState<boolean>(true);
  const [historyLength, setHistoryLength] = useState<number>(300); // number of data points to display

  const dataBufferRef = useRef<PulseDataPoint[]>([]);
  const timeCounterRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Clear or reset buffer when simulation params change heavily
  const handleResetBuffer = () => {
    dataBufferRef.current = [];
    timeCounterRef.current = 0;
  };

  useEffect(() => {
    const simulator = createBioDigitalSimulator(params);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTimestamp = performance.now();

    const renderLoop = (now: number) => {
      const elapsed = now - lastTimestamp;
      lastTimestamp = now;

      if (isPlaying) {
        // Step time forward
        const stepMs = Math.min(elapsed, 30); // limit max step delta
        timeCounterRef.current += stepMs;

        const point = simulator(timeCounterRef.current);
        dataBufferRef.current.push(point);

        if (point.isSpike) {
          audioSynth.playSpikeClick(800);
          if (onSpikeOccurred) onSpikeOccurred(point);
        } else if (point.binSignal === 1 && Math.random() < 0.05) {
          audioSynth.playClockPulse(true, 440);
        }

        if (dataBufferRef.current.length > historyLength) {
          dataBufferRef.current.shift();
        }
      }

      // Draw Oscilloscope Canvas
      const width = canvas.width;
      const height = canvas.height;

      // Dark CRT Grid Background
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;

      const numRows = 8;
      const numCols = 12;
      for (let r = 0; r <= numRows; r++) {
        const y = (r / numRows) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let c = 0; c <= numCols; c++) {
        const x = (c / numCols) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Channel Baseline dividers
      const hSection = height / 3;

      // Section 1: NEURO Channel (Biological Membrane Potential)
      if (showNeuro) {
        ctx.fillStyle = '#064e3b';
        ctx.font = '10px monospace';
        ctx.fillText('CHANNEL 1: NEURO (Biological Action Potential - mV)', 12, 18);

        // Threshold dashed line
        const thresholdY = hSection * 0.7 - ((params.thresholdMv - params.restingPotentialMv) / 100) * (hSection * 0.6);
        ctx.strokeStyle = '#ef4444';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, thresholdY);
        ctx.lineTo(width, thresholdY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#f87171';
        ctx.fillText(`Spike Threshold: ${params.thresholdMv} mV`, width - 140, thresholdY - 4);

        // Waveform
        ctx.strokeStyle = '#10b981'; // Emerald
        ctx.lineWidth = 2;
        ctx.beginPath();

        const pts = dataBufferRef.current;
        for (let i = 0; i < pts.length; i++) {
          const x = (i / (historyLength - 1)) * width;
          const v = pts[i].neuroVoltageMv;
          // map v from [-80, +40] to [hSection*0.9, hSection*0.1]
          const normV = (v - params.restingPotentialMv) / 100; // normalized range
          const y = hSection * 0.7 - normV * (hSection * 0.6);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Section 2: BIN Channel (Digital Binary Clock Voltage)
      if (showBin) {
        const offsetY = hSection;
        ctx.fillStyle = '#0c4a6e';
        ctx.font = '10px monospace';
        ctx.fillText('CHANNEL 2: BIN (Digital Binary Voltage - 0 / 1)', 12, offsetY + 18);

        ctx.strokeStyle = '#38bdf8'; // Sky cyan
        ctx.lineWidth = 2;
        ctx.beginPath();

        const pts = dataBufferRef.current;
        for (let i = 0; i < pts.length; i++) {
          const x = (i / (historyLength - 1)) * width;
          const bin = pts[i].binSignal;
          const y = offsetY + hSection * 0.7 - bin * (hSection * 0.45);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Section 3: NeuroBIN Unified Channel (Synthesized Cantor Pulse Wave)
      if (showUnified) {
        const offsetY = hSection * 2;
        ctx.fillStyle = '#581c87';
        ctx.font = '10px monospace';
        ctx.fillText('CHANNEL 3: NeuroBIN UNIFIED (Cantor Recursion Continuum Wave)', 12, offsetY + 18);

        ctx.strokeStyle = '#c084fc'; // Purple / Violet
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        const pts = dataBufferRef.current;
        for (let i = 0; i < pts.length; i++) {
          const x = (i / (historyLength - 1)) * width;
          const uV = pts[i].unifiedNeuroBin;
          const normUV = (uV - params.restingPotentialMv) / 100;
          const y = offsetY + hSection * 0.7 - normUV * (hSection * 0.6);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, params, historyLength, showNeuro, showBin, showUnified, onSpikeOccurred]);

  return (
    <div id="oscilloscope-container" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 relative overflow-hidden">
      
      {/* Oscilloscope Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-inner">
        <div className="flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-indigo-400 animate-pulse" />
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Real-Time Bio-Digital Oscilloscope
            </h2>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">60 FPS Signal Analyzer</span>
          </div>
        </div>

        {/* Channel Toggles & Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <button
            id="toggle-neuro-btn"
            onClick={() => setShowNeuro(!showNeuro)}
            className={`px-3 py-1 rounded-full border font-mono text-[11px] font-semibold transition backdrop-blur-md ${
              showNeuro
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                : 'bg-white/5 text-slate-500 border-white/10 line-through'
            }`}
          >
            Ch1: Neuro
          </button>
          <button
            id="toggle-bin-btn"
            onClick={() => setShowBin(!showBin)}
            className={`px-3 py-1 rounded-full border font-mono text-[11px] font-semibold transition backdrop-blur-md ${
              showBin
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm shadow-indigo-500/20'
                : 'bg-white/5 text-slate-500 border-white/10 line-through'
            }`}
          >
            Ch2: BIN
          </button>
          <button
            id="toggle-unified-btn"
            onClick={() => setShowUnified(!showUnified)}
            className={`px-3 py-1 rounded-full border font-mono text-[11px] font-semibold transition backdrop-blur-md ${
              showUnified
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm shadow-purple-500/20'
                : 'bg-white/5 text-slate-500 border-white/10 line-through'
            }`}
          >
            Ch3: Unified
          </button>

          <span className="text-white/20">|</span>

          {/* Play/Pause */}
          <button
            id="play-pause-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold transition shadow-lg shadow-indigo-500/20 border border-white/20"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Run'}</span>
          </button>

          <button
            id="reset-scope-btn"
            onClick={handleResetBuffer}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition"
            title="Reset Scope Buffer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Screen */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/80 backdrop-blur-md shadow-inner">
        <canvas
          id="oscilloscope-canvas"
          ref={canvasRef}
          width={800}
          height={380}
          className="w-full h-auto block"
        />
        
        {/* Overlay Timebase control */}
        <div className="absolute bottom-3 right-3 bg-white/10 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-2 text-xs font-mono text-slate-200 shadow-xl">
          <span className="text-[10px] uppercase tracking-wider text-slate-400">Timebase:</span>
          <input
            id="timebase-slider"
            type="range"
            min={100}
            max={600}
            step={50}
            value={historyLength}
            onChange={(e) => setHistoryLength(Number(e.target.value))}
            className="w-20 accent-indigo-400 cursor-pointer"
          />
          <span className="text-indigo-300 font-bold">{historyLength} pts</span>
        </div>
      </div>

    </div>
  );
};
