package com.aistudio.neurobin.bxzvq

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch

class NeuroBinViewModel : ViewModel() {

    private val _params = MutableStateFlow(SimulationParams())
    val params: StateFlow<SimulationParams> = _params.asStateFlow()

    private val _dataPoints = MutableStateFlow<List<PulseDataPoint>>(emptyList())
    val dataPoints: StateFlow<List<PulseDataPoint>> = _dataPoints.asStateFlow()

    private var simulator: ((Float) -> PulseDataPoint) = createBioDigitalSimulator(_params.value)
    private var currentTimeMs = 0f

    init {
        viewModelScope.launch {
            while (isActive) {
                // Advance simulation
                val newPoints = mutableListOf<PulseDataPoint>()
                for (i in 0 until 10) { // 10 steps of 0.5ms = 5ms per frame update
                    currentTimeMs += 0.5f
                    newPoints.add(simulator(currentTimeMs))
                }
                
                _dataPoints.value = (_dataPoints.value + newPoints).takeLast(200)
                delay(16) // roughly 60fps
            }
        }
    }

    fun updateParams(newParams: SimulationParams) {
        _params.value = newParams
        simulator = createBioDigitalSimulator(newParams)
        _dataPoints.value = emptyList() // clear history on param change
    }
}
