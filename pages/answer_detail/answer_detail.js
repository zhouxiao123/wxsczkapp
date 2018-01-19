// pages/answer_detail/answer_detail.js
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
    user: {},
    oid: '',
    id: '',
    askid: '',
    item: {},
    collect: 0,
    issecret: 0,
    author: 0,
    msg: '',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    wx.setNavigationBarTitle({ title: "快速问答" })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.setData({
      id: options.id,
      askid: options.askid
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

    /*wx.request({
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)

        that.setData({
          user: res.data

        })
      }
    })*/

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/answerDetail',
      data: {
        askid: options.askid,
        id: options.id
      },
      success: function (res) {
        //console.log(res.data)
        res.data.ask.createTime = transDate(res.data.ask.createTime);
        res.data.answer.createtime = transDate(res.data.answer.createtime);
        that.setData({
          item: res.data,
        })
        
        wx.request({
          url: app.globalData.baseUrl+'wx/is_collect_lecturer',
          data: {
            oid: that.data.oid,
            lecturerId: that.data.item.answer.u.l.lecturerId
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
  bigPic: function (e) {
    //console.log('e.currentTarget.dataset.src')
    var array = new Array
    array.push(e.currentTarget.dataset.src)
    wx.previewImage({
      urls: array,
    })
  }
,
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
  voiceEnd: function () {

    this.data.img_url[0] = 'yy@2x2.png';
    this.setData({
      img_url: this.data.img_url
    })
    this.audioCtx.seek(0);
    this.audioCtx.pause();
  },
  listen: function (event) {
    var that = this
    if(that.data.item.answer.isfee==1){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/is_pay_answer',
      data: {
        answerid: that.data.id,
        oid: that.data.oid
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.result =="fail"){

          wx.showModal({
            title: '提示',
            content: '是否花费10积分进行购买?',
            showCancel: true,
            success: function (res) {
              if (res.confirm){
                wx.showLoading({
                  mask: true,
                  title: '加载中'
                })
                wx.request({
                  url: app.globalData.baseUrl+'wx/pay_answer',
                  data: {
                    answerid: that.data.id,
                    oid: that.data.oid
                  },
                  success: function (res) {
                    wx.hideLoading()
                    if(res.data.result=="fail"){
                      wx.showModal({
                        title: '提示',
                        content: '支付失败，请退出重试',
                        showCancel: false,
                        success: function (res) {

                        }
                      })
                    } else if (res.data.result == "nouser"){
                      wx.showModal({
                        title: '提示',
                        content: '请先填写资料',
                        showCancel: false,
                        success: function (res) {
                          wx.navigateTo({
                            url: '../personal_info/personal_info'
                          })
                          /*if (res.confirm) {
                            console.log('用户点击确定')
                            
                            wx.navigateTo({
                              url: '../personal_info/personal_info'
                            })
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                            wx.navigateTo({
                              url: '../personal_info/personal_info'
                            })
                          }*/
                        }
                      })
                    } else if (res.data.result == "less") {
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
                            //console.log('用户点击取消')

                          }
                        }
                      })
                    }else{
                      wx.showModal({
                        title: '提示',
                        content: '支付成功',
                        showCancel: false,
                        success: function (res) {

                        }
                      })
                    }
                  }
                })
              }
            }
          })
          

        } else {
    var ids = event.currentTarget.dataset.id;
    if (that.data.img_url[ids] == 'yy@2x2.png') {
      that.setData({
        img_url: that.data.def_img_url
      })
      that.data.img_url[ids] = 'yy.gif';
      that.setData({
        img_url: that.data.img_url
      })
      that.audioCtx.play();
    } else {
      that.data.img_url[ids] = 'yy@2x2.png';
      that.setData({
        img_url: that.data.img_url
      })
      that.audioCtx.seek(0);
      that.audioCtx.pause();
    }
        }
      }
    })
    } else {
      var ids = event.currentTarget.dataset.id;
      if (that.data.img_url[ids] == 'yy@2x2.png') {
        that.setData({
          img_url: that.data.def_img_url
        })
        that.data.img_url[ids] = 'yy.gif';
        that.setData({
          img_url: that.data.img_url
        })
        that.audioCtx.play();
      } else {
        that.data.img_url[ids] = 'yy@2x2.png';
        that.setData({
          img_url: that.data.img_url
        })
        that.audioCtx.seek(0);
        that.audioCtx.pause();
      }
    }
  },
  collect: function (event) {

    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/collect_lecturer',
      data: {
        oid: that.data.oid,
        lecturerId: that.data.item.answer.u.l.lecturerId
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
        lecturerId: that.data.item.answer.u.l.lecturerId
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
    if (getCurrentPages().length == 5) {
      wx.redirectTo({
        url: '../ask_lecturer/ask_lecturer?id=' + event.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '../ask_lecturer/ask_lecturer?id=' + event.currentTarget.dataset.id
      })
    }
    
    this.setData({
      disflag: "none"
    });
  }, setValue: function (event) {

    this.setData({
      msg: event.detail.value
    });
  },
  addPraise: function (e) {
    //console.log(e.currentTarget.dataset.id+"-----")
    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/add_praise',
      data: {
        oid: that.data.oid,
        answerid: e.currentTarget.dataset.id
      },
      success: function (res) {
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '点赞失败',
            showCancel: false,
            success: function (res) {

            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '点赞成功',
            showCancel: false,
            success: function (res) {
              for (var i in that.data.item.answer) {
                if (that.data.item.answer[i].id == e.currentTarget.dataset.id) {
                  that.data.item.answer[i].ispraise = 1
                  that.data.item.answer[i].upcount = parseInt(that.data.item.answer[i].upcount) + 1
                }
              }
              that.setData({
                item: that.data.item
              })
            }
          })
        }
      }
    })
  },
  answer_detail: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../answer_detail/answer_detail?id=' + e.currentTarget.dataset.id
    })
    wx.hideLoading()
  }
  ,
  lecturerAnswer: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../answer_ask/answer_ask?id=' + e.currentTarget.dataset.id
    })
    wx.hideLoading()
  }
  ,
  sendMsg: function (event) {
    //console.log(this.data.search_name)

    var that = this
    if (that.data.msg.length == "0") {
      wx.showModal({
        title: '提示',
        content: '请输入回复内容',
        showCancel: false,
        success: function (res) {

        }
      })

    } else {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/save_ask_answer',
        data: {
          oid: this.data.oid,
          answercontent: this.data.msg,
          askid: this.data.item.ask.askId,
          answerid: 0
        },
        success: function (res) {
          //console.log(res.data)
          if (res.data == "ok") {
            wx.showModal({
              title: '提示',
              content: '回复成功',
              showCancel: false,
              success: function (res) {
                that.setData({
                  msg: ''
                });

                wx.showLoading({
                  mask: true,
                  title: '加载中'
                })
                wx.request({
                  url: app.globalData.baseUrl+'wx/askListDetail',
                  data: {
                    askid: that.data.item.ask.askId,
                    oid: that.data.oid
                  },
                  success: function (res) {
                    //console.log(res.data)
                    res.data.ask.createTime = transDate(res.data.ask.createTime);
                    for (var i in res.data.answer) {
                      res.data.answer[i].createtime = transDate(res.data.answer[i].createtime)
                    }
                    that.setData({
                      item: res.data,
                      issecret: res.data.ask.issecret
                    })
                    wx.hideLoading()

                  }
                })
              }
            })
          } else {
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
          }
          wx.hideLoading()
        }
      })
    }

  },
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: that.data.item.ask.askContent,
      path: 'pages/answer_detail/answer_detail?id=' + that.data.id+'&askid=' + that.data.askid,
      imageUrl: '../../images/logo.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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