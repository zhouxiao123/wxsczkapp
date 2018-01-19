// pages/news_list/news_list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0,
    animationData: {},
    search_name: '',
    news:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'linear',
    })
    this.animation = animation
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/news_list',
      data:{
        search_name:''
      },
      success: function (res) {
        //console.log(res.data.news)
        that.setData({
          news: res.data.news
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
  
  },// 上拉加载回调接口
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
    var poff = parseInt(that.data.pageOffset) + 1;
    wx.request({
      url: app.globalData.baseUrl + 'wx/news_list',
      data: {
        pageOffset: poff,
        pageSize: 20,
        search_name: this.data.search_name
      },
      success: function (res) {
        //console.log(res.data.schools.length)
        if (res.data.news.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.data.news = that.data.news.concat(res.data.news)
          //console.log(poff)
          that.setData({
            news: that.data.news,
            pageOffset: poff,
            opacityflag: 0
          })
        }
        wx.hideLoading()


      }
    })

  },
  setValue: function (event) {
    this.setData({
      search_name: event.detail.value
    });
  },
  search: function (event) {
    //console.log(this.data.search_name)
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/news_list',
      data: {
        search_name: this.data.search_name
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          news: res.data.news,
          pageOffset: 0
        })
        wx.hideLoading()
      }
    })
  }, article_detail: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../article/article?id=' + e.currentTarget.dataset.id
    })
    wx.hideLoading()
  }
})