// pages/jiekoutest/jiekoutest.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  phone:'',
  code:'',
  oid:''
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
                console.log(res.data);
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
  
  }, setValue: function (event) {
    this.setData({
      phone: event.detail.value
    });
  }, setValue2: function (event) {
    this.setData({
      code: event.detail.value
    });
  },
  yanzhengma:function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/app/getcode2',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: that.data.phone,
        way: 73
      },
      success: function (res) {

        console.log(res.data);
        that.setData({
          status: res.data.status
        })
        wx.hideLoading()
      }
    })
  },
  zhuce:function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/pub/auth',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        openId: that.data.oid,
        typeId: 73,
        unionid: that.data.oid,
        nick: that.data.userInfo.nickName,
        headimgurl: that.data.userInfo.avatarUrl,
        phone:that.data.phone,
        code:that.data.code
      },
      success: function (res) {

        console.log(res.data);
        that.setData({
          status: res.data.status
        })
        wx.hideLoading()
      }
    })
  },
  denglu: function () {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/pub/auth',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid':'07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        openId: that.data.oid,
        typeId: 73,
        unionid: that.data.oid
      },
      success: function (res) {

        console.log(res.data);

        wx.hideLoading()
      }
    })
  }
})