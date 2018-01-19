// pages/video_type/video_type.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/video_type',
      data: {

      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          typeList:res.data
        })
          
            }
          
    })

  },
  lessonList: function (event) {
    //console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../lesson/lesson?lessontypeid=' + event.currentTarget.dataset.id
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})