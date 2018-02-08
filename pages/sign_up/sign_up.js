// sign_up.js
var app = getApp()
Page({
  data: {
    disflag: "none",
    disflag2: "none",
    redBagPoint:5,
    userInfo: {},
    oid:'',
    user:{},
    day:0,
    today:0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    wx.setNavigationBarTitle({ title: "签到" })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })


    var that = this
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
              url: app.globalData.baseUrl+'wx/login',
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
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: this.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.length == "0") {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '../personal_info/personal_info'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          that.setData({
            user: res.data
          })

          //获取总签到天数
          wx.request({
            url: app.globalData.baseUrl+'wx/getSignCount',
            data: {
              oid: that.data.oid
            },
            success: function (res) {
              //console.log(res.data)
              if (res.data.result == "fail") {
                wx.showModal({
                  title: '提示',
                  content: '请先填写资料',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.navigateTo({
                        url: '../personal_info/personal_info'
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              } else {
                that.setData({
                  day: res.data.day,
                  today: res.data.today
                })
                if (res.data.today == 0){
                  /*that.setData({
                    disflag: 'block',
                    disflag2: 'none'
                  })*/
                }
                wx.hideLoading()
              }
            }
          })
        }
      }
    })
  },
  signUp:function(){
    var that = this
    if(that.data.day>=30){
      wx.showModal({
        title: '提示',
        content: '本月已经签完了，下个月再来吧',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    //签到
    wx.request({
      url: app.globalData.baseUrl+'wx/saveSignCount',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '您今日已经签到过了',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                  today: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          var point = res.data.point
          wx.showModal({
            title: '提示',
            content: '签到成功,获得' + res.data.point+'积分',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.data.user.point = parseInt(that.data.user.point) + parseInt(point);
                that.setData({
                  day: parseInt(that.data.day)+1,
                  today: 1,
                  user:that.data.user
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }

              /*that.setData({
                disflag: 'block',
                disflag2: 'none'
              })*/
            }
          })

          
        }
      }
    })
    }
  }, getPoint:function(){
    var that = this
    //签到
    wx.request({
      url: app.globalData.baseUrl + 'wx/saveSignRedBag',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '您今日已经签到过了',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                  today: 1
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          var point = res.data.point

          
                
                that.data.user.point = parseInt(that.data.user.point) + parseInt(point);
                that.setData({
                  user: that.data.user,
                  redBagPoint:point,
                  disflag: 'none',
                  disflag2: 'block'
                })

          wx.hideLoading()
        }
      }
    })




  }, closeBg:function(){
    this.setData({
      disflag: 'none',
      disflag2: 'none'
    })
    this.signUp()
  },
  toLottery:function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/getSignCount',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '../personal_info/personal_info'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          that.setData({
            day: res.data.day,
            today: res.data.today
          })
          if (res.data.today == 0) {
            wx.showModal({
              title: '提示',
              content: '请先签到',
              showCancel: false,
              success: function (res) {
              }
            })
          } else {
            wx.navigateTo({
              url: 'lottery/lottery'
            })
          }
          wx.hideLoading()
        }
      }
    })

  }

})