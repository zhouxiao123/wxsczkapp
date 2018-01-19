// lesson.js

var app = getApp()
Page({
  data: {
    disflag: 'none',
    slideflag: 'none',
    animationData: {},
    tag:0,
    id:0,
    oid:'',
    user: {},
    item:{},
    list:[],
    collect:0,
    msg:'',
    comment:[],
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0
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

    wx.request({
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
    })

    that.setData({
      disflag: "block"
    });

    wx.request({
      url: app.globalData.baseUrl+'wx/detail_video',
      data: {
        id: options.id,
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          item: res.data
        })
        wx.request({
          url: app.globalData.baseUrl+'wx/is_collect_video',
          data: {
            oid: that.data.oid,
            videoId: that.data.item.video.webLessonId
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

          }
        })
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
  },// 上拉加载回调接口
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
    that.setData({
      hasMore: true,
      opacityflag: 1
    })
    //console.log("---")
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var poff = parseInt(that.data.pageOffset) + 1;
    if(that.data.tag==1){
    wx.request({
      url: app.globalData.baseUrl+'wx/list_video',
      data: {
        pageOffset: poff,
        pageSize: 20,
        tid: that.data.item.video.webLessonType,
        lessontypeid: that.data.item.video.lessontypeid

      },
      success: function (res) {
        //console.log(res.data.schools.length)
        if (res.data.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {


          that.data.list = that.data.list.concat(res.data)
          //console.log(poff)
          that.setData({
            list: that.data.list,
            pageOffset: poff,
            opacityflag: 0
          })
        }
        wx.hideLoading()


      }
    })
    } else {
      wx.request({
        url: app.globalData.baseUrl+'wx/lesson_comment_list',
        data: {
          lessonid: that.data.item.video.webLessonId,
          pageOffset: poff,
          pageSize: 20,
        },
        success: function (res) {
          //console.log(res.data)

          if (res.data.comment.length == 0) {
            that.setData({
              hasMore: false,
            })
          } else {

            for (var i in res.data.comment) {
              res.data.comment[i].createtime = transDate(res.data.comment[i].createtime)
            }



            that.data.comment = that.data.comment.concat(res.data.comment)
            //console.log(poff)
            that.setData({
              comment: res.data.comment,
              pageOffset: poff,
              opacityflag: 0
            })
          }
          //clearInterval(that.data.time)
          //updateList(that)
          wx.hideLoading()
        }
      })
    }

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
      if (event.target.dataset.current==1){
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl+'wx/list_video',
          data: {
            tid: this.data.item.video.webLessonType,
            lessontypeid: that.data.item.video.lessontypeid
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              list: res.data
            })
            wx.hideLoading()
          }
        })
      } else{
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl+'wx/lesson_comment_list',
          data: {
            lessonid: this.data.item.video.webLessonId
          },
          success: function (res) {
            //console.log(res.data)
            for (var i in res.data.comment) {
              res.data.comment[i].createtime = transDate(res.data.comment[i].createtime)
            }
            that.setData({
              comment: res.data.comment
            })
            //clearInterval(that.data.time)
            //updateList(that)
            wx.hideLoading()
          }
        })
      }
    }

  },
  setValue: function (event) {

    this.setData({
      msg: event.detail.value
    });
  },
  sendMsg: function (event) {
    //console.log(this.data.search_name)

      var that = this
      if (that.data.msg.length == "0") {
        wx.showModal({
          title: '提示',
          content: '请输入评论内容',
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
          url: app.globalData.baseUrl+'wx/weblesson_comment_save',
          data: {
            oid: this.data.oid,
            content: this.data.msg,
            lessonid: this.data.item.video.webLessonId
          },
          success: function (res) {
            //console.log(res.data)
            if (res.data.result == "ok") {
              wx.showModal({
                title: '提示',
                content: '评论成功',
                showCancel: false,
                success: function (res) {
                  wx.showLoading({
                    mask: true,
                    title: '加载中'
                  })
                  wx.request({
                    url: app.globalData.baseUrl+'wx/lesson_comment_list',
                    data: {
                      lessonid: that.data.item.video.webLessonId
                    },
                    success: function (res) {
                      //console.log(res.data)
                      for (var i in res.data.comment) {
                        res.data.comment[i].createtime = transDate(res.data.comment[i].createtime)
                      }
                      that.setData({
                        comment: res.data.comment,
                        msg:'',
                        pageOffset: 0
                      })
                      //clearInterval(that.data.time)
                      //updateList(that)
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
  bindChange: function (event) {
    this.setData({ tag: event.detail.current });
  },
  see_video: function (event) {

    wx.redirectTo({
      url: '../video_detail/video_detail?id=' + event.currentTarget.dataset.id
    })

  },
  toBuy:function (event){

    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        if (res.data.length==0){
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
        }else{
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
                    if (res.data==false) {
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
                              url: '../video_detail/video_detail?id=' + that.data.item.video.webLessonId
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
  collect: function (event) {

    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/collect_video',
      data: {
        oid: that.data.oid,
        videoId: that.data.item.video.webLessonId
      },
      success: function (res) {
        if(res.data.result=="fail"){
          wx.showModal({
            title: '提示',
            content: '收藏失败',
            showCancel: false,
            success: function (res) {
              
            }
          })
        } else{
          that.setData({
            collect: 1
          });
        }

      }
    })
    //console.log(event.currentTarget.dataset.id)
  }, cansleCollect:function(){
    var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/cancel_collect_video',
      data: {
        oid: that.data.oid,
        videoId: that.data.item.video.webLessonId
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
  }, onShareAppMessage: function (res) {
    var that=this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: that.data.item.video.webLessonName,
      path: 'pages/video_detail/video_detail?id=' + that.data.item.video.webLessonId,
      imageUrl: app.globalData.baseUrl+'img/' + that.data.item.video.webLessonPic,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }, deleteComment: function (event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl+'wx/deleteComment',
            data: {
              commentId: event.currentTarget.dataset.id
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
                    wx.showLoading({
                      mask: true,
                      title: '加载中'
                    })
                    wx.request({
                      url: app.globalData.baseUrl+'wx/lesson_comment_list',
                      data: {
                        lessonid: that.data.item.video.webLessonId
                      },
                      success: function (res) {
                        //console.log(res.data)
                        for (var i in res.data.comment) {
                          res.data.comment[i].createtime = transDate(res.data.comment[i].createtime)
                        }
                        that.setData({
                          comment: res.data.comment
                        })
                        //clearInterval(that.data.time)
                        //updateList(that)
                        wx.hideLoading()
                      }
                    })
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