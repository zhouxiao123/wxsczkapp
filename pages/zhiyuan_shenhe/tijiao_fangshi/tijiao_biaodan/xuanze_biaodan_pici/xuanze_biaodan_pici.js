var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "选择志愿填报批次-表单" })
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
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_biaodan/benke_tiqianpi/benke_tiqianpi'
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
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_biaodan/benke_diyipi/benke_diyipi'
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
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_biaodan/benke_dierpi/benke_dierpi'
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
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_biaodan/zhuanke_tiqianpi/zhuanke_tiqianpi'
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
      url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_biaodan/zhuankepi/zhuankepi'
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
        state: 1,
        pay: 0,
        uploadingtype: 2,
       
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
        } else if (res.data.result == "ok") {
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