/**
 * NeuroBIN - Bio-Digital Cantor Recursion Types
 */

export interface SimulationParams {
  cantorDepth: number;          // n (0 to 10)
  clockFreqHz: number;          // Binary clock frequency (Hz)
  restingPotentialMv: number;   // Biological membrane resting potential (-70 mV)
  thresholdMv: number;          // Spike threshold (-55 mV)
  peakMv: number;               // Action potential peak (+30 mV)
  refractoryPeriodMs: number;   // Absolute refractory period (ms)
  synapticNoise: number;        // Random electrical noise magnitude (0 to 1)
  couplingStrength: number;     // Neuro-BIN unification factor (0 to 1)
  pulseEncoding: 'PWM' | 'NRZ' | 'SPIKE_TRAIN' | 'MANCHESTER';
}

export interface PulseDataPoint {
  timeMs: number;
  neuroVoltageMv: number;      // Biological voltage (mV)
  binSignal: number;           // Binary signal (0 or 1, or 0V/5V)
  unifiedNeuroBin: number;     // Combined Cantor-mapped pulse (mV)
  isSpike: boolean;
  cantorIntervalIndex?: number;
}

export interface CantorInterval {
  start: number;               // Normalized [0, 1]
  end: number;
  depth: number;
  binaryCode: string;          // e.g. "0101"
  pulseState: boolean;         // Active pulse or silent gap
}

export interface SignalMetrics {
  spikeCount: number;
  meanFiringRateHz: number;
  bitRateBps: number;
  fractalDimension: number;    // ln(2)/ln(3) ≈ 0.6309
  entropyBits: number;
  snrDb: number;
}

export interface CodexMessage {
  text: string;
  binaryStr: string;
  spikeTrainHz: number[];
  cantorMap: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gemini' | 'system';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}
