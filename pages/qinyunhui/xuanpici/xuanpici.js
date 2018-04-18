var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: {},//高考分数
    kldm: 0,//文理科
    student_num: {},//考生号
    secKey: '',
    uid: 0,
    param: {},
    list:[],
    tag: -1,
    point:{},
    pc:{},
    kl:{},
    province:{},
    sortDesc: true,
    batchId:{},
    scope:'All',
    sort:'Desc',
    pageNo:0,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "选批次" })
    var that = this  
    var kldm = options.kldm
    that.data.kldm = kldm
    var student_num = options.student_num
    that.data.student_num = student_num
    var score = options.score
    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey

    //用户点击确定之后，获取选批次页面的数据
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/fm/enroll/choose',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        kldm: kldm,
        score: score,
        student_num: that.data.student_num,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        console.log('内容888：', res.data)
        if (res.data.status == 200) {
        that.setData({
          param: res.data.data,
          list: res.data.list
        })
        }
       
        wx.hideLoading()
      }
    })
  },
  /**
   * 选择批次之后跳转对应校园列表页面
   */
  xuanze: function (e) {
    var that = this
    console.log('66666'+e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/fm/forecast/colleges',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        batchId: e.currentTarget.dataset.id,
        scope: that.data.scope,
        sort: that.data.sort,
        pageNo:1,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 200) {
          that.setData({
           
          })
          //跳转到推荐的校园列表页面
          wx.navigateTo({
            url: '../kan_luqu_jilv/kan_luqu_jilv?batchId=' + e.currentTarget.dataset.id + 
            '&secKey=' + that.data.secKey + '&uid=' + that.data.uid + '&student_num=' + that.data.student_num
           
          })
        } else if (res.data.status == 201){

          that.setData({
                  
          })
          //跳转到推荐的校园列表页面
          wx.navigateTo({
            url: '../not_enough_grade/not_enough_grade?batchId=' + e.currentTarget.dataset.id+
            '&secKey=' + that.data.secKey + '&uid=' + that.data.uid

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