package com.xiaomayunkeji.arcloud.base

/**
 * Created by daidaijie on 17-9-28.
 */
interface BasePresenter {
    // 供View订阅Presenter时调用
    fun subscribe()

    // 供View取消订阅Presenter时调用
    fun unsubscribe()
}