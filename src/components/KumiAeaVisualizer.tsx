import React, { useState, useEffect } from 'react';
import { Database, Cpu, Activity, Hexagon, ShieldAlert, CheckCircle2, Server, Workflow } from 'lucide-react';
import { motion } from 'motion/react';

interface AssetData {
  id: string;
  status: string;
  resilience: number;
  symmetryIndex: number;
  syncSource: string;
}

export const KumiAeaVisualizer: React.FC = () => {
  const [assetData, setAssetData] = useState<AssetData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from BigQuery / Gemini backend
    const fetchAsset = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/kumi/asset-mapping');
        const data = await response.json();
        setAssetData(data);
      } catch (e) {
        console.error('Failed to fetch asset mapping', e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAsset();
    const interval = setInterval(fetchAsset, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#020617]/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-6 shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)] flex flex-col gap-6 h-full relative overflow-hidden">
      
      {/* Background visual effects for AEA Symmetry */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-[1px] border-indigo-400 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[1px] border-cyan-400 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-[1px] border-emerald-400 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <Hexagon className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Arquitectura AEA KUMI</h2>
            <p className="text-[10px] text-cyan-300 font-mono uppercase tracking-widest flex items-center gap-1">
              <Database className="w-3 h-3" /> BigQuery + Gemini Sync
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono text-emerald-300 font-bold uppercase">Online</span>
        </div>
      </div>

      {/* Core Metrics */}
      <div className="relative z-10 grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
          <Workflow className="w-6 h-6 text-cyan-400 mb-1" />
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Simetría Algorítmica</span>
          <span className="text-2xl font-bold text-white font-mono">
            {loading ? '--' : `${(assetData?.symmetryIndex ?? 0.9998) * 100}%`}
          </span>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center gap-2">
          <ShieldAlert className="w-6 h-6 text-indigo-400 mb-1" />
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Resiliencia Transfinita</span>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-mono">
            {loading ? '--' : `∞-${assetData?.resilience ?? 'Aleph'}`}
          </span>
        </div>
      </div>

      {/* Critical Asset Mapping ID Box */}
      <div className="relative z-10 mt-auto bg-slate-900/80 p-4 rounded-xl border border-indigo-500/30">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          Mapeo de Activos Críticos
        </h3>
        
        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-xs text-slate-500 font-mono">ID Activo</span>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {assetData?.id || 'ALEPH-SIGMA-EVAL-VOMINI-8K'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-xs text-slate-500 font-mono">Motor de Inferencia</span>
              <span className="text-xs font-mono text-cyan-300 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Gemini Multi-Modal
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">Almacén de Datos</span>
              <span className="text-xs font-mono text-indigo-300 flex items-center gap-1">
                <Database className="w-3 h-3" /> Google BigQuery
              </span>
            </div>
          </div>
        )}
        
        {/* Interaction hint */}
        <div className="mt-4 flex items-start gap-2 bg-indigo-500/10 p-2.5 rounded-lg border border-indigo-500/20">
          <Activity className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-300 leading-relaxed">
            La topología fractal expuesta en el panel central refleja la estabilización del nodo <strong>{assetData?.id || 'ALEPH-SIGMA-EVAL-VOMINI-8K'}</strong>, garantizando redundancia transfinita.
          </p>
        </div>
      </div>
    </div>
  );
};
