package com.xiaomayunkeji.arcloud.ui.splash

import android.os.Bundle
import android.os.Handler
import com.xiaomayunkeji.arcloud.R
import com.xiaomayunkeji.arcloud.base.BaseActivity
import com.xiaomayunkeji.arcloud.ui.main.MainActivity


class SplashActivity : BaseActivity() {

    override val contentViewId = R.layout.activity_splash

    override fun init(savedInstanceState: Bundle?) {
        Handler().postDelayed(
                {
                    startActivity(MainActivity.newIntent(this))
                    finish()
                }
                , 300)
    }
}