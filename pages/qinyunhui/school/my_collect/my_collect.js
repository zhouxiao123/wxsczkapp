// pages/my_collect/my_collect.js
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

 
    list1: [],
    list2: [],
    schoolList: [],
    zyList: [],
    tag: 0,
    oid: '',
    search_name:'',
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 10,
    opacityflag: 0,
    pageNo:1,
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "我的收藏" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation

    var that = this

    //获取oid---
    var value = wx.getStorageSync('oid')
    console.log(value)
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
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'qyh-appid': '07',
                'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
              },
              data: {
                code: res.code
              },
              success: function (res) {
                console.log(res.data);
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

    /**
* 调用getUserDetail方法，通过oid查询对应的user集合
*/
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)

        that.setData({
          user: res.data
        })

        //调用登录接口
        wx.request({

          url: app.globalData.baseUrl + 'qinyun/pub/auth',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            openId: that.data.oid,
            typeId: 73,
            unionid: that.data.oid
          },
          success: function (res) {
            console.log(res.data);
            wx.hideLoading()

            //跳转到注册页面
            if (res.data.status == 300) {
              //跳转到测录取页面
              wx.showModal({
                title: '验证手机号',
                //content: res.data.msg,
                content: '验证后查看收藏',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '/pages/qinyunhui/denglu/shoucang_denglu/shoucang_denglu'
                    })
                  } else if (res.cancel) {
                    wx.navigateTo({
                      url: '/pages/index/index'
                    })
                    console.log('用户点击取消')
                  }
                },
              })
            } else if (res.data.status == 200) {
              that.setData({
                secKey: res.data.list[0].secKey,
                uid: res.data.list[0].id
              })
              //取secKey和uid
              that.data.secKey = res.data.list[0].secKey
              that.data.uid = res.data.list[0].id
            }
          }
        })


      }
    })
  },
  onShow:function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (that.data.tag == "0" || that.data.tag == "1"){
    wx.request({
      url: app.globalData.baseUrl+'wx/collect_list',
      data: {
        tag: this.data.tag,
        oid: this.data.oid,
        search_name: that.data.search_name
      },
      success: function (res) {
        //console.log(res.data)
        if (that.data.tag == "0") {
          that.setData({
            list1: res.data
          })
        } else if (that.data.tag == "1") {
          that.setData({
            list2: res.data
          })
        } 
        wx.hideLoading()
      }
    })

}else if (that.data.tag == "2") {//青云汇高校
    //青云汇中收藏的高校
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/u/attention/schools',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        uid: that.data.uid,
        secKey: that.data.secKey,

      },
      success: function (res) {
        //console.log('我的里面的收藏的高校============')
        //console.log(res.data)
        wx.hideLoading()
        //继续处理上面的
        that.setData({
          schoolList: res.data.list,

        })
      }
    })

  } else if (that.data.tag == "3") {
    //青云汇中收藏的专业
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/u/attention/majors',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        //console.log('我的里面的收藏的专业============')
        //console.log(res.data)
        wx.hideLoading()
        //继续处理上面的
        that.setData({
          zyList: res.data.list
        })
      }
    })
  } else {
    wx.hideLoading()
  }




  }
  ,
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
    //console.log(event.target.dataset.id)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../ask_detail/ask_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  see_video: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/video_detail/video_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  swichNav: function (event) {
    this.data.pageNo=1
    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      this.setData({
        tag: event.target.dataset.current,
        search_name: ''
      })
      var that = this
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/collect_list',
        data: {
          tag: this.data.tag,
          oid: this.data.oid,
          search_name: that.data.search_name
          
        },
        success: function (res) {
          //console.log(res.data)
          if (that.data.tag == "0") {
            that.setData({
              list1: res.data
            })
          } else if (that.data.tag == "1"){
            that.setData({
              list2: res.data
            })
          }else if (that.data.tag == "2") {
            wx.request({
              url: app.globalData.baseUrl + 'qinyun/u/attention/schools',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'qyh-appid': '07',
                'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
              },
              data: {
                uid: that.data.uid,
                secKey: that.data.secKey,
               
              },
              success: function (res) {
                console.log('我的里面的收藏的高校============')
                console.log(res.data)
                //继续处理上面的
                that.setData({
                  schoolList: res.data.list
                })
              }
            })
          } else if (that.data.tag == "3")  {
            //青云汇中收藏的专业
            wx.request({
              url: app.globalData.baseUrl + 'qinyun/u/attention/majors',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'qyh-appid': '07',
                'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
              },
              data: {
                uid: that.data.uid,
                secKey: that.data.secKey,
              },
              success: function (res) {
                console.log('我的里面的收藏的专业============')
                console.log(res.data)
                //继续处理上面的
                that.setData({
                  zyList: res.data.list
                })
              }
            })
          }
          wx.hideLoading()
        }
      })
    }
  },

  /**
 * 上拉加载回调接口
 */
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
    if (that.data.tag == "2") {
      that.setData({
        hasMore: true,
        opacityflag: 1
      })

      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      var poff = parseInt(that.data.pageNo) + 1;

      wx.request({
        url: app.globalData.baseUrl + 'qinyun/u/attention/schools',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'qyh-appid': '07',
          'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
        },
        data: {
          pageNo: poff,
          uid: that.data.uid,
          secKey: that.data.secKey,
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.list == null || res.data.list.length == 0) {
            that.setData({
              hasMore: false,
            })
          } else {
            that.data.schoolList = that.data.schoolList.concat(res.data.list)
            //console.log(poff)
            that.setData({
              schoolList: that.data.schoolList,
              pageNo: poff,
              opacityflag: 0
            })
          }
          wx.hideLoading()
        }
      })
    } else if (that.data.tag == "3"){
      that.setData({
        hasMore: true,
        opacityflag: 1
      })

      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      var poff = parseInt(that.data.pageNo) + 1;

      wx.request({
        url: app.globalData.baseUrl + 'qinyun/u/attention/majors',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'qyh-appid': '07',
          'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
        },
        data: {
          pageNo: poff,
          uid: that.data.uid,
          secKey: that.data.secKey,
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.list == null || res.data.list.length == 0) {
            that.setData({
              hasMore: false,
            })
          } else {
            that.data.zyList = that.data.zyList.concat(res.data.list)
            //console.log(poff)
            that.setData({
              zyList: that.data.zyList,
              pageNo: poff,
              opacityflag: 0
            })
          }
          wx.hideLoading()
        }
      })
    }
  },

   answerDetail: function (e) {
     //console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/test_answer_detail/test_answer_detail?id=' + e.currentTarget.dataset.id,
    })
  },
  bindChange: function (event) {
    this.setData({ tag: event.detail.current });

  },
  setValue: function (event) {
    this.setData({
      search_name: event.detail.value
    });
  },
  /**
   * 模糊查询
   */
  search: function (event) {
    //console.log(this.data.search_name)
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/collect_list',
      data: {
        tag: this.data.tag,
        oid: this.data.oid,
        search_name: that.data.search_name
        
      },
      success: function (res) {
        //console.log(res.data)
        if (that.data.tag == "0") {
          that.setData({
            list1: res.data
          })
        } else if (that.data.tag == "1") {
          that.setData({
            list2: res.data
          })
        } 
        /*else if (that.data.tag == "2") {
          that.setData({
            schoolList: res.data.list
          })
        } else {
          that.setData({
            zyList: res.data
          })
        }*/
        wx.hideLoading()
      }
    })
  },

  lecturerDetail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/lecturer_detail/lecturer_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()


  },

  schoolDetail: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/qinyunhui/school/school_detail/school_detail?id=' + event.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
    })
    wx.hideLoading()
  },

  zyDetail: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/qinyunhui/zhuanye/pro_detail/pro_detail?id=' + event.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
    })
    wx.hideLoading()
  }
})