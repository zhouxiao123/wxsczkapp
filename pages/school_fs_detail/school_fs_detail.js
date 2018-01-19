// pages/school_fs_detail/school_fs_detail.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    showLecturer: "none",
    slideflag: 'none',
    img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    def_img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    animationData: {},
    item: {},
    tag: 0,
    id: "0",
    oid: "",
    yxfs: {},
    yxlq: {},
    zyfs: {},
    yxname:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "分数详情" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation
    this.setData({
      id: options.id,
      tag:options.tag,
      yxname: options.name
    });
    var that = this


if(options.tag=="1"){
  wx.showLoading({
    mask: true,
    title: '加载中'
  })
  wx.request({
    url: app.globalData.baseUrl+'wx/yxlq_list',
    data: {
      id: that.data.id
    },
    success: function (res) {
      //console.log(res.data)
      that.setData({
        yxlq: res.data
      })
      wx.hideLoading()
    }
  })
} else if (options.tag == "2"){
  wx.showLoading({
    mask: true,
    title: '加载中'
  })
  wx.request({
    url: app.globalData.baseUrl+'wx/yxfs_list',
    data: {
      id: that.data.id
    },
    success: function (res) {
      //console.log(res.data)
      that.setData({
        yxfs: res.data
      })
      wx.hideLoading()
    }
  })
} else if (options.tag == "3"){
  wx.showLoading({
    mask: true,
    title: '加载中'
  })
  wx.request({
    url: app.globalData.baseUrl+'wx/zyfs_list',
    data: {
      id: that.data.id
    },
    success: function (res) {
      //console.log(res.data)
      that.setData({
        zyfs: res.data
      })
      wx.hideLoading()
    }
  })
}

    



  }
})