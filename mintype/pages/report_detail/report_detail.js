// pages/report_detail/report_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    openid: null,
    userInfo:app.globalData.userInfo,
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  this.itemSelected();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {
  
    app.userLogin().then((res)=>{
      this.getReport();
     
  },(error)=>{
      console.log('数据请求失败:'+error)
  });
    
  },
  tiaozhuan: function () {
    wx.navigateTo({
      url: '/pages/exact/exact',
    })
  },
  getReport: function () {
    var that = this;
      wx.request({
        url: 'http://localhost:8080/test/getRepSmall',
        data: {
          openid: app.globalData.openid
        },
        method: "GET",
        success(res) {
          console.log(res),
            that.setData({
              array:res.data.array
            })

        }
      })
  },itemSelected: function (e) {
   // console.log(e);
    this.setData({
      index:e.currentTarget.dataset.index
    })
   
  },
  numInput:function(e){
    console.log(e);
    this.setData({
      mnumInput:e.detail.value
    })
  },
  tofinalreport:function(e){
    console.log(e)
    console.log(e.currentTarget.dataset.index)
    console.log(this.data.index)
    wx.navigateTo({
      url:'/pages/finalreport/finalreport?index='+this.data.index
    })
  },
  toproduct:function(e){
    wx.navigateTo({
      url:'/pages/product/product?index='+this.data.index
    })
  }
})