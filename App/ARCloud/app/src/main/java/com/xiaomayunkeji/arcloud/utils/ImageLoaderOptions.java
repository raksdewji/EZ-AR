package com.xiaomayunkeji.arcloud.utils;

import android.support.annotation.DrawableRes;

import com.bumptech.glide.load.resource.bitmap.BitmapTransformation;

/**
 * Created by liyujie on 2017/3/8.
 */

public class ImageLoaderOptions {

    public static final int NULL_DRAWABLE = -1;

    @DrawableRes
    private int errorDrawable = NULL_DRAWABLE;  //加载错误的时候显示的drawable

    @DrawableRes
    private int defaultDrawable = NULL_DRAWABLE;//加载中的时候显示的drawable

    private boolean showAni = true;

    private BitmapTransformation mBitmapTransformation;

    private ImageLoaderOptions() {

    }

    public static class Builder {
        private ImageLoaderOptions options = new ImageLoaderOptions();

        public Builder() {
        }

        public Builder setErrorDrawable(int errorDrawable) {
            options.errorDrawable = errorDrawable;
            return this;
        }

        public Builder setDefaultDrawable(int defaultDrawable) {
            options.defaultDrawable = defaultDrawable;
            return this;
        }

        public Builder setShowAni(boolean showAni) {
            options.showAni = showAni;
            return this;
        }

        public Builder setBitmapTransformation(BitmapTransformation bitmapTransformation) {
            options.mBitmapTransformation = bitmapTransformation;
            return this;
        }

        public ImageLoaderOptions build() {
            return options;
        }

    }

    public int getErrorDrawable() {
        return errorDrawable;
    }

    public int getDefaultDrawable() {
        return defaultDrawable;
    }

    public BitmapTransformation getBitmapTransformation() {
        return mBitmapTransformation;
    }


    public boolean isShowAni() {
        return showAni;
    }


}
