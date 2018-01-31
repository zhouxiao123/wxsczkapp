// pages/school_detail/school_detail.js
// lesson.js
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
    collect: 0,
    id: "0",
    oid: "",
    yxfs: {},
    yxxq: {},
    zyfs: {},
    zszc: {},
    jhgx: {}
  },
  onLoad: function (options) {
    var WxParse = require('../../../../wxParse/wxParse.js');
    wx.setNavigationBarTitle({ title: "院校详情" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation
    this.setData({
      id: options.id
    });
    var that = this

    var value = wx.getStorageSync('oid')
    //console.log(value)
    if (value) {
      that.setData({ oid: value })
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            //console.log(res);
            //发起网络请求
            wx.request({
              url: app.globalData.baseUrl + 'wx/login',
              data: {
                code: res.code
              },
              success: function (res) {
                if (res.data == "") {
                  wx.showModal({
                    title: '提示',
                    content: '获取用户登录信息失败',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
                wx.setStorageSync('oid', res.data)
                //继续处理上面的
                that.setData({ oid: res.data })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
            wx.showModal({
              title: '提示',
              content: '获取用户登录状态失败',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }


    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/school/info',
      data: {
        id: options.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          item: res.data.list[0]
        })
        WxParse.wxParse('article', 'html', res.data.list[0].info, that, 5);
        wx.request({
          url: app.globalData.baseUrl + 'wx/is_collect_school',
          data: {
            oid: that.data.oid,
            yxId: options.id
          },
          success: function (res) {
            if (res.data.result == "fail") {
              that.setData({
                collect: 0
              });
            } else {
              that.setData({
                collect: 1
              });
            }
            wx.hideLoading()
          }
        })

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
      if (this.data.tag == 1) {
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        /*wx.request({
          url: app.globalData.baseUrl+'wx/yxfs_list',
          data: {
            yxid:that.data.id,
            oid:that.data.oid
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              yxfs: res.data
            })
            wx.hideLoading()
          }
        })*/
        wx.request({
          url: app.globalData.baseUrl + 'wx/yxxq',
          data: {
            yxid: that.data.id,
            oid: that.data.oid
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              yxxq: res.data
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
          url: app.globalData.baseUrl + 'wx/zszc',
          data: {
            yxid: that.data.id
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              zszc: res.data
            })
            var WxParse = require('../../../../wxParse/wxParse.js');
            WxParse.wxParse('zszc', 'html', res.data.content1 + (res.data.content2 == null ? '' : res.data.content2), that, 5);
            wx.hideLoading()
          }
        })

      } else if (this.data.tag == 3) {
        //招生计划
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'wx/jhgx_detail',
          data: {
            yxid: that.data.id,
            oid: that.data.oid
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              jhgx: res.data
            })
            wx.hideLoading()
          }
        })

      }
    }


  },
  collect: function (event) {

    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/collect_school',
      data: {
        oid: that.data.oid,
        yxId: that.data.item.yxid
      },
      success: function (res) {
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '收藏失败',
            showCancel: false,
            success: function (res) {

            }
          })
        } else {
          that.setData({
            collect: 1
          });
        }

      }
    })
    //console.log(event.currentTarget.dataset.id)
  },
  cansleCollect: function () {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/cancel_collect_school',
      data: {
        oid: that.data.oid,
        yxId: that.data.item.yxid
      },
      success: function (res) {
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '取消收藏失败',
            showCancel: false,
            success: function (res) {

            }
          })
        } else {
          that.setData({
            collect: 0
          });
        }

      }
    })
  },
  toFsDetail: function (e) {
    //console.log(e.target.dataset.id + "----" + e.target.dataset.tag)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_fs_detail/school_fs_detail?id=' + e.currentTarget.dataset.id + '&tag=' + e.target.dataset.tag + '&name=' + this.data.item.yxname
    })
    wx.hideLoading()
  },
  toJhDetail: function (e) {
    //console.log(e.target.dataset.id + "----" + e.target.dataset.tag)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_jh_detail/school_jh_detail?jhid=' + e.currentTarget.dataset.id + '&name=' + this.data.item.yxname
    })
    wx.hideLoading()
  }
})