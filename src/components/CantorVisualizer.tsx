import React, { useState } from 'react';
import { Layers, Network, Info, Sparkles, Binary } from 'lucide-react';
import { generateCantorIntervals, CANTOR_FRACTAL_DIMENSION } from '../utils/cantor';
import { audioSynth } from '../utils/audio';

interface CantorVisualizerProps {
  depth: number;
  onDepthChange: (newDepth: number) => void;
}

export const CantorVisualizer: React.FC<CantorVisualizerProps> = ({
  depth,
  onDepthChange,
}) => {
  const [selectedBinaryCode, setSelectedBinaryCode] = useState<string | null>(null);

  // Generate levels 0 through depth
  const levels = Array.from({ length: Math.min(depth + 1, 8) }, (_, d) => ({
    depth: d,
    intervals: generateCantorIntervals(d),
  }));

  const currentLevelIntervals = generateCantorIntervals(depth);
  const totalIntervals = currentLevelIntervals.length;

  const handleIntervalClick = (code: string) => {
    setSelectedBinaryCode(code);
    // Play audio feedback proportional to binary code pitch
    const val = parseInt(code || '0', 2);
    const freq = 300 + (val % 16) * 50;
    audioSynth.playSpikeClick(freq);
  };

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
              ∞ - n = NeuroBIN | Removing middle thirds recursively
            </p>
          </div>
        </div>

        {/* Depth Slider & Metrics */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            <span className="text-slate-300 text-[11px]">Depth (n):</span>
            <input
              id="cantor-depth-slider"
              type="range"
              min={0}
              max={7}
              value={depth}
              onChange={(e) => onDepthChange(Number(e.target.value))}
              className="w-20 accent-indigo-400 cursor-pointer"
            />
            <span className="text-indigo-300 font-bold text-xs">n = {depth}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-500/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>2^{depth} = {totalIntervals} Pulses</span>
          </div>
        </div>
      </div>

      {/* Cantor Fractal Tree Bars */}
      <div className="bg-[#020617]/70 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-3 max-h-[380px] overflow-y-auto">
        {levels.map((lvl) => {
          return (
            <div key={lvl.depth} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1 uppercase tracking-wider">
                <span>Recursion Level n = {lvl.depth}</span>
                <span>{lvl.intervals.length} segments</span>
              </div>

              <div className="relative w-full h-7 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                {lvl.intervals.map((inv, idx) => {
                  const leftPct = inv.start * 100;
                  const widthPct = (inv.end - inv.start) * 100;
                  const isSelected = selectedBinaryCode === inv.binaryCode;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleIntervalClick(inv.binaryCode)}
                      style={{
                        left: `${leftPct}%`,
                        width: `${Math.max(widthPct, 0.4)}%`,
                      }}
                      className={`absolute top-0 bottom-0 transition-all cursor-pointer group hover:brightness-125 ${
                        isSelected
                          ? 'bg-amber-400 shadow-lg shadow-amber-400/50 z-10'
                          : lvl.depth % 2 === 0
                          ? 'bg-gradient-to-r from-indigo-500 to-emerald-400'
                          : 'bg-gradient-to-r from-cyan-400 to-indigo-500'
                      }`}
                      title={`Interval [${inv.start.toFixed(3)}, ${inv.end.toFixed(3)}] | Code: ${inv.binaryCode}`}
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

      {/* Selected Interval Codex & Math Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Fractal Dimension Card */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Fractal Dimension (D)</span>
          </div>
          <div className="text-xl font-mono font-bold text-white">
            D = {CANTOR_FRACTAL_DIMENSION.toFixed(6)}...
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Calculated as D = ln(2) / ln(3). Measures zero-measure space density of NeuroBIN pulse transitions.
          </p>
        </div>

        {/* Selected Interval Inspector Card */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-1 md:col-span-2 justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            <Binary className="w-4 h-4 text-cyan-400" />
            <span>Interval Inspector & Binary Bit Map</span>
          </div>
          {selectedBinaryCode ? (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-200 mt-1">
              <div>
                Binary Codex: <span className="text-amber-300 font-bold font-mono px-2.5 py-1 rounded-full bg-white/10 border border-amber-400/40">{selectedBinaryCode}</span>
              </div>
              <div className="text-slate-300">
                Pulse Firing: <span className="text-emerald-300 font-semibold">{30 + (parseInt(selectedBinaryCode, 2) % 10) * 8} Hz</span>
              </div>
              <button
                onClick={() => handleIntervalClick(selectedBinaryCode)}
                className="px-3.5 py-1 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-[11px] font-bold shadow-md shadow-indigo-500/20 transition"
              >
                Test Pulse Tone
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 flex items-center gap-2 py-1">
              <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>Click any Cantor fractal bar above to inspect its binary code and test its spike pulse tone.</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
