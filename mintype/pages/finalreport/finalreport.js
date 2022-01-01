// pages/demo04/demo04.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:null,
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index:options.index
    })
    console.log(this.data.index)
    this.getReport()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getReport: function () {

    var that = this;
    console.log(this.data.index)
      wx.request({
        url: 'http://localhost:8080/test/getRepMax',

        data: {
          openid: app.globalData.openid,
          num:this.data.index
        },
        method: "GET",
        success(res) {
          console.log(res),
            that.setData({
              array:res.data.array
            })

        }
      })
  },
  
})