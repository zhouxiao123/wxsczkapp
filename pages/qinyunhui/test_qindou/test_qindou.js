// pages/qinyunhui/celuqu/celuqu.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: {},//高考分数
    kldm: 0,//文理科
    param: {},
    student_num: {},//考生号
    secKey: '',
    msg: {},
    uid: 0,
    ext: {},
    userInfo: {},
    phone: '',
    code: '',
    oid: '',
    num:0,
    sign:{},
    key:{},
    utilMd5:{},
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({ title: "测录取" })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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
        }
      }
    })
   

      }
    })

  },

  /**
   * 文科理科选择
   */
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.kldm = e.detail.value
    console.log('选择文科理科，携带value值为：', this.data.kldm)

  },


  /**
   * 表单输入
   */
  formSubmit: function (e) {
    var that = this
    var kldm = this.data.kldm
    var score = e.detail.value.score
    var userid = e.detail.value.userid
    console.log('userid的值' + e.detail.value.userid)
   
    if (kldm.length == 0 || kldm == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择文科理科',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (score.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入高考分数',
        showCancel: false,
        success: function (res) {

        }
      })
    }
    else {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })

      //随机生成考生号
      wx.request({
        url: app.globalData.baseUrl + 'qinyun/fm/enroll/generateNum',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'qyh-appid': '07',
          'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
        },
        data: {
          kldm: this.data.kldm,
          uid: this.data.uid,
          secKey: this.data.secKey,
        },
        success: function (res) {
          console.log('考生号：', res.data.ext)
          var ext = res.data.ext
          console.log('考生号：', ext)
          //提交文理科、高考分数,执行系统提示，提示将扣除青豆
          wx.request({
            url: app.globalData.baseUrl + 'qinyun/fm/enroll/tips',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'qyh-appid': '07',
              'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
            },
            data: {
              kldm: kldm,
              score: e.detail.value.score,
              student_num: ext,
              uid: that.data.uid,
              secKey: that.data.secKey,
            },
            success: function (res) {
              wx.hideLoading()
              if (res.data.status == 200) {

                //用户点击确定之后，获取选批次页面的数据
                wx.request({
                  url: app.globalData.baseUrl + 'qinyun/fm/enroll/save',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'qyh-appid': '07',
                    'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
                  },
                  data: {
                    kldm: kldm,
                    score: e.detail.value.score,
                    student_num: ext,
                    uid: that.data.uid,
                    secKey: that.data.secKey,
                  },
                  success: function (res) {
                    wx.hideLoading()
                    if (res.data.status == 200) {
                      //跳转到测录取页面
                      wx.navigateTo({
                        url: '../xuanpici/xuanpici?score=' + e.detail.value.score + '&student_num=' + ext + '&kldm=' + kldm +
                        '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
                      })
                    } else {
                      wx.showModal({
                        title: '系统提示',
                        content: res.data.msg,
                        showCancel: false,
                        success: function (res) {

                        }
                      })
                    }
                  }
                })
              }       //如果是之前没有使用过的账号或者分数
              else if (res.data.status == 201) {
                //新的分数或者新的考生号
                // console.log('内容：', res.data.msg)
                var utilMd5 = require('../../../utils/md5.js');
                var timestamp = Date.parse(new Date());
               
                wx.showModal({
                  title: '系统提示',
                  content: res.data.msg,
                  success: function (res) {
                    if (res.confirm) {
                      //var str = 7 + "_" + that.data.uid + "_" + 500 + "_" + timestamp + "{ZJFLK.dsj32nlfj145751osc93f}"
                      //console.log(str)
                      //console.log(utilMd5.hexMD5(str))
                    
                    
                     
                     

                    //先扣除积分，扣除成功后加青豆，跳转选批次页面
                      wx.request({
                        url: app.globalData.baseUrl + 'wx/saveceluqu',
                        data: {
              
                          userid: e.detail.value.userid

                        },
                        success: function (res) {
                          //console.log(res.data)
                          wx.hideLoading()
                          if (res.data.result == "ok") {



                            //用户点击确定之后，获取选批次页面的数据
                            wx.request({
                              url: app.globalData.baseUrl + 'wx/saveceluqu',
                              data: {
                                uid: that.data.uid,
                                //secKey: that.data.secKey,
                                num: "500",
                                //time: timestamp,
                                //sign: utilMd5.hexMD5("7_" + that.data.uid + "_500_" + timestamp + "{ZJFLK.dsj32nlfj145751osc93f}"),
                              },
                              success: function (res) {
                                wx.hideLoading()
                                console.log(res.data);
                                //支付青豆跳转页面
                                wx.request({
                                  url: app.globalData.baseUrl + 'qinyun/fm/enroll/save',
                                  header: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'qyh-appid': '07',
                                    'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
                                  },
                                  data: {
                                    kldm: kldm,
                                    score: e.detail.value.score,
                                    student_num: ext,
                                    uid: that.data.uid,
                                    secKey: that.data.secKey,
                                  },
                                  success: function (res) {
                                    wx.hideLoading()
                                    if (res.data.status == 200) {
                                      //跳转到测录取页面
                                      wx.navigateTo({
                                        url: '../xuanpici/xuanpici?score=' + e.detail.value.score + '&student_num=' + ext + '&kldm=' + kldm +
                                        '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
                                      })
                                    } else {
                                      wx.showModal({
                                        title: '系统提示',
                                        content: res.data.msg,
                                        showCancel: false,
                                        success: function (res) {

                                        }
                                      })
                                    }
                                  }
                                })
                              }
                            })


                            wx.showModal({
                              title: '提示',
                              content: '扣除50积分',
                              showCancel: false,
                              success: function (res) {
                              }
                            })
                          } else if (res.data.result == "not"){

                            wx.showModal({
                              title: '提示',
                              content: '积分不足50',
                              showCancel: false,
                              success: function (res) {
                              }
                            })
                          }
                        }
                      })



                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  },
                })
              } else {
                wx.showModal({
                  title: '系统提示',
                  content: res.data.msg,
                  showCancel: false,
                  success: function (res) {
                  }
                })
              }

            }
          })
        }
      })
    }
  },
  formReset: function () {
    this.setData({
      date: '',
      checked: true
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