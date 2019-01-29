package com.xiaomayunkeji.arcloud.widgets.arview;

import android.support.annotation.IntRange;
import android.support.annotation.Nullable;

import com.xiaomayunkeji.arcloud.data.Vedio;

public interface OnTargetStatusChangeListener {
    void onTargetStatusChange(
            @Nullable Vedio target,
            @IntRange(from = 0, to = 3) int mode,
            @IntRange(from = 0, to = 3) int status);
}
