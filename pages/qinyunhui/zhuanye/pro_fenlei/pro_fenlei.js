var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "专业类别" })
    var that = this 
    //专业详细分类
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var id = options.id
    that.data.id = id
    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey

    wx.request({
      url: app.globalData.baseUrl + 'qinyun/v2/major/list',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        pid: that.data.id,
        uid: that.data.uid,
        secKey: that.data.secKey,

      },
      success: function (res) {
        console.log(res.data)
        that.setData({
         zhuanyeleibie: res.data.list
        })

        wx.hideLoading()
      }
    })
  },

  /**
 * 调到专业的详情
 */
  proDetail: function (e) {
    var that = this
    //跳转到
    wx.navigateTo({
      url: '../pro_detail/pro_detail?&id=' + e.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
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