import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Zap, Gauge, Layers, Clock } from 'lucide-react';
import { CANTOR_FRACTAL_DIMENSION } from '../utils/cantor';
import { audioSynth } from '../utils/audio';

interface CantorTimelineSliderProps {
  depth: number;
  maxDepth?: number;
  onDepthChange: (newDepth: number) => void;
}

export const CantorTimelineSlider: React.FC<CantorTimelineSliderProps> = ({
  depth,
  maxDepth = 8,
  onDepthChange,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isLooping, setIsLooping] = useState<boolean>(true);

  const depthRef = useRef(depth);
  useEffect(() => {
    depthRef.current = depth;
  }, [depth]);

  const isLoopingRef = useRef(isLooping);
  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const baseInterval = 750;
    const intervalMs = Math.max(150, baseInterval / playbackSpeed);

    const timer = setInterval(() => {
      const current = depthRef.current;
      if (current >= maxDepth) {
        if (isLoopingRef.current) {
          onDepthChange(0);
          audioSynth.playSpikeClick(300);
        } else {
          setIsPlaying(false);
        }
      } else {
        const next = current + 1;
        onDepthChange(next);
        audioSynth.playSpikeClick(320 + next * 45);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, maxDepth, onDepthChange]);

  const handleStepPrev = () => {
    setIsPlaying(false);
    const prev = depth > 0 ? depth - 1 : maxDepth;
    onDepthChange(prev);
    audioSynth.playSpikeClick(280 + prev * 30);
  };

  const handleStepNext = () => {
    setIsPlaying(false);
    const next = depth < maxDepth ? depth + 1 : 0;
    onDepthChange(next);
    audioSynth.playSpikeClick(320 + next * 30);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    const val = Number(e.target.value);
    onDepthChange(val);
    audioSynth.playSpikeClick(300 + val * 35);
  };

  const handleKeyframeClick = (targetDepth: number) => {
    setIsPlaying(false);
    onDepthChange(targetDepth);
    audioSynth.playSpikeClick(300 + targetDepth * 40);
  };

  const keyframes = Array.from({ length: maxDepth + 1 }, (_, i) => ({
    depth: i,
    intervals: Math.pow(2, i),
    dim: i === 0 ? '1.0' : CANTOR_FRACTAL_DIMENSION.toFixed(3),
  }));

  // Calculate track progress percentage
  const progressPct = (depth / maxDepth) * 100;

  return (
    <div id="cantor-timeline-slider-widget" className="bg-[#020617]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col gap-4 shadow-xl relative overflow-hidden">
      
      {/* Timeline Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Recursive Depth Timeline Scrub
          </span>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 font-semibold">
            n = {depth} / {maxDepth}
          </span>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-2">
          {/* Step Back */}
          <button
            id="btn-timeline-prev"
            onClick={handleStepPrev}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition border border-white/10"
            title="Step Previous Iteration"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Play / Pause Toggle */}
          <button
            id="btn-timeline-play-toggle"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Animate</span>
              </>
            )}
          </button>

          {/* Step Next */}
          <button
            id="btn-timeline-next"
            onClick={handleStepNext}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition border border-white/10"
            title="Step Next Iteration"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Playback Speed Switcher */}
          <div className="flex items-center bg-white/5 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono ml-1">
            {[0.5, 1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-1.5 py-0.5 rounded transition ${
                  playbackSpeed === spd
                    ? 'bg-indigo-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Loop Toggle */}
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`p-1.5 rounded-lg transition border text-[10px] flex items-center gap-1 font-mono ${
              isLooping
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}
            title="Toggle Continuous Loop"
          >
            <Repeat className="w-3 h-3" />
            <span className="hidden sm:inline">{isLooping ? 'Loop' : 'Once'}</span>
          </button>
        </div>
      </div>

      {/* Timeline Scrub Track & Keyframes Container */}
      <div className="flex flex-col gap-3 px-1 relative">
        
        {/* Scrub Track Layer */}
        <div className="relative w-full h-3 bg-white/10 rounded-full border border-white/10 overflow-hidden flex items-center">
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-200"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Input Range Control Overlay */}
        <input
          id="cantor-timeline-scrubber"
          type="range"
          min={0}
          max={maxDepth}
          step={1}
          value={depth}
          onChange={handleSliderChange}
          className="w-full -mt-5 accent-cyan-400 cursor-pointer opacity-90 hover:opacity-100 z-10 h-6"
        />

        {/* Clickable Keyframe Node Indicators */}
        <div className="grid grid-cols-9 gap-1 text-center font-mono">
          {keyframes.map((kf) => {
            const isActive = kf.depth === depth;
            const isPassed = kf.depth <= depth;

            return (
              <button
                key={kf.depth}
                onClick={() => handleKeyframeClick(kf.depth)}
                className={`flex flex-col items-center gap-1 group/kf cursor-pointer transition-all ${
                  isActive ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                {/* Node Tick Dot */}
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-cyan-400 border-white shadow-lg shadow-cyan-400/50 ring-2 ring-cyan-400/40'
                      : isPassed
                      ? 'bg-indigo-500 border-indigo-400'
                      : 'bg-slate-800 border-slate-600 group-hover/kf:border-slate-400'
                  }`}
                >
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />}
                </div>

                {/* Node Label */}
                <span
                  className={`text-[10px] font-bold ${
                    isActive
                      ? 'text-cyan-300 underline underline-offset-2'
                      : isPassed
                      ? 'text-slate-300'
                      : 'text-slate-500 group-hover/kf:text-slate-300'
                  }`}
                >
                  n={kf.depth}
                </span>

                {/* Pulse count sub-label */}
                <span className="text-[9px] text-slate-400 hidden sm:block">
                  {kf.intervals}p
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Timeline Status Bar */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Active Pulse Count: <strong className="text-emerald-300">2^{depth} = {Math.pow(2, depth)}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Gauge className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fractal Dimension: <strong className="text-cyan-300">{depth === 0 ? '1.0' : CANTOR_FRACTAL_DIMENSION.toFixed(5)}</strong></span>
        </div>
      </div>

    </div>
  );
};
