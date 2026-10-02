package com.aistudio.neurobin.bxzvq

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun ControlPanel(
    params: SimulationParams,
    onParamsChange: (SimulationParams) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0x0DFFFFFF))
            .border(1.dp, Color(0x1AFFFFFF), RoundedCornerShape(24.dp))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "SIMULATION PARAMETERS",
            style = MaterialTheme.typography.titleSmall,
            color = Color.White
        )
        
        ParamSlider(
            label = "Clock Freq (Hz)",
            value = params.clockFreqHz,
            range = 5f..120f,
            onValueChange = { onParamsChange(params.copy(clockFreqHz = it)) }
        )
        
        ParamSlider(
            label = "Resting Potential (mV)",
            value = params.restingPotentialMv,
            range = -90f..-50f,
            onValueChange = { onParamsChange(params.copy(restingPotentialMv = it)) }
        )
        
        ParamSlider(
            label = "Spike Threshold (mV)",
            value = params.thresholdMv,
            range = -65f..-30f,
            onValueChange = { onParamsChange(params.copy(thresholdMv = it)) }
        )
        
        ParamSlider(
            label = "Synaptic Noise",
            value = params.synapticNoise,
            range = 0f..1f,
            onValueChange = { onParamsChange(params.copy(synapticNoise = it)) }
        )
        
        ParamSlider(
            label = "NeuroBIN Coupling",
            value = params.couplingStrength,
            range = 0f..1f,
            onValueChange = { onParamsChange(params.copy(couplingStrength = it)) }
        )
    }
}

@Composable
fun ParamSlider(
    label: String,
    value: Float,
    range: ClosedFloatingPointRange<Float>,
    onValueChange: (Float) -> Unit
) {
    Column {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(label, color = Color.LightGray, fontSize = 12.sp)
            Text(String.format("%.2f", value), color = Color(0xFF6366F1), fontSize = 12.sp)
        }
        Slider(
            value = value,
            onValueChange = onValueChange,
            valueRange = range
        )
    }
}
