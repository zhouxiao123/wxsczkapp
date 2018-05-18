// pages/ask_lecturer/ask_lecturer.js
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
    tag: 0,
    oid: '',
    preid: 0,
    askList: [],
    search_name: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "快速问答" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation

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


    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/lecturerDetail',
      data: {
        id: options.id
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          preid: options.id,
          showLecturer: "block",
          lecturer: res.data
        })

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
  bindChange: function (event) {
    this.setData({ tag: event.detail.current });

  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value.text.length)
    if (e.detail.value.text.length == "0") {
      wx.showModal({
        title: '提示',
        content: '提问内容不可为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })
      return false;
    }
    this.setData({
      disflag: "block"
    });
    //console.log(e.detail.value)
    var that = this;
    wx.request({
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        if (res.data.length == "0") {
          that.setData({
            disflag: "none"
          });
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '/pages/personal_info/personal_info'
              })

            }
          })
          
        } else if (res.data.point < 100) {
          wx.showModal({
            title: '提示',
            content: '积分不足,是否进行充值?',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../charge_fee/charge_fee'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                that.setData({
                  disflag: "none"
                });
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '积分充足,是否直接100积分购买?',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.request({
                  url: app.globalData.baseUrl+'wx/save_ask',
                  data: e.detail.value,
                  success: function (res) {
                    //console.log(res.data);
                    if (res.data == false) {
                      wx.showModal({
                        title: '提示',
                        content: '购买失败，请重试',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            console.log('用户点击确定')
                            that.setData({
                              disflag: "none"
                            });
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                            that.setData({
                              disflag: "none"
                            });
                          }
                        }
                      })
                    } else {
                      //成功支付
                      wx.showModal({
                        title: '提示',
                        content: '提问成功,专家将在24小时内进行答复。',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            that.setData({
                              disflag: "block"
                            });
                            wx.reLaunch({
                              url: '../personal/personal?tag=1'
                            })
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                            that.setData({
                              disflag: "none"
                            });
                          }
                        }
                      })

                    }

                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                that.setData({
                  disflag: "none"
                });
              }
            }
          })
        }

      }
    })
  }



  
})