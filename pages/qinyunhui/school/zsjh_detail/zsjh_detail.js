var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "专业介绍" })
    var that = this
    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey
    var id = options.id
    that.data.id = id

   

    /**
     * 点击招生简章标题，跳转到招生简章页面
     */
      wx.request({
        url: app.globalData.baseUrl + 'qinyun/plan/zydetails',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'qyh-appid': '07',
          'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
        },
        data: {
          uid: that.data.uid,
          secKey: that.data.secKey,
          id: that.data.id
        },
        success: function (res) {
          console.log('招生计划详细数据=================')
          console.log(res.data)
          //继续处理上面的
          that.setData({
            zsjh: res.data.list[0]
          })
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