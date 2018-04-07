// pages/test_type_list/test_type_list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adv:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/adv_list',
      data: {
        tag: 12
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          adv: res.data
        })

        //wx.hideLoading()
      }
    })
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


  listDetail:function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (e.currentTarget.dataset.id==1){
      wx.navigateTo({
        url: '../test_list/test_list'
      })
    } else {
      wx.navigateTo({
        url: '../quwei_test/quwei_test'
      })
    }
    wx.hideLoading()
  }
})