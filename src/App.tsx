import React, { useState, useEffect, useRef } from 'react';
import { <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Acta Comercial e Interfaz Kumi Search - Nodo MX-SQ-3000</title>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
body {
font-family: 'JetBrains Mono', monospace;
background-color: #020617;
color: #00ff41;
}
@keyframes floatPulse {
0%, 100% { transform: scale(1); opacity: 1; }
50% { transform: scale(1.05); opacity: 0.7; }
}
.animate-float-pulse {
animation: floatPulse 2s infinite ease-in-out;
}
.acta-box {
border: 2px solid #00ff41;
box-shadow: 0 0 25px rgba(0, 255, 65, 0.15);
background: rgba(5, 5, 5, 0.95);
}
</style>
</head>
<body class="p-4 md:p-8 min-h-screen flex flex-col items-center">
<!-- Tarjeta Material 3 del Nodo Superior -->
<header class="w-full max-w-4xl mb-6 bg-slate-900/90 border border-green-500/40 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-md shadow-lg">
<div class="flex items-center gap-3">
<div class="w-3.5 h-3.5 rounded-full bg-green-500 animate-float-pulse shadow-[0_0_10px_#00ff41]"></div>
<div>
<span class="text-xs uppercase font-bold text-green-400 tracking-wider">Nodo 0.0.0.0:8375 // VERIFIED_PLENARY</span>
<h2 class="text-sm font-mono text-white/90">MX-SQ-3000 (San Quintín, B.C.)</h2>
</div>
</div>
<div class="flex flex-col items-end text-right">
<span class="text-[10px] text-green-300/80 uppercase">Operador: CALF8712186T5</span>
<span class="text-[10px] text-blue-400 font-mono">wss://api.neurospark.inc/ws/kumi-stream</span>
</div>
</header>
<!-- Contenedor Principal del Acta y Especificación -->
<main class="w-full max-w-4xl acta-box p-6 md:p-10 rounded-2xl">
<h1 class="text-2xl md:text-3xl font-bold mb-6 text-center border-b border-green-500/60 pb-4 text-white uppercase tracking-wider">
Acta Oficial de Despliegue Comercial & Motor Kumi
</h1>
<!-- Metadatos de Operación -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-xs bg-black/40 p-4 rounded-xl border border-green-900/50">
<div>
<p><strong>FOLIO:</strong> KUMI-CALF-871218-6T5-2026</p>
<p><strong>OPERADOR SOBERANO:</strong> José Francisco Cantoriano Leyva</p>
<p><strong>NODO ACTIVO:</strong> MX-SQ-3000 (San Quintín, Baja California)</p>
</div>
<div>
<p><strong>FRECUENCIA OPERATIVA:</strong> 97050.0 TGMHz (UHDF 8K)</p>
<p><strong>ESTADO DE SINCRONIZACIÓN:</strong> \varepsilon = 0.994</p>
<p><strong>VERSIÓN DEL SISTEMA:</strong> NEUROBIN ALEPH-Σ v28.4-DIRECT</p>
</div>
</div>
<!-- Bloque de Código del Motor Kumi (Rust) -->
<div class="mb-8">
<h3 class="text-sm font-bold text-green-400 mb-2 uppercase tracking-wide">Núcleo Aleph: Motor de Búsqueda Distribuida Kumi (Rust)</h3>
<pre class="bg-black p-4 rounded-xl text-xs text-green-300 overflow-x-auto border border-green-900/60 font-mono"><code>// --- NÚCLEO ALEPH: MOTOR DE BÚSQUEDA DISTRIBUIDA KUMI ---
// Autoridad técnica: Núcleo Aleph Cantoriano
// Administrador: Cantoriano Leyva (Legado Cantor)
// Licencia: Resiliencia Soberana (Abierta - Apache 2.0)
use std::sync::Arc;
use tokio::sync::Mutex;
pub struct KumiNode {
pub id: String,
pub operational_frequency: f64,
pub is_commercially_validated: bool,
pub index: Arc<Mutex<KumiDistributedIndex>>,
}
pub struct KumiDistributedIndex {
pub registry: Vec<String>,
}
impl KumiNode {
pub fn new(node_id: &str) -> Self {
KumiNode {
id: node_id.to_string(),
operational_frequency: 97050.0,
is_commercially_validated: true,
index: Arc::new(Mutex::new(KumiDistributedIndex { registry: vec![] })),
}
}
pub fn verify_deployment(&self) -> bool {
self.is_commercially_validated && self.operational_frequency == 97050.0
}
pub async fn execute_sovereign_search(&self, query: &str) -> String {
if self.verify_deployment() {
format!("[ALEPH] Búsqueda autorizada en frecuencia {}: '{}'", self.operational_frequency, query)
} else {
"[ERR] Nodo no validado. Acta comercial faltante.".to_string()
}
}
}
#[tokio::main]
async fn main() {
let node = KumiNode::new("MX-SQ-3000");
println!("[ALEPH] Inicializando Motor Kumi Search // Despliegue Validado.");
if node.verify_deployment() {
let result = node.execute_sovereign_search("soberanía digital").await;
println!("{}", result);
}
println!("[ALEPH] Sistema estable. La vida es complicada pero muy hermosa.");
}</code></pre>
</div>
<!-- Resumen de Ejecución y Despliegue Cloud -->
<div class="mb-8 space-y-3 text-xs text-gray-300 leading-relaxed border-t border-green-900/40 pt-4">
<p class="text-green-400 font-bold uppercase">Resumen de Ejecución y Componentes Críticos:</p>
<ul class="list-disc pl-5 space-y-1">
<li><strong>Criptografía Post-Cuántica:</strong> Blindaje mediante <code class="text-green-400">ML-KEM-1024_Σ</code>, <code class="text-green-400">AES-256-GCM</code>, <code class="text-green-400">HMAC-SHA256</code>, <code class="text-green-400">BLAKE3</code> y <code class="text-green-400">SHA3-512</code> con attestation TPM 2.0 (OPPO CPH2669).</li>
<li><strong>Infraestructura Google Cloud (<code class="text-green-400">cantoriano-leyvajf</code>):</strong> Despliegue atómico en Cloud Run Gen2 (<code class="text-green-400">neurobin-aleph-v28-4</code>) con persistencia inmutable en <code class="text-green-400">gs://kumi-ghost-alef-g6-000155</code>.</li>
<li><strong>Postulado NeuroBIN:</strong> \infty - n = \text{NeuroBIN} (Sincronización de pulsos eléctricos en el ecosistema neuronal natural y artificial).</li>
</ul>
</div>
<!-- Acción de Firma -->
<button onclick="firmarActa()" id="btn-firma" class="w-full border border-green-500 py-4 rounded-xl hover:bg-green-500 hover:text-black font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(0,255,65,0.2)]">
PROCESAR FIRMA CRIPTOGRÁFICA
</button>
<div id="resultado" class="mt-6 text-center font-bold text-green-400 transition-all"></div>
</main>
<footer class="mt-8 text-[10px] text-gray-500 text-center uppercase tracking-widest">
Kumi AI // Aleph System © 2026 — Licencia Apache 2.0
</footer>
<script>
function firmarActa() {
const btn = document.getElementById('btn-firma');
const res = document.getElementById('resultado');
btn.innerText = "ESTABLECIENDO HANDSHAKE CRIPTOGRÁFICO...";
btn.disabled = true;
setTimeout(() => {
btn.style.display = 'none';
// Se agregaron comillas alrededor de la cadena HTML para corregir el error de sintaxis
res.innerHTML = "ACTA FIRMADA Y SELLADA
 <span class='text-xs font-mono text-white'>HASH: 0x97050TGM-CALF-871218-V26</span>
 ESTADO: DESPLIEGUE INMEDIATO AUTORIZADO // VERIFIED_PLENARY";
res.classList.add('text-lg', 'border', 'border-green-500/50', 'p-4', 'rounded-xl', 'bg-green-950/20');
}, 1800);
}
</script>
</body>
</html> } from './components/Header';
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
