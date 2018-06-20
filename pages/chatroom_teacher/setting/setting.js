// pages/chatroom_teacher/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askSchool: {},
    oq: [],
    oa: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/yxDetail',
      data: {
        yxid: '0004'
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()

        that.setData({
          showModal: true,
          askSchool: res.data.askSchool,
          oq: res.data.oq,
          oa: res.data.oa
        })


      }
    })

  },
  onCancel:function(){
    wx.redirectTo({
      url: '/pages/chatroom_teacher/list/list',
    })
  },
  onConfirm:function(){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/saveDetail',
      data: {
        yxid: '0004'
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()

        wx.redirectTo({
          url: '/pages/chatroom_teacher/list/list',
        })


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