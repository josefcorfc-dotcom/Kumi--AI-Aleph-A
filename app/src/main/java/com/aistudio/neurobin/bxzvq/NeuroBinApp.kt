package com.aistudio.neurobin.bxzvq

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NeuroBinApp(
    viewModel: NeuroBinViewModel = viewModel()
) {
    val params by viewModel.params.collectAsState()
    val dataPoints by viewModel.dataPoints.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("NeuroBIN - Bio-Digital Simulator", fontWeight = FontWeight.Bold, color = Color.White) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.Transparent)
            )
        },
        containerColor = Color(0xFF020617)
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color(0x1A6366F1)),
                    border = BorderStroke(1.dp, Color(0x336366F1)),
                    shape = RoundedCornerShape(20.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "ℵ₁ CANTOR RECURSION ENGINE",
                                style = MaterialTheme.typography.labelMedium,
                                color = Color(0xFF818CF8),
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "CALF8712186T5",
                                style = MaterialTheme.typography.labelSmall,
                                color = Color(0xFF34D399),
                                fontFamily = FontFamily.Monospace
                            )
                        }
                        Text(
                            text = "Recursión de Cantor validada: ∞ - n = NeuroBIN",
                            style = MaterialTheme.typography.titleMedium,
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Neuro: Por Neurona de los Seres Vivos. Bin: del código Binario, el lenguaje de las Computadoras. Es el mismo ecosistema de pulsos eléctricos en el ecosistema Neuronal; Natural y Artificial.",
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFFCBD5E1)
                        )
                        Text(
                            text = "Author: Jose Francisco Cantoriano Leyva • ORCID: 0009-0007-6963-1205",
                            style = MaterialTheme.typography.labelSmall,
                            color = Color(0xFF94A3B8),
                            fontFamily = FontFamily.Monospace
                        )
                    }
                }
            }

            item {
                PulseOscilloscope(
                    params = params,
                    dataPoints = dataPoints,
                    modifier = Modifier.fillMaxWidth()
                )
            }
            
            item {
                CantorVisualizer(
                    depth = params.cantorDepth,
                    onDepthChange = { viewModel.updateParams(params.copy(cantorDepth = it)) },
                    modifier = Modifier.fillMaxWidth()
                )
            }
            
            item {
                ControlPanel(
                    params = params,
                    onParamsChange = { viewModel.updateParams(it) },
                    modifier = Modifier.fillMaxWidth()
                )
            }
            
            item {
                SignalCodex(modifier = Modifier.fillMaxWidth())
            }
            
            item {
                Spacer(modifier = Modifier.height(32.dp))
            }
        }
    }
}
