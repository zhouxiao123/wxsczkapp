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
    wx.setNavigationBarTitle({ title: "已提交志愿评估" })
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

        //获取pay表的信息
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_zhiyuan_pay',
          data: {
            userid: that.data.userid
          },
          success: function (res) {
            console.log(res.data)
           // console.log(res.data.uploadingtype)上传方式
            that.setData({
          
            })
            that.data.uploadingtype = res.data.uploadingtype
           
          }
        })
      }
    })
  },
  /**
* 点击跳转到本科提前批
*/
  benke_tiqianpi: function (e) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (that.data.uploadingtype==1){
      wx.navigateTo({
        url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_tupian/yitijiao_tupian?&pici=' + 1
      })
    }
    if (that.data.uploadingtype ==2) {
      wx.navigateTo({
        url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_bktqp/yitijiao_bktqp'
      })
    }
    wx.hideLoading()
  },
  /**
* 点击跳转到本科第一批
*/
  bneke_diyipi: function (e) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (that.data.uploadingtype == 1) {
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_tupian/yitijiao_tupian?&pici=' + 2
    })
    }
    if (that.data.uploadingtype == 2) {
      wx.navigateTo({
        url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_bkdyp/yitijiao_bkdyp'
      })
    }
    wx.hideLoading()
  },
  /**
* 点击跳转到本科第二批
*/
  benke_dierpi: function (e) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (that.data.uploadingtype == 1) {
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_tupian/yitijiao_tupian?&pici=' + 3
    })
    }
    if (that.data.uploadingtype == 2) {
      wx.navigateTo({
        url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_bkderp/yitijiao_bkderp'
      })
    }
    wx.hideLoading()
  },
  /**
* 点击跳转到专科提前批
*/
  zhuanke_tiqianpi: function (e) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (that.data.uploadingtype == 1) {
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_tupian/yitijiao_tupian?&pici=' + 4
    })
    }
    if (that.data.uploadingtype == 2) {
      wx.navigateTo({
        url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_zktqp/yitijiao_zktqp'
      })
    }
    wx.hideLoading()
  },

  /**
* 点击跳转到专科批
*/
  zhuankepi: function (e) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    if (that.data.uploadingtype == 1) {
    wx.navigateTo({
      url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_tupian/yitijiao_tupian?&pici=' + 5
    })
    }
    if (that.data.uploadingtype == 2) {
      wx.navigateTo({
        url: '/pages/zhiyuan_shenhe/yitijiao_zhiyuan/yitijiao_zkp/yitijiao_zkp'
      })
    }
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