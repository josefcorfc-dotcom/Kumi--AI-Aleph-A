package com.aistudio.neurobin.bxzvq

import kotlin.math.floor
import kotlin.math.log
import kotlin.math.min

val CANTOR_FRACTAL_DIMENSION = log(2.0, 10.0) / log(3.0, 10.0)

fun generateCantorIntervals(depth: Int): List<CantorInterval> {
    var intervals = listOf(Triple(0f, 1f, ""))
    
    for (d in 1..depth) {
        val nextIntervals = mutableListOf<Triple<Float, Float, String>>()
        for (inv in intervals) {
            val len = (inv.second - inv.first) / 3f
            nextIntervals.add(Triple(inv.first, inv.first + len, inv.third + "0"))
            nextIntervals.add(Triple(inv.second - len, inv.second, inv.third + "1"))
        }
        intervals = nextIntervals
    }
    
    return intervals.map { inv ->
        val code = if (inv.third.isEmpty()) "0" else inv.third
        val pulseState = if (inv.third.isNotEmpty()) (inv.third.last() == '1') else true
        CantorInterval(inv.first, inv.second, depth, code, pulseState)
    }
}

fun isPointInCantorSet(t: Float, depth: Int): Pair<Boolean, String> {
    var currentT = t
    var code = ""
    for (i in 0 until depth) {
        currentT *= 3f
        val digit = floor(currentT).toInt()
        if (digit == 1) {
            return Pair(false, code + "X")
        }
        code += if (digit == 0) "0" else "1"
        currentT -= digit
    }
    return Pair(true, code)
}
