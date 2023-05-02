var e = require("../../utils/open.js");

require("../../utils/config.js");

Page({
    data: {
        xiugaistate: 1,
        tishi:"",
        urldata: "",
        oldmd5: "",
        newmd5: "",
        durationtime: "",
        videosize: "",
        tishitext: "点击上方+号添加视频修改MD5",
        showqushuiyin: 1
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "一键修改MD5，轻松上热门",
            path: "/pages/md5/index",
            imageUrl: "/pics/share.jpg",
            success: function(e) {
                wx.showToast({
                    title: "分享成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "分享失败",
                    icon: "none",
                    duration: 2e3
                });
            }
        };
    },
    addvideobutton: function() {
        var t = this;
        this.time = new Date().getTime(), wx.chooseVideo({
            sourceType: [ "album" ],
            success: function(i) {
                console.log("1");
                var n = e.duration(i.duration), o = e.kb(i.size), s = wx.getFileSystemManager();
                wx.getFileInfo({
                    filePath: i.tempFilePath,
                    success: function(e) {
                        t.setData({
                            oldmd5: e.digest,
                            durationtime: n,
                            videosize: o
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                }), s.saveFile({
                    tempFilePath: i.tempFilePath,
                    filePath: wx.env.USER_DATA_PATH + "/" + t.time + ".mp4",
                    success: function(e) {
                        s.appendFile({
                            filePath: wx.env.USER_DATA_PATH + "/" + t.time + ".mp4",
                            data: "01",
                            success: function(e) {
                                wx.getFileInfo({
                                    filePath: wx.env.USER_DATA_PATH + "/" + t.time + ".mp4",
                                    success: function(e) {
                                        "getFileInfo:ok" == e.errMsg && t.setData({
                                            newmd5: e.digest,
                                            urldata: wx.env.USER_DATA_PATH + "/" + t.time + ".mp4",
                                            xiugaistate: 2
                                        });
                                    }
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    resetvideo: function() {
        var e = this;
        wx.getFileSystemManager().unlink({
            filePath: wx.env.USER_DATA_PATH + "/" + e.time + ".mp4",
            success: function(t) {
                "unlink:ok" == t.errMsg && e.setData({
                    xiugaistate: 1
                });
            }
        });
    },
    savevideo: function() {
        var e = this, t = wx.getFileSystemManager();
        wx.saveVideoToPhotosAlbum({
            filePath: wx.env.USER_DATA_PATH + "/" + e.time + ".mp4",
            success: function(i) {
                "saveVideoToPhotosAlbum:ok" == i.errMsg && t.unlink({
                    filePath: wx.env.USER_DATA_PATH + "/" + e.time + ".mp4",
                    success: function(t) {
                        "unlink:ok" == t.errMsg && e.setData({
                            xiugaistate: 1,
                            tishitext: "视频保存成功,请到手机相册中查看"
                        });
                    }
                });
            },
            fail: function(t) {
                "saveVideoToPhotosAlbum:fail auth deny" == t.errMsg ? wx.showModal({
                    title: "保存失败",
                    content: "你需要设置授权保存到相册",
                    cancelText: "不设置",
                    confirmText: "去设置",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {}
                        }) : e.cancel;
                    }
                }) : "saveVideoToPhotosAlbum:fail invalid video" == t.errMsg && e.setData({
                    tishitext: "视频保存失败,联系客服修复"
                });
            }
        });
    }
});