// pages/zy_detail/zy_detail.js
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
    ksyx:{},
    pageOffset: 0,
    pageSize: 100,
    hasMore: true,
    opacityflag: 0,

  },
  onLoad: function (options) {
    var WxParse = require('../../wxParse/wxParse.js');
    wx.setNavigationBarTitle({ title: "专业详情" })
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
              url: app.globalData.baseUrl+'wx/login',
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
      url: app.globalData.baseUrl+'wx/zy_detail',
      data: {
        id: options.id
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          item: res.data
        })
        WxParse.wxParse('article', 'html', res.data.zyjj1 + res.data.zyjj2, that, 5);
        wx.request({
          url: app.globalData.baseUrl+'wx/is_collect_zy',
          data: {
            oid: that.data.oid,
            zyId: options.id
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
          url: app.globalData.baseUrl+'wx/ksyx_list',
          data: {
            zydm: that.data.item.zydm,
            pageOffset: 0,
            pageSize: 100
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              ksyx: res.data
            })
            wx.hideLoading()
          }
        })
      }
    }


  },// 上拉加载回调接口
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
    var poff = parseInt(that.data.pageOffset) + 1;
    wx.request({
      url: app.globalData.baseUrl+'wx/ksyx_list',
      data: {
        pageOffset: poff,
        pageSize: 100,
        zydm: that.data.item.zydm
      },
      success: function (res) {
        //console.log(res.data.length)
        if (res.data.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.data.ksyx = that.data.ksyx.concat(res.data)
          //console.log(poff)
          that.setData({
            ksyx: that.data.ksyx,
            pageOffset: poff,
            opacityflag: 0
          })
        }
        wx.hideLoading()


      }
    })
    }
  },
  collect: function (event) {

    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/collect_zy',
      data: {
        oid: that.data.oid,
        zyId: that.data.item.id
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
  cansleCollect:function () {
    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/cancel_collect_zy',
      data: {
        oid: that.data.oid,
        zyId: that.data.item.id
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
  }
})