/**
 * Biological Action Potential & Binary Signal Simulation Utility
 * Neuro (Neuronal Action Potentials) + BIN (Binary Logic Voltage)
 */

import { SimulationParams, PulseDataPoint } from '../types';
import { isPointInCantorSet } from './cantor';

export interface NeuronState {
  v: number;               // Current membrane potential (mV)
  refractoryRemaining: number; // Remaining refractory time (ms)
}

/**
 * Creates a step simulation function for generating real-time pulse data streams
 */
export function createBioDigitalSimulator(params: SimulationParams) {
  let neuron: NeuronState = {
    v: params.restingPotentialMv,
    refractoryRemaining: 0
  };

  const dt = 0.5; // time step in milliseconds (0.5 ms)

  return function step(timeMs: number): PulseDataPoint {
    // 1. Biological Neuron Dynamics (Leaky Integrate-and-Fire with Cantor Modulation)
    const normalizedTime = (timeMs % 1000) / 1000; // 0 to 1 cycle
    const cantorCheck = isPointInCantorSet(normalizedTime, params.cantorDepth);
    
    // External synaptic current I_ext modulated by Cantor set recursive structure
    const cantorDrive = cantorCheck.inSet ? 18.0 : 3.0; // Current injected when in Cantor active interval
    const noise = (Math.random() - 0.5) * 8.0 * params.synapticNoise;
    const inputCurrent = cantorDrive + noise + Math.sin(timeMs * 0.05) * 5.0;

    let isSpike = false;

    if (neuron.refractoryRemaining > 0) {
      neuron.refractoryRemaining -= dt;
      neuron.v = params.restingPotentialMv - 5.0; // After-hyperpolarization (AHP)
    } else {
      // dv/dt = (- (v - v_rest) + R * I) / tau
      const tau = 10.0; // Membrane time constant (ms)
      const dv = (-(neuron.v - params.restingPotentialMv) + inputCurrent) / tau * dt;
      neuron.v += dv;

      if (neuron.v >= params.thresholdMv) {
        neuron.v = params.peakMv; // Action potential peak (+30mV)
        neuron.refractoryRemaining = params.refractoryPeriodMs;
        isSpike = true;
      }
    }

    const neuroVoltage = neuron.v;

    // 2. Binary Digital Signal (Clock & Encoding)
    const clockPeriodMs = 1000 / params.clockFreqHz;
    const phase = (timeMs % clockPeriodMs) / clockPeriodMs;
    
    let binSignal = 0;
    if (params.pulseEncoding === 'PWM') {
      const duty = cantorCheck.inSet ? 0.75 : 0.25;
      binSignal = phase < duty ? 1 : 0;
    } else if (params.pulseEncoding === 'MANCHESTER') {
      binSignal = phase < 0.5 ? 1 : 0;
    } else if (params.pulseEncoding === 'SPIKE_TRAIN') {
      binSignal = isSpike ? 1 : 0;
    } else {
      // NRZ
      binSignal = cantorCheck.inSet ? 1 : 0;
    }

    // 3. NeuroBIN Unified Signal (Synthesizing Biological + Binary via Cantor Recursion)
    // Map binary signal [0, 1] into biological scale [-70, +30] mV
    const mappedBinVoltage = params.restingPotentialMv + binSignal * (params.peakMv - params.restingPotentialMv);
    
    // Unify: Unified = (1 - coupling) * Neuro + coupling * MappedBin
    const unifiedNeuroBin = (1 - params.couplingStrength) * neuroVoltage + params.couplingStrength * mappedBinVoltage;

    return {
      timeMs,
      neuroVoltageMv: neuroVoltage,
      binSignal,
      unifiedNeuroBin,
      isSpike
    };
  };
}
