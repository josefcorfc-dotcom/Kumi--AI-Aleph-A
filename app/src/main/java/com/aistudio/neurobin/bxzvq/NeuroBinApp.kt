package com.aistudio.neurobin.bxzvq

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
import androidx.compose.material3.ExperimentalMaterial3Api
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
