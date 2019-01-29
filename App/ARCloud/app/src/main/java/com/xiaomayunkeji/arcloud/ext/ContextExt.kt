package com.xiaomayunkeji.arcloud.ext

import android.content.Context
import android.widget.Toast
import es.dmoral.toasty.Toasty

/**
 * Created by daidaijie on 17-9-28.
 */
fun Context.toastS(msg: String, duration: Int = Toast.LENGTH_SHORT, withIcon: Boolean = true) {
    Toasty.success(this.applicationContext, msg, duration, withIcon).show()
}

fun Context.toastW(msg: String, duration: Int = Toast.LENGTH_SHORT, withIcon: Boolean = true) {
    Toasty.warning(this.applicationContext, msg, duration, withIcon).show()
}

fun Context.toastE(msg: String, duration: Int = Toast.LENGTH_SHORT, withIcon: Boolean = true) {
    Toasty.error(this.applicationContext, msg, duration, withIcon).show()
}

val Context.statusBarHeight: Int
    get() {
        var result = 0
        val resourceId = resources.getIdentifier("status_bar_height", "dimen", "android")
        if (resourceId > 0) {
            result = resources.getDimensionPixelSize(resourceId)
        }
        return result
    }

