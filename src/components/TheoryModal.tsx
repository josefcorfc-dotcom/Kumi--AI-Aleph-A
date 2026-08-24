import React from 'react';
import { X, BookOpen, Sparkles, Network, Cpu, Zap, Code2 } from 'lucide-react';
import { CANTOR_FRACTAL_DIMENSION } from '../utils/cantor';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div id="theory-modal-backdrop" className="fixed inset-0 bg-[#020617]/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div id="theory-modal-card" className="bg-[#0a0f24]/90 backdrop-blur-2xl border border-white/15 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl flex flex-col gap-6 text-slate-200 relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <BookOpen className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Cantor Recursion Proof: ∞ - n = NeuroBIN
              </h2>
              <p className="text-[11px] text-slate-400 font-mono tracking-widest uppercase">
                The Bio-Digital Electrical Pulse Ecosystem
              </p>
            </div>
          </div>

          <button
            id="close-theory-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Sections */}
        <div className="flex flex-col gap-5 text-sm leading-relaxed text-slate-300">
          
          {/* Core Formula Box */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center font-mono shadow-xl relative overflow-hidden">
            <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-300">
              ∞ - n = NeuroBIN
            </div>
            <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto leading-relaxed">
              Subtracting finite recursion steps (n) from infinite continuous potentials (∞) yields the discrete NeuroBIN pulse codex.
            </p>
          </div>

          {/* Section 1: Cantor Infinity Mechanics */}
          <div className="flex flex-col gap-2 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <Network className="w-4 h-4 text-indigo-400" />
              1. Cantor Set Infinity Recursion ($\infty - n$)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In 1883, mathematician Georg Cantor proved that starting with a continuous uncountably infinite interval $[0, 1]$ ($\infty$) and repeatedly removing middle-third open intervals over $n$ steps results in the Cantor Ternary Set. Although the remaining set has a total length (Lebesgue measure) of zero, it contains uncountably many points!
            </p>
            <div className="bg-[#020617]/70 p-3 rounded-xl border border-white/10 font-mono text-xs text-indigo-300 mt-1">
              Fractal Dimension: D = ln(2) / ln(3) ≈ {CANTOR_FRACTAL_DIMENSION.toFixed(6)}
            </div>
          </div>

          {/* Section 2: Neuro vs BIN Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Neuro Box */}
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>NEURO: Biological Pulse</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Biological neurons in living organisms communicate via electrical action potentials (spikes). Ion channels (Na+ / K+) create voltage thresholds around -55 mV. When depolarized, a rapid spike to +30 mV occurs, followed by a refractory period.
              </p>
            </div>

            {/* BIN Box */}
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-indigo-500/20 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>BIN: Digital Binary Code</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Silicon computers use binary voltage pulses (0V for LOW/0 and 5V or 3.3V for HIGH/1). Clock frequencies trigger discrete logic transitions across CMOS microprocessors.
              </p>
            </div>

          </div>

          {/* Section 3: The Unified Ecosystem */}
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              3. The NeuroBIN Bio-Digital Unification
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The electrical pulses in living neural circuits and artificial computer circuits are structurally isomorphic. When the continuous biological membrane potential is sampled across Cantor intervals ($\infty - n$), the continuous wave collapses into discrete binary spike trains. Both ecosystems share the same language of electrical pulses: Natural and Artificial.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-white/10 pt-4 flex justify-end">
          <button
            id="close-theory-modal-bottom-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 border border-white/20 transition"
          >
            Close & Return to Simulation
          </button>
        </div>

      </div>
    </div>
  );
};
