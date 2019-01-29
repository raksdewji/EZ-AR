//================================================================================================================================
//
//  Copyright (c) 2015-2018 VisionStar Information Technology (Shanghai) Co., Ltd. All Rights Reserved.
//  EasyAR is the registered trademark or trademark of VisionStar Information Technology (Shanghai) Co., Ltd in China
//  and other countries for the augmented reality technology developed by VisionStar Information Technology (Shanghai) Co., Ltd.
//
//================================================================================================================================

package com.xiaomayunkeji.arcloud.widgets.arview;

import android.opengl.GLES20;
import android.util.Log;

import com.xiaomayunkeji.arcloud.data.NameVedioMap;
import com.xiaomayunkeji.arcloud.data.Vedio;
import com.xiaomayunkeji.arcloud.data.VedioType;

import java.util.ArrayList;

import cn.easyar.CameraCalibration;
import cn.easyar.CameraDevice;
import cn.easyar.CameraDeviceFocusMode;
import cn.easyar.CameraDeviceType;
import cn.easyar.CameraFrameStreamer;
import cn.easyar.Frame;
import cn.easyar.FunctorOfVoidFromPointerOfTargetAndBool;
import cn.easyar.ImageTarget;
import cn.easyar.ImageTracker;
import cn.easyar.Renderer;
import cn.easyar.StorageType;
import cn.easyar.Target;
import cn.easyar.TargetInstance;
import cn.easyar.TargetStatus;
import cn.easyar.Vec2I;
import cn.easyar.Vec4I;

public class HelloAR {
    private CameraDevice camera;
    private CameraFrameStreamer streamer;
    private ArrayList<ImageTracker> trackers; // 一系列ImageTracker
    private Renderer videobg_renderer;
    private ArrayList<VideoRenderer> video_renderers;
    private VideoRenderer current_video_renderer;
    private int tracked_target = 0;
    private int active_target = 0;
    private int active_target_mode;
    private ARVideo video = null;
    private boolean viewport_changed = false;
    private Vec2I view_size = new Vec2I(0, 0);
    private int rotation = 0;
    private Vec4I viewport = new Vec4I(0, 0, 1280, 720);

    private OnTargetStatusChangeListener onTargetStatusChangeListener;

    public HelloAR() {
        trackers = new ArrayList<>();
    }

    public void setOnTargetStatusChangeListener(OnTargetStatusChangeListener onTargetStatusChangeListener) {
        this.onTargetStatusChangeListener = onTargetStatusChangeListener;
    }

    private void loadFromImage(ImageTracker tracker, String path) {
        ImageTarget target = new ImageTarget();
        String jstr = "{\n"
                + "  \"images\" :\n"
                + "  [\n"
                + "    {\n"
                + "      \"image\" : \"" + path + "\",\n"
                + "      \"name\" : \"" + path.substring(0, path.indexOf(".")) + "\"\n"
                + "    }\n"
                + "  ]\n"
                + "}";
        target.setup(jstr, StorageType.Assets | StorageType.Json, "");
        tracker.loadTarget(target, new FunctorOfVoidFromPointerOfTargetAndBool() {
            @Override
            public void invoke(Target target, boolean status) {
                Log.i("HelloAR", String.format("load target (%b): %s (%d)", status, target.name(), target.runtimeID()));
            }
        });
    }

    private void loadAllFromJsonFile(ImageTracker tracker, String path) {
        for (ImageTarget target : ImageTarget.setupAll(path, StorageType.Assets)) {
            tracker.loadTarget(target, new FunctorOfVoidFromPointerOfTargetAndBool() {
                @Override
                public void invoke(Target target, boolean status) {
                    try {
                        Log.i("HelloAR", String.format("load target (%b): %s (%d)", status, target.name(), target.runtimeID()));
                    } catch (Throwable ex) {
                    }
                }
            });
        }
    }

    public boolean initialize() {
        camera = new CameraDevice();
        streamer = new CameraFrameStreamer();
        streamer.attachCamera(camera);

        boolean status = true;
        status &= camera.open(CameraDeviceType.Default);
        camera.setSize(new Vec2I(1280, 720));

        if (!status) {
            return status;
        }
        ImageTracker tracker = new ImageTracker();
        tracker.attachStreamer(streamer);
        loadAllFromJsonFile(tracker, "targets.json");
        loadFromImage(tracker, "namecard.jpg");
        trackers.add(tracker);

        return status;
    }

    public void dispose() {
        if (video != null) {
            video.dispose();
            video = null;
        }
        tracked_target = 0;
        active_target = 0;

        for (ImageTracker tracker : trackers) {
            tracker.dispose();
        }
        trackers.clear();
        video_renderers.clear();
        current_video_renderer = null;
        if (videobg_renderer != null) {
            videobg_renderer.dispose();
            videobg_renderer = null;
        }
        if (streamer != null) {
            streamer.dispose();
            streamer = null;
        }
        if (camera != null) {
            camera.dispose();
            camera = null;
        }
    }

    public boolean start() {
        boolean status = true;
        status &= (camera != null) && camera.start();
        status &= (streamer != null) && streamer.start();
        camera.setFocusMode(CameraDeviceFocusMode.Continousauto);
        for (ImageTracker tracker : trackers) {
            status &= tracker.start();
        }
        return status;
    }

    public boolean stop() {
        boolean status = true;
        for (ImageTracker tracker : trackers) {
            status &= tracker.stop();
        }
        status &= (streamer != null) && streamer.stop();
        status &= (camera != null) && camera.stop();
        return status;
    }

