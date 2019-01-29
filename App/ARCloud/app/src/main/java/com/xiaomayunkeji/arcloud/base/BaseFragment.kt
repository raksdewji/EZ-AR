package com.xiaomayunkeji.arcloud.base

import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlin.properties.Delegates

/**
 * Created by daidaijie on 17-9-28.
 */
abstract class BaseFragment : Fragment() {

    protected abstract val contentViewId: Int

    protected var act: BaseActivity by Delegates.notNull()

    //Fragment的View加载完毕的标记
    private var isViewCreated: Boolean = false

    //Fragment对用户可见的标记
    private var isUIVisible: Boolean = false

    private var savedInstanceState: Bundle? = null

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        act = activity as BaseActivity
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(contentViewId, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        this.savedInstanceState = savedInstanceState
        isViewCreated = true
        init(savedInstanceState)
        lazyLoad()
    }

    override fun setUserVisibleHint(isVisibleToUser: Boolean) {
        super.setUserVisibleHint(isVisibleToUser)
        if (isVisibleToUser) {
            isUIVisible = true
            lazyLoad()
        } else {
            isUIVisible = false
        }
    }

    abstract fun init(savedInstanceState: Bundle?)

    // 空实现，需要的时候才进行继承
    protected open fun lazyInit(savedInstanceState: Bundle?) {

    }

    private fun lazyLoad() {
        // 这里进行双重标记判断,是因为setUserVisibleHint会多次回调,并且会在onCreateView执行前回调,必须确保onCreateView加载完毕且页面可见,才加载数据
        if (isViewCreated && isUIVisible) {
            lazyInit(savedInstanceState)
            savedInstanceState = null
            // 数据加载完毕,恢复标记,防止重复加载
            isViewCreated = false
            isUIVisible = false
        }
    }


}