// pages/charge_fee/charge_fee.js
var app = getApp()
Page({
  data: {
    zhifufangshi:0,
    feeValue:0,

    disflag: "none",
    userInfo: {},
    oid: '',
    user: {},
    day: 0,

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    wx.setNavigationBarTitle({ title: "支付界面" })
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
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: this.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.length == "0") {
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
        } else {
          that.setData({
            user: res.data
          })
        that.data.point = res.data.point
        }
      }
    })
  }, 
  /**
 * 支付方式  900  或850+500积分
 */

  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.data.zhifufangshi = e.detail.value
    console.log('选择支付方式，携带value值为：', that.data.zhifufangshi)
  },


   //点击支付
  charge_fee: function (event) {
    //判断积分是否够500
    //console.log('当前积分，携带value值为：', that.data.point)
    var that = this
      if (that.data.zhifufangshi != 1 && that.data.zhifufangshi != 2) {
        wx.showModal({
          title: '提示',
          content: '请选择支付方式',
          showCancel: false,
          success: function (res) {
          }
        })
      } else if (that.data.zhifufangshi == 2 && that.data.point < 500) {
        wx.showModal({
          title: '提示',
          content: '积分不足500',
          showCancel: false,
          success: function (res) {
          }
        })
      } else {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/weixinzhifu_zhiyuanshenhe',
      data: {
        zhifufangshi: that.data.zhifufangshi,
        openId: that.data.oid,
        //fee: that.data.feeValue    //支付的金额
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.result == "false") {
          wx.showModal({
            title: '提示',
            content: '支付失败，请重试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
              wx.hideLoading()
            }
          })
        } else if (res.data.result == "true") {
          //调用支付
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (res) {
              wx.showModal({
                title: '提示',
                content: '支付成功',
                showCancel: false,
                success: function (res) {
                  //wx.navigateBack()
                  wx.redirectTo({
                    url: '/pages/zhiyuan_shenhe/zhiyuan_shenhe_jichuxinxi/zhiyuan_shenhe_jichuxinxi'
                  })
                }
              })
              wx.hideLoading()
            },
            'fail': function (res) {
            }
          })

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.result,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  disflag: "block"
                });
                wx.redirectTo({
                  url: '../video_detail/video_detail?id=' + that.data.item.video.webLessonId
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
              wx.hideLoading()
            }
          })
        }

      }
     
    })
  }
  }
})

