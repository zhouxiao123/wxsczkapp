// pages/lecturer_detail/lecturer_detail.js
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
    lecturer: {},
    lecturerList: [],
    answer: [],
    tag: 0,
    oid: '',
    id: 0,
    askList: [],
    search_name: '',
    collect:0,
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "专家详情" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation

    var that = this
    this.setData({
      id: options.id
    });
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
      url: app.globalData.baseUrl+'wx/lecturerDetail2',
      data: {
        id:options.id
      },
      success: function (res) {
        //console.log(res.data)
        for (var i in res.data.answer) {
          res.data.answer[i].a.createTime = transDate(res.data.answer[i].a.createTime)
        }
        that.setData({
          lecturer: res.data,
          answer:res.data.answer
        })
        wx.request({
          url: app.globalData.baseUrl+'wx/is_collect_lecturer',
          data: {
            oid: that.data.oid,
            lecturerId: that.data.lecturer.lecturer.lecturerId
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
      url: app.globalData.baseUrl+'wx/lecturerAnswerList',
      data: {
        pageOffset: poff,
        pageSize: 20,
        userid: that.data.lecturer.lecturer.userid

      },
      success: function (res) {
        //console.log(res.data.schools.length)
        if (res.data.answer.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          for (var i in res.data.answer) {
            res.data.answer[i].a.createTime = transDate(res.data.answer[i].a.createTime)
          }

          that.data.answer = that.data.answer.concat(res.data.answer)
          //console.log(poff)
          that.setData({
            answer: res.data.answer,
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
  }/*,
  listen: function (event) {
    var ids = event.currentTarget.dataset.id;
    if (this.data.img_url[ids] == 'yy@2x2.png') {
      this.setData({
        img_url: this.data.def_img_url
      })
      this.data.img_url[ids] = 'yy.gif';
      this.setData({
        img_url: this.data.img_url
      })
    } else {
      this.data.img_url[ids] = 'yy@2x2.png';
      this.setData({
        img_url: this.data.img_url
      })
    }
  }*/,
  ask_detail: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../ask_detail/ask_detail?id=' + event.currentTarget.dataset.id
    })
    this.setData({
      disflag: "none"
    });
  },
  collect: function (event) {

    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/collect_lecturer',
      data: {
        oid: that.data.oid,
        lecturerId: that.data.lecturer.lecturer.lecturerId
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
  }, cansleCollect: function () {
    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/cancel_collect_lecturer',
      data: {
        oid: that.data.oid,
        lecturerId: that.data.lecturer.lecturer.lecturerId
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
  ask: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../ask_lecturer/ask_lecturer?id=' + event.currentTarget.dataset.id
    })
    this.setData({
      disflag: "none"
    });
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