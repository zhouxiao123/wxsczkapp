// pages/small_video/small_video.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    slideflag: 'none',
    animationData: {},
    list: [],
    value: '',
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "视频" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation
    var that = this;
    that.setData({
      disflag: "block"
    });
    wx.request({
      url: app.globalData.baseUrl+'wx/list_video',
      data: {
        tid: 4,
        lessontypeid:0
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          list: res.data
        })
        that.setData({
          disflag: "none"
        });
      }
    })
  },// 上拉加载回调接口
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
    that.setData({
      hasMore: true,
      opacityflag: 1
    })
    //console.log("---")
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var poff = parseInt(that.data.pageOffset) + 1;
      wx.request({
        url: app.globalData.baseUrl+'wx/list_video',
        data: {
          pageOffset: poff,
          pageSize: 20,
          tid: 4,
          lessontypeid: 0

        },
        success: function (res) {
          //console.log(res.data.schools.length)
          if (res.data.length == 0) {
            that.setData({
              hasMore: false,
            })
          } else {


            that.data.list = that.data.list.concat(res.data)
            //console.log(poff)
            that.setData({
              list: that.data.list,
              pageOffset: poff,
              opacityflag: 0
            })
          }
          wx.hideLoading()


        }
      })

  },
  personalIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../personal/personal'
    })
  },
  askIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../ask_index/ask_index'
    })
  },
  mainIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../index/index'
    })
  },
  see_video: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../video_detail/video_detail?id=' + event.currentTarget.dataset.id
    })
    this.setData({
      disflag: "none"
    });
  },
  swichNav: function (event) {
    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      this.setData({
        tag: event.target.dataset.current,
        pageOffset: 0,
        opacityflag: 0
      })
      var that = this
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/list_video',
        data: {
          tid: 4,
          lessontypeid: 0
        },
        success: function (res) {
          //console.log(res.data)
          that.setData({
            list: res.data,
            value: ''
          })
          wx.hideLoading()
        }
      })

    }

  },
  bindChange: function (event) {
    this.setData({ tag: event.detail.current });
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
      url: app.globalData.baseUrl+'wx/list_video',
      data: {
        tid: 4,
        search_name: that.data.search_name,
        lessontypeid: 0
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          list: res.data,
          pageOffset: 0,
          opacityflag: 0
        })
        wx.hideLoading()
      }
    })
  }
})