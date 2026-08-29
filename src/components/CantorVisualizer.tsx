import React, { useState } from 'react';
import { Layers, Network, Info, Sparkles, Binary, Gauge, HelpCircle, FlipHorizontal, Split } from 'lucide-react';
import { generateCantorIntervals, CANTOR_FRACTAL_DIMENSION, FractalPatternType } from '../utils/cantor';
import { audioSynth } from '../utils/audio';
import { SelfSimilarityWidget } from './SelfSimilarityWidget';
import { CantorTimelineSlider } from './CantorTimelineSlider';

interface CantorVisualizerProps {
  depth: number;
  onDepthChange: (newDepth: number) => void;
}

// Depth-dependent dynamic gradient color map for recursive levels (Order 0 to n)
const DEPTH_GRADIENTS = [
  { name: 'n=0 (Base)', gradient: 'bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500', dotClass: 'bg-indigo-400', textClass: 'text-indigo-300' },
  { name: 'n=1 (1st Iter)', gradient: 'bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400', dotClass: 'bg-cyan-400', textClass: 'text-cyan-300' },
  { name: 'n=2 (2nd Iter)', gradient: 'bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400', dotClass: 'bg-emerald-400', textClass: 'text-emerald-300' },
  { name: 'n=3 (3rd Iter)', gradient: 'bg-gradient-to-r from-emerald-400 via-lime-400 to-yellow-400', dotClass: 'bg-lime-400', textClass: 'text-lime-300' },
  { name: 'n=4 (4th Iter)', gradient: 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400', dotClass: 'bg-amber-400', textClass: 'text-amber-300' },
  { name: 'n=5 (5th Iter)', gradient: 'bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500', dotClass: 'bg-rose-400', textClass: 'text-rose-300' },
  { name: 'n=6 (6th Iter)', gradient: 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500', dotClass: 'bg-fuchsia-400', textClass: 'text-fuchsia-300' },
  { name: 'n=7 (7th Iter)', gradient: 'bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-300', dotClass: 'bg-purple-400', textClass: 'text-purple-300' },
  { name: 'n=8 (8th Iter)', gradient: 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600', dotClass: 'bg-cyan-300', textClass: 'text-cyan-200' },
];

const getDepthGradientConfig = (d: number) => {
  return DEPTH_GRADIENTS[Math.min(d, DEPTH_GRADIENTS.length - 1)];
};

export const CantorVisualizer: React.FC<CantorVisualizerProps> = ({
  depth,
  onDepthChange,
}) => {
  const [pattern, setPattern] = useState<FractalPatternType>('standard');
  const [selectedBinaryCode, setSelectedBinaryCode] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  // Generate levels 0 through depth (max 8)
  const levels = Array.from({ length: Math.min(depth + 1, 9) }, (_, d) => {
    const numIntervals = Math.pow(2, d);
    const scaleFactor = Math.pow(3, d);
    const segmentLength = 1 / scaleFactor;
    const remainingMassPct = Math.pow(2 / 3, d) * 100;
    const dimValue = d === 0 ? 1.0 : Math.log(numIntervals) / Math.log(scaleFactor);

    return {
      depth: d,
      numIntervals,
      scaleFactor,
      segmentLength,
      remainingMassPct,
      dimValue,
      intervals: generateCantorIntervals(d, pattern),
    };
  });

  const currentLevel = levels[Math.min(depth, levels.length - 1)];
  const totalIntervals = currentLevel.numIntervals;

  const handleIntervalClick = (code: string) => {
    setSelectedBinaryCode(code);
    // Play audio feedback proportional to binary code pitch
    const val = parseInt(code || '0', 2);
    const freq = 300 + (val % 16) * 50;
    audioSynth.playSpikeClick(freq);
  };

  const formatDim = (d: number) => (d === 0 ? '1.000000' : CANTOR_FRACTAL_DIMENSION.toFixed(6));

  return (
    <div id="cantor-visualizer-container" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 relative overflow-hidden">
      
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-inner">
        <div className="flex items-center gap-2.5">
          <Network className="w-5 h-5 text-indigo-400" />
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Cantor Set Fractal Recursion Map
            </h2>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              ∞ - n = NeuroBIN | {pattern === 'mirrored' ? 'Symmetric Center-Surround Mirror Geometry' : 'Standard Middle-Third Removal'}
            </p>
          </div>
        </div>

        {/* Pattern Switcher & Depth Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* UI Toggle: Standard vs Mirrored Pattern */}
          <div className="flex items-center bg-[#020617]/80 p-1 rounded-xl border border-white/15 text-xs font-mono shadow-inner">
            <button
              id="btn-pattern-standard"
              onClick={() => {
                setPattern('standard');
                audioSynth.playSpikeClick(380);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                pattern === 'standard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-white/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Split className="w-3.5 h-3.5 text-indigo-300" />
              <span>Standard</span>
            </button>
            <button
              id="btn-pattern-mirrored"
              onClick={() => {
                setPattern('mirrored');
                audioSynth.playSpikeClick(450);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all ${
                pattern === 'mirrored'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30 ring-1 ring-white/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FlipHorizontal className="w-3.5 h-3.5 text-slate-900" />
              <span>Mirrored Pattern</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <span className="text-slate-300 text-[11px]">Depth (n):</span>
            <input
              id="cantor-depth-slider"
              type="range"
              min={0}
              max={8}
              value={depth}
              onChange={(e) => onDepthChange(Number(e.target.value))}
              className="w-20 accent-indigo-400 cursor-pointer"
            />
            <span className="text-indigo-300 font-bold text-xs">n = {depth}</span>
          </div>

          {/* Dynamic Dimension Badge */}
          <div 
            className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-indigo-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-400/30 shadow-sm"
            title={`Fractal Dimension D(n=${depth}) = log(2^${depth})/log(3^${depth}) = ${formatDim(depth)}`}
          >
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-semibold">D = log(2^{depth})/log(3^{depth}) ≈ {depth === 0 ? '1.0' : CANTOR_FRACTAL_DIMENSION.toFixed(4)}</span>
          </div>

          {/* Pulses Badge */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-500/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>2^{depth} = {totalIntervals} Pulses</span>
          </div>
        </div>
      </div>

      {/* Cantor Fractal Tree Bars Graphic */}
      <div className="bg-[#020617]/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-3 max-h-[380px] overflow-y-auto">
        {levels.map((lvl) => {
          const isHovered = hoveredLevel === lvl.depth;
          const depthCfg = getDepthGradientConfig(lvl.depth);

          return (
            <div 
              key={lvl.depth} 
              className="flex flex-col gap-1 group"
              onMouseEnter={() => setHoveredLevel(lvl.depth)}
              onMouseLeave={() => setHoveredLevel(null)}
            >
              {/* Level Row Label with Dynamic Depth Color Dot & Dimension Formula */}
              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 px-1 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${depthCfg.dotClass} ${isHovered ? 'scale-125 shadow-md shadow-white/30' : ''} transition-all`} />
                  <span className={`font-bold ${isHovered ? 'text-white' : depthCfg.textClass}`}>
                    Level n = {lvl.depth}
                  </span>
                  <span className="text-[10px] text-indigo-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    D = log({lvl.numIntervals})/log({lvl.scaleFactor}) = {formatDim(lvl.depth)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px]">
                  <span className="text-emerald-300 font-semibold">{lvl.numIntervals} segments</span>
                  <span className="text-slate-400">Scale: (1/3)^{lvl.depth} = {lvl.segmentLength.toFixed(4)}</span>
                  <span className="text-cyan-300">Mass: {lvl.remainingMassPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* Segment Bars with Dynamic Depth Gradient */}
              <div className="relative w-full h-7 bg-white/5 rounded-xl border border-white/10 overflow-hidden shadow-inner">
                {lvl.intervals.map((inv, idx) => {
                  const leftPct = inv.start * 100;
                  const widthPct = (inv.end - inv.start) * 100;
                  const isSelected = selectedBinaryCode === inv.binaryCode;

                  const segmentTooltip = `Level n=${lvl.depth} | Interval [${inv.start.toFixed(4)}, ${inv.end.toFixed(4)}]\nScale: (1/3)^${lvl.depth} = ${lvl.segmentLength.toFixed(5)}\nBinary Code: ${inv.binaryCode}\nFractal Dim D = log(${lvl.numIntervals})/log(${lvl.scaleFactor}) = ${CANTOR_FRACTAL_DIMENSION.toFixed(6)}`;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleIntervalClick(inv.binaryCode)}
                      style={{
                        left: `${leftPct}%`,
                        width: `${Math.max(widthPct, 0.4)}%`,
                      }}
                      className={`absolute top-0 bottom-0 transition-all cursor-pointer group/bar hover:brightness-125 ${
                        isSelected
                          ? 'bg-amber-400 shadow-lg shadow-amber-400/50 z-10'
                          : depthCfg.gradient
                      }`}
                      title={segmentTooltip}
                    >
                      {widthPct > 6 && (
                        <span className="text-[9px] font-mono text-slate-950 font-bold truncate px-1 block">
                          {inv.binaryCode || '0'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scrubbable Timeline Controller Slider directly below the graphic */}
      <CantorTimelineSlider
        depth={depth}
        maxDepth={8}
        onDepthChange={onDepthChange}
      />

      {/* Selected Interval Codex & Dynamic Fractal Efficiency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        {/* Dynamic Fractal Dimension Card */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Fractal Dimension (D)</span>
            </div>
            <span className="text-[10px] text-cyan-300 font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
              Depth n = {depth}
            </span>
          </div>

          <div className="text-xl font-mono font-bold text-white flex items-baseline gap-2">
            <span>D = {depth === 0 ? '1.000000' : CANTOR_FRACTAL_DIMENSION.toFixed(6)}</span>
            <span className="text-xs text-slate-400 font-normal">
              (log 2 / log 3)
            </span>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            Per iteration $n$: <code className="text-indigo-300 font-bold">log(2^{depth}) / log(3^{depth})</code> = <code className="text-emerald-300 font-bold">{depth === 0 ? '1.0' : CANTOR_FRACTAL_DIMENSION.toFixed(5)}</code>. 
            Measures zero-measure space density of NeuroBIN pulse transitions.
          </p>

          <div className="mt-1 pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300">
            <div>
              Mass Remaining: <strong className="text-cyan-300">{currentLevel.remainingMassPct.toFixed(2)}%</strong>
            </div>
            <div>
              Removed: <strong className="text-amber-300">{(100 - currentLevel.remainingMassPct).toFixed(2)}%</strong>
            </div>
          </div>
        </div>

        {/* Selected Interval Inspector Card */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1 md:col-span-2 justify-center">
          <div className="flex items-center justify-between text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4 text-cyan-400" />
              <span>Interval Inspector & Binary Bit Map</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
              <HelpCircle className="w-3 h-3 text-indigo-400" />
              <span>Hover bars for iteration tooltips</span>
            </div>
          </div>

          {selectedBinaryCode ? (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-200 mt-2">
              <div>
                Binary Codex: <span className="text-amber-300 font-bold font-mono px-2.5 py-1 rounded-full bg-white/10 border border-amber-400/40">{selectedBinaryCode}</span>
              </div>
              <div className="text-slate-300">
                Pulse Firing: <span className="text-emerald-300 font-semibold">{30 + (parseInt(selectedBinaryCode, 2) % 10) * 8} Hz</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Dimension Ratio: <span className="text-indigo-300 font-bold">log(2^{selectedBinaryCode.length})/log(3^{selectedBinaryCode.length}) = {CANTOR_FRACTAL_DIMENSION.toFixed(5)}</span>
              </div>
              <button
                onClick={() => handleIntervalClick(selectedBinaryCode)}
                className="px-3.5 py-1 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-[11px] font-bold shadow-md shadow-indigo-500/20 transition"
              >
                Test Pulse Tone
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 flex items-center gap-2 py-2">
              <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>Click any Cantor fractal bar above to inspect its binary code and pitch, or hover to view per-iteration fractal dimension tooltips (<code className="text-indigo-300">log(2^n)/log(3^n)</code>).</span>
            </div>
          )}
        </div>
      </div>

      {/* Self-Similarity Ratio ($R_{ss}$) Plotter Widget */}
      <SelfSimilarityWidget depth={depth} />

    </div>
  );
};
