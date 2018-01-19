// pages/to_count/to_count.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid:'',
    param:{},
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
       if(res.data==null){
         wx.showModal({
           title: '提示',
           content: '请先填写资料',
           showCancel: false,
           success: function (res) {
             wx.navigateTo({
               url: '../personal_info/personal_info'
             })
           }
         })
       } else {
         that.setData({
           user: res.data

         })

         wx.request({
           url: app.globalData.baseUrl + 'wx/qudao_count',
           //url: app.globalData.baseUrl + 'qinyun',
           data: {
             oid: that.data.oid
           },
           success: function (res) {
             //console.log(res.data)
             if (res.data.result == "fail") {
               wx.showModal({
                 title: '提示',
                 content: '请先填写资料',
                 showCancel: false,
                 success: function (res) {
                   wx.navigateTo({
                     url: '../personal_info/personal_info'
                   })
                 }
               })
             } else {
               that.setData({
                 param: res.data

               })
             }

           }
         })
       }
      }
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
  
  }
})