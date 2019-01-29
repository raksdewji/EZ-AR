package com.xiaomayunkeji.arcloud.widgets.arview

import com.xiaomayunkeji.arcloud.data.NameVedioMap
import com.xiaomayunkeji.arcloud.data.VedioType

object VideoRendererHolder {

    @JvmStatic
    val localSize: Int

    @JvmStatic
    private val localRenderIndexMap = hashMapOf<String, Int>()

    init {
        var local_size = 0
        for ((k, v) in NameVedioMap.map) {
            when (v.type) {
                VedioType.TYPE_ASSETS, VedioType.TYPE_HTTP -> {
                    localRenderIndexMap[k] = local_size
                    local_size++
                }
            }
        }
        localSize = local_size
    }

    @JvmStatic
    fun getRenderIndex(name: String): Int {
        return localRenderIndexMap[name]!!
    }
}