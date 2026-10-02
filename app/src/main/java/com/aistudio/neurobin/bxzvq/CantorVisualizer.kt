package com.aistudio.neurobin.bxzvq

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlin.math.max
import kotlin.math.min

@Composable
fun CantorVisualizer(
    depth: Int,
    onDepthChange: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedBinaryCode by remember { mutableStateOf<String?>(null) }
    
    val levels = remember(depth) {
        (0..min(depth, 7)).map { d ->
            d to generateCantorIntervals(d)
        }
    }

    Column(
        modifier = modifier
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0x0DFFFFFF))
            .border(1.dp, Color(0x1AFFFFFF), RoundedCornerShape(24.dp))
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "CANTOR SET FRACTAL MAP",
                    style = MaterialTheme.typography.titleSmall,
                    color = Color.White
                )
                Text(
                    text = "∞ - n = NeuroBIN",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.Gray,
                    fontFamily = FontFamily.Monospace
                )
            }
        }

        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
            Text("Depth (n): $depth", color = Color(0xFF93C5FD), style = MaterialTheme.typography.labelMedium)
            Spacer(modifier = Modifier.width(8.dp))
            Slider(
                value = depth.toFloat(),
                onValueChange = { onDepthChange(it.toInt()) },
                valueRange = 0f..7f,
                steps = 6,
                modifier = Modifier.weight(1f)
            )
        }

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xB3020617), RoundedCornerShape(16.dp))
                .border(1.dp, Color(0x1AFFFFFF), RoundedCornerShape(16.dp))
                .padding(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            levels.forEach { (lvlDepth, intervals) ->
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Recursion n = $lvlDepth", color = Color.Gray, fontSize = 10.sp)
                        Text("${intervals.size} segments", color = Color.Gray, fontSize = 10.sp)
                    }
                    
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(28.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color(0x0DFFFFFF))
                    ) {
                        Canvas(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(28.dp)
                                .pointerInput(intervals) {
                                    detectTapGestures { offset ->
                                        val width = size.width.toFloat()
                                        val pct = offset.x / width
                                        val tapped = intervals.find { it.start <= pct && pct <= it.end }
                                        if (tapped != null) {
                                            selectedBinaryCode = tapped.binaryCode
                                        }
                                    }
                                }
                        ) {
                            val w = size.width
                            val h = size.height
                            intervals.forEach { inv ->
                                val left = inv.start * w
                                val right = inv.end * w
                                val segWidth = max(right - left, 1f)
                                
                                val isSelected = selectedBinaryCode == inv.binaryCode
                                val color = if (isSelected) {
                                    Color(0xFFFBBF24) // Amber
                                } else if (lvlDepth % 2 == 0) {
                                    Color(0xFF6366F1) // Indigo
                                } else {
                                    Color(0xFF06B6D4) // Cyan
                                }
                                
                                drawRect(
                                    color = color,
                                    topLeft = Offset(left, 0f),
                                    size = Size(segWidth, h)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
