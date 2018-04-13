// pages/live_video/live_video.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    slideflag: 'none',
    animationData: {},
    tag: 0,
    id: 0,
    userid: 0,
    oid: '',
    item: {},
    time:0,
    list: [],
    appoint: 0,
    msg: '',
    isLecturer: 0,
    isLive:0,
    lecturer:{},
    src:''
  },
  
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "视频详情" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease'
    })


    this.animation = animation
    //console.log(options)
    this.setData({
      id: options.id
    });
    var that = this

    var value = wx.getStorageSync('oid')

    if (value) {
      that.data.oid = value;
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
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
                that.data.oid = res.data;
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

    that.setData({
      disflag: "block"
    });

    wx.request({
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        clearInterval(that.data.time)
        updateList(that)
        that.setData({
          isLecturer: res.data.isLecturer,
          isLive:res.data.isLive,
          userid: res.data.id
        })
        if (res.data.isLecturer==1){
          wx.request({
            url: app.globalData.baseUrl+'wx/lecturerDetailByUserId',
            data: {
              userid: that.data.userid
            },
            success: function (res) {
              //console.log(res.data)
              that.setData({
                lecturer: res.data
                
              })

            }
          })
        }
      }
    })

    wx.request({
      url: app.globalData.baseUrl+'wx/detail_video',
      data: {
        id: options.id,
        oid: that.data.oid,
        from: options.from != null ? options.from:''
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          item: res.data
        })
        that.data.src ='https://wxsign.sczk.com.cn/hls/mystream.m3u8'
        //that.data.src = 'https://wxsign.sczk.com.cn/hls/mystream-test.m3u8'
        //that.data.src = 'https://wxsign.sczk.com.cn/wxsczkappback/vd/a82d39ff-de18-4343-add3-8855e462b64d/a82d39ff-de18-4343-add3-8855e462b64d.m3u8'
        if (that.data.item.video.isfee == 1 && res.data.isLecturer != 1) {
          if (that.data.item.buy == null || that.data.item.buy == '') {
            that.data.src = ''
          }
        }
        that.setData({
          src: that.data.src
        })
        /*wx.request({
          url: app.globalData.baseUrl+'wx/is_appoint_video',
          data: {
            oid: that.data.oid,
            videoId: that.data.item.video.webLessonId
          },
          success: function (res) {
            if (res.data.result == "fail") {
              that.setData({
                appoint: 0
              });
            } else {
              that.setData({
                appoint: 1
              });
            }

          }
        })*/
        that.setData({
          disflag: "none"
        });
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
  },
  swichNav: function (event) {
    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      var that = this
      if (event.target.dataset.current == 2){
        if (this.data.item.video.isfee == 1 && res.data.isLecturer != 1){
          if (this.data.item.buy == null || this.data.item.buy == ''){
            
            wx.showModal({
              title: '提示',
              content: '请先购买',
              showCancel: false,
              success: function (res) {
                

              }
            })
            return false;
          }
        }
      }

      this.setData({
        tag: event.target.dataset.current
      })
      
      if (event.target.dataset.current == 2) {
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl+'wx/lesson_ask_list',
          data: {
            lessonid: this.data.item.video.webLessonId
          },
          success: function (res) {
            //console.log(res.data)
            for (var i in res.data.lessonask){
              res.data.lessonask[i].createtime = transDate(res.data.lessonask[i].createtime)
            }
            that.setData({
              list: res.data
            })
            clearInterval(that.data.time)
            updateList(that)
            wx.hideLoading()
          }
        })
        
      }
    }

  },
  bindChange: function (event) {
    this.setData({ tag: event.detail.current });
  },
  see_video: function (event) {

    wx.redirectTo({
      url: '../video_detail/video_detail?id=' + event.currentTarget.dataset.id
    })

  },
  toBuy: function (event) {

    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        if (res.data.length == 0) {
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
        if (res.data.point < parseInt(that.data.item.video.webLessonPrice * 10)) {
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
              }
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '积分充足,是否直接积分购买?',
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.request({
                  url: app.globalData.baseUrl+'wx/buyLessonByPoint',
                  data: {
                    oid: that.data.oid,
                    wid: that.data.item.video.webLessonId
                  },
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
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })
                    } else {
                      //成功支付
                      wx.showModal({
                        title: '提示',
                        content: '购买成功',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            that.setData({
                              disflag: "block"
                            });
                            wx.redirectTo({
                              url: '../live_video/live_video?id=' + that.data.item.video.webLessonId
                            })
                          } else if (res.cancel) {
                            console.log('用户点击取消')
                          }
                        }
                      })

                    }

                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        }
      }
    })
    //console.log(event.currentTarget.dataset.id)
  },
  appoint: function (event) {

    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/appoint_video',
      data: {
        oid: that.data.oid,
        videoId: that.data.item.video.webLessonId
      },
      success: function (res) {
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '预约失败',
            showCancel: false,
            success: function (res) {

            }
          })
        } else {
          that.setData({
            appoint: 1
          });
        }

      }
    })
    //console.log(event.currentTarget.dataset.id)
  }, cansleAppoint: function () {
    
    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/cancel_appoint_video',
      data: {
        oid: that.data.oid,
        videoId: that.data.item.video.webLessonId
      },
      success: function (res) {
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '取消预约失败',
            showCancel: false,
            success: function (res) {

            }
          })
        } else {
          that.setData({
            appoint: 0
          });
        }

      }
    })
  },
  setValue: function (event) {

    this.setData({
      msg: event.detail.value
    });
  },
  sendMsg: function (event) {
    //console.log(this.data.search_name)
    var that = this
    if (this.data.isLive != "1" && this.data.item.video.openask == "0"){
      that.setData({
        msg: ''
      })
      wx.showModal({
        title: '提示',
        content: '当前状态禁止发言',
        showCancel: false,
        success: function (res) {

        }
      })
    } else{
    var that = this
    if(that.data.msg.length=="0"){
      wx.showModal({
        title: '提示',
        content: '请输入提问内容',
        showCancel: false,
        success: function (res) {

        }
      })
      
      } else{
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/lesson_ask_save',
      data: {
        oid: this.data.oid,
        askcontent: this.data.msg,
        lessonid: this.data.item.video.webLessonId
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '提问成功',
            showCancel: false,
            success: function (res) {
              
            }
          })
          that.setData({
            msg:''
          })
        } else if(res.data.result == "not"){
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {

            }
          })
          that.setData({
            msg: ''
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
    }
  },startLive:function(e){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/start_live',
      data: {
        lessonid: this.data.item.video.webLessonId
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '开启成功',
            showCancel: false,
            success: function (res) {
              that.data.item.video.openlive=1
              that.setData({
                item: that.data.item
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '开启失败',
            showCancel: false,
            success: function (res) {

            }
          })
        }
        wx.hideLoading()
      }
    })
  },closeLive:function(e){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/close_live',
      data: {
        lessonid: this.data.item.video.webLessonId
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '关闭成功',
            showCancel: false,
            success: function (res) {
              that.data.item.video.openlive = 2
              that.setData({
                item: that.data.item
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '关闭失败',
            showCancel: false,
            success: function (res) {

            }
          })
        }
        wx.hideLoading()
      }
    })
  }, startAsk: function (e) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/start_ask',
      data: {
        lessonid: this.data.item.video.webLessonId
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '开启成功',
            showCancel: false,
            success: function (res) {
              that.data.item.video.openask = 1
              that.setData({
                item: that.data.item
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '开启失败',
            showCancel: false,
            success: function (res) {

            }
          })
        }
        wx.hideLoading()
      }
    })
  }, closeAsk: function (e) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/close_ask',
      data: {
        lessonid: this.data.item.video.webLessonId
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '关闭成功',
            showCancel: false,
            success: function (res) {
              that.data.item.video.openask = 0
              that.setData({
                item: that.data.item
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '关闭失败',
            showCancel: false,
            success: function (res) {

            }
          })
        }
        wx.hideLoading()
      }
    })
  }, changeAskFee:function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/change_askfee',
      data: {
        lessonid: this.data.item.video.webLessonId
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '修改成功',
            showCancel: false,
            success: function (res) {
              /*that.data.item.video.openask = 0
              that.setData({
                item: that.data.item
              })*/
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '关闭失败',
            showCancel: false,
            success: function (res) {

            }
          })
        }
        wx.hideLoading()
      }
    })
  }, ask_detail:function(e){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (this.data.isLecturer == 1 && e.currentTarget.dataset.lecturer != "1" && e.currentTarget.dataset.isanswer == "0"){
      wx.navigateTo({
        url: '../lesson_ask_answer/lesson_ask_answer?id=' + e.currentTarget.dataset.id
      })
    } else if (e.currentTarget.dataset.isanswer == "1"){
      wx.navigateTo({
        url: '../lesson_ask_detail/lesson_ask_detail?id=' + e.currentTarget.dataset.id
      })
    }
    wx.hideLoading()
  },
 
  onUnload: function () {
    clearInterval(this.data.time)
  }, 
  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: that.data.item.video.webLessonName,
      path: 'pages/live_video/live_video?id=' + that.data.item.video.webLessonId,
      imageUrl: app.globalData.baseUrl+'img/' + that.data.item.video.webLessonPic,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }, deleteAsk: function (event) {
    event.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + 'wx/deleteLessonAsk',
            data: {
              id: event.currentTarget.dataset.id
            },
            success: function (res) {
              if (res.data.result == "fail") {
                wx.showModal({
                  title: '提示',
                  content: '删除失败',
                  showCancel: false,
                  success: function (res) {

                  }
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '删除成功',
                  showCancel: false,
                  success: function (res) {
                    
                  }
                })
              }

            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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

function updateList(that){
  that.data.time = setInterval(function(){
    wx.request({
      url: app.globalData.baseUrl+'wx/lesson_ask_list',
      data: {
        lessonid: that.data.item.video.webLessonId
      },
      success: function (res) {
        //console.log(res.data)
        for (var i in res.data.lessonask) {
          res.data.lessonask[i].createtime = transDate(res.data.lessonask[i].createtime)
        }
        that.setData({
          list: res.data
        })
        wx.hideLoading()
      }
    })

    wx.request({
      url: app.globalData.baseUrl+'wx/detail_video',
      data: {
        id: that.data.id,
        oid: that.data.oid,
        type:1
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          item: res.data
        })

      }
    })
    //console.log("---")
  },2000)
}