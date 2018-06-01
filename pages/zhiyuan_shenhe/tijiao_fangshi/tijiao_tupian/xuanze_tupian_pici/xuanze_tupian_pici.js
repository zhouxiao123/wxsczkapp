// pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_biaodan/shenhe_pici/shenhe_pici.js
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
    wx.setNavigationBarTitle({ title: "选择志愿填报批次" })
  },
  /**
* 点击跳转到本科提前批
*/
  benke_tiqianpi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_bktqp/tupian_bktqp'
    })
    wx.hideLoading()
  },
  /**
* 点击跳转到本科第一批
*/
  bneke_diyipi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_bkdyp/tupian_bkdyp'
    })
    wx.hideLoading()
  },
  /**
* 点击跳转到本科第二批
*/
  benke_dierpi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_bkderp/tupian_bkderp'
    })
    wx.hideLoading()
  },
  /**
* 点击跳转到专科提前批
*/
  zhuanke_tiqianpi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_zktqp/tupian_zktqp'
    })
    wx.hideLoading()
  },

  /**
* 点击跳转到专科批
*/
  zhuankepi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_zkp/tupian_zkp'
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})