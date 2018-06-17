var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: '',
    benkedierpi_xuanze1: 0,
    benkedierpi_xuanze2: 0,
    benkedierpi_xuanze3: 0,
    benkedierpi_xuanze4: 0,
    benkedierpi_xuanze5: 0,
    benkedierpi_xuanze6: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "本科第二批" })
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
        that.data.userid = res.data.id

        //显示之前填写
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_benkedierpi',
          data: {
            userid: that.data.userid
          },
          success: function (res) {
            if (res.data != null && res.data != '') {
              // console.log(res.data)
              if (res.data.benkedierpi_xuanze1 != null && res.data.benkedierpi_xuanze1 != '' && res.data.benkedierpi_xuanze1 != "undefined") {
                //专业调配和定向调配1
                var diyige = {};
                diyige.type1 = 0;
                diyige.type2 = 0;
                if (res.data.benkedierpi_xuanze1.indexOf("1") != -1) {
                  diyige.type1 = 1
                } if (res.data.benkedierpi_xuanze1.indexOf("2") != -1) {
                  diyige.type2 = 1
                }
                console.log(diyige)
              }
              //专业调配和定向调配2
              var dierge = 0;
              if (res.data.benkedierpi_xuanze2.indexOf("1") != -1) {
                dierge = 1
              }
              //专业调配和定向调配3
              var disange = 0;
              if (res.data.benkedierpi_xuanze3.indexOf("1") != -1) {
                disange = 1
              }
              //专业调配和定向调配4
              var disige = 0;
              if (res.data.benkedierpi_xuanze4.indexOf("1") != -1) {
                disige = 1
              }
              //专业调配和定向调配5
              var diwuge = 0;
              if (res.data.benkedierpi_xuanze5.indexOf("1") != -1) {
                diwuge = 1
              }
              //专业调配和定向调配6
              var diliuge = 0;
              if (res.data.benkedierpi_xuanze6.indexOf("1") != -1) {
                diliuge = 1
              }
              that.setData({
                benkedierpi_xuanze1: diyige,
                benkedierpi_xuanze2: dierge,
                benkedierpi_xuanze3: disange,
                benkedierpi_xuanze4: disige,
                benkedierpi_xuanze5: diwuge,
                benkedierpi_xuanze6: diliuge,
                benkedierpiA_yxdm: res.data.benkedierpiA_yxdm,
                benkedierpiA_yxmc: res.data.benkedierpiA_yxmc,
                benkedierpiA_zydm1: res.data.benkedierpiA_zydm1,
                benkedierpiA_zymc1: res.data.benkedierpiA_zymc1,
                benkedierpiA_zydm2: res.data.benkedierpiA_zydm2,
                benkedierpiA_zymc2: res.data.benkedierpiA_zymc2,
                benkedierpiA_zydm3: res.data.benkedierpiA_zydm3,
                benkedierpiA_zymc3: res.data.benkedierpiA_zymc3,
                benkedierpiA_zydm4: res.data.benkedierpiA_zydm4,
                benkedierpiA_zymc4: res.data.benkedierpiA_zymc4,
                benkedierpiA_zydm5: res.data.benkedierpiA_zydm5,
                benkedierpiA_zymc5: res.data.benkedierpiA_zymc5,
                benkedierpiA_zydm6: res.data.benkedierpiA_zydm6,
                benkedierpiA_zymc6: res.data.benkedierpiA_zymc6,
                benkedierpiB_yxdm: res.data.benkedierpiB_yxdm,
                benkedierpiB_yxmc: res.data.benkedierpiB_yxmc,
                benkedierpiB_zydm1: res.data.benkedierpiB_zydm1,
                benkedierpiB_zymc1: res.data.benkedierpiB_zymc1,
                benkedierpiB_zydm2: res.data.benkedierpiB_zydm2,
                benkedierpiB_zymc2: res.data.benkedierpiB_zymc2,
                benkedierpiB_zydm3: res.data.benkedierpiB_zydm3,
                benkedierpiB_zymc3: res.data.benkedierpiB_zymc3,
                benkedierpiB_zydm4: res.data.benkedierpiB_zydm4,
                benkedierpiB_zymc4: res.data.benkedierpiB_zymc4,
                benkedierpiB_zydm5: res.data.benkedierpiB_zydm5,
                benkedierpiB_zymc5: res.data.benkedierpiB_zymc5,
                benkedierpiB_zydm6: res.data.benkedierpiB_zydm6,
                benkedierpiB_zymc6: res.data.benkedierpiB_zymc6,
                benkedierpiC_yxdm: res.data.benkedierpiC_yxdm,
                benkedierpiC_yxmc: res.data.benkedierpiC_yxmc,
                benkedierpiC_zydm1: res.data.benkedierpiC_zydm1,
                benkedierpiC_zymc1: res.data.benkedierpiC_zymc1,
                benkedierpiC_zydm2: res.data.benkedierpiC_zydm2,
                benkedierpiC_zymc2: res.data.benkedierpiC_zymc2,
                benkedierpiC_zydm3: res.data.benkedierpiC_zydm3,
                benkedierpiC_zymc3: res.data.benkedierpiC_zymc3,
                benkedierpiC_zydm4: res.data.benkedierpiC_zydm4,
                benkedierpiC_zymc4: res.data.benkedierpiC_zymc4,
                benkedierpiC_zydm5: res.data.benkedierpiC_zydm5,
                benkedierpiC_zymc5: res.data.benkedierpiC_zymc5,
                benkedierpiC_zydm6: res.data.benkedierpiC_zydm6,
                benkedierpiC_zymc6: res.data.benkedierpiC_zymc6,
                benkedierpiD_yxdm: res.data.benkedierpiD_yxdm,
                benkedierpiD_yxmc: res.data.benkedierpiD_yxmc,
                benkedierpiD_zydm1: res.data.benkedierpiD_zydm1,
                benkedierpiD_zymc1: res.data.benkedierpiD_zymc1,
                benkedierpiD_zydm2: res.data.benkedierpiD_zydm2,
                benkedierpiD_zymc2: res.data.benkedierpiD_zymc2,
                benkedierpiD_zydm3: res.data.benkedierpiD_zydm3,
                benkedierpiD_zymc3: res.data.benkedierpiD_zymc3,
                benkedierpiD_zydm4: res.data.benkedierpiD_zydm4,
                benkedierpiD_zymc4: res.data.benkedierpiD_zymc4,
                benkedierpiD_zydm5: res.data.benkedierpiD_zydm5,
                benkedierpiD_zymc5: res.data.benkedierpiD_zymc5,
                benkedierpiD_zydm6: res.data.benkedierpiD_zydm6,
                benkedierpiD_zymc6: res.data.benkedierpiD_zymc6,
                benkedierpiE_yxdm: res.data.benkedierpiE_yxdm,
                benkedierpiE_yxmc: res.data.benkedierpiE_yxmc,
                benkedierpiE_zydm1: res.data.benkedierpiE_zydm1,
                benkedierpiE_zymc1: res.data.benkedierpiE_zymc1,
                benkedierpiE_zydm2: res.data.benkedierpiE_zydm2,
                benkedierpiE_zymc2: res.data.benkedierpiE_zymc2,
                benkedierpiE_zydm3: res.data.benkedierpiE_zydm3,
                benkedierpiE_zymc3: res.data.benkedierpiE_zymc3,
                benkedierpiE_zydm4: res.data.benkedierpiE_zydm4,
                benkedierpiE_zymc4: res.data.benkedierpiE_zymc4,
                benkedierpiE_zydm5: res.data.benkedierpiE_zydm5,
                benkedierpiE_zymc5: res.data.benkedierpiE_zymc5,
                benkedierpiE_zydm6: res.data.benkedierpiE_zydm6,
                benkedierpiE_zymc6: res.data.benkedierpiE_zymc6,
                benkedierpiF_yxdm: res.data.benkedierpiF_yxdm,
                benkedierpiF_yxmc: res.data.benkedierpiF_yxmc,
                benkedierpiF_zydm1: res.data.benkedierpiF_zydm1,
                benkedierpiF_zymc1: res.data.benkedierpiF_zymc1,
                benkedierpiF_zydm2: res.data.benkedierpiF_zydm2,
                benkedierpiF_zymc2: res.data.benkedierpiF_zymc2,
                benkedierpiF_zydm3: res.data.benkedierpiF_zydm3,
                benkedierpiF_zymc3: res.data.benkedierpiF_zymc3,
                benkedierpiF_zydm4: res.data.benkedierpiF_zydm4,
                benkedierpiF_zymc4: res.data.benkedierpiF_zymc4,
                benkedierpiF_zydm5: res.data.benkedierpiF_zydm5,
                benkedierpiF_zymc5: res.data.benkedierpiF_zymc5,
                benkedierpiF_zydm6: res.data.benkedierpiF_zydm6,
                benkedierpiF_zymc6: res.data.benkedierpiF_zymc6,
              })
            }

          }

        })
      }
    })
  },
  /**
 * 本科第二批，平行志愿A
 */
  checkboxChange1: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkedierpi_xuanze1 = e.detail.value
    console.log('选择1，携带value值为：', this.data.benkedierpi_xuanze1)
  },
  /**
 * 本科第二批，平行志愿B
 */
  checkboxChange2: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkedierpi_xuanze2 = e.detail.value
    console.log('选择2，携带value值为：', this.data.benkedierpi_xuanze2)
  },
  /**
 * 本科第二批，平行志愿C
 */
  checkboxChange3: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkedierpi_xuanze3 = e.detail.value
    console.log('选择3，携带value值为：', this.data.benkedierpi_xuanze3)
  },
  /**
 * 本科第二批，平行志愿D
 */
  checkboxChange4: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkedierpi_xuanze4 = e.detail.value
    console.log('选择4，携带value值为：', this.data.benkedierpi_xuanze4)
  },
  /**
 * 本科第二批，平行志愿E
 */
  checkboxChange5: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkedierpi_xuanze5 = e.detail.value
    console.log('选择5，携带value值为：', this.data.benkedierpi_xuanze5)
  },
  /**
 * 本科第二批，平行志愿F
 */
  checkboxChange6: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkedierpi_xuanze6 = e.detail.value
    console.log('选择6，携带value值为：', this.data.benkedierpi_xuanze6)
  },

  /**
  * 表单输入
  */
  formSubmit: function (e) {
    var that = this
    var benkedierpiA_yxdm = e.detail.value.benkedierpiA_yxdm
    var benkedierpiA_yxmc = e.detail.value.benkedierpiA_yxmc
    var benkedierpiA_zydm1 = e.detail.value.benkedierpiA_zydm1
    var benkedierpiA_zymc1 = e.detail.value.benkedierpiA_zymc1
    var benkedierpiA_zydm2 = e.detail.value.benkedierpiA_zydm2
    var benkedierpiA_zymc2 = e.detail.value.benkedierpiA_zymc2
    var benkedierpiA_zydm3 = e.detail.value.benkedierpiA_zydm3
    var benkedierpiA_zymc3 = e.detail.value.benkedierpiA_zymc3
    var benkedierpiA_zydm4 = e.detail.value.benkedierpiA_zydm4
    var benkedierpiA_zymc4 = e.detail.value.benkedierpiA_zymc4
    var benkedierpiA_zydm5 = e.detail.value.benkedierpiA_zydm5
    var benkedierpiA_zymc5 = e.detail.value.benkedierpiA_zymc5
    var benkedierpiA_zydm6 = e.detail.value.benkedierpiA_zydm6
    var benkedierpiA_zymc6 = e.detail.value.benkedierpiA_zymc6
    if (benkedierpiA_yxdm == '' && benkedierpiA_yxmc == '' && benkedierpiA_zydm1 == '' && benkedierpiA_zymc1 == ''
      && benkedierpiA_zydm2 == '' && benkedierpiA_zymc2 == '' && benkedierpiA_zydm3 == '' && benkedierpiA_zymc3 == '' &&
      benkedierpiA_zydm4 == '' && benkedierpiA_zymc4 == '' && benkedierpiA_zydm5 == '' && benkedierpiA_zymc5 == ''
      && benkedierpiA_zydm6 == '' && benkedierpiA_zymc6 == ''
    ) {
      wx.showModal({
        title: '提示',
        content: '至少要填写平行志愿A',
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
        url: app.globalData.baseUrl + 'wx/zhiyuanshenhe_benkedierpi',
        data: {
          benkedierpi_xuanze1: this.data.benkedierpi_xuanze1,
          benkedierpi_xuanze2: this.data.benkedierpi_xuanze2,
          benkedierpi_xuanze3: this.data.benkedierpi_xuanze3,
          benkedierpi_xuanze4: this.data.benkedierpi_xuanze4,
          benkedierpi_xuanze5: this.data.benkedierpi_xuanze5,
          benkedierpi_xuanze6: this.data.benkedierpi_xuanze6,
          userid: that.data.userid,
          benkedierpiA_yxdm: e.detail.value.benkedierpiA_yxdm,
          benkedierpiA_yxmc: e.detail.value.benkedierpiA_yxmc,
          benkedierpiA_zydm1: e.detail.value.benkedierpiA_zydm1,
          benkedierpiA_zymc1: e.detail.value.benkedierpiA_zymc1,
          benkedierpiA_zydm2: e.detail.value.benkedierpiA_zydm2,
          benkedierpiA_zymc2: e.detail.value.benkedierpiA_zymc2,
          benkedierpiA_zydm3: e.detail.value.benkedierpiA_zydm3,
          benkedierpiA_zymc3: e.detail.value.benkedierpiA_zymc3,
          benkedierpiA_zydm4: e.detail.value.benkedierpiA_zydm4,
          benkedierpiA_zymc4: e.detail.value.benkedierpiA_zymc4,
          benkedierpiA_zydm5: e.detail.value.benkedierpiA_zydm5,
          benkedierpiA_zymc5: e.detail.value.benkedierpiA_zymc5,
          benkedierpiA_zydm6: e.detail.value.benkedierpiA_zydm6,
          benkedierpiA_zymc6: e.detail.value.benkedierpiA_zymc6,

          benkedierpiB_yxdm: e.detail.value.benkedierpiB_yxdm,
          benkedierpiB_yxmc: e.detail.value.benkedierpiB_yxmc,
          benkedierpiB_zydm1: e.detail.value.benkedierpiB_zydm1,
          benkedierpiB_zymc1: e.detail.value.benkedierpiB_zymc1,
          benkedierpiB_zydm2: e.detail.value.benkedierpiB_zydm2,
          benkedierpiB_zymc2: e.detail.value.benkedierpiB_zymc2,
          benkedierpiB_zydm3: e.detail.value.benkedierpiB_zydm3,
          benkedierpiB_zymc3: e.detail.value.benkedierpiB_zymc3,
          benkedierpiB_zydm4: e.detail.value.benkedierpiB_zydm4,
          benkedierpiB_zymc4: e.detail.value.benkedierpiB_zymc4,
          benkedierpiB_zydm5: e.detail.value.benkedierpiB_zydm5,
          benkedierpiB_zymc5: e.detail.value.benkedierpiB_zymc5,
          benkedierpiB_zydm6: e.detail.value.benkedierpiB_zydm6,
          benkedierpiB_zymc6: e.detail.value.benkedierpiB_zymc6,

          benkedierpiC_yxdm: e.detail.value.benkedierpiC_yxdm,
          benkedierpiC_yxmc: e.detail.value.benkedierpiC_yxmc,
          benkedierpiC_zydm1: e.detail.value.benkedierpiC_zydm1,
          benkedierpiC_zymc1: e.detail.value.benkedierpiC_zymc1,
          benkedierpiC_zydm2: e.detail.value.benkedierpiC_zydm2,
          benkedierpiC_zymc2: e.detail.value.benkedierpiC_zymc2,
          benkedierpiC_zydm3: e.detail.value.benkedierpiC_zydm3,
          benkedierpiC_zymc3: e.detail.value.benkedierpiC_zymc3,
          benkedierpiC_zydm4: e.detail.value.benkedierpiC_zydm4,
          benkedierpiC_zymc4: e.detail.value.benkedierpiC_zymc4,
          benkedierpiC_zydm5: e.detail.value.benkedierpiC_zydm5,
          benkedierpiC_zymc5: e.detail.value.benkedierpiC_zymc5,
          benkedierpiC_zydm6: e.detail.value.benkedierpiC_zydm6,
          benkedierpiC_zymc6: e.detail.value.benkedierpiC_zymc6,

          benkedierpiD_yxdm: e.detail.value.benkedierpiD_yxdm,
          benkedierpiD_yxmc: e.detail.value.benkedierpiD_yxmc,
          benkedierpiD_zydm1: e.detail.value.benkedierpiD_zydm1,
          benkedierpiD_zymc1: e.detail.value.benkedierpiD_zymc1,
          benkedierpiD_zydm2: e.detail.value.benkedierpiD_zydm2,
          benkedierpiD_zymc2: e.detail.value.benkedierpiD_zymc2,
          benkedierpiD_zydm3: e.detail.value.benkedierpiD_zydm3,
          benkedierpiD_zymc3: e.detail.value.benkedierpiD_zymc3,
          benkedierpiD_zydm4: e.detail.value.benkedierpiD_zydm4,
          benkedierpiD_zymc4: e.detail.value.benkedierpiD_zymc4,
          benkedierpiD_zydm5: e.detail.value.benkedierpiD_zydm5,
          benkedierpiD_zymc5: e.detail.value.benkedierpiD_zymc5,
          benkedierpiD_zydm6: e.detail.value.benkedierpiD_zydm6,
          benkedierpiD_zymc6: e.detail.value.benkedierpiD_zymc6,

          benkedierpiE_yxdm: e.detail.value.benkedierpiE_yxdm,
          benkedierpiE_yxmc: e.detail.value.benkedierpiE_yxmc,
          benkedierpiE_zydm1: e.detail.value.benkedierpiE_zydm1,
          benkedierpiE_zymc1: e.detail.value.benkedierpiE_zymc1,
          benkedierpiE_zydm2: e.detail.value.benkedierpiE_zydm2,
          benkedierpiE_zymc2: e.detail.value.benkedierpiE_zymc2,
          benkedierpiE_zydm3: e.detail.value.benkedierpiE_zydm3,
          benkedierpiE_zymc3: e.detail.value.benkedierpiE_zymc3,
          benkedierpiE_zydm4: e.detail.value.benkedierpiE_zydm4,
          benkedierpiE_zymc4: e.detail.value.benkedierpiE_zymc4,
          benkedierpiE_zydm5: e.detail.value.benkedierpiE_zydm5,
          benkedierpiE_zymc5: e.detail.value.benkedierpiE_zymc5,
          benkedierpiE_zydm6: e.detail.value.benkedierpiE_zydm6,
          benkedierpiE_zymc6: e.detail.value.benkedierpiE_zymc6,

          benkedierpiF_yxdm: e.detail.value.benkedierpiF_yxdm,
          benkedierpiF_yxmc: e.detail.value.benkedierpiF_yxmc,
          benkedierpiF_zydm1: e.detail.value.benkedierpiF_zydm1,
          benkedierpiF_zymc1: e.detail.value.benkedierpiF_zymc1,
          benkedierpiF_zydm2: e.detail.value.benkedierpiF_zydm2,
          benkedierpiF_zymc2: e.detail.value.benkedierpiF_zymc2,
          benkedierpiF_zydm3: e.detail.value.benkedierpiF_zydm3,
          benkedierpiF_zymc3: e.detail.value.benkedierpiF_zymc3,
          benkedierpiF_zydm4: e.detail.value.benkedierpiF_zydm4,
          benkedierpiF_zymc4: e.detail.value.benkedierpiF_zymc4,
          benkedierpiF_zydm5: e.detail.value.benkedierpiF_zydm5,
          benkedierpiF_zymc5: e.detail.value.benkedierpiF_zymc5,
          benkedierpiF_zydm6: e.detail.value.benkedierpiF_zydm6,
          benkedierpiF_zymc6: e.detail.value.benkedierpiF_zymc6,
        },
        success: function (res) {
          //console.log(res.data)
          wx.hideLoading()
          if (res.data.result == "ok") {
            wx.showModal({
              title: '提示',
              content: '本科第二批保存成功，可以填写其他批次，一起提交！',
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