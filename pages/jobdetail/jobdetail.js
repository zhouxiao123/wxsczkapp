// pages/jobdetail/jobdetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ZyJobPro:[],
    jobdetail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
    /**
   * 奇葩声内容
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/zy_jobdetail',
      data: {
        id: options.id
       
      },
      success: function (res) {
        //继续处理上面的
        that.setData({
          jobdetail: res.data.jobdetail
          
          
        })
        console.log(res.data)
      }
    })
  /**
   * 加载对应专业
   */
    wx.request({
      url: app.globalData.baseUrl + 'wx/zy_pro_list',
      data: {
        id: options.id
      },
      success: function (res) {
        //继续处理上面的
        that.setData({
          ZyJobPro: res.data.ZyJobPro


        })
        console.log(res.data)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})