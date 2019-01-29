package com.xiaomayunkeji.arcloud.ui.find

import android.os.Bundle
import com.xiaomayunkeji.arcloud.R
import com.xiaomayunkeji.arcloud.base.BaseActivity
import kotlinx.android.synthetic.main.view_toolbar.*

class FindArActivity : BaseActivity() {
    override val contentViewId = R.layout.activity_find_ar

    override fun init(savedInstanceState: Bundle?) {
        tv_head_title.text = "发现AR"
    }
}