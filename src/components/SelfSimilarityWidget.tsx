import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Cpu, BarChart2, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CANTOR_FRACTAL_DIMENSION } from '../utils/cantor';

interface SelfSimilarityWidgetProps {
  depth: number;
}

export const SelfSimilarityWidget: React.FC<SelfSimilarityWidgetProps> = ({ depth }) => {
  const [viewMode, setViewMode] = useState<'iteration' | 'stream'>('iteration');
  const [streamData, setStreamData] = useState<number[]>([]);

  // Generate iteration plot data points (n = 0 to 7)
  const iterationData = Array.from({ length: 8 }, (_, d) => {
    const numIntervals = Math.pow(2, d);
    const scaleFactor = Math.pow(3, d);
    const ratio = d === 0 ? 1.0 : Math.log(numIntervals) / Math.log(scaleFactor);
    const massRemaining = Math.pow(2 / 3, d);
    return {
      depth: d,
      numIntervals,
      scaleFactor,
      ratio,
      massRemaining,
    };
  });

  // Dynamic real-time bio-digital signal self-similarity telemetry loop
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamData((prev) => {
        // Base ratio target is CANTOR_FRACTAL_DIMENSION ~ 0.630929
        const base = CANTOR_FRACTAL_DIMENSION;
        // Minor natural biological micro-fluctuations
        const noise = (Math.sin(Date.now() / 300) * 0.015) + (Math.cos(Date.now() / 450) * 0.01);
        const nextVal = Math.min(Math.max(base + noise, 0.55), 0.72);
        
        const updated = [...prev, nextVal];
        if (updated.length > 25) updated.shift();
        return updated;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [depth]);

  const currentLevelData = iterationData[Math.min(depth, 7)];
  const currentRatio = depth === 0 ? 1.0 : CANTOR_FRACTAL_DIMENSION;

  // SVG dimensions for chart
  const svgWidth = 320;
  const svgHeight = 110;
  const padding = 24;

  // Render Iteration Curve SVG path
  const renderIterationPath = () => {
    const plotW = svgWidth - padding * 2;
    const plotH = svgHeight - padding * 2;

    const points = iterationData.map((pt, i) => {
      const x = padding + (i / 7) * plotW;
      // y maps ratio 0.5 -> 1.0 down to top
      const yNorm = (pt.ratio - 0.5) / (1.05 - 0.5);
      const y = svgHeight - padding - yNorm * plotH;
      return { x, y, pt };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    // Reference line for theoretical D = 0.6309
    const refYNorm = (CANTOR_FRACTAL_DIMENSION - 0.5) / (1.05 - 0.5);
    const refY = svgHeight - padding - refYNorm * plotH;

    return (
      <>
        {/* Target D Reference Line */}
        <line
          x1={padding}
          y1={refY}
          x2={svgWidth - padding}
          y2={refY}
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="3 3"
          className="opacity-60"
        />
        <text
          x={svgWidth - padding + 4}
          y={refY + 3}
          fill="#38bdf8"
          fontSize="8"
          fontFamily="monospace"
          className="font-bold"
        >
          D=0.6309
        </text>

        {/* Data Line Path */}
        <path d={pathD} fill="none" stroke="url(#gradSelfSim)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data Points */}
        {points.map((p) => {
          const isActive = p.pt.depth === depth;
          return (
            <g key={p.pt.depth}>
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 5 : 3}
                fill={isActive ? '#38bdf8' : '#6366f1'}
                stroke={isActive ? '#ffffff' : '#1e1b4b'}
                strokeWidth={isActive ? 2 : 1}
                className="transition-all duration-300 cursor-pointer hover:scale-125"
              />
              <text
                x={p.x}
                y={p.y - 8}
                textAnchor="middle"
                fill={isActive ? '#38bdf8' : '#94a3b8'}
                fontSize="8"
                fontFamily="monospace"
                className={isActive ? 'font-bold' : ''}
              >
                n={p.pt.depth}
              </text>
            </g>
          );
        })}
      </>
    );
  };

  // Render Real-Time Stream SVG path
  const renderStreamPath = () => {
    if (streamData.length < 2) return null;

    const plotW = svgWidth - padding * 2;
    const plotH = svgHeight - padding * 2;

    const points = streamData.map((val, i) => {
      const x = padding + (i / (streamData.length - 1)) * plotW;
      const yNorm = (val - 0.5) / (0.8 - 0.5);
      const y = svgHeight - padding - yNorm * plotH;
      return { x, y, val };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    
    // Fill area below stream
    const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${padding} ${svgHeight - padding} Z`;

    return (
      <>
        <path d={areaD} fill="url(#gradAreaStream)" opacity="0.25" />
        <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="4"
            fill="#10b981"
            className="animate-ping"
          />
        )}
      </>
    );
  };

  return (
    <div id="self-similarity-widget" className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-3 relative overflow-hidden shadow-lg">
      
      {/* Widget Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
            Self-Similarity Ratio ($R_{'{ss}'}$) Widget
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-white/10 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
          <button
            onClick={() => setViewMode('iteration')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              viewMode === 'iteration'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Convergence Plot
          </button>
          <button
            onClick={() => setViewMode('stream')}
            className={`px-2 py-0.5 rounded-md transition-all ${
              viewMode === 'stream'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Stream
          </button>
        </div>
      </div>

      {/* Dynamic Ratio Gauge Header */}
      <div className="grid grid-cols-3 gap-2 bg-[#020617]/70 p-2.5 rounded-xl border border-white/10 text-center font-mono text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Ratio $R_{'{ss}'}$</span>
          <span className="text-sm font-bold text-cyan-300">
            {currentRatio.toFixed(6)}
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Fractal Mass $(2/3)^n$</span>
          <span className="text-sm font-bold text-emerald-300">
            {(currentLevelData.massRemaining * 100).toFixed(1)}%
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase">Scale Reduction</span>
          <span className="text-sm font-bold text-indigo-300">
            1/{currentLevelData.scaleFactor}
          </span>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative bg-[#020617]/90 rounded-xl border border-white/10 p-2 overflow-hidden flex flex-col items-center justify-center">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-28">
          <defs>
            <linearGradient id="gradSelfSim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="gradAreaStream" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid background lines */}
          <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
          <line x1={padding} y1={svgHeight / 2} x2={svgWidth - padding} y2={svgHeight / 2} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
          <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />

          {viewMode === 'iteration' ? renderIterationPath() : renderStreamPath()}
        </svg>

        {/* Legend / Info Label below chart */}
        <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 pt-1 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Formula: <code className="text-cyan-300 font-bold">R_ss = log(2^n) / log(3^n)</code></span>
          </div>
          <span className="text-indigo-300 font-semibold">
            {viewMode === 'iteration' ? `Level n = ${depth}` : 'Live Bio-Pulse Coherence'}
          </span>
        </div>
      </div>

    </div>
  );
};
