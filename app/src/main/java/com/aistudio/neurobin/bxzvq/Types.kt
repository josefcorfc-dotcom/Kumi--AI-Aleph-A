package com.aistudio.neurobin.bxzvq

enum class PulseEncoding {
    PWM, NRZ, SPIKE_TRAIN, MANCHESTER
}

data class SimulationParams(
    val cantorDepth: Int = 4,
    val clockFreqHz: Float = 25f,
    val restingPotentialMv: Float = -70f,
    val thresholdMv: Float = -55f,
    val peakMv: Float = 30f,
    val refractoryPeriodMs: Float = 4f,
    val synapticNoise: Float = 0.15f,
    val couplingStrength: Float = 0.5f,
    val pulseEncoding: PulseEncoding = PulseEncoding.PWM
)

data class PulseDataPoint(
    val timeMs: Float,
    val neuroVoltageMv: Float,
    val binSignal: Int,
    val unifiedNeuroBin: Float,
    val isSpike: Boolean,
    val cantorIntervalIndex: Int? = null
)

data class CantorInterval(
    val start: Float,
    val end: Float,
    val depth: Int,
    val binaryCode: String,
    val pulseState: Boolean
)
