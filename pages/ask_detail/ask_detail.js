//index.js
//获取应用实例
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
    user:{},
    oid: '',
    id:'',
    item: {},
    collect:0,
    issecret: 0,
    author:0,
    msg: '',
    adv:[],    
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0
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

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/askListDetail',
      data: {
        askid: options.id,
        oid:that.data.oid,
        first:1
      },
      success: function (res) {
        //console.log(res.data)
        res.data.ask.createTime = transDate(res.data.ask.createTime);
        for (var i in res.data.answer) {
          res.data.answer[i].createtime = transDate(res.data.answer[i].createtime)
        }
        that.setData({
          item: res.data,
          issecret: res.data.ask.issecret,
          author: res.data.ask.userId
        })
        wx.hideLoading()

        wx.request({
          url: app.globalData.baseUrl + 'wx/adv_list',
          data: {
            tag: 8
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              adv: res.data
            })

            //wx.hideLoading()
          }
        })
        /*wx.request({
          url: app.globalData.baseUrl+'wx/is_collect_lecturer',
          data: {
            oid: that.data.oid,
            lecturerId: that.data.item.ask.l.lecturerId
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
        })*/
        
      }
    })
  }, reload:function(){

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/askListDetail',
      data: {
        askid: that.data.id,
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
          issecret: res.data.ask.issecret,
          author: res.data.ask.userId
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  reload:function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/askListDetail',
      data: {
        askid: that.data.id,
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
          issecret: res.data.ask.issecret,
          author: res.data.ask.userId
        })
        wx.hideLoading()


      }
    })
  }
  , 
  personalIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../personal/personal'
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
      url: app.globalData.baseUrl+'wx/askListDetail',
      data: {
        pageOffset: poff,
        pageSize: 20,
        askid: that.data.id,
        oid: that.data.oid

      },
      success: function (res) {
        //console.log(res.data.schools.length)
          if (res.data.answer.length == 0) {
            that.setData({
              hasMore: false,
            })
          } else {
            res.data.ask.createTime = transDate(res.data.ask.createTime);
            for (var i in res.data.answer) {
              res.data.answer[i].createtime = transDate(res.data.answer[i].createtime)
            }

            that.data.item.answer = that.data.item.answer.concat(res.data.answer)
            that.setData({
              item: res.data,
              issecret: res.data.ask.issecret,
              author: res.data.ask.userId,
              pageOffset: poff,
              opacityflag: 0
            })

          }
        
        wx.hideLoading()


      }
    })

  },
  deleteAsk: function (event){
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl+'wx/deleteAsk',
            data: {
              askId: that.data.item.ask.askId
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
                    if (getCurrentPages().length == 1) {
                      wx.redirectTo({
                        url: '../index/index',
                      })
                    } else {
                      var prePage = getCurrentPages()[parseInt(getCurrentPages().length) - 2];
                      prePage.reload()
                      wx.navigateBack()
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
    
  }, deleteAnswer: function (event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl+'wx/deleteAnswer',
            data: {
              answerId: event.currentTarget.dataset.id
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
                    that.reload()
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

  }, editAnswer: function (event) {
    
    
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../edit_answer/edit_answer?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
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
      url: app.globalData.baseUrl+'wx/collect_lecturer',
      data: {
        oid: that.data.oid,
        lecturerId: that.data.item.ask.l.lecturerId
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
        lecturerId: that.data.item.ask.l.lecturerId
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
  }, setValue: function (event) {

    this.setData({
      msg: event.detail.value
    });
  },
  addPraise:function(e){
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
                if (that.data.item.answer[i].id == e.currentTarget.dataset.id){
                  that.data.item.answer[i].ispraise=1
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
  answer_detail:function(e){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../answer_detail/answer_detail?id=' + e.currentTarget.dataset.id + '&askid=' + e.currentTarget.dataset.askid
    })
    wx.hideLoading()
  },
  toanswer:function(e){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../to_answer/to_answer?askid=' + this.data.item.ask.askId
    })
    wx.hideLoading()
  }
  ,
  lecturerAnswer:function(e){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../answer_ask/answer_ask?id=' + e.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  bigPic:function(e){
    //console.log('e.currentTarget.dataset.src')
    var array = new Array
    array.push(e.currentTarget.dataset.src)
      wx.previewImage({
        urls: array,
      })
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
            answerid:0
          },
          success: function (res) {
            //console.log(res.data)
            if (res.data== "ok") {
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
      path: 'pages/ask_detail/ask_detail?id=' + that.data.item.ask.askId,
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