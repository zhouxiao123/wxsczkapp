// pages/adv/purui/ask/ask.js
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
    search_name: '',
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "我要提问" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation

    var that = this

    if (options.tag != null) {
      that.setData({
        tag: options.tag
      })
    }

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
      url: app.globalData.baseUrl + 'wx/purui_ask_list',
      data: {
        
      },
      success: function (res) {
        //console.log(res.data)

        for (var i in res.data.puruiask) {
          res.data.puruiask[i].createtime = transDate(res.data.puruiask[i].createtime)
        }
        that.setData({
          askList: res.data.puruiask
        })

        wx.hideLoading()
      }
    })
  }, reload: function () {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/purui_ask_list',
      data: {
        
      },
      success: function (res) {
        //console.log(res.data)

        for (var i in res.data.puruiask) {
          res.data.puruiask[i].createtime = transDate(res.data.puruiask[i].createtime)
        }
        that.setData({
          askList: res.data.puruiask
        })

        wx.hideLoading()
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
      url: app.globalData.baseUrl + 'wx/purui_ask_list',
      data: {
        pageOffset: poff,
        pageSize: 20

      },
      success: function (res) {
        //console.log(res.data.schools.length)
        if (res.data.puruiask.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          for (var i in res.data) {
            res.data.puruiask[i].createtime = transDate(res.data.puruiask[i].createtime)
          }

          that.data.askList = that.data.askList.concat(res.data.puruiask)
          //console.log(poff)
          that.setData({
            askList: that.data.askList,
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
      url: 'ask_detail/ask_detail?id=' + event.currentTarget.dataset.id
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
      if (this.data.tag == 0) {

        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'wx/purui_ask_list',
          data: {
            
          },
          success: function (res) {
            //console.log(res.data)
            for (var i in res.data.puruiask) {
              res.data.puruiask[i].createtime = transDate(res.data.puruiask[i].createtime)
            }
            that.setData({
              askList: res.data.puruiask
            })

            wx.hideLoading()
          }
        })
      }
    }


  },
  setValue: function (event) {
    this.setData({
      search_name: event.detail.value
    });
  },
  search: function (event) {
    //console.log(this.data.search_name)
    var that = this
    if (this.data.tag == 0) {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl + 'wx/purui_ask_list',
        data: {
          search_name: that.data.search_name
        },
        success: function (res) {
          //console.log(res.data)
          for (var i in res.data.puruiask) {
            res.data.puruiask[i].createtime = transDate(res.data.puruiask[i].createtime)
          }
          that.setData({
            askList: res.data.puruiask,
            pageOffset: 0,
            opacityflag: 0
          })

          wx.hideLoading()
        }
      })
    }
  },
  bindChange: function (event) {
    this.setData({ tag: event.detail.current });

  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value.text.length)
    if (e.detail.value.askcontent.length == "0") {
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

    //console.log(e.detail.value)
    var that = this;
    /*wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        if (res.data.point < 10) {
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
            content: '积分充足,是否直接10积分购买?',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')*/
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
                wx.request({
                  url: app.globalData.baseUrl + 'wx/savepuruiask',
                  data: e.detail.value,
                  success: function (res) {
                    //console.log(res.data);
                    wx.hideLoading()
                    if (res.data.result == 'fail') {
                      wx.showModal({
                        title: '提示',
                        content: '提问失败，请重试',
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
                        content: '提问成功。',
                        showCancel: false,
                        success: function (res) {
                          //if (res.confirm) {
                          wx.showLoading({
                            mask: true,
                            title: '加载中'
                          })
                          wx.request({
                            url: app.globalData.baseUrl + 'wx/purui_ask_list',
                            data: {

                            },
                            success: function (res) {
                              //console.log(res.data)
                              for (var i in res.data.puruiask) {
                                res.data.puruiask[i].createtime = transDate(res.data.puruiask[i].createtime)
                              }
                              that.setData({
                                askList: res.data.puruiask,
                                tag:0
                              })

                              wx.hideLoading()
                            }
                          })
                          //} else if (res.cancel) {
                            //console.log('用户点击取消')
                            //that.setData({
                              //disflag: "none"
                            //});
                          //}
                        }
                      })

                    }

                  }
                })
              /*} else if (res.cancel) {
                console.log('用户点击取消')
                that.setData({
                  disflag: "none"
                });
              }
            }
          })
        }

      }
    })*/
  },
  lecturerDetail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../lecturer_detail/lecturer_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()


  },
  setPreId: function (event) {
    //console.log(event.currentTarget.dataset.id)
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/lecturerDetail',
      data: {
        id: event.currentTarget.dataset.id
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          tag: 1,
          preid: event.currentTarget.dataset.id,
          showLecturer: "block",
          lecturer: res.data
        })

      }
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