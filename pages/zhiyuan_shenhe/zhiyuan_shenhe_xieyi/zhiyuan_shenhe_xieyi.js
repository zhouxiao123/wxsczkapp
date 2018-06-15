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
      wx.navigateTo({
        url: '/pages/zhiyuan_shenhe/tijiao_fangshi/zhiyuanshenhe_pay/zhiyuanshenhe_pay'
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