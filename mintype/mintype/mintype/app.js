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
  },
  globalData: {
    userInfo: null
  }
})
wx.loadFontFace({
  family: 'webfont',
  source: 'url("//at.alicdn.com/t/webfont_1f7b3qbimiv.eot")',
  success: function (res) {
      console.log(res.status) //  loaded
  },
  fail: function (res) {
      console.log(res.status) //  error
  },
  complete: function (res) {
      console.log(res.status);
  }
});