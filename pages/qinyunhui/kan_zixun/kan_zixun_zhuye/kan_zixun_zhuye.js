var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainList:[],
    tag: 1,
    tag1:-1,
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0,
    disflag: 'none',
    animationData: {},
    pageNo: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "看.资讯" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })

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
                title: '注册账号',
                content: res.data.msg,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url: '../denglu_qinyunhui/denglu_qinyunhui'
                    })
                  } else if (res.cancel) {
                    wx.navigateTo({
                      url: '../../index/index'
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

             //获取头部列表
              wx.request({
                url: app.globalData.baseUrl + 'qinyun//news/tags',
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
                  console.log(res.data)
                  that.setData({
                   toubuList: res.data.list
                  })
                  wx.hideLoading()

                  //加载最新资讯
                  wx.request({
                    url: app.globalData.baseUrl + 'qinyun/news/list',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'qyh-appid': '07',
                      'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
                    },
                    data: {
                      uid: that.data.uid,
                      secKey: that.data.secKey,
                      newsTag: 1,
                    },
                    success: function (res) {
                      //将时间戳转换
                      var i = 0;
                      var ZCdata = [];
                      for (var i in res.data.list) {
                        var n = res.data.list[i].createTime;
                        var date = new Date(n);
                        var Y = date.getFullYear() + '-';
                        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
                        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                        ZCdata.push(M + D);
                        res.data.list[i].time = M + D;//获取到的集合list基础上，增加一个字段
                      }
                      console.log(res.data)
                      that.setData({
                        mainList: res.data.list,
                        tag1:1
                      })
                      wx.hideLoading()
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  
  },
  swichNav: function (event) {

    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      this.setData({
        tag: event.target.dataset.current
      })
      console.log(event.target.dataset.current)
      var that = this
      if (this.data.tag == event.target.dataset.current) {
         wx.showLoading({
          mask: true,
          title: '加载中'
        })
       wx.request({
         url: app.globalData.baseUrl + 'qinyun/news/list',
         header: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'qyh-appid': '07',
           'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
         },
         data: {
           uid: that.data.uid,
           secKey: that.data.secKey,
           newsTag: event.target.dataset.current,
         },
          success: function (res) {
            //将时间戳转换
            var i = 0;
            var ZCdata = [];
            for (var i in res.data.list) {
              var n = res.data.list[i].createTime;
              var date = new Date(n);
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
              var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
              ZCdata.push(M + D);
              res.data.list[i].time = M + D;//获取到的集合list基础上，增加一个字段
            }
            console.log(res.data)
            that.setData({
              mainList: res.data.list,
              tag1: event.target.dataset.current
            })
            that.data.tag1 = event.target.dataset.current
            wx.hideLoading()
          }
        })
      }
    }
  },

  /**
 * 上拉加载回调接口
 */
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
    if (that.data.tag == that.data.tag1) {
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
        url: app.globalData.baseUrl + 'qinyun/news/list',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'qyh-appid': '07',
          'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
        },
        data: {
          uid: that.data.uid,
          secKey: that.data.secKey,
          newsTag: that.data.tag1,
          pageNo: poff,
        },
        success: function (res) {
          //将时间戳转换
          var i = 0;
          var ZCdata = [];
          for (var i in res.data.list) {
            var n = res.data.list[i].createTime;
            var date = new Date(n);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            ZCdata.push(M + D);
            res.data.list[i].time = M + D;//获取到的集合list基础上，增加一个字段
          }
          console.log(res.data)
          if (res.data.list == null || res.data.list.length == 0) {
            that.setData({
              hasMore: false,
            })
          } else {
            that.data.list = that.data.mainList.concat(res.data.list)
            //console.log(poff)
            that.setData({
              mainList: res.data.list,
              pageNo: poff,
              opacityflag: 0,
              tag1: that.data.tag1
            })
          }
          wx.hideLoading()
        }
      })
    }
  },

/**
* 点击一级标题，进入资讯的二级详细页面
*/
  zixunDetail: function (event) {
    var that = this
    //跳转到
    console.log('循环出id的值' + event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../zixun_detail/zixun_detail?&newsId=' + event.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})