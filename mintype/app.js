// app.js
App({
  globalData: {
    openid: null,
    userInfo:null,
    hasUserInfo:false,
  },
  onLaunch() {
    // 展示本地存储能力
    const that = this;
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    this.userLogin()
  },
  loadFontFace() {
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
    })
  },
  userLogin:function(){
    let that = this;
    let promise = new Promise((resolve, reject)=>{
      wx.login({
        success: function (res) {
          wx.request({
            url: 'http://localhost:8080/test/getInfo',
            data: {
              code: res.code,
              type:1
            },
            success: function (res) {
              that.globalData.openid = res.data
              console.log(that.globalData.openid)
              resolve(res);
            },
          })
        },
        fail(error) {
          reject(error)
        }
      }),
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    })
    return promise;
  },

})