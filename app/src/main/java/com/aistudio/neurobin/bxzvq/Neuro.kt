package com.aistudio.neurobin.bxzvq

import kotlin.math.sin

class NeuronState(
    var v: Float,
    var refractoryRemaining: Float
)

fun createBioDigitalSimulator(params: SimulationParams): (Float) -> PulseDataPoint {
    val neuron = NeuronState(params.restingPotentialMv, 0f)
    val dt = 0.5f

    return { timeMs ->
        val normalizedTime = (timeMs % 1000f) / 1000f
        val (inSet, _) = isPointInCantorSet(normalizedTime, params.cantorDepth)

        val cantorDrive = if (inSet) 18.0f else 3.0f
        val noise = (Math.random().toFloat() - 0.5f) * 8.0f * params.synapticNoise
        val inputCurrent = cantorDrive + noise + (sin(timeMs * 0.05f) * 5.0f)

        var isSpike = false

        if (neuron.refractoryRemaining > 0f) {
            neuron.refractoryRemaining -= dt
            neuron.v = params.restingPotentialMv - 5.0f
        } else {
            val tau = 10.0f
            val dv = (-(neuron.v - params.restingPotentialMv) + inputCurrent) / tau * dt
            neuron.v += dv

            if (neuron.v >= params.thresholdMv) {
                neuron.v = params.peakMv
                neuron.refractoryRemaining = params.refractoryPeriodMs
                isSpike = true
            }
        }

        val neuroVoltage = neuron.v
        val clockPeriodMs = 1000f / params.clockFreqHz
        val phase = (timeMs % clockPeriodMs) / clockPeriodMs

        var binSignal = 0
        when (params.pulseEncoding) {
            PulseEncoding.PWM -> {
                val duty = if (inSet) 0.75f else 0.25f
                binSignal = if (phase < duty) 1 else 0
            }
            PulseEncoding.MANCHESTER -> {
                binSignal = if (phase < 0.5f) 1 else 0
            }
            PulseEncoding.SPIKE_TRAIN -> {
                binSignal = if (isSpike) 1 else 0
            }
            PulseEncoding.NRZ -> {
                binSignal = if (inSet) 1 else 0
            }
        }

        val mappedBinVoltage = params.restingPotentialMv + binSignal * (params.peakMv - params.restingPotentialMv)
        val unifiedNeuroBin = (1f - params.couplingStrength) * neuroVoltage + params.couplingStrength * mappedBinVoltage

        PulseDataPoint(
            timeMs = timeMs,
            neuroVoltageMv = neuroVoltage,
            binSignal = binSignal,
            unifiedNeuroBin = unifiedNeuroBin,
            isSpike = isSpike
        )
    }
}
