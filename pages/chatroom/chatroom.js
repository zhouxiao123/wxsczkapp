// pages/chatroom/chatroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'',
    list:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //建立连接
    wx.connectSocket({
      url: "wss://wxsign.sczk.com.cn/ws",
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log('websocket连接成功！');
    })


    wx.onSocketMessage(function (data) {
        console.log(data.data)
        that.data.list.push(data.data)
        that.setData({
          list: that.data.list
        })
    })
    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
    wx.onSocketClose(function(){
      console.log('websocket连接关闭！');
    })
  }, setValue: function (event) {

    this.setData({
      msg: event.detail.value
    });
  },
  sendMsg: function (event) {
    //console.log(this.data.search_name)

    var that = this
    if (that.data.msg.length == "0") {
      wx.showModal({
        title: '提示',
        content: '请输入回复内容',
        showCancel: false,
        success: function (res) {

        }
      })

    } else {
      wx.sendSocketMessage({
        data: this.data.msg,
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
  
  }
})