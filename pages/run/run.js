// pages/run/run.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: "",
    password: "",
    step: "",
    shuchu: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getzh: function (e) {
    const value = e.detail.value;
    this.setData({
      account: value
    })
    //console.log(this.data.account)
  },
  getmm: function (e) {
    const value = e.detail.value;
    this.setData({
      password: value
    })
  },
  getbs: function (e) {
    const value = e.detail.value;
    this.setData({
      step: value
    })
  },
  getrun: function () {
    var account = this.data.account;
    var password = this.data.password;
    var step = this.data.step;
    var that = this

    if (account.length == 0 | password.length == 0 | step.length == 0) {
      wx.showToast({
        icon: "'error'",
        title: "请输入完整内容",
      })
      return 0
    } else {
      that.setData({
        shuchu: "正在请求中..."
      });
      wx.showLoading({
        title: '加载中',
      })

      wx.request({
        url: 'https://api.oddfar.com/g/run/motion.php',
        data: {
          user: account,
          password: password,
          step: step,
        },
        method: 'GET',
        success(res) {
          wx.hideLoading();
          // var json = JSON.parse(JSON.stringify(res.data));
          that.setData({
            shuchu: res.data
          });
        },
        fail(res) {
          wx.hideLoading();
          console.log(res.errMsg)
        }
      })

    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "某米运动免费刷步数小程序",
      path: "/pages/run/run",
      imageUrl: "/pics/run.jpg",
      success: function (e) {
        wx.showToast({
          title: "分享成功",
          icon: "success",
          duration: 2e3
        });
      },
      fail: function (e) {
        wx.showToast({
          title: "分享失败",
          icon: "none",
          duration: 2e3
        });
      }
    };

  }
})