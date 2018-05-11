// pages/online_ask/online_ask.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disflag: 'none',
    animationData: {},
    search_name: '',
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0,
    tag: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //加载初始数据
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/ask_school',
      success: function (res) {
        console.log(res.data)
        that.setData({
          param: res.data
        })
        wx.hideLoading()
      }
    })
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
    var poff = parseInt(that.data.pageOffset) + 1;
    wx.request({
      url: app.globalData.baseUrl + 'wx/ask_school',
      data: {
        pageOffset: poff,
        pageSize: 20,
        search_name: this.data.search_name
      },
      success: function (res) {
        console.log(res.data.askschool.length)
        if (res.data.askschool.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.data.param.askschool = that.data.param.askschool.concat(res.data.askschool)
          //console.log(poff)
          that.setData({
            param: that.data.param,
            pageOffset: poff,
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
      url: app.globalData.baseUrl + 'wx/ask_school',
      data: {
        search_name: this.data.search_name
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          param: res.data,
          pageOffset: 0
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
  
  }
})