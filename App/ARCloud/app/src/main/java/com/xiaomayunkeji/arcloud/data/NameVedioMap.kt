package com.xiaomayunkeji.arcloud.data

object NameVedioMap {

    val map = hashMapOf<String, Vedio>(
            "forests" to Vedio("forests.mp4", VedioType.TYPE_ASSETS),
            "namecard" to Vedio("transparentvideo.mp4", VedioType.TYPE_ASSETS),
            "idback" to Vedio("https://sightpvideo-cdn.sightp.com/sdkvideo/EasyARSDKShow201520.mp4", VedioType.TYPE_HTTP),
            "sea" to Vedio("sea.mp4", VedioType.TYPE_ASSETS),
            "jungle" to Vedio("jungle.mp4", VedioType.TYPE_ASSETS),
            "jj_bottle_1" to Vedio("xjj.mp4", VedioType.TYPE_ASSETS_FULL_SCREEN)
    )

    @JvmStatic
    fun getVedioByName(name: String): Vedio? {
        return map[name]
    }
}