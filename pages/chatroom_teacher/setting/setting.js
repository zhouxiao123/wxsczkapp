// pages/chatroom_teacher/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askSchool: {},
    oq: [],
    oa: [],
    yxid:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      yxid:options.yxid
    })
    /*wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/yxDetail',
      data: {
        yxid: that.data.yxid
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
    })*/

  }
  ,
  onCancel:function(){
    wx.navigateTo({
      url: '/pages/chatroom_teacher/list/list?yxid=' + this.data.yxid,
    })
  },
  formSubmit:function(e){
    var that = this
    var ask = 
      e.detail.value.askcontent1 + "^"
      + e.detail.value.askcontent2 + "^"
      + e.detail.value.askcontent3 + "^"
      + e.detail.value.askcontent4 + "^"
      + e.detail.value.askcontent5 + "^"
      + e.detail.value.askcontent6

    var answer =
      e.detail.value.answercontent1 + "^"
      + e.detail.value.answercontent2 + "^"
      + e.detail.value.answercontent3 + "^"
      + e.detail.value.answercontent4 + "^"
      + e.detail.value.answercontent5 + "^"
      + e.detail.value.answercontent6

    //console.log(ask)
    //console.log(answer)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/saveAsk',
      data: {
        yxid: that.data.yxid,
        firstcontent: e.detail.value.firstcontent,
        onlinetime: e.detail.value.onlinetime,
        question:ask,
        answer:answer
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()

        wx.navigateTo({
          
          url: '/pages/chatroom_teacher/list/list?yxid='+that.data.yxid,
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
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/yxDetail',
      data: {
        yxid: that.data.yxid
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