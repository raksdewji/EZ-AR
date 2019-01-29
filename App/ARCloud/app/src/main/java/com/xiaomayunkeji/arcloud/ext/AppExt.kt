package com.xiaomayunkeji.arcloud.ext

import android.app.Application
import android.content.ClipboardManager
import android.content.Context
import android.support.annotation.ColorRes
import android.support.annotation.DimenRes
import android.support.annotation.DrawableRes
import android.support.annotation.StringRes
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.content.ContextCompat
import com.xiaomayunkeji.arcloud.App
import java.util.*

/**
 * Created by daidaijie on 17-9-29.
 */

fun dp2px(dp: Float): Int {
    val scale = App.context.resources.displayMetrics.density
    return (dp * scale + 0.5f).toInt()
}

fun px2dp(px: Int): Float {
    val scale = App.context.resources.displayMetrics.density
    return px / scale + 0.5f
}

fun sp2px(sp: Int): Int {
    val scale = App.context.resources.displayMetrics.scaledDensity
    return (sp * scale + 0.5f).toInt()
}

fun getPixelSizeById(@DimenRes id: Int) = App.context.resources.getDimensionPixelSize(id)

fun getDrawableById(@DrawableRes id: Int) = ContextCompat.getDrawable(App.context, id)

fun getColorById(@ColorRes colorId: Int) = ContextCompat.getColor(App.context, colorId)

fun getColorStateListById(@ColorRes colorId: Int) = ContextCompat.getColorStateList(App.context, colorId)

fun getStringById(@StringRes stringId: Int) = App.context.getString(stringId)

fun addFragmentToActivity(fragmentManager: FragmentManager,
                          fragment: Fragment, frameId: Int) {
    val transaction = fragmentManager.beginTransaction()
    transaction.add(frameId, fragment)
    transaction.commit()
}

@Suppress("DEPRECATION")
var clipboard: String
    get() {
        val cm = App.context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        return cm.text.toString()
    }
    set(value) {
        val cm = App.context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        cm.text = value
    }

val Application.locolVersion: Int
    get() = packageManager.getPackageInfo(packageName, 0).versionCode

val now: Calendar
    get() = Calendar.getInstance()