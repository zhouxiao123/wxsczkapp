var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:0,
    indexSize: 0,
    indicatorDots: false,
    autoplay: false,
    duration: 0, //可以控制动画
    
    disflag: 'none',
    opacityflag: 0,
    animationData: {},
    param: {},
    param1: {},
    oid: '',
    secKey: '',
    uid: 0,
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    mlList: [],
    pmlList: []
  },
  change(e) {
    this.setData({
      indexSize: e.detail.current
    })
  },
  scrollTo(e) {
    this.setData({
      indexSize: e.target.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({ title: "专业大全" })
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

              //加载专业列表
              wx.request({
                url: app.globalData.baseUrl + 'qinyun/v2/major/categories',
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
                    param: res.data.list[0].t1,
                    param1: res.data.list[0].t2,
                  })
                  wx.hideLoading()
                }
              })

            }
          }
        })


      }
    })

  },
  /**
 * 调到专业的详细分类
 */
  proFenlei: function (e) {
    var that = this
    //跳转到
    wx.navigateTo({
      url: '../pro_fenlei/pro_fenlei?&id=' + e.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  swichNav: function (event) {

    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      this.setData({
        tag: event.target.dataset.current
      })
      var that = this
    }
  },
})