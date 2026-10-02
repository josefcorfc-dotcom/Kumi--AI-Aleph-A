package com.aistudio.neurobin.bxzvq

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun SignalCodex(modifier: Modifier = Modifier) {
    var inputText by remember { mutableStateOf("NeuroBIN") }
    var isPlaying by remember { mutableStateOf(false) }
    val coroutineScope = rememberCoroutineScope()

    val binaryStr = remember(inputText) {
        inputText.toCharArray().joinToString("") { 
            it.code.toString(2).padStart(8, '0') 
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
                    text = "TEXT-TO-NEUROBIN SIGNAL CODEX",
                    style = MaterialTheme.typography.titleSmall,
                    color = Color.White
                )
                Text(
                    text = "Translating Human Language to Biological Spike Trains",
                    style = MaterialTheme.typography.labelSmall,
                    color = Color.Gray,
                    fontFamily = FontFamily.Monospace
                )
            }
            
            Button(
                onClick = { 
                    if (isPlaying) return@Button
                    isPlaying = true
                    coroutineScope.launch {
                        for (bit in binaryStr) {
                            delay(120) // Simulated playback
                        }
                        isPlaying = false
                    }
                },
                enabled = !isPlaying
            ) {
                Text(if (isPlaying) "Synthesizing..." else "Play Pulse Train")
            }
        }

        OutlinedTextField(
            value = inputText,
            onValueChange = { if (it.length <= 20) inputText = it },
            label = { Text("Input Message") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            colors = OutlinedTextFieldDefaults.colors(
                unfocusedTextColor = Color.White,
                focusedTextColor = Color.White
            )
        )

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xB3020617), RoundedCornerShape(16.dp))
                .border(1.dp, Color(0x1AFFFFFF), RoundedCornerShape(16.dp))
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("ASCII Binary Stream (${binaryStr.length} bits)", color = Color.White, fontWeight = FontWeight.Bold)
                Text("${inputText.length} Chars", color = Color(0xFF34D399))
            }
            
            FlowRow(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(4.dp),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                binaryStr.forEachIndexed { idx, bit ->
                    val isOne = bit == '1'
                    Box(
                        modifier = Modifier
                            .background(
                                if (isOne) Color(0x3310B981) else Color(0x0DFFFFFF),
                                RoundedCornerShape(4.dp)
                            )
                            .border(
                                1.dp,
                                if (isOne) Color(0x4D10B981) else Color.Transparent,
                                RoundedCornerShape(4.dp)
                            )
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = bit.toString(),
                            color = if (isOne) Color(0xFF6EE7B7) else Color.Gray,
                            fontFamily = FontFamily.Monospace,
                            fontSize = 12.sp
                        )
                    }
                }
            }
        }
    }
}
