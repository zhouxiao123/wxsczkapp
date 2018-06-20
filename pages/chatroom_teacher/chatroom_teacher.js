// pages/chatroom_teacher/chatroom_teacher.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  zhuce:function(){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/main',
      data: {
        username:'bjjtdx'
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "ok") {

              wx.navigateTo({
                url: '/pages/chatroom_teacher/setting/setting'
              })
      
   
        } else {
          wx.showModal({
            title: '提示',
            content: '登录失败',
            showCancel: false,
            success: function (res) {

            }
          })


        }
      }
    })
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