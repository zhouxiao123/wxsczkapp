var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: '',
    zhuanketiqianpi_xuanze1: 0,
    zhuanketiqianpi_xuanze2: 0,
    zhuanketiqianpi_xuanze3: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "专科提前批" })
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
 * 专科提前批，志愿1的专业定向调配
 */
  checkboxChange1: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuanketiqianpi_xuanze1 = e.detail.value
    console.log('选择1，携带value值为：', this.data.zhuanketiqianpi_xuanze1)
  },
  /**
 * 专科提前批，第二平行志愿A
 */
  checkboxChange2: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuanketiqianpi_xuanze2 = e.detail.value
    console.log('选择2，携带value值为：', this.data.zhuanketiqianpi_xuanze2)
  },
  /**
 * 专科提前批，第二平行志愿B
 */
  checkboxChange3: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuanketiqianpi_xuanze3 = e.detail.value
    console.log('选择3，携带value值为：', this.data.zhuanketiqianpi_xuanze3)
  },
  /**
  * 表单输入
  */
  formSubmit: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var that = this
    console.log(that.data.userid)
    wx.request({
      url: app.globalData.baseUrl + 'wx/zhiyuanshenhe_zhuanketiqianpi',
      data: {
        zhuanketiqianpi_xuanze1: this.data.zhuanketiqianpi_xuanze1,
        zhuanketiqianpi_xuanze2: this.data.zhuanketiqianpi_xuanze2,
        zhuanketiqianpi_xuanze3: this.data.zhuanketiqianpi_xuanze3,
        userid: that.data.userid,

        zhuanketiqian1_yxdm: e.detail.value.zhuanketiqian1_yxdm,
        zhuanketiqian1_yxmc: e.detail.value.zhuanketiqian1_yxmc,
        zhuanketiqian1_zydm1: e.detail.value.zhuanketiqian1_zydm1,
        zhuanketiqian1_zymc1: e.detail.value.zhuanketiqian1_zymc1,
        zhuanketiqian1_zydm2: e.detail.value.zhuanketiqian1_zydm2,
        zhuanketiqian1_zymc2: e.detail.value.zhuanketiqian1_zymc2,
        zhuanketiqian1_zydm3: e.detail.value.zhuanketiqian1_zydm3,
        zhuanketiqian1_zymc3: e.detail.value.zhuanketiqian1_zymc3,
        zhuanketiqian1_zydm4: e.detail.value.zhuanketiqian1_zydm4,
        zhuanketiqian1_zymc4: e.detail.value.zhuanketiqian1_zymc4,
        zhuanketiqian1_zydm5: e.detail.value.zhuanketiqian1_zydm5,
        zhuanketiqian1_zymc5: e.detail.value.zhuanketiqian1_zymc5,
        zhuanketiqian1_zydm6: e.detail.value.zhuanketiqian1_zydm6,
        zhuanketiqian1_zymc6: e.detail.value.zhuanketiqian1_zymc6,

        zhuanketiqian2A_yxdm: e.detail.value.zhuanketiqian2A_yxdm,
        zhuanketiqian2A_yxmc: e.detail.value.zhuanketiqian2A_yxmc,
        zhuanketiqian2A_zydm1: e.detail.value.zhuanketiqian2A_zydm1,
        zhuanketiqian2A_zymc1: e.detail.value.zhuanketiqian2A_zymc1,
        zhuanketiqian2A_zydm2: e.detail.value.zhuanketiqian2A_zydm2,
        zhuanketiqian2A_zymc2: e.detail.value.zhuanketiqian2A_zymc2,
        zhuanketiqian2A_zydm3: e.detail.value.zhuanketiqian2A_zydm3,
        zhuanketiqian2A_zymc3: e.detail.value.zhuanketiqian2A_zymc3,
        zhuanketiqian2A_zydm4: e.detail.value.zhuanketiqian2A_zydm4,
        zhuanketiqian2A_zymc4: e.detail.value.zhuanketiqian2A_zymc4,
        zhuanketiqian2A_zydm5: e.detail.value.zhuanketiqian2A_zydm5,
        zhuanketiqian2A_zymc5: e.detail.value.zhuanketiqian2A_zymc5,
        zhuanketiqian2A_zydm6: e.detail.value.zhuanketiqian2A_zydm6,
        zhuanketiqian2A_zymc6: e.detail.value.zhuanketiqian2A_zymc6,

        zhuanketiqian2B_yxdm: e.detail.value.zhuanketiqian2B_yxdm,
        zhuanketiqian2B_yxmc: e.detail.value.zhuanketiqian2B_yxmc,
        zhuanketiqian2B_zydm1: e.detail.value.zhuanketiqian2B_zydm1,
        zhuanketiqian2B_zymc1: e.detail.value.zhuanketiqian2B_zymc1,
        zhuanketiqian2B_zydm2: e.detail.value.zhuanketiqian2B_zydm2,
        zhuanketiqian2B_zymc2: e.detail.value.zhuanketiqian2B_zymc2,
        zhuanketiqian2B_zydm3: e.detail.value.zhuanketiqian2B_zydm3,
        zhuanketiqian2B_zymc3: e.detail.value.zhuanketiqian2B_zymc3,
        zhuanketiqian2B_zydm4: e.detail.value.zhuanketiqian2B_zydm4,
        zhuanketiqian2B_zymc4: e.detail.value.zhuanketiqian2B_zymc4,
        zhuanketiqian2B_zydm5: e.detail.value.zhuanketiqian2B_zydm5,
        zhuanketiqian2B_zymc5: e.detail.value.zhuanketiqian2B_zymc5,
        zhuanketiqian2B_zydm6: e.detail.value.zhuanketiqian2B_zydm6,
        zhuanketiqian2B_zymc6: e.detail.value.zhuanketiqian2B_zymc6,
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '专科提前批保存成功，可以填写其他批次，一起提交！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_biaodan/shenhe_pici/shenhe_pici'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  formReset: function () {
    this.setData({
      date: '',
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

  }
})