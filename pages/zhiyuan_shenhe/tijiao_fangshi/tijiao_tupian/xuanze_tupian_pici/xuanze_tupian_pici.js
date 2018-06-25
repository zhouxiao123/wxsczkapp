var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yixuan:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "选择志愿填报批次-图片" })
    /**
    * 加载的时候获取微信id
    */
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
    /*if (options.yixuan != null && options.yixuan != '' && options.yixuan != "undefined"){
     var yixuan = options.yixuan
     that.data.yixuan = yixuan//这样在其他方法中就可以取值了
     that.setData({
       yixuan: that.data.yixuan
     })
   }*/
    //that.data.oid
    /**
* 调用getUserDetail方法，通过oid查询对应的user集合
*/
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        console.log(res.data)

        that.setData({
          user: res.data
        })
        //console.log(res.data.id)
        that.data.userid = res.data.id
        console.log('打印用户id')
        console.log(that.data.userid)
        //已填写的颜色改变1
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_main_table',
          data: {
            userid: that.data.userid,
            uploadingtype:1,
            pici:1
          },
          success: function (res) {
            console.log('第一个')
            console.log(res.data)
            that.setData({
              yanse1: res.data
            })
           
          }
        })
        //已填写的颜色改变2
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_main_table',
          data: {
            userid: that.data.userid,
            uploadingtype: 1,
            pici: 2
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              yanse2: res.data
            })

          }
        })
        //已填写的颜色改变3
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_main_table',
          data: {
            userid: that.data.userid,
            uploadingtype: 1,
            pici: 3
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              yanse3: res.data
            })

          }
        })
        //已填写的颜色改变4
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_main_table',
          data: {
            userid: that.data.userid,
            uploadingtype: 1,
            pici: 4
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              yanse4: res.data
            })

          }
        })
        //已填写的颜色改变5
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_main_table',
          data: {
            userid: that.data.userid,
            uploadingtype: 1,
            pici: 5
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              yanse5: res.data
            })

          }
        })


      }
    })
  },
  /**
* 点击跳转到本科提前批
*/
  benke_tiqianpi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_bktqp/tupian_bktqp'
    })
    wx.hideLoading()
  },
  /**
* 点击跳转到本科第一批
*/
  bneke_diyipi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_bkdyp/tupian_bkdyp'
    })
    wx.hideLoading()
  },
  /**
* 点击跳转到本科第二批
*/
  benke_dierpi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_bkderp/tupian_bkderp'
    })
    wx.hideLoading()
  },
  /**
* 点击跳转到专科提前批
*/
  zhuanke_tiqianpi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_zktqp/tupian_zktqp'
    })
    wx.hideLoading()
  },

  /**
* 点击跳转到专科批
*/
  zhuankepi: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_tupian/tupian_zkp/tupian_zkp'
    })
    wx.hideLoading()
  },

  /**
  *统一提交,表单
  */
  tongyi_tijiao: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/savezhiyuan_pay',
      data: {
        userid: that.data.userid,

        //pay: 0,
        uploadingtype: 1,

      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "kong") {
          wx.showModal({
            title: '提示',
            content: '请选择至少一个或以上批次,添加图片并保存',
            showCancel: false,
            success: function (res) {

            }
          })
        } else if (res.data.result == "yijiao") {
          wx.redirectTo({
            url: '/pages/zhiyuan_shenhe/zhiyuan_shenhe_jichuxinxi/zhiyuan_shenhe_jichuxinxi'
          })
        }
        else if (res.data.result == "ok") {
          wx.showModal({
            title: '提交',
            //content: '提交',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '/pages/zhiyuan_shenhe/zhiyuan_shenhe_xieyi/zhiyuan_shenhe_xieyi'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
    wx.hideLoading()
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

  }
})