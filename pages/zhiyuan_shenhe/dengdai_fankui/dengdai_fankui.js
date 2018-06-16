var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tongyi: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "等待志愿审核结果" })
  },
  /**
* 返回主页
*/
  toanswer: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.redirectTo({
      url: '/pages/index/index'
    })
    wx.hideLoading()
  },
  /**
* 查看我已经填写的志愿
*/
  wodetianxie: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.redirectTo({
      url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_pici/yitijiao_pici'
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