var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: '',
    benkediyipi_xuanze1: 0,
    benkediyipi_xuanze2: 0,
    benkediyipi_xuanze3: 0,
    benkediyipi_xuanze4: 0,
    benkediyipi_xuanze5: 0,
    benkediyipi_xuanze6: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "本科第一批" })
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
          url: app.globalData.baseUrl + 'wx/get_zhiyuanshenhe_benkediyipi',
          data: {
            userid: that.data.userid
          },
          success: function (res) {
            console.log('结果========')
           console.log(res.data)
           if (res.data != null && res.data!='') {
             console.log(res.data.benkediyipi_xuanze1)
             if (res.data.benkediyipi_xuanze1 != null && res.data.benkediyipi_xuanze1 != '' && res.data.benkediyipi_xuanze1 != "undefined") {
            //专业调配和定向调配1
              var diyige = {};
              diyige.type1 = 0;
              diyige.type2 = 0;
              if (res.data.benkediyipi_xuanze1.indexOf("1") != -1) {
                diyige.type1 = 1
              } if (res.data.benkediyipi_xuanze1.indexOf("2") != -1) {
                diyige.type2 = 1
              }
              console.log(diyige)
             }
            //专业调配和定向调配2
            var dierge = 0;
            if (res.data.benkediyipi_xuanze2.indexOf("1") != -1) {
              dierge = 1
            }
            //专业调配和定向调配3
            var disange = 0;
            if (res.data.benkediyipi_xuanze3.indexOf("1") != -1) {
              disange = 1
            }
            //专业调配和定向调配4
            var disige = 0;
            if (res.data.benkediyipi_xuanze4.indexOf("1") != -1) {
              disige = 1
            }
            //专业调配和定向调配5
            var diwuge = 0;
            if (res.data.benkediyipi_xuanze5.indexOf("1") != -1) {
              diwuge = 1
            }
           
            //专业调配和定向调配6
            var diliuge = 0;
            if (res.data.benkediyipi_xuanze6.indexOf("1") != -1) {
              diliuge = 1
            }
            console.log(res.data.benkediyipi_xuanze6)

            that.setData({
              benkediyipi_xuanze1: diyige,
              benkediyipi_xuanze2: dierge,
              benkediyipi_xuanze3: disange,
              benkediyipi_xuanze4: disige,
              benkediyipi_xuanze5: diwuge,
              benkediyipi_xuanze6: diliuge,
              benkediyipiA_yxdm: res.data.benkediyipiA_yxdm,
              benkediyipiA_yxmc: res.data.benkediyipiA_yxmc,
              benkediyipiA_zydm1: res.data.benkediyipiA_zydm1,
              benkediyipiA_zymc1: res.data.benkediyipiA_zymc1,
              benkediyipiA_zydm2: res.data.benkediyipiA_zydm2,
              benkediyipiA_zymc2: res.data.benkediyipiA_zymc2,
              benkediyipiA_zydm3: res.data.benkediyipiA_zydm3,
              benkediyipiA_zymc3: res.data.benkediyipiA_zymc3,
              benkediyipiA_zydm4: res.data.benkediyipiA_zydm4,
              benkediyipiA_zymc4: res.data.benkediyipiA_zymc4,
              benkediyipiA_zydm5: res.data.benkediyipiA_zydm5,
              benkediyipiA_zymc5: res.data.benkediyipiA_zymc5,
              benkediyipiA_zydm6: res.data.benkediyipiA_zydm6,
              benkediyipiA_zymc6: res.data.benkediyipiA_zymc6,
              benkediyipiB_yxdm: res.data.benkediyipiB_yxdm,
              benkediyipiB_yxmc: res.data.benkediyipiB_yxmc,
              benkediyipiB_zydm1: res.data.benkediyipiB_zydm1,
              benkediyipiB_zymc1: res.data.benkediyipiB_zymc1,
              benkediyipiB_zydm2: res.data.benkediyipiB_zydm2,
              benkediyipiB_zymc2: res.data.benkediyipiB_zymc2,
              benkediyipiB_zydm3: res.data.benkediyipiB_zydm3,
              benkediyipiB_zymc3: res.data.benkediyipiB_zymc3,
              benkediyipiB_zydm4: res.data.benkediyipiB_zydm4,
              benkediyipiB_zymc4: res.data.benkediyipiB_zymc4,
              benkediyipiB_zydm5: res.data.benkediyipiB_zydm5,
              benkediyipiB_zymc5: res.data.benkediyipiB_zymc5,
              benkediyipiB_zydm6: res.data.benkediyipiB_zydm6,
              benkediyipiB_zymc6: res.data.benkediyipiB_zymc6,
              benkediyipiC_yxdm: res.data.benkediyipiC_yxdm,
              benkediyipiC_yxmc: res.data.benkediyipiC_yxmc,
              benkediyipiC_zydm1: res.data.benkediyipiC_zydm1,
              benkediyipiC_zymc1: res.data.benkediyipiC_zymc1,
              benkediyipiC_zydm2: res.data.benkediyipiC_zydm2,
              benkediyipiC_zymc2: res.data.benkediyipiC_zymc2,
              benkediyipiC_zydm3: res.data.benkediyipiC_zydm3,
              benkediyipiC_zymc3: res.data.benkediyipiC_zymc3,
              benkediyipiC_zydm4: res.data.benkediyipiC_zydm4,
              benkediyipiC_zymc4: res.data.benkediyipiC_zymc4,
              benkediyipiC_zydm5: res.data.benkediyipiC_zydm5,
              benkediyipiC_zymc5: res.data.benkediyipiC_zymc5,
              benkediyipiC_zydm6: res.data.benkediyipiC_zydm6,
              benkediyipiC_zymc6: res.data.benkediyipiC_zymc6,
              benkediyipiD_yxdm: res.data.benkediyipiD_yxdm,
              benkediyipiD_yxmc: res.data.benkediyipiD_yxmc,
              benkediyipiD_zydm1: res.data.benkediyipiD_zydm1,
              benkediyipiD_zymc1: res.data.benkediyipiD_zymc1,
              benkediyipiD_zydm2: res.data.benkediyipiD_zydm2,
              benkediyipiD_zymc2: res.data.benkediyipiD_zymc2,
              benkediyipiD_zydm3: res.data.benkediyipiD_zydm3,
              benkediyipiD_zymc3: res.data.benkediyipiD_zymc3,
              benkediyipiD_zydm4: res.data.benkediyipiD_zydm4,
              benkediyipiD_zymc4: res.data.benkediyipiD_zymc4,
              benkediyipiD_zydm5: res.data.benkediyipiD_zydm5,
              benkediyipiD_zymc5: res.data.benkediyipiD_zymc5,
              benkediyipiD_zydm6: res.data.benkediyipiD_zydm6,
              benkediyipiD_zymc6: res.data.benkediyipiD_zymc6,
              benkediyipiE_yxdm: res.data.benkediyipiE_yxdm,
              benkediyipiE_yxmc: res.data.benkediyipiE_yxmc,
              benkediyipiE_zydm1: res.data.benkediyipiE_zydm1,
              benkediyipiE_zymc1: res.data.benkediyipiE_zymc1,
              benkediyipiE_zydm2: res.data.benkediyipiE_zydm2,
              benkediyipiE_zymc2: res.data.benkediyipiE_zymc2,
              benkediyipiE_zydm3: res.data.benkediyipiE_zydm3,
              benkediyipiE_zymc3: res.data.benkediyipiE_zymc3,
              benkediyipiE_zydm4: res.data.benkediyipiE_zydm4,
              benkediyipiE_zymc4: res.data.benkediyipiE_zymc4,
              benkediyipiE_zydm5: res.data.benkediyipiE_zydm5,
              benkediyipiE_zymc5: res.data.benkediyipiE_zymc5,
              benkediyipiE_zydm6: res.data.benkediyipiE_zydm6,
              benkediyipiE_zymc6: res.data.benkediyipiE_zymc6,
              benkediyipiF_yxdm: res.data.benkediyipiF_yxdm,
              benkediyipiF_yxmc: res.data.benkediyipiF_yxmc,
              benkediyipiF_zydm1: res.data.benkediyipiF_zydm1,
              benkediyipiF_zymc1: res.data.benkediyipiF_zymc1,
              benkediyipiF_zydm2: res.data.benkediyipiF_zydm2,
              benkediyipiF_zymc2: res.data.benkediyipiF_zymc2,
              benkediyipiF_zydm3: res.data.benkediyipiF_zydm3,
              benkediyipiF_zymc3: res.data.benkediyipiF_zymc3,
              benkediyipiF_zydm4: res.data.benkediyipiF_zydm4,
              benkediyipiF_zymc4: res.data.benkediyipiF_zymc4,
              benkediyipiF_zydm5: res.data.benkediyipiF_zydm5,
              benkediyipiF_zymc5: res.data.benkediyipiF_zymc5,
              benkediyipiF_zydm6: res.data.benkediyipiF_zydm6,
              benkediyipiF_zymc6: res.data.benkediyipiF_zymc6,


            })
          }

          }

        })
      }
    })
  },
  /**
 * 本科第一批，平行志愿A
 */
  checkboxChange1: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkediyipi_xuanze1 = e.detail.value
    console.log('选择1，携带value值为：', this.data.benkediyipi_xuanze1)
  },
  /**
 * 本科第一批，平行志愿B
 */
  checkboxChange2: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkediyipi_xuanze2 = e.detail.value
    console.log('选择2，携带value值为：', this.data.benkediyipi_xuanze2)
  },
  /**
 * 本科第一批，平行志愿C
 */
  checkboxChange3: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkediyipi_xuanze3 = e.detail.value
    console.log('选择3，携带value值为：', this.data.benkediyipi_xuanze3)
  },
  /**
 * 本科第一批，平行志愿D
 */
  checkboxChange4: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkediyipi_xuanze4 = e.detail.value
    console.log('选择4，携带value值为：', this.data.benkediyipi_xuanze4)
  },
  /**
 * 本科第一批，平行志愿E
 */
  checkboxChange5: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkediyipi_xuanze5 = e.detail.value
    console.log('选择5，携带value值为：', this.data.benkediyipi_xuanze5)
  },
  /**
 * 本科第一批，平行志愿F
 */
  checkboxChange6: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.benkediyipi_xuanze6 = e.detail.value
    console.log('选择6，携带value值为：', this.data.benkediyipi_xuanze6)
  },

  /**
  * 表单输入
  */
  formSubmit: function (e) {
    var that = this
       var benkediyipiA_yxdm=e.detail.value.benkediyipiA_yxdm
       var benkediyipiA_yxmc=e.detail.value.benkediyipiA_yxmc
       var benkediyipiA_zydm1=e.detail.value.benkediyipiA_zydm1
       var benkediyipiA_zymc1=e.detail.value.benkediyipiA_zymc1
       var benkediyipiA_zydm2=e.detail.value.benkediyipiA_zydm2
       var benkediyipiA_zymc2=e.detail.value.benkediyipiA_zymc2
       var benkediyipiA_zydm3=e.detail.value.benkediyipiA_zydm3
       var benkediyipiA_zymc3=e.detail.value.benkediyipiA_zymc3
       var benkediyipiA_zydm4=e.detail.value.benkediyipiA_zydm4
       var benkediyipiA_zymc4=e.detail.value.benkediyipiA_zymc4
       var benkediyipiA_zydm5=e.detail.value.benkediyipiA_zydm5
       var benkediyipiA_zymc5= e.detail.value.benkediyipiA_zymc5
       var benkediyipiA_zydm6=e.detail.value.benkediyipiA_zydm6
       var benkediyipiA_zymc6=e.detail.value.benkediyipiA_zymc6
       if (benkediyipiA_yxdm == '' && benkediyipiA_yxmc == '' && benkediyipiA_zydm1 == '' && benkediyipiA_zymc1 == ''
         && benkediyipiA_zydm2 == '' && benkediyipiA_zymc2 == '' && benkediyipiA_zydm3 == '' && benkediyipiA_zymc3 == '' &&
         benkediyipiA_zydm4 == '' && benkediyipiA_zymc4 == '' && benkediyipiA_zydm5 == '' && benkediyipiA_zymc5 == ''
         && benkediyipiA_zydm6 == '' && benkediyipiA_zymc6 == '' 
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
      url: app.globalData.baseUrl + 'wx/zhiyuanshenhe_benkediyipi',
      data: {
        benkediyipi_xuanze1: this.data.benkediyipi_xuanze1,
        benkediyipi_xuanze2: this.data.benkediyipi_xuanze2,
        benkediyipi_xuanze3: this.data.benkediyipi_xuanze3,
        benkediyipi_xuanze4: this.data.benkediyipi_xuanze4,
        benkediyipi_xuanze5: this.data.benkediyipi_xuanze5,
        benkediyipi_xuanze6: this.data.benkediyipi_xuanze6,

        userid: that.data.userid,
        benkediyipiA_yxdm: e.detail.value.benkediyipiA_yxdm,
        benkediyipiA_yxmc: e.detail.value.benkediyipiA_yxmc,
        benkediyipiA_zydm1: e.detail.value.benkediyipiA_zydm1,
        benkediyipiA_zymc1: e.detail.value.benkediyipiA_zymc1,
        benkediyipiA_zydm2: e.detail.value.benkediyipiA_zydm2,
        benkediyipiA_zymc2: e.detail.value.benkediyipiA_zymc2,
        benkediyipiA_zydm3: e.detail.value.benkediyipiA_zydm3,
        benkediyipiA_zymc3: e.detail.value.benkediyipiA_zymc3,
        benkediyipiA_zydm4: e.detail.value.benkediyipiA_zydm4,
        benkediyipiA_zymc4: e.detail.value.benkediyipiA_zymc4,
        benkediyipiA_zydm5: e.detail.value.benkediyipiA_zydm5,
        benkediyipiA_zymc5: e.detail.value.benkediyipiA_zymc5,
        benkediyipiA_zydm6: e.detail.value.benkediyipiA_zydm6,
        benkediyipiA_zymc6: e.detail.value.benkediyipiA_zymc6,

        benkediyipiB_yxdm: e.detail.value.benkediyipiB_yxdm,
        benkediyipiB_yxmc: e.detail.value.benkediyipiB_yxmc,
        benkediyipiB_zydm1: e.detail.value.benkediyipiB_zydm1,
        benkediyipiB_zymc1: e.detail.value.benkediyipiB_zymc1,
        benkediyipiB_zydm2: e.detail.value.benkediyipiB_zydm2,
        benkediyipiB_zymc2: e.detail.value.benkediyipiB_zymc2,
        benkediyipiB_zydm3: e.detail.value.benkediyipiB_zydm3,
        benkediyipiB_zymc3: e.detail.value.benkediyipiB_zymc3,
        benkediyipiB_zydm4: e.detail.value.benkediyipiB_zydm4,
        benkediyipiB_zymc4: e.detail.value.benkediyipiB_zymc4,
        benkediyipiB_zydm5: e.detail.value.benkediyipiB_zydm5,
        benkediyipiB_zymc5: e.detail.value.benkediyipiB_zymc5,
        benkediyipiB_zydm6: e.detail.value.benkediyipiB_zydm6,
        benkediyipiB_zymc6: e.detail.value.benkediyipiB_zymc6,

        benkediyipiC_yxdm: e.detail.value.benkediyipiC_yxdm,
        benkediyipiC_yxmc: e.detail.value.benkediyipiC_yxmc,
        benkediyipiC_zydm1: e.detail.value.benkediyipiC_zydm1,
        benkediyipiC_zymc1: e.detail.value.benkediyipiC_zymc1,
        benkediyipiC_zydm2: e.detail.value.benkediyipiC_zydm2,
        benkediyipiC_zymc2: e.detail.value.benkediyipiC_zymc2,
        benkediyipiC_zydm3: e.detail.value.benkediyipiC_zydm3,
        benkediyipiC_zymc3: e.detail.value.benkediyipiC_zymc3,
        benkediyipiC_zydm4: e.detail.value.benkediyipiC_zydm4,
        benkediyipiC_zymc4: e.detail.value.benkediyipiC_zymc4,
        benkediyipiC_zydm5: e.detail.value.benkediyipiC_zydm5,
        benkediyipiC_zymc5: e.detail.value.benkediyipiC_zymc5,
        benkediyipiC_zydm6: e.detail.value.benkediyipiC_zydm6,
        benkediyipiC_zymc6: e.detail.value.benkediyipiC_zymc6,

        benkediyipiD_yxdm: e.detail.value.benkediyipiD_yxdm,
        benkediyipiD_yxmc: e.detail.value.benkediyipiD_yxmc,
        benkediyipiD_zydm1: e.detail.value.benkediyipiD_zydm1,
        benkediyipiD_zymc1: e.detail.value.benkediyipiD_zymc1,
        benkediyipiD_zydm2: e.detail.value.benkediyipiD_zydm2,
        benkediyipiD_zymc2: e.detail.value.benkediyipiD_zymc2,
        benkediyipiD_zydm3: e.detail.value.benkediyipiD_zydm3,
        benkediyipiD_zymc3: e.detail.value.benkediyipiD_zymc3,
        benkediyipiD_zydm4: e.detail.value.benkediyipiD_zydm4,
        benkediyipiD_zymc4: e.detail.value.benkediyipiD_zymc4,
        benkediyipiD_zydm5: e.detail.value.benkediyipiD_zydm5,
        benkediyipiD_zymc5: e.detail.value.benkediyipiD_zymc5,
        benkediyipiD_zydm6: e.detail.value.benkediyipiD_zydm6,
        benkediyipiD_zymc6: e.detail.value.benkediyipiD_zymc6,

        benkediyipiE_yxdm: e.detail.value.benkediyipiE_yxdm,
        benkediyipiE_yxmc: e.detail.value.benkediyipiE_yxmc,
        benkediyipiE_zydm1: e.detail.value.benkediyipiE_zydm1,
        benkediyipiE_zymc1: e.detail.value.benkediyipiE_zymc1,
        benkediyipiE_zydm2: e.detail.value.benkediyipiE_zydm2,
        benkediyipiE_zymc2: e.detail.value.benkediyipiE_zymc2,
        benkediyipiE_zydm3: e.detail.value.benkediyipiE_zydm3,
        benkediyipiE_zymc3: e.detail.value.benkediyipiE_zymc3,
        benkediyipiE_zydm4: e.detail.value.benkediyipiE_zydm4,
        benkediyipiE_zymc4: e.detail.value.benkediyipiE_zymc4,
        benkediyipiE_zydm5: e.detail.value.benkediyipiE_zydm5,
        benkediyipiE_zymc5: e.detail.value.benkediyipiE_zymc5,
        benkediyipiE_zydm6: e.detail.value.benkediyipiE_zydm6,
        benkediyipiE_zymc6: e.detail.value.benkediyipiE_zymc6,

        benkediyipiF_yxdm: e.detail.value.benkediyipiF_yxdm,
        benkediyipiF_yxmc: e.detail.value.benkediyipiF_yxmc,
        benkediyipiF_zydm1: e.detail.value.benkediyipiF_zydm1,
        benkediyipiF_zymc1: e.detail.value.benkediyipiF_zymc1,
        benkediyipiF_zydm2: e.detail.value.benkediyipiF_zydm2,
        benkediyipiF_zymc2: e.detail.value.benkediyipiF_zymc2,
        benkediyipiF_zydm3: e.detail.value.benkediyipiF_zydm3,
        benkediyipiF_zymc3: e.detail.value.benkediyipiF_zymc3,
        benkediyipiF_zydm4: e.detail.value.benkediyipiF_zydm4,
        benkediyipiF_zymc4: e.detail.value.benkediyipiF_zymc4,
        benkediyipiF_zydm5: e.detail.value.benkediyipiF_zydm5,
        benkediyipiF_zymc5: e.detail.value.benkediyipiF_zymc5,
        benkediyipiF_zydm6: e.detail.value.benkediyipiF_zydm6,
        benkediyipiF_zymc6: e.detail.value.benkediyipiF_zymc6,
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '本科第一批保存成功，可以填写其他批次，一起提交！',
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