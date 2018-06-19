var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: '',
    zhuankepi_xuanze1: 0,
    zhuankepi_xuanze2: 0,
    zhuankepi_xuanze3: 0,
    zhuankepi_xuanze4: 0,
    zhuankepi_xuanze5: 0,
    zhuankepi_xuanze6: 0,
    zhuankepi_xuanze7: 0,
    zhuankepi_xuanze8: 0,
    zhuankepi_xuanze9: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "专科批" })
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
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_zhuankepi',
          data: {
            userid: that.data.userid
          },
          success: function (res) {
            // console.log(res.data)
            if (res.data != null && res.data != '') {

              if (res.data.zhuankepi_xuanze1 != null && res.data.zhuankepi_xuanze1 != '' && res.data.zhuankepi_xuanze1 != "undefined") {
            //专业调配和定向调配1
            var diyige = {};
            diyige.type1 = 0;
            diyige.type2 = 0;
            if (res.data.zhuankepi_xuanze1.indexOf("1") != -1) {
              diyige.type1 = 1
            } if (res.data.zhuankepi_xuanze1.indexOf("2") != -1) {
              diyige.type2 = 1
            }
            console.log(diyige)
              }

            //专业调配和定向调配2
            var dierge = 0;
            if (res.data.zhuankepi_xuanze2.indexOf("1") != -1) {
              dierge = 1
            }
            //专业调配和定向调配3
            var disange = 0;
            if (res.data.zhuankepi_xuanze3.indexOf("1") != -1) {
              disange = 1
            }
            //专业调配和定向调配4
            var disige = 0;
            if (res.data.zhuankepi_xuanze4.indexOf("1") != -1) {
              disige = 1
            }
            //专业调配和定向调配5
            var diwuge = 0;
            if (res.data.zhuankepi_xuanze5.indexOf("1") != -1) {
              diwuge = 1
            }
            //专业调配和定向调配6
            var diliuge = 0;
            if (res.data.zhuankepi_xuanze6.indexOf("1") != -1) {
              diliuge = 1
            }

            if (res.data.zhuankepi_xuanze7 != null && res.data.zhuankepi_xuanze7 != '' && res.data.zhuankepi_xuanze7 != "undefined") {
            //专业调配和定向调配7
            var diqige = {};
            diqige.type1 = 0;
            diqige.type2 = 0;
            if (res.data.zhuankepi_xuanze7.indexOf("1") != -1) {
              diqige.type1 = 1
            } if (res.data.zhuankepi_xuanze7.indexOf("2") != -1) {
              diqige.type2 = 1
            }
            }

            //专业调配和定向调配8
            var dibage = 0;
            if (res.data.zhuankepi_xuanze8.indexOf("1") != -1) {
              dibage = 1
            }
            //专业调配和定向调配9
            var dijiuge = 0;
            if (res.data.zhuankepi_xuanze9.indexOf("1") != -1) {
              dijiuge = 1
            }
            that.setData({
              zhuankepi_xuanze1: diyige,
              zhuankepi_xuanze2: dierge,
              zhuankepi_xuanze3: disange,
              zhuankepi_xuanze4: disige,
              zhuankepi_xuanze5: diwuge,
              zhuankepi_xuanze6: diliuge,
              zhuankepi_xuanze7: diqige,
              zhuankepi_xuanze8: dibage,
              zhuankepi_xuanze9: dijiuge,
              zhuankepiA_yxdm: res.data.zhuankepiA_yxdm,
              zhuankepiA_yxmc: res.data.zhuankepiA_yxmc,
              zhuankepiA_zydm1: res.data.zhuankepiA_zydm1,
              zhuankepiA_zymc1: res.data.zhuankepiA_zymc1,
              zhuankepiA_zydm2: res.data.zhuankepiA_zydm2,
              zhuankepiA_zymc2: res.data.zhuankepiA_zymc2,
              zhuankepiA_zydm3: res.data.zhuankepiA_zydm3,
              zhuankepiA_zymc3: res.data.zhuankepiA_zymc3,
              zhuankepiA_zydm4: res.data.zhuankepiA_zydm4,
              zhuankepiA_zymc4: res.data.zhuankepiA_zymc4,
              zhuankepiA_zydm5: res.data.zhuankepiA_zydm5,
              zhuankepiA_zymc5: res.data.zhuankepiA_zymc5,
              zhuankepiA_zydm6: res.data.zhuankepiA_zydm6,
              zhuankepiA_zymc6: res.data.zhuankepiA_zymc6,
              zhuankepiB_yxdm: res.data.zhuankepiB_yxdm,
              zhuankepiB_yxmc: res.data.zhuankepiB_yxmc,
              zhuankepiB_zydm1: res.data.zhuankepiB_zydm1,
              zhuankepiB_zymc1: res.data.zhuankepiB_zymc1,
              zhuankepiB_zydm2: res.data.zhuankepiB_zydm2,
              zhuankepiB_zymc2: res.data.zhuankepiB_zymc2,
              zhuankepiB_zydm3: res.data.zhuankepiB_zydm3,
              zhuankepiB_zymc3: res.data.zhuankepiB_zymc3,
              zhuankepiB_zydm4: res.data.zhuankepiB_zydm4,
              zhuankepiB_zymc4: res.data.zhuankepiB_zymc4,
              zhuankepiB_zydm5: res.data.zhuankepiB_zydm5,
              zhuankepiB_zymc5: res.data.zhuankepiB_zymc5,
              zhuankepiB_zydm6: res.data.zhuankepiB_zydm6,
              zhuankepiB_zymc6: res.data.zhuankepiB_zymc6,
              zhuankepiC_yxdm: res.data.zhuankepiC_yxdm,
              zhuankepiC_yxmc: res.data.zhuankepiC_yxmc,
              zhuankepiC_zydm1: res.data.zhuankepiC_zydm1,
              zhuankepiC_zymc1: res.data.zhuankepiC_zymc1,
              zhuankepiC_zydm2: res.data.zhuankepiC_zydm2,
              zhuankepiC_zymc2: res.data.zhuankepiC_zymc2,
              zhuankepiC_zydm3: res.data.zhuankepiC_zydm3,
              zhuankepiC_zymc3: res.data.zhuankepiC_zymc3,
              zhuankepiC_zydm4: res.data.zhuankepiC_zydm4,
              zhuankepiC_zymc4: res.data.zhuankepiC_zymc4,
              zhuankepiC_zydm5: res.data.zhuankepiC_zydm5,
              zhuankepiC_zymc5: res.data.zhuankepiC_zymc5,
              zhuankepiC_zydm6: res.data.zhuankepiC_zydm6,
              zhuankepiC_zymc6: res.data.zhuankepiC_zymc6,
              zhuankepiD_yxdm: res.data.zhuankepiD_yxdm,
              zhuankepiD_yxmc: res.data.zhuankepiD_yxmc,
              zhuankepiD_zydm1: res.data.zhuankepiD_zydm1,
              zhuankepiD_zymc1: res.data.zhuankepiD_zymc1,
              zhuankepiD_zydm2: res.data.zhuankepiD_zydm2,
              zhuankepiD_zymc2: res.data.zhuankepiD_zymc2,
              zhuankepiD_zydm3: res.data.zhuankepiD_zydm3,
              zhuankepiD_zymc3: res.data.zhuankepiD_zymc3,
              zhuankepiD_zydm4: res.data.zhuankepiD_zydm4,
              zhuankepiD_zymc4: res.data.zhuankepiD_zymc4,
              zhuankepiD_zydm5: res.data.zhuankepiD_zydm5,
              zhuankepiD_zymc5: res.data.zhuankepiD_zymc5,
              zhuankepiD_zydm6: res.data.zhuankepiD_zydm6,
              zhuankepiD_zymc6: res.data.zhuankepiD_zymc6,
              zhuankepiE_yxdm: res.data.zhuankepiE_yxdm,
              zhuankepiE_yxmc: res.data.zhuankepiE_yxmc,
              zhuankepiE_zydm1: res.data.zhuankepiE_zydm1,
              zhuankepiE_zymc1: res.data.zhuankepiE_zymc1,
              zhuankepiE_zydm2: res.data.zhuankepiE_zydm2,
              zhuankepiE_zymc2: res.data.zhuankepiE_zymc2,
              zhuankepiE_zydm3: res.data.zhuankepiE_zydm3,
              zhuankepiE_zymc3: res.data.zhuankepiE_zymc3,
              zhuankepiE_zydm4: res.data.zhuankepiE_zydm4,
              zhuankepiE_zymc4: res.data.zhuankepiE_zymc4,
              zhuankepiE_zydm5: res.data.zhuankepiE_zydm5,
              zhuankepiE_zymc5: res.data.zhuankepiE_zymc5,
              zhuankepiE_zydm6: res.data.zhuankepiE_zydm6,
              zhuankepiE_zymc6: res.data.zhuankepiE_zymc6,
              zhuankepiF_yxdm: res.data.zhuankepiF_yxdm,
              zhuankepiF_yxmc: res.data.zhuankepiF_yxmc,
              zhuankepiF_zydm1: res.data.zhuankepiF_zydm1,
              zhuankepiF_zymc1: res.data.zhuankepiF_zymc1,
              zhuankepiF_zydm2: res.data.zhuankepiF_zydm2,
              zhuankepiF_zymc2: res.data.zhuankepiF_zymc2,
              zhuankepiF_zydm3: res.data.zhuankepiF_zydm3,
              zhuankepiF_zymc3: res.data.zhuankepiF_zymc3,
              zhuankepiF_zydm4: res.data.zhuankepiF_zydm4,
              zhuankepiF_zymc4: res.data.zhuankepiF_zymc4,
              zhuankepiF_zydm5: res.data.zhuankepiF_zydm5,
              zhuankepiF_zymc5: res.data.zhuankepiF_zymc5,
              zhuankepiF_zydm6: res.data.zhuankepiF_zydm6,
              zhuankepiF_zymc6: res.data.zhuankepiF_zymc6,
              zhuankepiG_yxdm: res.data.zhuankepiG_yxdm,
              zhuankepiG_yxmc: res.data.zhuankepiG_yxmc,
              zhuankepiG_zydm1: res.data.zhuankepiG_zydm1,
              zhuankepiG_zymc1: res.data.zhuankepiG_zymc1,
              zhuankepiG_zydm2: res.data.zhuankepiG_zydm2,
              zhuankepiG_zymc2: res.data.zhuankepiG_zymc2,
              zhuankepiG_zydm3: res.data.zhuankepiG_zydm3,
              zhuankepiG_zymc3: res.data.zhuankepiG_zymc3,
              zhuankepiG_zydm4: res.data.zhuankepiG_zydm4,
              zhuankepiG_zymc4: res.data.zhuankepiG_zymc4,
              zhuankepiG_zydm5: res.data.zhuankepiG_zydm5,
              zhuankepiG_zymc5: res.data.zhuankepiG_zymc5,
              zhuankepiG_zydm6: res.data.zhuankepiG_zydm6,
              zhuankepiG_zymc6: res.data.zhuankepiG_zymc6,
              zhuankepiH_yxdm: res.data.zhuankepiH_yxdm,
              zhuankepiH_yxmc: res.data.zhuankepiH_yxmc,
              zhuankepiH_zydm1: res.data.zhuankepiH_zydm1,
              zhuankepiH_zymc1: res.data.zhuankepiH_zymc1,
              zhuankepiH_zydm2: res.data.zhuankepiH_zydm2,
              zhuankepiH_zymc2: res.data.zhuankepiH_zymc2,
              zhuankepiH_zydm3: res.data.zhuankepiH_zydm3,
              zhuankepiH_zymc3: res.data.zhuankepiH_zymc3,
              zhuankepiH_zydm4: res.data.zhuankepiH_zydm4,
              zhuankepiH_zymc4: res.data.zhuankepiH_zymc4,
              zhuankepiH_zydm5: res.data.zhuankepiH_zydm5,
              zhuankepiH_zymc5: res.data.zhuankepiH_zymc5,
              zhuankepiH_zydm6: res.data.zhuankepiH_zydm6,
              zhuankepiH_zymc6: res.data.zhuankepiH_zymc6,
              zhuankepiI_yxdm: res.data.zhuankepiI_yxdm,
              zhuankepiI_yxmc: res.data.zhuankepiI_yxmc,
              zhuankepiI_zydm1: res.data.zhuankepiI_zydm1,
              zhuankepiI_zymc1: res.data.zhuankepiI_zymc1,
              zhuankepiI_zydm2: res.data.zhuankepiI_zydm2,
              zhuankepiI_zymc2: res.data.zhuankepiI_zymc2,
              zhuankepiI_zydm3: res.data.zhuankepiI_zydm3,
              zhuankepiI_zymc3: res.data.zhuankepiI_zymc3,
              zhuankepiI_zydm4: res.data.zhuankepiI_zydm4,
              zhuankepiI_zymc4: res.data.zhuankepiI_zymc4,
              zhuankepiI_zydm5: res.data.zhuankepiI_zydm5,
              zhuankepiI_zymc5: res.data.zhuankepiI_zymc5,
              zhuankepiI_zydm6: res.data.zhuankepiI_zydm6,
              zhuankepiI_zymc6: res.data.zhuankepiI_zymc6,
            })
          }
        }
        })
      }
    })
  },
  /**
 * 专科批，平行志愿A
 */
  checkboxChange1: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze1 = e.detail.value
    console.log('选择1，携带value值为：', this.data.zhuankepi_xuanze1)
  },
  /**
 * 专科批，平行志愿B
 */
  checkboxChange2: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze2 = e.detail.value
    console.log('选择2，携带value值为：', this.data.zhuankepi_xuanze2)
  },
  /**
 * 专科批，平行志愿C
 */
  checkboxChange3: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze3 = e.detail.value
    console.log('选择3，携带value值为：', this.data.zhuankepi_xuanze3)
  },
  /**
 * 专科批，平行志愿D
 */
  checkboxChange4: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze4 = e.detail.value
    console.log('选择4，携带value值为：', this.data.zhuankepi_xuanze4)
  },
  /**
 * 专科批，平行志愿E
 */
  checkboxChange5: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze5 = e.detail.value
    console.log('选择5，携带value值为：', this.data.zhuankepi_xuanze5)
  },
  /**
 * 专科批，平行志愿F
 */
  checkboxChange6: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze6 = e.detail.value
    console.log('选择6，携带value值为：', this.data.zhuankepi_xuanze6)
  },
  /**
 * 专科批，平行志愿G
 */
  checkboxChange7: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze7 = e.detail.value
    console.log('选择7，携带value值为：', this.data.zhuankepi_xuanze7)
  },
  /**
 * 专科批，平行志愿H
 */
  checkboxChange8: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze8 = e.detail.value
    console.log('选择8，携带value值为：', this.data.zhuankepi_xuanze8)
  },
  /**
 * 专科批，平行志愿I
 */
  checkboxChange9: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.zhuankepi_xuanze9 = e.detail.value
    console.log('选择9，携带value值为：', this.data.zhuankepi_xuanze9)
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
      url: app.globalData.baseUrl + 'wx/zhiyuanshenhe_zhuankepi',
      data: {
        zhuankepi_xuanze1: this.data.zhuankepi_xuanze1,
        zhuankepi_xuanze2: this.data.zhuankepi_xuanze2,
        zhuankepi_xuanze3: this.data.zhuankepi_xuanze3,
        zhuankepi_xuanze4: this.data.zhuankepi_xuanze4,
        zhuankepi_xuanze5: this.data.zhuankepi_xuanze5,
        zhuankepi_xuanze6: this.data.zhuankepi_xuanze6,
        zhuankepi_xuanze7: this.data.zhuankepi_xuanze7,
        zhuankepi_xuanze8: this.data.zhuankepi_xuanze8,
        zhuankepi_xuanze9: this.data.zhuankepi_xuanze9,
        userid: that.data.userid,
        zhuankepiA_yxdm: e.detail.value.zhuankepiA_yxdm,
        zhuankepiA_yxmc: e.detail.value.zhuankepiA_yxmc,
        zhuankepiA_zydm1: e.detail.value.zhuankepiA_zydm1,
        zhuankepiA_zymc1: e.detail.value.zhuankepiA_zymc1,
        zhuankepiA_zydm2: e.detail.value.zhuankepiA_zydm2,
        zhuankepiA_zymc2: e.detail.value.zhuankepiA_zymc2,
        zhuankepiA_zydm3: e.detail.value.zhuankepiA_zydm3,
        zhuankepiA_zymc3: e.detail.value.zhuankepiA_zymc3,
        zhuankepiA_zydm4: e.detail.value.zhuankepiA_zydm4,
        zhuankepiA_zymc4: e.detail.value.zhuankepiA_zymc4,
        zhuankepiA_zydm5: e.detail.value.zhuankepiA_zydm5,
        zhuankepiA_zymc5: e.detail.value.zhuankepiA_zymc5,
        zhuankepiA_zydm6: e.detail.value.zhuankepiA_zydm6,
        zhuankepiA_zymc6: e.detail.value.zhuankepiA_zymc6,

        zhuankepiB_yxdm: e.detail.value.zhuankepiB_yxdm,
        zhuankepiB_yxmc: e.detail.value.zhuankepiB_yxmc,
        zhuankepiB_zydm1: e.detail.value.zhuankepiB_zydm1,
        zhuankepiB_zymc1: e.detail.value.zhuankepiB_zymc1,
        zhuankepiB_zydm2: e.detail.value.zhuankepiB_zydm2,
        zhuankepiB_zymc2: e.detail.value.zhuankepiB_zymc2,
        zhuankepiB_zydm3: e.detail.value.zhuankepiB_zydm3,
        zhuankepiB_zymc3: e.detail.value.zhuankepiB_zymc3,
        zhuankepiB_zydm4: e.detail.value.zhuankepiB_zydm4,
        zhuankepiB_zymc4: e.detail.value.zhuankepiB_zymc4,
        zhuankepiB_zydm5: e.detail.value.zhuankepiB_zydm5,
        zhuankepiB_zymc5: e.detail.value.zhuankepiB_zymc5,
        zhuankepiB_zydm6: e.detail.value.zhuankepiB_zydm6,
        zhuankepiB_zymc6: e.detail.value.zhuankepiB_zymc6,

        zhuankepiC_yxdm: e.detail.value.zhuankepiC_yxdm,
        zhuankepiC_yxmc: e.detail.value.zhuankepiC_yxmc,
        zhuankepiC_zydm1: e.detail.value.zhuankepiC_zydm1,
        zhuankepiC_zymc1: e.detail.value.zhuankepiC_zymc1,
        zhuankepiC_zydm2: e.detail.value.zhuankepiC_zydm2,
        zhuankepiC_zymc2: e.detail.value.zhuankepiC_zymc2,
        zhuankepiC_zydm3: e.detail.value.zhuankepiC_zydm3,
        zhuankepiC_zymc3: e.detail.value.zhuankepiC_zymc3,
        zhuankepiC_zydm4: e.detail.value.zhuankepiC_zydm4,
        zhuankepiC_zymc4: e.detail.value.zhuankepiC_zymc4,
        zhuankepiC_zydm5: e.detail.value.zhuankepiC_zydm5,
        zhuankepiC_zymc5: e.detail.value.zhuankepiC_zymc5,
        zhuankepiC_zydm6: e.detail.value.zhuankepiC_zydm6,
        zhuankepiC_zymc6: e.detail.value.zhuankepiC_zymc6,

        zhuankepiD_yxdm: e.detail.value.zhuankepiD_yxdm,
        zhuankepiD_yxmc: e.detail.value.zhuankepiD_yxmc,
        zhuankepiD_zydm1: e.detail.value.zhuankepiD_zydm1,
        zhuankepiD_zymc1: e.detail.value.zhuankepiD_zymc1,
        zhuankepiD_zydm2: e.detail.value.zhuankepiD_zydm2,
        zhuankepiD_zymc2: e.detail.value.zhuankepiD_zymc2,
        zhuankepiD_zydm3: e.detail.value.zhuankepiD_zydm3,
        zhuankepiD_zymc3: e.detail.value.zhuankepiD_zymc3,
        zhuankepiD_zydm4: e.detail.value.zhuankepiD_zydm4,
        zhuankepiD_zymc4: e.detail.value.zhuankepiD_zymc4,
        zhuankepiD_zydm5: e.detail.value.zhuankepiD_zydm5,
        zhuankepiD_zymc5: e.detail.value.zhuankepiD_zymc5,
        zhuankepiD_zydm6: e.detail.value.zhuankepiD_zydm6,
        zhuankepiD_zymc6: e.detail.value.zhuankepiD_zymc6,

        zhuankepiE_yxdm: e.detail.value.zhuankepiE_yxdm,
        zhuankepiE_yxmc: e.detail.value.zhuankepiE_yxmc,
        zhuankepiE_zydm1: e.detail.value.zhuankepiE_zydm1,
        zhuankepiE_zymc1: e.detail.value.zhuankepiE_zymc1,
        zhuankepiE_zydm2: e.detail.value.zhuankepiE_zydm2,
        zhuankepiE_zymc2: e.detail.value.zhuankepiE_zymc2,
        zhuankepiE_zydm3: e.detail.value.zhuankepiE_zydm3,
        zhuankepiE_zymc3: e.detail.value.zhuankepiE_zymc3,
        zhuankepiE_zydm4: e.detail.value.zhuankepiE_zydm4,
        zhuankepiE_zymc4: e.detail.value.zhuankepiE_zymc4,
        zhuankepiE_zydm5: e.detail.value.zhuankepiE_zydm5,
        zhuankepiE_zymc5: e.detail.value.zhuankepiE_zymc5,
        zhuankepiE_zydm6: e.detail.value.zhuankepiE_zydm6,
        zhuankepiE_zymc6: e.detail.value.zhuankepiE_zymc6,

        zhuankepiF_yxdm: e.detail.value.zhuankepiF_yxdm,
        zhuankepiF_yxmc: e.detail.value.zhuankepiF_yxmc,
        zhuankepiF_zydm1: e.detail.value.zhuankepiF_zydm1,
        zhuankepiF_zymc1: e.detail.value.zhuankepiF_zymc1,
        zhuankepiF_zydm2: e.detail.value.zhuankepiF_zydm2,
        zhuankepiF_zymc2: e.detail.value.zhuankepiF_zymc2,
        zhuankepiF_zydm3: e.detail.value.zhuankepiF_zydm3,
        zhuankepiF_zymc3: e.detail.value.zhuankepiF_zymc3,
        zhuankepiF_zydm4: e.detail.value.zhuankepiF_zydm4,
        zhuankepiF_zymc4: e.detail.value.zhuankepiF_zymc4,
        zhuankepiF_zydm5: e.detail.value.zhuankepiF_zydm5,
        zhuankepiF_zymc5: e.detail.value.zhuankepiF_zymc5,
        zhuankepiF_zydm6: e.detail.value.zhuankepiF_zydm6,
        zhuankepiF_zymc6: e.detail.value.zhuankepiF_zymc6,

        zhuankepiG_yxdm: e.detail.value.zhuankepiG_yxdm,
        zhuankepiG_yxmc: e.detail.value.zhuankepiG_yxmc,
        zhuankepiG_zydm1: e.detail.value.zhuankepiG_zydm1,
        zhuankepiG_zymc1: e.detail.value.zhuankepiG_zymc1,
        zhuankepiG_zydm2: e.detail.value.zhuankepiG_zydm2,
        zhuankepiG_zymc2: e.detail.value.zhuankepiG_zymc2,
        zhuankepiG_zydm3: e.detail.value.zhuankepiG_zydm3,
        zhuankepiG_zymc3: e.detail.value.zhuankepiG_zymc3,
        zhuankepiG_zydm4: e.detail.value.zhuankepiG_zydm4,
        zhuankepiG_zymc4: e.detail.value.zhuankepiG_zymc4,
        zhuankepiG_zydm5: e.detail.value.zhuankepiG_zydm5,
        zhuankepiG_zymc5: e.detail.value.zhuankepiG_zymc5,
        zhuankepiG_zydm6: e.detail.value.zhuankepiG_zydm6,
        zhuankepiG_zymc6: e.detail.value.zhuankepiG_zymc6,

        zhuankepiH_yxdm: e.detail.value.zhuankepiH_yxdm,
        zhuankepiH_yxmc: e.detail.value.zhuankepiH_yxmc,
        zhuankepiH_zydm1: e.detail.value.zhuankepiH_zydm1,
        zhuankepiH_zymc1: e.detail.value.zhuankepiH_zymc1,
        zhuankepiH_zydm2: e.detail.value.zhuankepiH_zydm2,
        zhuankepiH_zymc2: e.detail.value.zhuankepiH_zymc2,
        zhuankepiH_zydm3: e.detail.value.zhuankepiH_zydm3,
        zhuankepiH_zymc3: e.detail.value.zhuankepiH_zymc3,
        zhuankepiH_zydm4: e.detail.value.zhuankepiH_zydm4,
        zhuankepiH_zymc4: e.detail.value.zhuankepiH_zymc4,
        zhuankepiH_zydm5: e.detail.value.zhuankepiH_zydm5,
        zhuankepiH_zymc5: e.detail.value.zhuankepiH_zymc5,
        zhuankepiH_zydm6: e.detail.value.zhuankepiH_zydm6,
        zhuankepiH_zymc6: e.detail.value.zhuankepiH_zymc6,

        zhuankepiI_yxdm: e.detail.value.zhuankepiI_yxdm,
        zhuankepiI_yxmc: e.detail.value.zhuankepiI_yxmc,
        zhuankepiI_zydm1: e.detail.value.zhuankepiI_zydm1,
        zhuankepiI_zymc1: e.detail.value.zhuankepiI_zymc1,
        zhuankepiI_zydm2: e.detail.value.zhuankepiI_zydm2,
        zhuankepiI_zymc2: e.detail.value.zhuankepiI_zymc2,
        zhuankepiI_zydm3: e.detail.value.zhuankepiI_zydm3,
        zhuankepiI_zymc3: e.detail.value.zhuankepiI_zymc3,
        zhuankepiI_zydm4: e.detail.value.zhuankepiI_zydm4,
        zhuankepiI_zymc4: e.detail.value.zhuankepiI_zymc4,
        zhuankepiI_zydm5: e.detail.value.zhuankepiI_zydm5,
        zhuankepiI_zymc5: e.detail.value.zhuankepiI_zymc5,
        zhuankepiI_zydm6: e.detail.value.zhuankepiI_zydm6,
        zhuankepiI_zymc6: e.detail.value.zhuankepiI_zymc6,
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '专科批保存成功，可以填写其他批次，一起提交！',
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