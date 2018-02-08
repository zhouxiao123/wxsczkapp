// school_list.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    opacityflag: 0,
    animationData: {},
    param: {},
    search_name: '',
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "高职单招" })
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
      url: app.globalData.baseUrl + 'wx/gaozhidanzhao_list',
      data:{
        search_name:''
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          param: res.data
        })
        wx.hideLoading()
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

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var poff = parseInt(that.data.pageOffset) + 1;
    wx.request({
      url: app.globalData.baseUrl + 'wx/gaozhidanzhao_list',
      data: {
        pageOffset: poff,
        pageSize: 20,
        search_name: this.data.search_name
      },
      success: function (res) {
        //console.log(res.data.gaozhidanzhao.length)
        if (res.data.gaozhidanzhao.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.data.param.gaozhidanzhao = that.data.param.gaozhidanzhao.concat(res.data.gaozhidanzhao)
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
  slideDown: function (event) {
    if (this.data.slideflag == "none") {
      // 先旋转
      this.animation.rotate(180).step()
      this.setData({
        animationData: this.animation.export()
      })

      this.setData({
        slideflag: "block"
      });
    } else {
      this.animation.rotate(0).step()
      this.setData({
        animationData: this.animation.export()
      })
      this.setData({
        slideflag: "none"
      });
    }
  },
  schoolDetail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_detail/school_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  }, GaozhidanzhaoDetail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../gaozhidanzhao_detail/gaozhidanzhao_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
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
      url: app.globalData.baseUrl + 'wx/gaozhidanzhao_list',
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
  }
})