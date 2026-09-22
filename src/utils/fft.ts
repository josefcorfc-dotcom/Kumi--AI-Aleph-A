/**
 * Simple Discrete Fourier Transform (DFT) / Harmonic Spectrum Analyzer
 * for real-time neuronal pulse signals in NeuroBIN ALEPH-Σ.
 */

export interface FrequencyBin {
  frequency: number;
  amplitude: number;
}

export function computeHarmonicSpectrum(signal: number[], sampleRateHz: number = 1000): FrequencyBin[] {
  const N = signal.length;
  if (N === 0) return [];

  // We compute magnitude for N/2 frequency bins (Nyquist theorem)
  const numBins = Math.min(64, Math.floor(N / 2));
  const spectrum: FrequencyBin[] = [];

  // Remove DC offset (mean)
  const mean = signal.reduce((sum, val) => sum + val, 0) / N;
  const zeroMeanSignal = signal.map(val => val - mean);

  for (let k = 0; k < numBins; k++) {
    let real = 0;
    let imag = 0;
    const freq = (k * sampleRateHz) / N;

    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      real += zeroMeanSignal[n] * Math.cos(angle);
      imag -= zeroMeanSignal[n] * Math.sin(angle);
    }

    // Magnitude calculation normalized by N
    const magnitude = Math.sqrt(real * real + imag * imag) / (N / 2);
    spectrum.push({
      frequency: freq,
      amplitude: isNaN(magnitude) ? 0 : magnitude,
    });
  }

  return spectrum;
}
