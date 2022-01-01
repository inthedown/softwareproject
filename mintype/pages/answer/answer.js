// pages/answer/answer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    questionid: [8],
    title: "",
    array: [],
    nextquestion: [],
    select: [],
    type: "",
    inputitem: null,
  },
  onReady: function () {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          //console.log(res);
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/test/getInfo',
            data: {
              code: res.code,
              type:2
              
            },
            success(res) {
             // console.log(res),
                that.setData({
                  openid: res.data,
                })
            }
          })
          //console.log(that.data)
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
    this.getquestion();
    this.getanswer();
  
  },
  
  getquestion: function (e) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/test/getQ',
      data: {
        questionid: that.data.questionid[0]
      },
      method: "GET",
      success(res) {
        that.setData({
          questionid: res.data.questionid,
          title: res.data.question,
          type: res.data.type
        })
        //console.log(that.data.type)
      }
    })
  },
  submit: function (e) {
    //获取选择的nextquestionid
    var list = [];
    var array = this.data.array;
    for (var i = 0; i < array.length; i++) {
      if (array[i].isSelected == true) {
        list.push(array[i].nextquestion);
        this.setData({
          select:this.data.select.concat(i)
        })
      }
    }
    //console.log(this.data.select);
    //单选题选了多个
    if (this.data.type == 's' && list.length != 1) {
      wx.showModal({
        title: '提示',
        content: '请选择最多一个选项',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
     // console.log(this.data.array)
      //输入题
      if (this.data.type == 'i') {
        //输入为空
        if (this.data.inputitem == null) {
          wx.showModal({
            title: '提示',
            content: '请输入内容',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          console.log( this.data.array);
          console.log( this.data.array[0].nextquestion);
        
          var a=this.data.array[0].nextquestion;
          this.setData({
            questionid:[a],
            inputitem: null
          });
          console.log(this.data.questionid);
          this.addreport(this);
          this.getquestion(this);
          this.getanswer(this);
        }
      } else {
        list =list.concat(this.data.nextquestion);
        list = Array.from(new Set(list))
        list = list.sort(function (a, b) { return a - b });
        
        this.setData({
          nextquestion:list,
        });
        console.log("获取选中选项下个问题列表" + list);
        console.log(this.data.nextquestion);
      
        if (this.data.nextquestion.length!=0) {
          console.log("1111")
          this.setData({
            questionid: [this.data.nextquestion.shift()],
          });
          console.log(this.data.nextquestion);
          this.addreport(this);
          this.getquestion(this);
          this.getanswer(this);
          
        }  //一个都没有选择 
        else {
          wx.showModal({
            title: '提示',
            content: '请选择至少一个选项',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (this.data.questionid == 69) {
          wx.switchTab({
            url: '/pages/report/report',
          })
        }
      }
    }
    this.setData({
      select:[],
    });
  },
  getanswer: function (e) {
    var that = this;
    if (that.data.questionid.length == 1) {
      wx.request({
        url: 'http://localhost:8080/test/getA',
        data: {
          questionid: that.data.questionid[0]
        },
        method: "GET",
        success(res) {
          var n = [];
          var newarray = res.data.array;
          var newarray2 = [];
          for (var i = 0; i < newarray.length; i++) {
            var newarray1 = {
              nextquestion: newarray[i].nextQuestionid,
              answertext: newarray[i].answerText
            };
            newarray2 = newarray2.concat(newarray1);
          };
          that.setData({
            array: newarray2
          });
        }
      })
    }
  },
  itemSelected: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.array[index];
    item.isSelected = !item.isSelected;
    console.log("选中时状态:" + item.isSelected);
    this.setData({
      array: this.data.array,
    });
  },
  numInput: function (e) {
    
    this.setData({
      inputitem: e.detail.value,
     // nextquestion:this.data.array[0].nextquestion
    })
    //console.log(this.data.nextquestion);
  },
  addreport: function (e) {
    //console.log(this.data.select);
    for(var i=0;i<this.data.select.length;i++){
      wx.request({
        url: 'http://localhost:8080/test/addRep',
        data: {
          openid:this.data.openid,
          questionid: this.data.questionid[0],
          index: this.data.select[i]
        },
        method: "GET",
        success(res) {
         // console.log(res)
        }
      })
    }
   
  }
})  