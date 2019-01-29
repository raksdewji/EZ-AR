//package com.xiaomayunkeji.arcloud.adapter
//
//import android.app.Activity
//import android.content.Context
//import android.view.LayoutInflater
//import android.view.View
//import com.bigkoo.convenientbanner.holder.CBViewHolderCreator
//import com.bigkoo.convenientbanner.holder.Holder
//import com.daijie.ksyllabusapp.R
//import com.daijie.ksyllabusapp.data.Banner
//import com.daijie.ksyllabusapp.data.ImageLoaderOptions
//import com.daijie.ksyllabusapp.utils.ImageLoader
//import com.xiaomayunkeji.arcloud.R
//import kotlinx.android.synthetic.main.item_banner.view.*
//
///**
// * Created by daidaijie on 2017/10/18.
// */
//class BannerImageHolderView(val activity: Activity) : Holder<Banner> {
//
//    companion object {
//        @JvmStatic
//        var sIndicator = intArrayOf(R.drawable.ic_page_indicator, R.drawable.ic_page_indicator_focused)
//    }
//
//    lateinit var mView: View
//
//    override fun createView(context: Context): View {
//        mView = LayoutInflater.from(context).inflate(R.layout.item_banner, null, false)
//        return mView
//    }
//
//    override fun UpdateUI(context: Context, position: Int, data: Banner) {
//        val options = ImageLoaderOptions().apply {
//            errorDrawable = R.drawable.banner_default
//        }
//        ImageLoader.loadImage(activity, mView.bannerImageView, data.url, options)
//    }
//
//    class BannerViewHolderCreator(val activity: Activity) : CBViewHolderCreator<Any> {
//        override fun createHolder(): Any = BannerImageHolderView(activity)
//    }
//
//}