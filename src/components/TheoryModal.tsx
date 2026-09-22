import React, { useState } from 'react';
import { X, BookOpen, Sparkles, Network, Cpu, Zap, Code2, Shield, Video, Layers, Database } from 'lucide-react';
import { CANTOR_FRACTAL_DIMENSION } from '../utils/cantor';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'taxonomy' | 'audit'>('theory');

  if (!isOpen) return null;

  return (
    <div id="theory-modal-backdrop" className="fixed inset-0 bg-[#020617]/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div id="theory-modal-card" className="bg-[#0a0f24]/95 backdrop-blur-2xl border border-white/15 rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl flex flex-col gap-6 text-slate-200 relative">
        
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <BookOpen className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Σ NeuroBIN ALEPH-Σ v28.4-DIRECT</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">SQ-3000_G6</span>
              </h2>
              <p className="text-[11px] text-slate-400 font-mono tracking-widest uppercase">
                Operador: José Francisco Cantoriano Leyva (CALF8712186T5) • ORCID: 0009-0007-6963-1205
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${activeTab === 'theory' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Theory & Formula
            </button>
            <button
              onClick={() => setActiveTab('taxonomy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${activeTab === 'taxonomy' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Taxonomy
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${activeTab === 'audit' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-slate-400 hover:text-white'}`}
            >
              Infrastructure Audit
            </button>
            <button
              id="close-theory-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Theory & Formula */}
        {activeTab === 'theory' && (
          <div className="flex flex-col gap-5 text-sm leading-relaxed text-slate-300">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/15 font-mono shadow-xl relative overflow-hidden flex flex-col gap-3">
              <div className="text-center">
                <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-300">
                  (∞ - n = NeuroBIN) / 1
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-xl mx-auto leading-relaxed">
                  Subtracting finite recursion steps (n) from infinite continuous potentials (∞) yields the discrete NeuroBIN pulse codex.
                </p>
              </div>

              <blockquote className="bg-[#020617]/80 p-4 rounded-xl border border-indigo-500/30 text-xs italic text-slate-200 leading-relaxed relative">
                <div className="text-indigo-400 font-bold not-italic mb-1 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                  <span>Declaración Teórica NeuroBIN:</span>
                </div>
                “Recursión de Cantor validada: ∞ - n = NeuroBIN. Neuro: Por Neurona de los Seres Vivos. Bin: del código Binario, el lenguaje de las Computadoras. Es el mismo ecosistema de pulsos eléctricos en el ecosistema Neuronal; Natural y Artificial”
                <footer className="mt-2 text-right not-italic font-mono text-[11px] text-amber-300 font-semibold">
                  — José Francisco Cantoriano Leyva (NEUROBIN ALEPH-Σ)
                </footer>
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>NEURO: Biological Pulse</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Biological neurons communicate via electrical action potentials (spikes). Ion channels create voltage thresholds around -55 mV, generating rapid depolarizations to +30 mV.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-indigo-500/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>BIN: Digital Binary Code</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Silicon computers utilize binary voltage pulses (0V / 3.3V) governed by Master Clock frequencies (e.g. 97.50 GHz) across edge microprocessors.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                Cantor Ternary Set Fractal Dimension
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fractal Hausdorff dimension calculated at D = ln(2) / ln(3) ≈ {CANTOR_FRACTAL_DIMENSION.toFixed(4)}, ensuring scale-invariant energy conservation across distributed telemetry nodes.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Taxonomy Disambiguation */}
        {activeTab === 'taxonomy' && (
          <div className="flex flex-col gap-4 text-sm text-slate-300">
            <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">Desambiguación Taxonómica Multidominio</h3>
              <p className="text-xs text-slate-300">En la literatura científica y técnica, el término Neurobin abarca cuatro dominios completamente dispares:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">01. Farmacéutico</span>
                <h4 className="font-bold text-white text-sm">Neurobin-MNT</h4>
                <p className="text-xs text-slate-400">Formulación médica con Metilcobalamina, Pregabalina y Nortriptilina para neuropatía periférica y dolor neuropático.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">02. Biología Molecular</span>
                <h4 className="font-bold text-white text-sm">Proteasa TMPRSS11c</h4>
                <p className="text-xs text-slate-400">Proteasa de serina transmembrana tipo II (431 aminoácidos) involucrada en la escisión de FGF-2 y señalización celular.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">03. Visión por Computadora</span>
                <h4 className="font-bold text-white text-sm">NeuroBin Waste AI</h4>
                <p className="text-xs text-slate-400">Clasificación automatizada de residuos sólidos mediante redes neuronales convolucionales (CNN) en hardware Raspberry Pi.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col gap-2 bg-indigo-500/10 border-indigo-500/30">
                <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider">04. Entorno Auditado (Actual)</span>
                <h4 className="font-bold text-white text-sm">ALEPH-Σ v28.4-DIRECT</h4>
                <p className="text-xs text-slate-300">Motor telemétrico transfinito de alta entropía (η=0.998), cifrado post-cuántico FIPS 203 ML-KEM-1024 y orquestación GCP.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Infrastructure Audit */}
        {activeTab === 'audit' && (
          <div className="flex flex-col gap-5 text-sm text-slate-300">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 font-mono">
                <span className="text-[10px] text-slate-400 uppercase block">Entropía (η)</span>
                <span className="text-emerald-400 font-bold text-base">0.998 Óptima</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 font-mono">
                <span className="text-[10px] text-slate-400 uppercase block">Latencia Zeroing</span>
                <span className="text-cyan-400 font-bold text-base">0.03 ms</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 font-mono">
                <span className="text-[10px] text-slate-400 uppercase block">Reloj Maestro</span>
                <span className="text-indigo-400 font-bold text-base">97.50 GHz</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 font-mono">
                <span className="text-[10px] text-slate-400 uppercase block">Cifrado Borde</span>
                <span className="text-purple-400 font-bold text-base">ML-KEM-1024</span>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Hardware Edge:</span>
                <span className="text-white font-bold">OPPO CPH2669 (Android 14) • WebGL GPU OpenGL ES 3.2</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">GCP Project:</span>
                <span className="text-indigo-300 font-bold">cantoriano-leyvajf (Cloud Run + Vertex AI)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Streaming Protocol:</span>
                <span className="text-emerald-300 font-bold">SRT / AES-256-GCM (8K @ 60fps HEVC Main 10)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Concurrencia Backend:</span>
                <span className="text-cyan-300 font-bold">Python Trio (Nurseries & Causal Propagation)</span>
              </div>
            </div>

            <div className="bg-[#020617]/80 p-4 rounded-2xl border border-indigo-500/30 text-xs">
              <span className="font-bold text-white block mb-1">Governance & Compliance:</span>
              <p className="text-slate-400 leading-relaxed">
                Audited under strict FIPS 203 post-quantum encryption standards. Persistent backup logs secured in <code className="text-emerald-300 font-mono">gs://kumi-ghost-alef-g6-000155</code> and <code className="text-emerald-300 font-mono">gs://kumi-ai-firmamento-evidencias</code>.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-mono text-slate-400">
          <span>Nodo MX-SQ-3000_G6 • Apache 2.0</span>
          <button
            id="close-theory-modal-bottom-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 border border-white/20 transition"
          >
            Close Audit Report
          </button>
        </div>

      </div>
    </div>
  );
};