    public void initGL() {
        if (active_target != 0) {
            video.onLost();
            video.dispose();
            video = null;
            tracked_target = 0;
            active_target = 0;
        }
        if (videobg_renderer != null) {
            videobg_renderer.dispose();
        }
        videobg_renderer = new Renderer();
        video_renderers = new ArrayList<>();
        for (int k = 0; k < VideoRendererHolder.getLocalSize(); k += 1) {
            VideoRenderer video_renderer = new VideoRenderer();
            video_renderer.init();
            video_renderers.add(video_renderer);
        }
        current_video_renderer = null;
    }

    public void resizeGL(int width, int height) {
        view_size = new Vec2I(width, height);
        viewport_changed = true;
    }

    private void updateViewport() {
        CameraCalibration calib = camera != null ? camera.cameraCalibration() : null;
        int rotation = calib != null ? calib.rotation() : 0;
        if (rotation != this.rotation) {
            this.rotation = rotation;
            viewport_changed = true;
        }
        if (viewport_changed) {
            Vec2I size = new Vec2I(1, 1);
            if ((camera != null) && camera.isOpened()) {
                size = camera.size();
            }
            if (rotation == 90 || rotation == 270) {
                size = new Vec2I(size.data[1], size.data[0]);
            }
            float scaleRatio = Math.max((float) view_size.data[0] / (float) size.data[0], (float) view_size.data[1] / (float) size.data[1]);
            Vec2I viewport_size = new Vec2I(Math.round(size.data[0] * scaleRatio), Math.round(size.data[1] * scaleRatio));
            viewport = new Vec4I((view_size.data[0] - viewport_size.data[0]) / 2, (view_size.data[1] - viewport_size.data[1]) / 2, viewport_size.data[0], viewport_size.data[1]);

            if ((camera != null) && camera.isOpened())
                viewport_changed = false;
        }
    }

    private static final String TAG = "HelloAR";

    public void render() {
        GLES20.glClearColor(1.f, 1.f, 1.f, 1.f);
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);

        if (videobg_renderer != null) {
            Vec4I default_viewport = new Vec4I(0, 0, view_size.data[0], view_size.data[1]);
            GLES20.glViewport(default_viewport.data[0], default_viewport.data[1], default_viewport.data[2], default_viewport.data[3]);
            if (videobg_renderer.renderErrorMessage(default_viewport)) {
                return;
            }
        }

        if (streamer == null) {
            return;
        }
        Frame frame = streamer.peek();
        try {
            updateViewport();
            GLES20.glViewport(viewport.data[0], viewport.data[1], viewport.data[2], viewport.data[3]);

            if (videobg_renderer != null) {
                videobg_renderer.render(frame, viewport);
            }

            ArrayList<TargetInstance> targetInstances = frame.targetInstances();
            if (targetInstances.size() > 0) {
                TargetInstance targetInstance = targetInstances.get(0);
                Target target = targetInstance.target();
                int status = targetInstance.status();
                if (status == TargetStatus.Tracked) {

                    String target_name = target.name();
                    Vedio vedio = NameVedioMap.getVedioByName(target_name);
                    if (vedio == null) {
                        return;
                    }

                    active_target_mode = vedio.getType();
                    int id = target.runtimeID();
                    if (active_target != 0 && active_target != id) {
                        if (onTargetStatusChangeListener != null) {
                            onTargetStatusChangeListener.onTargetStatusChange(
                                    vedio, vedio.getType(), VideoStatus.STATUS_LOST);
                        }
                        if (vedio.getType() == VedioType.TYPE_HTTP ||
                                vedio.getType() == VedioType.TYPE_ASSETS) {
                            video.onLost();
                            video.dispose();
                            video = null;
                        }
                        tracked_target = 0;
                        active_target = 0;
                    }


                    if (tracked_target == 0) {
                        if (onTargetStatusChangeListener != null) {
                            onTargetStatusChangeListener.onTargetStatusChange(
                                    vedio, vedio.getType(), VideoStatus.STATUS_FOUND);
                        }


                        if (vedio.getType() == VedioType.TYPE_HTTP ||
                                vedio.getType() == VedioType.TYPE_ASSETS) {
                            if (video == null && video_renderers.size() > 0) {
                                VideoRenderer videoRender = video_renderers.get(VideoRendererHolder.getRenderIndex(target_name));
                                if (videoRender.texId() != 0) {
                                    video = new ARVideo();
                                    if (vedio.getType() == VedioType.TYPE_ASSETS) {
                                        video.openVideoFile(vedio.getName(), videoRender.texId());
                                    } else if (vedio.getType() == VedioType.TYPE_HTTP) {
                                        video.openStreamingVideo(vedio.getName(), videoRender.texId());
                                    }
                                    current_video_renderer = videoRender;
                                }
                            }
                            if (video != null) {
                                video.onFound();
                                tracked_target = id;
                                active_target = id;
                            }

                        } else {
                            current_video_renderer = null;
                            tracked_target = id;
                            active_target = id;
                        }
                    }

                    ImageTarget imagetarget = target instanceof ImageTarget ? (ImageTarget) (target) : null;
                    if (imagetarget != null) {
                        if (current_video_renderer != null) {
                            video.update();
                            if (video.isRenderTextureAvailable()) {
                                current_video_renderer.render(camera.projectionGL(0.2f, 500.f), targetInstance.poseGL(), imagetarget.size());
                            }
                        }
                    }


                }
            } else {
                if (tracked_target != 0) {
                    if (onTargetStatusChangeListener != null) {
                        onTargetStatusChangeListener.onTargetStatusChange(
                                null,
                                active_target_mode, VideoStatus.STATUS_LOST);
                    }
                    if (video != null) {
                        video.onLost();
                    }
                    tracked_target = 0;
                }
            }
        } finally {
            frame.dispose();
        }
    }
}
