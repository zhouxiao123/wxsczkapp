// pages/charge_fee/charge_fee.js
var app = getApp()
Page({
  data: {
    disflag: "none",
    userInfo: {},
    oid: '',
    user: {},
    day: 0,
    feeValue:10,
    ftext: '10元=110积分'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    wx.setNavigationBarTitle({ title: "充值积分" })
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
          

        }
      }
    })
  },setCharge:function(e){
    var t = e.currentTarget.dataset.fee
    var ft = ''
    if(t==5)
      ft=t+'元=50积分'
    else if(t==10)
      ft = t + '元=110积分'
    else if (t == 15)
      ft = t + '元=170积分'
    else if (t == 20)
      ft = t + '元=240积分'
    else if (t == 30)
      ft = t + '元=350积分'
    else if (t == 50)
      ft = t + '元=600积分'
    else if (t == 100)
      ft = t + '元=1200积分'
    else if (t == 200)
      ft = t + '元=2500积分'
    this.setData({
      feeValue:e.currentTarget.dataset.fee,
      ftext:ft
      })
  }, /*setValue: function (event) {
    this.setData({
      feeValue: event.detail.value
    });
  },*/
  charge_fee: function (event) {
    //console.log(this.data.feeValue)
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl +'wx/charge_fee_new',
      data: {
        openId: that.data.oid,
        fee: that.data.feeValue
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.result == "false") {
          wx.showModal({
            title: '提示',
            content: '充值失败，请重试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
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
                content: '充值成功',
                showCancel: false,
                success: function (res) {
                  wx.navigateBack()
                }
              })
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
            }
          })
        }

      }
    })
  }

})
function transDate(mescStr) {
  var n = mescStr;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return (Y + M + D + ' ' + hour + ':' + minute)
}