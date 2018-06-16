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
    param:{},
    student_num:'',
    kldm:0,
    pcdm:0,
    province:0,
    pid:0,//省份id
    keywords: '',
    msg:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var batchId = options.batchId
    that.data.batchId = batchId//这样在其他方法中就可以取值了
    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey
    var student_num = options.student_num
    that.data.student_num = student_num
    

    console.log('选择的哪个批次' + batchId)
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/fm/forecast/colleges',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        batchId: batchId,//	批次序号
        scope: that.data.scope,//概览范围
        sort: that.data.sort,//是否由难到易排序，默认大到小
        pageNo: 1,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 200) {
          for (var i in res.data.list){
            res.data.list[i].yxdm = ('0000' + res.data.list[i].yxdm).slice(-4)
          }
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

    //接口测试，选择专业界面
    /*wx.request({
      url: app.globalData.baseUrl + 'qinyun/fm/forecast/plans',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        pcdm:'3',
        yxdm:'5177',
        wishName:'A',
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        console.log('测试数据=============')
        console.log(res.data)
        wx.hideLoading()
      }
    })*/

  },
  // 上拉加载回调接口
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
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
      url: app.globalData.baseUrl + 'qinyun/fm/forecast/colleges',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        pageNo: poff,
        batchId: that.data.batchId,
        scope: that.data.scope,
        sort: that.data.sort,
        uid: that.data.uid,
        secKey: that.data.secKey,
        keywords: this.data.keywords
      },
      success: function (res) {
        //console.log(res.data.list)
        if (res.data.list.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          for (var i in res.data.list) {
            res.data.list[i].yxdm = ('0000' + res.data.list[i].yxdm).slice(-4)
          }
          that.data.list = that.data.list.concat(res.data.list)
          //console.log(poff)
          that.setData({
            list: that.data.list,
            pageNo: poff,
            opacityflag: 0
          })
        }
        wx.hideLoading()
      }
    })

  },
  //模糊查询
  setValue: function (event) {
    this.setData({
      keywords: event.detail.value
    });
  },
  search: function (event) {
    console.log('模糊查询名称---' + this.data.keywords)
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/fm/forecast/colleges',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        keywords: this.data.keywords,
        batchId: that.data.batchId,
        scope: that.data.scope,
        sort: that.data.sort,
        pageNo: 1,
        uid: that.data.uid,
        secKey: that.data.secKey,
        student_num: that.data.student_num,
      },
      success: function (res) {
        console.log(res.data)
        for (var i in res.data.list) {
          res.data.list[i].yxdm = ('0000' + res.data.list[i].yxdm).slice(-4)
        }
        that.setData({
          list: res.data.list,
          pageNo: 0
        })
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