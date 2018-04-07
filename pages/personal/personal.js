//personal.js
//获取应用实例
var app = getApp()
Page({
  data: {
    disflag: "none",
    userInfo: {},
    phone: '',
    province:'',
    userType:'',
    isLecturer:0,
    isQudao:0,
    isLindao:0,
    isOpen:0,
    adv:[]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {

    if(options.tag==1){
      wx.navigateTo({
        url: '../my_ask/my_ask'
      })
    }
    //console.log('onLoad')
    wx.setNavigationBarTitle({title:"个人主页"})
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
//console.log(this.data.userInfo)

    function setPersonalInfo(oid) {
      wx.request({
        url: app.globalData.baseUrl+'wx/getUserDetail',
        data: {
          oid: oid
        },
        success: function (res) {
          //console.log(res.data)
          var province = "";
          var uType = "";
          if (res.data.province != null){
            province = res.data.province.split(" ")[0]
          }
          if (res.data.type != null) {
            uType = res.data.type==1?'理科':'文科'
          }
          that.setData({
            phone: res.data.phone,
            province: province,
            userType: uType,
            isLecturer: res.data.isLecturer,
            isQudao: res.data.qudao,
            isLindao: res.data.lindao,
            isOpen: res.data.isOpen
          })
        }
      })
    }


    var value = wx.getStorageSync('oid')
    if (value) {
      setPersonalInfo(value);
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.globalData.baseUrl+'wx/login',
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
                setPersonalInfo(res.data);
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
    wx.request({
      url: app.globalData.baseUrl + 'wx/adv_list',
      data: {
        tag: 16
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          adv: res.data
        })

        //wx.hideLoading()
      }
    })
  },
  mainIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../index/index'
    })
  },
  personalIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../personal/personal'
    })
  },
  askIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../ask_index/ask_index'
    })
    this.setData({
      disflag: "none"
    });
  },
  personalInfo: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../personal_info/personal_info'
    })
    this.setData({
      disflag: "none"
    });
  },
  signUpIndex: function () {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../sign_up/sign_up'
    })
    this.setData({
      disflag: "none"
    });
  },
  answerAsk:function(){
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../answer_ask_list/answer_ask_list'
    })
    this.setData({
      disflag: "none"
    });
  },
  myVideo: function () {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../my_video/my_video'
    })
    this.setData({
      disflag: "none"
    });
  },
  myAsk: function () {
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../my_ask/my_ask'
    })
    this.setData({
      disflag: "none"
    });
  },
  myCollect:function(){
    this.setData({
      disflag: "block"
    });
    wx.navigateTo({
      url: '../my_collect/my_collect'
    })
    this.setData({
      disflag: "none"
    });
  },
  myPointIndex:function(){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../my_point/my_point'
    })
    wx.hideLoading()
  },
  feedBack:function(){
    wx.navigateTo({
      url: '../feed_back/feed_back'
    })
  },
  toCount:function(){
    wx.navigateTo({
      url: '../to_count/to_count'
    })
  },
  toLottery:function(){
    wx.navigateTo({
      url: '../canvas/canvas'
    })
  }
  
})