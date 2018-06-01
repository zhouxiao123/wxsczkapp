// pages/to_answer/to_answer.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askid:0,
    oid:'',
    array:[],
    path:[],
    msg:'',
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.setData({
      askid: options.askid
    })

    var value = wx.getStorageSync('oid')
    //console.log(value)
    if (value) {
      that.setData({ oid: value })
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            //console.log(res);
            //发起网络请求
            wx.request({
              url: app.globalData.baseUrl + 'wx/login',
              data: {
                code: res.code
              },
              success: function (res) {
                if (res.data == "") {
                  wx.showModal({
                    title: '提示',
                    content: '获取用户登录信息失败',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
                wx.setStorageSync('oid', res.data)
                //继续处理上面的
                that.setData({ oid: res.data })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
            wx.showModal({
              title: '提示',
              content: '获取用户登录状态失败',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/ask_detail',
      data: {
        id: options.askid
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          item: res.data
        })
        wx.hideLoading()
      }
    })
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
  addpic:function(){
    var that = this
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          array:res.tempFilePaths
        })
        //console.log(tempFilePaths)
      }
    })
  }
  , setValue: function (event) {

    this.setData({
      msg: event.detail.value
    });
  },
sendMsg:function(){
  var that = this
  //console.log(that.data.msg)
  if (that.data.msg.length == "0") {
    wx.showModal({
      title: '提示',
      content: '请输入回复内容',
      showCancel: false,
      success: function (res) {

      }
    })

  } else {

    wx.showLoading({
      mask: true,
      title: '加载中'
    })

var ar = that.data.array
if(ar.length ==0){
  wx.request({
    url: app.globalData.baseUrl + 'wx/save_ask_answer',
    data: {
      oid: that.data.oid,
      answercontent: that.data.msg,
      askid: that.data.askid,
      answerid: 0
    },
    success: function (res) {
      //console.log(res.data)
      if (res.data == "ok") {
        wx.showModal({
          title: '提示',
          content: '回复成功',
          showCancel: false,
          success: function (res) {
            wx.hideLoading()
            var prePage = getCurrentPages()[parseInt(getCurrentPages().length) - 2];
            prePage.reload()
            wx.navigateBack({

            })



          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请先填写资料',
          showCancel: false,
          success: function (res) {
            wx.navigateTo({
              url: '../personal_info/personal_info'
            })
          }
        })
      }
      wx.hideLoading()
    }
  })
} else {
for(var i in ar){
    wx.uploadFile({
      url: app.globalData.baseUrl + 'upload/uploadFile',
      filePath: ar[i],
      name: 'file',
      success: function (res) {
        //console.log(res.data)
        that.data.path.push(res.data)
        if (that.data.path.length==ar.length){
          //console.log("over")
          //wx.hideLoading()
          wx.request({
            url: app.globalData.baseUrl + 'wx/save_ask_answer',
            data: {
              oid: that.data.oid,
              answercontent: that.data.msg,
              askid: that.data.askid,
              answerid: 0,
              path: that.data.path
            },
            success: function (res) {
              //console.log(res.data)
              if (res.data == "ok") {
                wx.showModal({
                  title: '提示',
                  content: '回复成功',
                  showCancel: false,
                  success: function (res) {
                    wx.hideLoading()
                    var prePage = getCurrentPages()[parseInt(getCurrentPages().length) - 2];
                    prePage.reload()
                    wx.navigateBack({

                    })


                    
                  }
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '请先填写资料',
                  showCancel: false,
                  success: function (res) {
                    wx.navigateTo({
                      url: '../personal_info/personal_info'
                    })
                  }
                })
              }
              wx.hideLoading()
            }
          })
        }


      }


    })
}
}


    /*wx.showLoading({
      mask: true,
      title: '加载中'
    })*/
    /*wx.request({
      url: app.globalData.baseUrl + 'wx/save_ask_answer',
      data: {
        oid: this.data.oid,
        answercontent: this.data.msg,
        askid: this.data.askid,
        answerid: 0
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data == "ok") {
          wx.showModal({
            title: '提示',
            content: '回复成功',
            showCancel: false,
            success: function (res) {
              that.setData({
                msg: ''
              });

              wx.showLoading({
                mask: true,
                title: '加载中'
              })
              wx.request({
                url: app.globalData.baseUrl + 'wx/askListDetail',
                data: {
                  askid: that.data.item.ask.askId,
                  oid: that.data.oid
                },
                success: function (res) {
                  //console.log(res.data)
                  res.data.ask.createTime = transDate(res.data.ask.createTime);
                  for (var i in res.data.answer) {
                    res.data.answer[i].createtime = transDate(res.data.answer[i].createtime)
                  }
                  that.setData({
                    item: res.data,
                    issecret: res.data.ask.issecret
                  })
                  wx.hideLoading()

                }
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '../personal_info/personal_info'
              })
            }
          })
        }
        wx.hideLoading()
      }
    })*/
  }
}
,
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})