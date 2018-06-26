// pages/adv/gongzhonghao/gongzhonghao.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:0,
      src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/adv_detail',
      data: {
        id: options.id
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        that.setData({
          id: options.id,
          src: res.data.adv.link
        })

      }
    })
    //测试
    /*that.setData({
      src: 'https://mp.weixin.qq.com/s/_5AMhYcE00v3wzJUIbmxAA'
    })
    wx.hideLoading()*/
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