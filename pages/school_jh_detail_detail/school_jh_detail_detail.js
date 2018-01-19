// pages/school_jh_detail_detail/school_jh_detail_detail.js
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
    jhzy: {},
    yxname:''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "专业计划" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation
    this.setData({
      id: options.id,
      tag: options.tag,
      yxname:options.name
    });
    var that = this



    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/jhzy_detail',
      data: {
        id: that.data.id
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          jhzy: res.data
        })
        wx.hideLoading()
      }
    })
  }
})