package com.xiaomayunkeji.arcloud.widgets

import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.content.Context
import android.graphics.*
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.view.animation.LinearInterpolator
import com.xiaomayunkeji.arcloud.R
import com.xiaomayunkeji.arcloud.ext.dp2px
import com.xiaomayunkeji.arcloud.ext.getColorById


class ScanView @JvmOverloads constructor(context: Context, attributeSet: AttributeSet? = null,
                                         defStyleAttr: Int = 0)
    : View(context, attributeSet, defStyleAttr) {

    private var w = 0f
    private var h = 0f
    private var d = 0f //六边形到边到内切圆的距离
    //设置一个Bitmap
    private lateinit var bitmap: Bitmap
    //创建该Bitmap的画布
    private lateinit var bitmapCanvas: Canvas
    private var currentH = -1f
    private var ani: ValueAnimator? = null
    private val lineStoke by lazy {
        dp2px(1f).toFloat()
    }

    private val scanPaint by lazy {
        Paint().apply {
            isAntiAlias = true
            color = getColorById(R.color.material_lightBlue_500)
            strokeWidth = dp2px(2f).toFloat()
            xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_ATOP)
        }
    }

    private val stokePaint by lazy {
        Paint().apply {
            isAntiAlias = true
            color = getColorById(R.color.material_lightBlue_600)
            strokeWidth = dp2px(1f).toFloat()
            style = Paint.Style.STROKE
        }
    }

    private val paint by lazy {
        Paint().apply {
            isAntiAlias = true
            alpha = 125
        }
    }

    private val bgPaint: Paint by lazy {
        Paint().apply {
            isAntiAlias = true
            color = Color.BLACK
        }
    }

    private val shapePaint by lazy {
        Paint().apply {
            isAntiAlias = true
            color = Color.BLACK
            xfermode = PorterDuffXfermode(PorterDuff.Mode.XOR)
        }
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        this.w = w.toFloat()
        this.h = h.toFloat()
        this.d = (w / 4 * (2 - Math.sqrt(3.0))).toFloat()//六边形到边到内切圆的距离
    }

    fun startScan() {
        ani?.cancel()
        ani = ValueAnimator.ofFloat(h / 2 - w / 2, h / 2 + w / 2)
                .apply {
                    addUpdateListener {
                        currentH = it.animatedValue as Float
                        invalidate()
                    }
                    interpolator = LinearInterpolator()
                    repeatCount = -1
                    duration = 5000
                    start()
                }
    }

    fun stopScan() {
        ani?.cancel()
    }

    @SuppressLint("DrawAllocation")
    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_4444)
        bitmapCanvas = Canvas(bitmap)
        bitmapCanvas.drawRect(RectF(0f, 0f, w, h), bgPaint)
        val hexagonPath = getHexagonPath()
        bitmapCanvas.drawPath(hexagonPath, shapePaint)
        if (currentH >= 0f) {
            bitmapCanvas.drawLine(0f, currentH, w, currentH + lineStoke, scanPaint)
        }
        bitmapCanvas.drawPath(hexagonPath, stokePaint)
        canvas?.drawBitmap(bitmap, 0f, 0f, paint)
    }

    fun getHexagonPath(): Path {
        val mPath = Path()

        val r = w / 4

        val p1x = r * 3

        val p2x = w
        val p2y = w / 2

        val p3y = w - d

        val p5x = 0f

        mPath.reset()
        mPath.moveTo(r, d)
        mPath.lineTo(p1x, d)
        mPath.lineTo(p2x, p2y)
        mPath.lineTo(p1x, p3y)
        mPath.lineTo(r, p3y)
        mPath.lineTo(p5x, p2y)
        mPath.lineTo(r, d)
        mPath.offset(0f, (h / 2 - d) / 2)

        val mMatrix = Matrix()
        val bounds = RectF()
        mPath.computeBounds(bounds, true)
        mMatrix.postRotate(90f, bounds.centerX(), bounds.centerY())
        mPath.transform(mMatrix)


        return mPath
    }
}