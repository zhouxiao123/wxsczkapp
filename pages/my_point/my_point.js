// pages/my_point/my_point.js
var app = getApp()
Page({
  data: {
    disflag: "none",
    userInfo: {},
    oid: '',
    user: {},
    day: 0,
    today: 0,
    pointLog:[],
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0,
    animationData: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    wx.setNavigationBarTitle({ title: "我的积分" })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })


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
    //console.log("11111")
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: this.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.length == "0") {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
                wx.navigateTo({
                  url: '../personal_info/personal_info'
                })
            }
          })
        } else {
          that.setData({
            user: res.data
          })
          wx.request({
            url: app.globalData.baseUrl+'wx/point_list',
            data: {
              oid: that.data.oid,
              pageOffset:that.data.pageOffset,
              pageSize:that.data.pageSize
            },
            success: function (res) {
              //console.log(res.data)
              wx.hideLoading()
              if (res.data.result == "fail") {
                wx.showModal({
                  title: '提示',
                  content: '请先填写资料',
                  showCancel: false,
                  success: function (res) {
                    wx.navigateTo({
                      url: '../personal_info/personal_info'
                    })
                  }
                })
              } else {
                for (var i in res.data.pointLog){
                  res.data.pointLog[i].createTime = transDate(res.data.pointLog[i].createTime)
                }
                that.setData({
                  pointLog: res.data.pointLog
                })

              }
              
            }
          })
          
        }
      }
    })
  },
  onShow:function(e){
    //console.log("222222")
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: this.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.length == "0") {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '../personal_info/personal_info'
              })
            }
          })
        } else {
          that.setData({
            user: res.data
          })
          wx.request({
            url: app.globalData.baseUrl+'wx/point_list',
            data: {
              oid: that.data.oid,
              pageOffset: that.data.pageOffset,
              pageSize: that.data.pageSize
            },
            success: function (res) {
              //console.log(res.data)
              wx.hideLoading()
              if (res.data.result == "fail") {
                wx.showModal({
                  title: '提示',
                  content: '请先填写资料',
                  showCancel: false,
                  success: function (res) {
                    wx.navigateTo({
                      url: '../personal_info/personal_info'
                    })
                  }
                })
              } else {
                for (var i in res.data.pointLog) {
                  res.data.pointLog[i].createTime = transDate(res.data.pointLog[i].createTime)
                }
                that.setData({
                  pointLog: res.data.pointLog
                })

              }

            }
          })

        }
      }
    })
  }
  ,// 上拉加载回调接口
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
      url: app.globalData.baseUrl+'wx/point_list',
      data: {
        pageOffset: poff,
        pageSize: 20,
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data.schools.length)
        
        wx.hideLoading()
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '../personal_info/personal_info'
              })
            }
          })
        } else {
          if (res.data.pointLog.length == 0) {
            that.setData({
              hasMore: false,
            })
          } else {
            
            //console.log(poff)
            for (var i in res.data.pointLog) {
              res.data.pointLog[i].createTime = transDate(res.data.pointLog[i].createTime)
            }
            that.data.pointLog = that.data.pointLog.concat(res.data.pointLog)
            

            that.setData({
              pointLog: that.data.pointLog,
              pageOffset: poff,
              opacityflag: 0
            })
          }

          

        }


      }
    })

  },
  charge_fee:function(e){
    wx.navigateTo({
      url: '../charge_fee/charge_fee'
    })
  }

})
function transDate(mescStr) {
  var n = mescStr;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return (Y + M + D + ' ' + hour + ':' + minute)
}