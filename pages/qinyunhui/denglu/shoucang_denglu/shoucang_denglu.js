// pages/jiekoutest/jiekoutest.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    phone: '',
    code: '',
    oid: '',

    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '' //获取到的手机栏中的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    var that = this
    var value = wx.getStorageSync('oid')
    console.log(value)
    if (value) {
      that.setData({ oid: value })
    } else {
      wx.login({
        success: function (res) {
          //console.log("res");
          if (res.code) {
            console.log(res);
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
  setValue: function (event) {
    this.setData({
      phone: event.detail.value
    });
  },
  setValue2: function (event) {
    this.setData({
      code: event.detail.value
    });
  },


  yanzhengma: function () {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/app/getcode2',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: that.data.phone,
        way: 73
      },
      success: function (res) {

        console.log(res.data);
        that.setData({
          status: res.data.status
        })
        wx.hideLoading()
      }
    })
  },
  //注册
  zhuce: function () {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
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
        unionid: that.data.oid,
        nick: that.data.userInfo.nickName,
        headimgurl: that.data.userInfo.avatarUrl,
        phone: that.data.phone,
        code: that.data.code
      },
      success: function (res) {

        console.log(res.data);
        that.setData({
          status: res.data.status
        })
        wx.hideLoading()
        wx.redirectTo({
          url: '/pages/qinyunhui/school/my_collect/my_collect',
        })
      }
    })
  },
  denglu: function () {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
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
        wx.redirectTo({
          url: 'pages/index/index',
        })
      }
    })
  },


  //获取验证码按钮
  bindButtonTap: function () {
    var that = this;

    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值

    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空

    if (phone == '') {
      warn = "号码不能为空";
    } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      warn = "手机号格式不正确";
    } else {
      wx.request({
        url: app.globalData.baseUrl + 'qinyun/app/getcode2',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'qyh-appid': '07',
          'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
        },
        data: {
          phone: that.data.phone,
          way: 73
        },
        success: function (res) {

          console.log(res.data);
          that.setData({
            status: res.data.status
          })
          wx.hideLoading()
          //当手机号正确的时候提示用户短信验证码已经发送
          wx.showToast({
            title: '短信验证码已发送',
            icon: 'none',
            duration: 2000
          });

          //设置一分钟的倒计时
          var interval = setInterval(function () {
            currentTime--; //每执行一次让倒计时秒数减一
            that.setData({
              text: currentTime + 's', //按钮文字变成倒计时对应秒数

            })
            //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                text: '重新发送',
                currentTime: 61,
                disabled: false,
                color: '#929fff'
              })
            }
          }, 1000);
        }
      })
    };
    //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
      })

      that.setData({
        disabled: false,
        color: '#929fff'
      })
      return;
    };
  },
})