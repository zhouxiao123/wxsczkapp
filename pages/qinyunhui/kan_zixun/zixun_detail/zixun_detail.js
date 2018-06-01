var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "0",
    detail: {},
    isAdmissions: 0,
    schoolId: '',
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.uid + '-' + options.secKey + '_' + options.newsId)
   this.setData({
      id: options.id,
      src: 'https://wxsign.sczk.com.cn/wxsczkappback/wx/zixun_detail_page?uid=' + options.uid + '&secKey=' + options.secKey + '&newsId=' + options.newsId
    })

    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey
    //var WxParse = require('../../../../wxParse/wxParse.js');//解析页面
    /*wx.request({
      url: app.globalData.baseUrl + 'qinyun/news/info',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        uid: that.data.uid,
        secKey: that.data.secKey,
        newsId: options.newsId,
      },
      success: function (res) {
        console.log(res.data)
        //继续处理上面的
       var i = 0;
       that.setData({
         detail: res.data.list[0],
         newsId: options.newsId
       })
       WxParse.wxParse('article', 'html', res.data.list[0].info, that, 5);//解析页面
      }
    })*/
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

  }
})