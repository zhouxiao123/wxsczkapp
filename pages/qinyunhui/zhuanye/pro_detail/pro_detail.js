var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majorId: '',
    toubuxinxi:{},
    jyqk:{},
    tag:0,
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0,
    tag1: -1,
    disflag: 'none',
    animationData: {},
    pageNo: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "专业详情" })
    var that = this
    //专业详细分类
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var id = options.id
    that.data.id = id
    console.log('id的值'+that.data.id)
    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey
    //头部信息
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/v2/major/info',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        majorId: that.data.id,
        uid: that.data.uid,
        secKey: that.data.secKey,

      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          toubuxinxi: res.data.list[0]
        })

        wx.hideLoading()
      }
    })

    //简介
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/v2/major/detail',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        majorId: that.data.id,
        uid: that.data.uid,
        secKey: that.data.secKey,

      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          jianjie: res.data.list[0]
        })

        wx.hideLoading()
      }
    })

  },

  swichNav: function (event) {

    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      this.setData({
        tag: event.target.dataset.current
      })
      var that = this
      if (this.data.tag == 1) {//开设院校
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'qinyun/v2/major/schools',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            majorId: that.data.id,
            uid: that.data.uid,
            secKey: that.data.secKey,
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              kaisheyuanxiao: res.data.list
            })
            wx.hideLoading()
          }
        })
      } else if (this.data.tag == 2) {
        //招生章程
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'qinyun/v2/major/nears',//相近专业
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            majorId: that.data.id,
            uid: that.data.uid,
            secKey: that.data.secKey,
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              xjzy: res.data.list
            })
            wx.hideLoading()
          }
        })

      } else if (this.data.tag == 3) {
        //就业情况

       wx.showLoading({
         mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'qinyun/v2/major/works',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            majorId: that.data.id,
            uid: that.data.uid,
            secKey: that.data.secKey,
          },
          success: function (res) {
            console.log("就业情况--------------------------")
            console.log(res.data)
            that.setData({
              jyqk: res.data.data
            })
            wx.hideLoading()
          }
        })

      }
    }
  },
    /**
   * 上拉加载回调接口
   */
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
    if(that.data.tag==1){
    that.setData({
      hasMore: true,
      opacityflag: 1
    })

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var poff = parseInt(that.data.pageNo) + 1;

    wx.request({
      url: app.globalData.baseUrl + 'qinyun/v2/major/schools',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {   
        pageNo: poff,
        majorId: that.data.id,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.list==null || res.data.list.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.data.list = that.data.kaisheyuanxiao.concat(res.data.list)
          //console.log(poff)
          that.setData({
            kaisheyuanxiao: that.data.list,
            pageNo: poff,
            opacityflag: 0
          })
        }
        wx.hideLoading()
      }
    })
    }
  },
  /**
   * 点击院校标题，跳转到高校中的院校详情中
   */
  kaisheyuanxiao_Detail: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../../school/school_detail/school_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  /**
* 点击相近专业的标题，调到相应的内容
*/
  xjzy_Detail: function (event) {
    var that = this
    //跳转到
    console.log('循环出id的值' + event.currentTarget.dataset.id)
    wx.redirectTo({
      url: '../pro_detail/pro_detail?&id=' + event.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
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

  },

})