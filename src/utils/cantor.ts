/**
 * Cantor Recursion Mathematics & Pulse Mapping Algorithms
 * Formula: ∞ - n = NeuroBIN
 */

import { CantorInterval } from '../types';

/**
 * Calculates the Hausdorff / Fractal dimension of the Cantor set
 * D = ln(2) / ln(3) ≈ 0.63092975357
 */
export const CANTOR_FRACTAL_DIMENSION = Math.log(2) / Math.log(3);

/**
 * Generates Cantor Set intervals at depth n (Removing middle thirds recursively)
 * Continuous Infinity [0,1] minus n removal operations = Cantor Set
 */
export function generateCantorIntervals(depth: number): CantorInterval[] {
  let intervals: { start: number; end: number; code: string }[] = [
    { start: 0, end: 1, code: '' }
  ];

  for (let d = 1; d <= depth; d++) {
    const nextIntervals: { start: number; end: number; code: string }[] = [];
    for (const inv of intervals) {
      const len = (inv.end - inv.start) / 3;
      // Left third -> '0'
      nextIntervals.push({
        start: inv.start,
        end: inv.start + len,
        code: inv.code + '0'
      });
      // Right third -> '1'
      nextIntervals.push({
        start: inv.end - len,
        end: inv.end,
        code: inv.code + '1'
      });
    }
    intervals = nextIntervals;
  }

  return intervals.map((inv) => ({
    start: inv.start,
    end: inv.end,
    depth,
    binaryCode: inv.code || '0',
    pulseState: inv.code.length > 0 ? (parseInt(inv.code.slice(-1), 2) === 1) : true
  }));
}

/**
 * Check if a normalized timestamp t ∈ [0, 1] belongs to the Cantor Set at depth n
 */
export function isPointInCantorSet(t: number, depth: number): { inSet: boolean; code: string } {
  let currentT = t;
  let code = '';

  for (let i = 0; i < depth; i++) {
    currentT *= 3;
    const digit = Math.floor(currentT);
    if (digit === 1) {
      // Middle third removed
      return { inSet: false, code: code + 'X' };
    }
    code += digit === 0 ? '0' : '1';
    currentT -= digit;
  }

  return { inSet: true, code };
}

/**
 * Convert text into ASCII Binary and Cantor pulse timings
 */
export function encodeTextToNeuroBin(text: string, depth: number = 4) {
  const binaryArray = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0'));
  const fullBinary = binaryArray.join('');
  
  // Map binary bits to neuronal spike train frequencies (e.g. '1' = 60Hz, '0' = 15Hz)
  const spikeFrequencies = fullBinary.split('').map(bit => bit === '1' ? 65 : 18);
  
  // Cantor interval mapping for each byte
  const cantorMap = binaryArray.map(bByte => {
    // Take first few bits to select Cantor depth branch
    return `C_${depth}(${bByte.slice(0, Math.min(depth, 8))})`;
  });

  return {
    binaryStr: fullBinary,
    spikeTrainHz: spikeFrequencies,
    cantorMap
  };
}
