var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope: 'All',
    sort: 'Desc',
    pageNo: 1,
    secKey: '',
    uid: 0,
    list: [],
    batchId: '',
    disflag: 'none',
    animationData: {},
    //下拉加载
    hasMore: true,
    pageSize: 20,
    opacityflag: 0,
    tag: -1,
    param: {},
    student_num: '',
    kldm: 0,
    pcdm: 0,
    province: 0,
    pid: 0,//省份id
    keywords: '',
    msg: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey
    var batchId = options.batchId
    that.data.batchId = batchId//这样在其他方法中就可以取值了

    console.log('选择的哪个批次' + batchId)
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/fm/forecast/colleges',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        batchId: batchId,
        scope: that.data.scope,
        sort: that.data.sort,
        pageNo: 1,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 200) {
          that.setData({
            list: res.data.list
          })
        } else if (res.data.status == 201) {
          that.setData({
            msg: res.data.msg
          })

        }
        wx.hideLoading()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})