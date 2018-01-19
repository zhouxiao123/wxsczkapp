// pages/feed_back/feed_back.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    showLecturer: "none",
    slideflag: 'none',
    img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    def_img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    animationData: {},
    lecturer: {},
    lecturerList: [],
    tag: 0,
    oid: '',
    preid: 0,
    askList: [],
    search_name: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "意见反馈" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation

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
            //console.log('获取用户登录态失败！' + res.errMsg)
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



    
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value.text.length)
    var that = this
    if (e.detail.value.content.length == "0") {
      wx.showModal({
        title: '提示',
        content: '反馈内容不可为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })
      return false;
    }
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    //console.log(e.detail.value)
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'wx/save_feedback',
      data: e.detail.value,
      success: function (res) {
        wx.hideLoading()
        if(res.data=="fail"){
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
          wx.showModal({
            title: '提示',
            content: '感谢您的宝贵意见',
            showCancel: false,
            success: function (res) {
              wx.navigateBack()
            }
          })
        }
        }

      
    })
  }




})