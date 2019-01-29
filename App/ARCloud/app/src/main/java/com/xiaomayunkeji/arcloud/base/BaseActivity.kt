package com.xiaomayunkeji.arcloud.base

import android.os.Bundle
import android.support.v7.app.AppCompatActivity

abstract class BaseActivity : AppCompatActivity() {

    protected abstract val contentViewId: Int

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(contentViewId)
        init(savedInstanceState)
    }

    abstract fun init(savedInstanceState: Bundle?)

}