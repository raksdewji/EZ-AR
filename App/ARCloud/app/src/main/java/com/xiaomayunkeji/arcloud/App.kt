package com.xiaomayunkeji.arcloud

import android.annotation.SuppressLint
import android.app.Application
import android.content.Context
import android.support.v7.app.AppCompatDelegate
import java.util.*
import kotlin.properties.Delegates

class App : Application() {

    companion object {

        @JvmStatic
        @SuppressLint("StaticFieldLeak")
        lateinit var context: Context

        @JvmStatic
        var instance: App by Delegates.notNull()
    }

    override fun onCreate() {
        super.onCreate()
        context = this.applicationContext
        instance = this

        initVectorSupport()
        initTimeZone()
    }

    private fun initVectorSupport() {
        AppCompatDelegate.setCompatVectorFromResourcesEnabled(true)
    }

    private fun initTimeZone() {
        TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"))
    }
}