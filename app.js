// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    //创建一个db 对象
    wx.db = {}

    // 普通弹窗
    wx.db.toast = (title, duration = 1500) => {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: duration
      })
    }

    // 带错误的弹窗
    wx.db.toastError = (title, duration = 1500) => {
      wx.showToast({
        title: title,
        icon: 'none',
        image: "/assets/imgs/error.png",
        duration: duration
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
