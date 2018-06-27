var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "志愿填报方案评估功能使用提示" })
    /**
    * 加载的时候获取微信id
    */
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
    /*
        * 调用getUserDetail方法，通过oid查询对应的user集合
        */
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.length == "0") {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '/pages/personal_info/personal_info'
              })
            }
          })
        } else {
          that.setData({
            user: res.data
          })
          that.data.userid = res.data.id
          console.log(that.data.userid)
        }
      }
    })
  },
   /**
   * 点击跳转提交方式选择
   */
  toanswer: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/shenhe_stop_or_start',
      data: {
        userid: that.data.userid
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == "yizhifu") {
          wx.navigateTo({
            url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_fangshi_xuanze/tijiao_fangshi_xuanze'
          })
        } else if (res.data.result == "ok"){
          wx.navigateTo({
            url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_fangshi_xuanze/tijiao_fangshi_xuanze'
          })
        } else if (res.data.result == "stop") {
          wx.navigateTo({
            url: '/pages/zhiyuan_shenhe/stop_zhiyuan/stop_zhiyuan'
          })
        }
      }
    })
    wx.hideLoading()
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
  
  }
})