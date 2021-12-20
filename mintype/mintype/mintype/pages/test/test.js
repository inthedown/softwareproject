// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      radioCheck:false
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

  },
  startquit: function(){
    var radioCheck=this.data.radioCheck
    console.log(radioCheck)
    if(radioCheck!=true){
      wx.showModal({content:"请查看隐私协议并勾选"})
    }else{
      wx.navigateTo({
        url: '/pages/answer/answer',
      })
    }
    
},
radioClick:function(){
  if(this.data.radioCheck==true){
    this.setData({
      radioCheck:false
    })
  }else{
    this.setData({
      radioCheck:true
    })
  }
  
}
})