// pages/zixunhuimenpiao/buy/buy.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:1,
    oid:'',
    user:{},
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var value = wx.getStorageSync('oid')
    if(options.type){
      that.setData({
        type:options.type
      })
    }
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

                if (that.openIdReadyCallback)
                  that.openIdReadyCallback(res.data)


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

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/adv_list',
      data: {
        tag: 17
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          adv: res.data
        })

        wx.hideLoading()
      }
    })

    if (that.data.oid) {
      console.log("already" + that.data.oid)
      that.setUser()
    } else {
      that.openIdReadyCallback = res => {
        console.log("oid" + res)
        that.setUser()

      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  clickbutton:function(e){
    this.setData({
      tag:e.currentTarget.dataset.index
    })
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
wx.showLoading({
  title: '请稍等',
})
    var that = this;
    //console.log(e.detail.value.phone)

    if (!validatePhone(e.detail.value.phone)) {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '请填写正确的手机号',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              disflag: "none"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else if(that.data.oid.length==0){
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '请稍后再试',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              disflag: "none"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      if (that.data.user.phone){
        wx.request({
          url: app.globalData.baseUrl + 'wxsign/mini_buy_new',
          data: e.detail.value,
          success: function (res) {
            wx.hideLoading()
            //console.log(res.data)
            if (res.data.result == "false") {
              wx.showModal({
                title: '提示',
                content: '购买失败，请重试',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else if (res.data.result == "true") {
              //调用支付
              wx.requestPayment({
                'timeStamp': res.data.timeStamp,
                'nonceStr': res.data.nonceStr,
                'package': res.data.package,
                'signType': 'MD5',
                'paySign': res.data.paySign,
                'success': function (res) {
                  wx.showModal({
                    title: '提示',
                    content: '购买成功',
                    showCancel: false,
                    success: function (res) {
                      wx.navigateTo({
                        url: '/pages/zixunhuimenpiao/list/list',
                      })
                    }
                  })
                },
                'fail': function (res) {
                }
              })

            }
          }
        })
      }else{

        wx.request({
          url: app.globalData.baseUrl + 'wx/saveUserDetail',
          data: {
            phone: e.detail.value.phone,
            oid: e.detail.value.openId,
            name:'',
            school:'',
            level:'',
            headUrl:'',
            nickName:'',
            province:'',
            type:''

          },
          success: function (res) {
            //console.log(res.data)
            if (res.data.result == "fail") {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '请开启用户授权',
                showCancel: false,
                success: function (res) {

                }
              })
            } else {

              wx.request({
                url: app.globalData.baseUrl + 'wxsign/mini_buy_new',
                data: e.detail.value,
                success: function (res) {
                  wx.hideLoading()
                  //console.log(res.data)
                  if (res.data.result == "false") {
                    wx.showModal({
                      title: '提示',
                      content: '购买失败，请重试',
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  } else if (res.data.result == "true") {
                    //调用支付
                    wx.requestPayment({
                      'timeStamp': res.data.timeStamp,
                      'nonceStr': res.data.nonceStr,
                      'package': res.data.package,
                      'signType': 'MD5',
                      'paySign': res.data.paySign,
                      'success': function (res) {
                        wx.showModal({
                          title: '提示',
                          content: '购买成功',
                          showCancel: false,
                          success: function (res) {
                            wx.navigateTo({
                              url: '/pages/zixunhuimenpiao/list/list',
                            })
                          }
                        })
                      },
                      'fail': function (res) {
                      }
                    })

                  }
                }
              })
              
            }
          }
        })
      }
      
    }
  },
  setUser: function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {

        wx.hideLoading()
        if (res.data.length == "0") {

          /*wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '../personal_info/personal_info'
              })

            }
          })*/
        } else {
          that.setData({
            user:res.data
          })
        }
      }
      })
  },
  goIndex:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
  ,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  toList:function(){
    wx.navigateTo({
      url: '/pages/zixunhuimenpiao/list/list',
    })
  }
,
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
  
  }
})

function validatePhone(phone) {

  var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

  var flag = reg.test(phone); //true
  /*if(phone.length == "0" || phone.length != "11"){
    return false;
  }*/
  return flag
}