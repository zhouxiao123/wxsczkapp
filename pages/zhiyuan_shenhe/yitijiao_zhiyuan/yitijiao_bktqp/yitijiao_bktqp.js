var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: '',
    benketiqianpi_xuanze1: 0,
    benketiqianpi_xuanze2: 0,
    benketiqianpi_xuanze3: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "本科提前批" })
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
        //显示之前填写
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_benketiqianpi',
          data: {
            userid: that.data.userid
          },
          success: function (res) {
            console.log(res.data)
            if (res.data != null && res.data != '') {
              if (res.data.benketiqianpi_xuanze1 != null && res.data.benketiqianpi_xuanze1 != '' && res.data.benketiqianpi_xuanze1 != "undefined") {
                //专业调配和定向调配1
                var diyige = {};
                diyige.type1 = 0;
                diyige.type2 = 0;

                if (res.data.benketiqianpi_xuanze1.indexOf("1") != -1) {
                  diyige.type1 = 1
                } if (res.data.benketiqianpi_xuanze1.indexOf("2") != -1) {
                  diyige.type2 = 1
                }

                console.log(diyige)
              }
              //专业调配和定向调配2
              var dierge = 0;
              if (res.data.benketiqianpi_xuanze2.indexOf("1") != -1) {
                dierge = 1
              }
              //专业调配和定向调配3
              var disange = 0;
              if (res.data.benketiqianpi_xuanze2.indexOf("1") != -1) {
                disange = 1
              }
              that.setData({
                benketiqianpi_xuanze1: diyige,
                benketiqianpi_xuanze2: dierge,
                benketiqianpi_xuanze3: disange,
                benketiqian1_yxdm: res.data.benketiqian1_yxdm,
                benketiqian1_yxmc: res.data.benketiqian1_yxmc,
                benketiqian1_zydm1: res.data.benketiqian1_zydm1,
                benketiqian1_zymc1: res.data.benketiqian1_zymc1,
                benketiqian1_zydm2: res.data.benketiqian1_zydm2,
                benketiqian1_zymc2: res.data.benketiqian1_zymc2,
                benketiqian1_zydm3: res.data.benketiqian1_zydm3,
                benketiqian1_zymc3: res.data.benketiqian1_zymc3,
                benketiqian1_zydm4: res.data.benketiqian1_zydm4,
                benketiqian1_zymc4: res.data.benketiqian1_zymc4,
                benketiqian1_zydm5: res.data.benketiqian1_zydm5,
                benketiqian1_zymc5: res.data.benketiqian1_zymc5,
                benketiqian1_zydm6: res.data.benketiqian1_zydm6,
                benketiqian1_zymc6: res.data.benketiqian1_zymc6,
                benketiqian2A_yxdm: res.data.benketiqian2A_yxdm,
                benketiqian2A_yxmc: res.data.benketiqian2A_yxmc,
                benketiqian2A_zydm1: res.data.benketiqian2A_zydm1,
                benketiqian2A_zymc1: res.data.benketiqian2A_zymc1,
                benketiqian2A_zydm2: res.data.benketiqian2A_zydm2,
                benketiqian2A_zymc2: res.data.benketiqian2A_zymc2,
                benketiqian2A_zydm3: res.data.benketiqian2A_zydm3,
                benketiqian2A_zymc3: res.data.benketiqian2A_zymc3,
                benketiqian2A_zydm4: res.data.benketiqian2A_zydm4,
                benketiqian2A_zymc4: res.data.benketiqian2A_zymc4,
                benketiqian2A_zydm5: res.data.benketiqian2A_zydm5,
                benketiqian2A_zymc5: res.data.benketiqian2A_zymc5,
                benketiqian2A_zydm6: res.data.benketiqian2A_zydm6,
                benketiqian2A_zymc6: res.data.benketiqian2A_zymc6,
                benketiqian2B_yxdm: res.data.benketiqian2B_yxdm,
                benketiqian2B_yxmc: res.data.benketiqian2B_yxmc,
                benketiqian2B_zydm1: res.data.benketiqian2B_zydm1,
                benketiqian2B_zymc1: res.data.benketiqian2B_zymc1,
                benketiqian2B_zydm2: res.data.benketiqian2B_zydm2,
                benketiqian2B_zymc2: res.data.benketiqian2B_zymc2,
                benketiqian2B_zydm3: res.data.benketiqian2B_zydm3,
                benketiqian2B_zymc3: res.data.benketiqian2B_zymc3,
                benketiqian2B_zydm4: res.data.benketiqian2B_zydm4,
                benketiqian2B_zymc4: res.data.benketiqian2B_zymc4,
                benketiqian2B_zydm5: res.data.benketiqian2B_zydm5,
                benketiqian2B_zymc5: res.data.benketiqian2B_zymc5,
                benketiqian2B_zydm6: res.data.benketiqian2B_zydm6,
                benketiqian2B_zymc6: res.data.benketiqian2B_zymc6,

              })
            }
          }

        })


      }
    })
  },
  /**
 * 本科提前批，志愿1的专业定向调配
 */
  checkboxChange1: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benketiqianpi_xuanze1 = e.detail.value
    console.log('选择1，携带value值为：', this.data.benketiqianpi_xuanze1)
  },
  /**
 * 本科提前批，第二平行志愿A
 */
  checkboxChange2: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benketiqianpi_xuanze2 = e.detail.value
    console.log('选择2，携带value值为：', this.data.benketiqianpi_xuanze2)
  },
  /**
 * 本科提前批，第二平行志愿B
 */
  checkboxChange3: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benketiqianpi_xuanze3 = e.detail.value
    console.log('选择3，携带value值为：', this.data.benketiqianpi_xuanze3)
  },
  /**
  * 表单输入
  */
  formSubmit: function (e) {
    var that = this
    var benketiqian1_yxdm = e.detail.value.benketiqian1_yxdm
    var benketiqian1_yxmc = e.detail.value.benketiqian1_yxmc
    var benketiqian1_zydm1 = e.detail.value.benketiqian1_zydm1
    var benketiqian1_zymc1 = e.detail.value.benketiqian1_zymc1
    var benketiqian1_zydm2 = e.detail.value.benketiqian1_zydm2
    var benketiqian1_zymc2 = e.detail.value.benketiqian1_zymc2
    var benketiqian1_zydm3 = e.detail.value.benketiqian1_zydm3
    var benketiqian1_zymc3 = e.detail.value.benketiqian1_zymc3
    var benketiqian1_zydm4 = e.detail.value.benketiqian1_zydm4
    var benketiqian1_zymc4 = e.detail.value.benketiqian1_zymc4
    var benketiqian1_zydm5 = e.detail.value.benketiqian1_zydm5
    var benketiqian1_zymc5 = e.detail.value.benketiqian1_zymc5
    var benketiqian1_zydm6 = e.detail.value.benketiqian1_zydm6
    var benketiqian1_zymc6 = e.detail.value.benketiqian1_zymc6
    if (benketiqian1_yxdm == '' && benketiqian1_yxmc == '' && benketiqian1_zydm1 == '' && benketiqian1_zymc1 == ''
      && benketiqian1_zydm2 == '' && benketiqian1_zymc2 == '' && benketiqian1_zydm3 == '' && benketiqian1_zymc3 == '' &&
      benketiqian1_zydm4 == '' && benketiqian1_zymc4 == '' && benketiqian1_zydm5 == '' && benketiqian1_zymc5 == ''
      && benketiqian1_zydm6 == '' && benketiqian1_zymc6 == '') {
      wx.showModal({
        title: '提示',
        content: '至少要填写第一志愿',
        showCancel: false,
        success: function (res) {

        }
      })
    } else {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })

      console.log(that.data.userid)
      wx.request({
        url: app.globalData.baseUrl + 'wx/zhiyuanshenhe_benketiqianpi',
        data: {
          benketiqianpi_xuanze1: this.data.benketiqianpi_xuanze1,
          benketiqianpi_xuanze2: this.data.benketiqianpi_xuanze2,
          benketiqianpi_xuanze3: this.data.benketiqianpi_xuanze3,
          userid: that.data.userid,

          benketiqian1_yxdm: e.detail.value.benketiqian1_yxdm,
          benketiqian1_yxmc: e.detail.value.benketiqian1_yxmc,
          benketiqian1_zydm1: e.detail.value.benketiqian1_zydm1,
          benketiqian1_zymc1: e.detail.value.benketiqian1_zymc1,
          benketiqian1_zydm2: e.detail.value.benketiqian1_zydm2,
          benketiqian1_zymc2: e.detail.value.benketiqian1_zymc2,
          benketiqian1_zydm3: e.detail.value.benketiqian1_zydm3,
          benketiqian1_zymc3: e.detail.value.benketiqian1_zymc3,
          benketiqian1_zydm4: e.detail.value.benketiqian1_zydm4,
          benketiqian1_zymc4: e.detail.value.benketiqian1_zymc4,
          benketiqian1_zydm5: e.detail.value.benketiqian1_zydm5,
          benketiqian1_zymc5: e.detail.value.benketiqian1_zymc5,
          benketiqian1_zydm6: e.detail.value.benketiqian1_zydm6,
          benketiqian1_zymc6: e.detail.value.benketiqian1_zymc6,

          benketiqian2A_yxdm: e.detail.value.benketiqian2A_yxdm,
          benketiqian2A_yxmc: e.detail.value.benketiqian2A_yxmc,
          benketiqian2A_zydm1: e.detail.value.benketiqian2A_zydm1,
          benketiqian2A_zymc1: e.detail.value.benketiqian2A_zymc1,
          benketiqian2A_zydm2: e.detail.value.benketiqian2A_zydm2,
          benketiqian2A_zymc2: e.detail.value.benketiqian2A_zymc2,
          benketiqian2A_zydm3: e.detail.value.benketiqian2A_zydm3,
          benketiqian2A_zymc3: e.detail.value.benketiqian2A_zymc3,
          benketiqian2A_zydm4: e.detail.value.benketiqian2A_zydm4,
          benketiqian2A_zymc4: e.detail.value.benketiqian2A_zymc4,
          benketiqian2A_zydm5: e.detail.value.benketiqian2A_zydm5,
          benketiqian2A_zymc5: e.detail.value.benketiqian2A_zymc5,
          benketiqian2A_zydm6: e.detail.value.benketiqian2A_zydm6,
          benketiqian2A_zymc6: e.detail.value.benketiqian2A_zymc6,

          benketiqian2B_yxdm: e.detail.value.benketiqian2B_yxdm,
          benketiqian2B_yxmc: e.detail.value.benketiqian2B_yxmc,
          benketiqian2B_zydm1: e.detail.value.benketiqian2B_zydm1,
          benketiqian2B_zymc1: e.detail.value.benketiqian2B_zymc1,
          benketiqian2B_zydm2: e.detail.value.benketiqian2B_zydm2,
          benketiqian2B_zymc2: e.detail.value.benketiqian2B_zymc2,
          benketiqian2B_zydm3: e.detail.value.benketiqian2B_zydm3,
          benketiqian2B_zymc3: e.detail.value.benketiqian2B_zymc3,
          benketiqian2B_zydm4: e.detail.value.benketiqian2B_zydm4,
          benketiqian2B_zymc4: e.detail.value.benketiqian2B_zymc4,
          benketiqian2B_zydm5: e.detail.value.benketiqian2B_zydm5,
          benketiqian2B_zymc5: e.detail.value.benketiqian2B_zymc5,
          benketiqian2B_zydm6: e.detail.value.benketiqian2B_zydm6,
          benketiqian2B_zymc6: e.detail.value.benketiqian2B_zymc6,
        },
        success: function (res) {
          //console.log(res.data)
          wx.hideLoading()
          if (res.data.result == "ok") {
            wx.showModal({
              title: '提示',
              content: '本科提前批保存成功，可以填写其他批次，一起提交！',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: '/pages/zhiyuan_shenhe/tijiao_fangshi/tijiao_biaodan/xuanze_biaodan_pici/xuanze_biaodan_pici'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }
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