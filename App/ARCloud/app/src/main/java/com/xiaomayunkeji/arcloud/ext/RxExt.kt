package com.xiaomayunkeji.arcloud.ext

import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

/**
 * Created by daidaijie on 17-9-29.
 */

fun <T> Observable<T>.from_computation(): Observable<T> = this.subscribeOn(Schedulers.computation())

fun <T> Observable<T>.from_io(): Observable<T> = this.subscribeOn(Schedulers.io())

fun <T> Observable<T>.to_ui(): Observable<T> = this.observeOn(AndroidSchedulers.mainThread())

fun <T> Observable<T>.late(milltSeconds: Long = 500L): Observable<T> = this.delay(milltSeconds, java.util.concurrent.TimeUnit.MILLISECONDS)

fun <T> Observable<T>.to_io(): Observable<T> = this.observeOn(Schedulers.io())

fun <T> Observable<T>.to_computation(): Observable<T> = this.observeOn(Schedulers.computation())

fun <T : List<*>> Observable<T>.ifNoCacheThenToRemote(remote: Observable<T>) = this.flatMap {
    if (it.isEmpty()) {
        remote
    } else {
        this
    }
}


