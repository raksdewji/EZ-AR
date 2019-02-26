package com.xiaomayunkeji.arcloud.ui.main

import android.Manifest
import android.annotation.TargetApi
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.media.MediaPlayer
import android.media.projection.MediaProjectionManager
import android.os.Build
import android.os.Bundle
import android.support.annotation.RequiresApi
import android.util.Log
import android.view.*
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import cn.easyar.Engine
import com.tbruyelle.rxpermissions2.RxPermissions
import com.xiaomayunkeji.arcloud.C
import com.xiaomayunkeji.arcloud.R
import com.xiaomayunkeji.arcloud.base.BaseActivity
import com.xiaomayunkeji.arcloud.data.Vedio
import com.xiaomayunkeji.arcloud.data.VedioType
import com.xiaomayunkeji.arcloud.ext.to_ui
import com.xiaomayunkeji.arcloud.ext.toastE
import com.xiaomayunkeji.arcloud.ext.toastS
import com.xiaomayunkeji.arcloud.widgets.arview.GLView
import com.xiaomayunkeji.arcloud.widgets.arview.VideoStatus
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : BaseActivity() {

    override val contentViewId = R.layout.activity_main

    private var glView: GLView? = null

    private val projectionManager by lazy {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            getSystemService(MEDIA_PROJECTION_SERVICE) as MediaProjectionManager
        } else {

        }
    }

    private val videoSFView by lazy {
        SurfaceView(this@MainActivity).apply {
            holder.setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS)
            holder.addCallback(object : SurfaceHolder.Callback {
                override fun surfaceChanged(holder: SurfaceHolder?, format: Int, width: Int, height: Int) {

                }

                override fun surfaceDestroyed(holder: SurfaceHolder?) {
                }

                override fun surfaceCreated(holder: SurfaceHolder?) {

                }
            })
            setZOrderMediaOverlay(true)
        }
    }

    private var mediaPlayer: MediaPlayer? = null

    override fun init(savedInstanceState: Bundle?) {
        window.setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON, WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        if (!Engine.initialize(this, C.ar_key)) {
            Log.e("HelloAR", "Initialization Failed.")
        }

        glView = GLView(this).apply {
            setOnTargetStatusChangeListener { vedio, mode, status ->
                Log.d(TAG, "mode = $mode, status=$status")
                if (mode != VedioType.TYPE_ASSETS_FULL_SCREEN) {
                    return@setOnTargetStatusChangeListener
                }
                runOnUiThread {
                    if (status == VideoStatus.STATUS_FOUND && vedio != null) {
                        videoSFView.visibility = View.VISIBLE
                        playVideo(vedio)
                    } else if (status == VideoStatus.STATUS_LOST) {
                        videoSFView.visibility = View.GONE
                        stopVideo()
                    }
                }
            }
        }


        RxPermissions(this)
                .request(Manifest.permission.CAMERA,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE,
                        Manifest.permission.RECORD_AUDIO)
                .to_ui()
                .subscribe({ granted ->
                    if (granted) {
                        toastS("Permissions Success")
                        fl_preview.addView(glView, ViewGroup.LayoutParams(MATCH_PARENT, MATCH_PARENT))
                        fl_preview.addView(videoSFView)
                    } else {
                        toastE("Permissions Failed")
                    }
                }, {
                    toastE("Please enable permissions")
                })
        sv_main.post {
            sv_main.startScan()
        }
    }

    private fun stopVideo() {
        mediaPlayer?.let {
            it.stop()
            it.release()
        }
        mediaPlayer = null
    }

    private fun playVideo(vedio: Vedio) {
        if (vedio.type == VedioType.TYPE_ASSETS_FULL_SCREEN) {
            val fd = assets.openFd(vedio.name)
            mediaPlayer = MediaPlayer().apply {
                setAudioStreamType(AudioManager.STREAM_MUSIC)
                setDataSource(fd.fileDescriptor, fd.startOffset, fd.length);
                setOnPreparedListener {
                    setDisplay(videoSFView.holder)
                    start()
                }
                setOnCompletionListener {
                    mediaPlayer?.release()
                }
                prepare()
            }
        }
    }


    override fun onResume() {
        super.onResume()
        glView?.onResume()
    }

    override fun onPause() {
        stopVideo()
        glView?.onPause()
        super.onPause()
    }

    companion object {
        const val TAG = "MainActivity"

        @JvmStatic
        fun newIntent(context: Context) = Intent(context, MainActivity::class.java)
    }
}
