// pages/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    questionid: [41],
    title: "",
    array: [],
    nextquestion: [],
    select: [],
    type:"",
    mnumInput:0,
  },
  onReady: function () {
    var that=this;
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res);
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/test/getInfo',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res),
                that.setData({
                  openid:res.data,
                })
            }
          })
         console.log(that.data)
        } else {
          console.log('登录失败!' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this.data);
    this.getquestion(this);
    this.getanswer(this);
      
  },
  listenerRadioGroup: function (e) {
    console.log(e);
    this.setData({
      select: e.detail.value
    });
    //console.log(this.data.select);
    //console.log(this.data.nextquestion);
  },
  getquestion: function (e) {
    var that = this;
    //console.log(e);
    wx.request({
      url: 'http://localhost:8080/test/getQ',
      data: {
        questionid: e.data.questionid[0]
      },
      method: "GET",
      success(res) {
        //console.log(res),
          that.setData({
            questtionid: res.data.questtionid,
            title: res.data.question,
            type:res.data.type
          })
       console.log(that.data.type)
      }
    })
  },
  submit: function (e) {
    //console.log(this.data.nextquestion);
    if(this.data.nextquestion!=[]){
      this.setData({
        questionid: [this.data.nextquestion.shift()],
        
      });
      this.addreport(this);
      this.getquestion(this);
      this.getanswer(this);
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择至少一个选项',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    this.setData[{
      mnumInput:"",
    }];
    console.log(this.data.questionid);
      if(this.data.questionid==69){
        wx.switchTab({
          url: '/pages/report/report',
        })
      }
    
  },
  getanswer: function (e) {
    var that = this;
    if (e.data.questionid.length == 1) {
      wx.request({
        url: 'http://localhost:8080/test/getA',
        data: {
          questionid: that.data.questionid[0]
        },
        method: "GET",
        success(res) {
          //console.log(res);
          var n=[];
          var newarray = res.data.array;
          var newarray2=[];
          //console.log(newarray)
          for (var i = 0; i < newarray.length; i++) {
            var newarray1 = {
              nextquestion: newarray[i].nextQuestionid,
              answertext: newarray[i].answerText
            };
            newarray2 = newarray2.concat(newarray1);
           // console.log(newarray2);
          };
          //console.log(newarray2);
          that.setData({
            array: newarray2
          });
        }
      })
    }

  },
  itemSelected: function (e) {
    //console.log(e);
    var index = e.currentTarget.dataset.index;
    var item = this.data.array[index];
    item.isSelected = !item.isSelected;
    if(this.data.nextquestion.indexOf(this.data.array[index].nextquestion)>-1){
      this.setData({
        array: this.data.array,
        select:this.data.select.concat(index)
        //nextquestion:this.data.nextquestion.concat(this.data.array[index].nextquestion)
      });
    }else{
      let newarray=[];
      newarray=this.data.nextquestion.concat(this.data.array[index].nextquestion);
      newarray.sort(function(a, b){return a - b});
      this.setData({
        array: this.data.array,
        nextquestion:newarray,
        select:this.data.select.concat(index)
      });
    }
    
   //console.log(this.data.array);
  },
  numInput:function(e){
    console.log(e);
    this.setData({
      mnumInput:e.detail.value
    })
  },
  addreport:function(e){
    var that = this;
    //console.log(e);
    wx.request({
      url: 'http://localhost:8080/test/getQ',
      data: {
        questionid: e.data.questionid[0],
        index:e.currentTarget.dataset.index
      },
      method: "GET",
      success(res) {
       console.log(res)
       
      }
    })
  }
})