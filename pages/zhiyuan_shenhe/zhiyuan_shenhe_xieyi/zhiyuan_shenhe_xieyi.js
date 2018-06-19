var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tongyi:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "志愿审核协议" })
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
    /*if (options.yixuan != null && options.yixuan != '' && options.yixuan != "undefined"){
     var yixuan = options.yixuan
     that.data.yixuan = yixuan//这样在其他方法中就可以取值了
     that.setData({
       yixuan: that.data.yixuan
     })
   }*/
    //that.data.oid
    /**
* 调用getUserDetail方法，通过oid查询对应的user集合
*/
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        console.log(res.data)

        that.setData({
          user: res.data
        })
        //console.log(res.data.id)
        that.data.userid = res.data.id
      }
    })
  },
  /**
  * 点击跳转到支付界面
  */
  tongyi: function (e) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (that.data.tongyi == 1) {

      //查看是否已经交了钱
      wx.request({
        url: app.globalData.baseUrl + 'wx/get_zhiyuan_pay',
        data: {
          userid: that.data.userid,
        },
        success: function (res) {
          console.log('查看是否已经交了钱')
          console.log(res.data.pay)
          that.setData({
          })
            wx.redirectTo({
              url: '/pages/zhiyuan_shenhe/tijiao_fangshi/zhiyuanshenhe_pay/zhiyuanshenhe_pay'
            })
        }
      })
    } else {
      wx.showModal({
        //title: '请先同意志愿审核协议',
        content: '请先同意志愿审核协议',
        showCancel: false,
        success: function (res) {
        }
      })
    }
    wx.hideLoading()
  },
  /**
  * 点击返回
  */
  fanhui: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/zhiyuan_shenhe_tishi/zhiyuan_shenhe_tishi'
    })
    wx.hideLoading()
  },
  /**
* 同意协议
*/
  checkboxChange: function (e) {
    var that = this
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    that.data.tongyi = e.detail.value
    console.log('同意，携带value值为：', that.data.tongyi)

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})