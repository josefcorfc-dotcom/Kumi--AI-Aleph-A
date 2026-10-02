package com.aistudio.neurobin.bxzvq

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF6366F1), // Indigo 500
    secondary = Color(0xFF059669), // Emerald 600
    tertiary = Color(0xFF06B6D4), // Cyan 500
    background = Color(0xFF020617), // Slate 950
    surface = Color(0xFF0F172A), // Slate 900
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Color.White,
    onBackground = Color(0xFFF1F5F9), // Slate 100
    onSurface = Color(0xFFF1F5F9), // Slate 100
)

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF6366F1), // Indigo 500
    secondary = Color(0xFF059669), // Emerald 600
    tertiary = Color(0xFF06B6D4), // Cyan 500
    background = Color(0xFF020617), // Slate 950 (force dark app)
    surface = Color(0xFF0F172A), // Slate 900
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Color.White,
    onBackground = Color(0xFFF1F5F9), // Slate 100
    onSurface = Color(0xFFF1F5F9), // Slate 100
)

@Composable
fun NeuroBinTheme(
    darkTheme: Boolean = true, // Force dark theme like original
    dynamicColor: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
