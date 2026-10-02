package com.aistudio.neurobin.bxzvq

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.material.icons.filled.Refresh

@Composable
fun PulseOscilloscope(
    params: SimulationParams,
    dataPoints: List<PulseDataPoint>,
    modifier: Modifier = Modifier
) {
    var showNeuro by remember { mutableStateOf(true) }
    var showBin by remember { mutableStateOf(true) }
    var showUnified by remember { mutableStateOf(true) }
    var isPlaying by remember { mutableStateOf(true) }
    var timebase by remember { mutableFloatStateOf(300f) }

    Column(
        modifier = modifier
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0x0DFFFFFF))
            .border(1.dp, Color(0x1AFFFFFF), RoundedCornerShape(24.dp))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Header Controls
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "REAL-TIME BIO-DIGITAL OSCILLOSCOPE",
                    style = MaterialTheme.typography.titleSmall,
                    color = Color.White
                )
                Text(
                    text = "60 FPS SIGNAL ANALYZER",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.Gray,
                    fontFamily = FontFamily.Monospace
                )
            }
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            FilterChip(
                selected = showNeuro,
                onClick = { showNeuro = !showNeuro },
                label = { Text("Ch1: Neuro") }
            )
            FilterChip(
                selected = showBin,
                onClick = { showBin = !showBin },
                label = { Text("Ch2: BIN") }
            )
            FilterChip(
                selected = showUnified,
                onClick = { showUnified = !showUnified },
                label = { Text("Ch3: Unified") }
            )
            Spacer(modifier = Modifier.weight(1f))
            Button(
                onClick = { isPlaying = !isPlaying },
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
            ) {
                Icon(if (isPlaying) Icons.Default.Refresh else Icons.Default.PlayArrow, contentDescription = "Play/Pause")
                Spacer(modifier = Modifier.width(4.dp))
                Text(if (isPlaying) "Pause" else "Run")
            }
        }

        // Canvas
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(Color(0xFF060A12))
                .border(1.dp, Color(0x1AFFFFFF), RoundedCornerShape(16.dp))
        ) {
            Canvas(modifier = Modifier.fillMaxWidth().height(300.dp)) {
                val width = size.width
                val height = size.height
                val hSection = height / 3f

                // Draw Grid
                val gridPaint = Color(0xFF1E293B)
                for (i in 0..8) {
                    val y = (i / 8f) * height
                    drawLine(gridPaint, Offset(0f, y), Offset(width, y), strokeWidth = 1f)
                }
                for (i in 0..12) {
                    val x = (i / 12f) * width
                    drawLine(gridPaint, Offset(x, 0f), Offset(x, height), strokeWidth = 1f)
                }

                val pts = dataPoints.takeLast(timebase.toInt())
                if (pts.isEmpty()) return@Canvas

                val resting = params.restingPotentialMv

                if (showNeuro) {
                    val path = Path()
                    pts.forEachIndexed { i, pt ->
                        val x = (i / (pts.size - 1).toFloat().coerceAtLeast(1f)) * width
                        val normV = (pt.neuroVoltageMv - resting) / 100f
                        val y = hSection * 0.7f - normV * (hSection * 0.6f)
                        if (i == 0) path.moveTo(x, y) else path.lineTo(x, y)
                    }
                    drawPath(path, color = Color(0xFF10B981), style = Stroke(width = 2.dp.toPx()))
                }

                if (showBin) {
                    val offsetY = hSection
                    val path = Path()
                    pts.forEachIndexed { i, pt ->
                        val x = (i / (pts.size - 1).toFloat().coerceAtLeast(1f)) * width
                        val y = offsetY + hSection * 0.7f - pt.binSignal * (hSection * 0.45f)
                        if (i == 0) path.moveTo(x, y) else path.lineTo(x, y)
                    }
                    drawPath(path, color = Color(0xFF38BDF8), style = Stroke(width = 2.dp.toPx()))
                }

                if (showUnified) {
                    val offsetY = hSection * 2
                    val path = Path()
                    pts.forEachIndexed { i, pt ->
                        val x = (i / (pts.size - 1).toFloat().coerceAtLeast(1f)) * width
                        val normUV = (pt.unifiedNeuroBin - resting) / 100f
                        val y = offsetY + hSection * 0.7f - normUV * (hSection * 0.6f)
                        if (i == 0) path.moveTo(x, y) else path.lineTo(x, y)
                    }
                    drawPath(path, color = Color(0xFFC084FC), style = Stroke(width = 2.5.dp.toPx()))
                }
            }
        }
    }
}
