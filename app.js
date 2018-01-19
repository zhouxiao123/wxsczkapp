//app.js
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    /*var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
    //console.log("onLanuch")
    wx.setStorageSync('scene', options.scene)
   
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://wxsign.sczk.com.cn/wxsczkappback/wx/login',
            data: {
              code: res.code
            },
            success: function (res) {
              if (res.data==""){
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
    });
    wx.setStorageSync('first', 1)

    if (wx.showLoading) {
      
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onShow:function(){
    
  }
  ,

  getUserInfo: function(cb) {
    var that = this
    //console.log(this.globalData.userInfo)
    if (this.globalData.userInfo!="") {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          //console.log(res.userInfo)
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: "",
    /*正式服务器路径*/
    baseUrl:"https://wxsign.sczk.com.cn/wxsczkappback/"
    /*测试服务器路径*/
    //baseUrl: "https://wxsign.sczk.com.cn/test_wxsczkappback/"
  }
})
