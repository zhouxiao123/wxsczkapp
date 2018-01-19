// pages/my_video/my_video.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    slideflag: 'none',
    animationData: {},
    list: [],
    value: '',
    oid:''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "已购视频" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation
    var that = this;

    var value = wx.getStorageSync('oid')
    if (value) {
      that.setData({ oid: value })
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
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


    that.setData({
      disflag: "block"
    });
    wx.request({
      url: app.globalData.baseUrl+'wx/my_video',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          list: res.data
        })
        that.setData({
          disflag: "none"
        });
      }
    })
  },
  personalIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../personal/personal'
    })
  },
  askIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../ask_index/ask_index'
    })
  },
  mainIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../index/index'
    })
  },
  see_video: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../video_detail/video_detail?id=' + event.currentTarget.dataset.id
    })
    this.setData({
      disflag: "none"
    });
  },
  bindChange: function (event) {
    this.setData({ tag: event.detail.current });
  },
  setValue: function (event) {
    this.setData({
      search_name: event.detail.value
    });
  },
  search: function (event) {
    //console.log(this.data.search_name)
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })

    wx.request({
      url: app.globalData.baseUrl+'wx/my_video',
      data: {
        oid: that.data.oid,
        search_name: that.data.search_name
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          list: res.data
        })
        wx.hideLoading()
      }
    })
  }
})