package com.xiaomayunkeji.arcloud.ext

import android.app.Activity

/**
 * Created by daidaijie on 17-9-29.
 */
@Suppress("DEPRECATION")
val Activity.deviceWidth
    get() = windowManager.defaultDisplay.width

@Suppress("DEPRECATION")
val Activity.deviceHeight
    get() = windowManager.defaultDisplay.height
