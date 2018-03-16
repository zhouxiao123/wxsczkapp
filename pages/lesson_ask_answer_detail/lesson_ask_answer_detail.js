// pages/lesson_ask_answer_detail/lesson_ask_answer_detail.js
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    def_img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    disflag: 'none',
    userInfo: {},
    oid: '',
    id: '',
    item: {},
    collect: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    wx.setNavigationBarTitle({ title: "视频问答" })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.setData({
      id: options.id
    })

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
      url: app.globalData.baseUrl + 'wx/lesson_ask_detail',
      data: {
        id: options.id
      },
      success: function (res) {
        //console.log(res.data)
        res.data.lessonask.createtime = transDate(res.data.lessonask.createtime);
        that.setData({
          item: res.data.lessonask
        })

        wx.request({
          url: app.globalData.baseUrl + 'wx/is_collect_lecturer',
          data: {
            oid: that.data.oid,
            lecturerId: that.data.item.l.lecturerId
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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
  }
  ,
  school_list: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../school_list/school_list'
    })
  },
  pro_list: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../pro_list/pro_list'
    })
  },
  lesson: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../lesson/lesson'
    })
  },
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
      this.audioCtx.play();
    } else {
      this.data.img_url[ids] = 'yy@2x2.png';
      this.setData({
        img_url: this.data.img_url
      })
      this.audioCtx.seek(0);
      this.audioCtx.pause();
    }
  },
  collect: function (event) {

    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/collect_lecturer',
      data: {
        oid: that.data.oid,
        lecturerId: that.data.item.l.lecturerId
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
      url: app.globalData.baseUrl + 'wx/cancel_collect_lecturer',
      data: {
        oid: that.data.oid,
        lecturerId: that.data.item.l.lecturerId
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
  ,
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