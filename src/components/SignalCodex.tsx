import React, { useState } from 'react';
import { Binary, Play, Volume2, Sparkles, Code2 } from 'lucide-react';
import { encodeTextToNeuroBin } from '../utils/cantor';
import { audioSynth } from '../utils/audio';

export const SignalCodex: React.FC = () => {
  const [inputText, setInputText] = useState<string>('NeuroBIN');
  const [isPlayingSequence, setIsPlayingSequence] = useState<boolean>(false);

  const encoded = encodeTextToNeuroBin(inputText || 'N');

  const handlePlaySequence = async () => {
    if (isPlayingSequence) return;
    setIsPlayingSequence(true);

    const bits = encoded.binaryStr.split('');
    for (let i = 0; i < bits.length; i++) {
      const bit = bits[i];
      if (bit === '1') {
        audioSynth.playSpikeClick(750 + (i % 8) * 40);
      } else {
        audioSynth.playClockPulse(false, 320);
      }
      await new Promise((r) => setTimeout(r, 120)); // Delay between bits
    }

    setIsPlayingSequence(false);
  };

  return (
    <div id="signal-codex-container" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 relative overflow-hidden">
      
      {/* Codex Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-inner">
        <div className="flex items-center gap-2.5">
          <Binary className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Text-to-NeuroBIN Signal Codex
            </h2>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Translating Human Language to Biological Spike Trains & Cantor Intervals
            </p>
          </div>
        </div>

        {/* Play Sequence Button */}
        <button
          id="play-sequence-btn"
          onClick={handlePlaySequence}
          disabled={isPlayingSequence}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20 border border-white/20"
        >
          {isPlayingSequence ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlayingSequence ? 'Synthesizing...' : 'Play Pulse Train'}</span>
        </button>
      </div>

      {/* Input Field & Conversion Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Input Text Box */}
        <div className="flex flex-col gap-2 justify-center">
          <label htmlFor="codex-text-input" className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
            Input Message / Character Sequence
          </label>
          <input
            id="codex-text-input"
            type="text"
            maxLength={20}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type word (e.g. NeuroBIN)..."
            className="w-full bg-white/5 backdrop-blur-md border border-white/15 rounded-full px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/50 shadow-inner"
          />
          <div className="flex flex-wrap gap-1.5 mt-1">
            {['NeuroBIN', 'Cantor', 'Pulse', '10110', '∞ - n'].map((preset) => (
              <button
                key={preset}
                onClick={() => setInputText(preset)}
                className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Binary Stream Output */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-2.5 md:col-span-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-indigo-400" />
              ASCII Binary Stream ({encoded.binaryStr.length} bits)
            </span>
            <span className="text-emerald-300 font-bold">{inputText.length} Chars</span>
          </div>

          <div className="font-mono text-xs text-indigo-300 bg-[#020617]/70 backdrop-blur-md p-3 rounded-xl border border-white/10 break-all leading-relaxed max-h-24 overflow-y-auto">
            {encoded.binaryStr.split('').map((bit, idx) => (
              <span
                key={idx}
                className={`inline-block px-1.5 py-0.5 m-0.5 rounded-md ${
                  bit === '1'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30'
                    : 'bg-white/5 text-slate-500'
                }`}
              >
                {bit}
              </span>
            ))}
          </div>

          {/* Firing Frequency Mapping */}
          <div className="text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
            <span>Peak Spike Freq: <strong className="text-emerald-300">65 Hz</strong></span>
            <span>Silent Interval Freq: <strong className="text-slate-400">18 Hz</strong></span>
            <span>Cantor Depth Map: <strong className="text-indigo-300">C_4(8-bit)</strong></span>
          </div>
        </div>

      </div>

    </div>
  );
};
