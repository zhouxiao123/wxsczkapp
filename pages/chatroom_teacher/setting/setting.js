// pages/chatroom_teacher/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askSchool: {},
    oq: [],
    oa: [],
    yxid:'0',
    firstcontent:'',
    onlinetime:'',
    askcontent1: '',
    answercontent1: '',
    askcontent2: '',
    answercontent2: '',
    askcontent3: '',
    answercontent3: '',
    askcontent4: '',
    answercontent4: '',
    askcontent5: '',
    answercontent5: '',
    askcontent6:'',
    answercontent6:''
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

  },
  onSave:function(){
    //console.log(this.data.askcontent6)
    //console.log(this.data.answercontent6)
    var that = this
    var ask =
      that.data.askcontent1 + "^"
      + that.data.askcontent2 + "^"
      + that.data.askcontent3 + "^"
      + that.data.askcontent4 + "^"
      + that.data.askcontent5 + "^"
      + that.data.askcontent6

    var answer =
      that.data.answercontent1 + "^"
      + that.data.answercontent2 + "^"
      + that.data.answercontent3 + "^"
      + that.data.answercontent4 + "^"
      + that.data.answercontent5 + "^"
      + that.data.answercontent6

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
        firstcontent: that.data.firstcontent,
        onlinetime: that.data.onlinetime,
        question: ask,
        answer: answer
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()

        wx.navigateTo({

          url: '/pages/chatroom_teacher/list/list?yxid=' + that.data.yxid,
        })


      }
    })
  }
  ,
  onCancel:function(){
    wx.navigateTo({
      url: '/pages/chatroom_teacher/list/list?yxid=' + this.data.yxid,
    })
  },
  setFirstcontent: function (e) {
    this.setData({
      firstcontent: e.detail.value
    })
  },
  setOnlinetime:function(e){
    this.setData({
      onlinetime: e.detail.value
    })
  },
  setAsk1: function (e) {
    this.setData({
      askcontent1: e.detail.value
    })
  },
  setAnswer1: function (e) {
    this.setData({
      answercontent1: e.detail.value
    })
  },
  setAsk2: function (e) {
    this.setData({
      askcontent2: e.detail.value
    })
  },
  setAnswer2: function (e) {
    this.setData({
      answercontent2: e.detail.value
    })
  },
  setAsk3: function (e) {
    this.setData({
      askcontent3: e.detail.value
    })
  },
  setAnswer3: function (e) {
    this.setData({
      answercontent3: e.detail.value
    })
  },
  setAsk4: function (e) {
    this.setData({
      askcontent4: e.detail.value
    })
  },
  setAnswer4: function (e) {
    this.setData({
      answercontent4: e.detail.value
    })
  },
  setAsk5: function (e) {
    this.setData({
      askcontent5: e.detail.value
    })
  },
  setAnswer5: function (e) {
    this.setData({
      answercontent5: e.detail.value
    })
  },
  setAsk6:function(e){
this.setData({
  askcontent6:e.detail.value
})
  },
  setAnswer6: function (e) {
    this.setData({
      answercontent6: e.detail.value
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
          firstcontent: res.data.askSchool.firstcontent,
          onlinetime: res.data.askSchool.onlinetime,
          askcontent1: res.data.oq[0].askcontent,
          answercontent1: res.data.oa[0].content,
          askcontent2: res.data.oq[1].askcontent,
          answercontent2: res.data.oa[1].content,
          askcontent3: res.data.oq[2].askcontent,
          answercontent3: res.data.oa[2].content,
          askcontent4: res.data.oq[3].askcontent,
          answercontent4: res.data.oa[3].content,
          askcontent5: res.data.oq[4].askcontent,
          answercontent5: res.data.oa[4].content,
          askcontent6: res.data.oq[5].askcontent,
          answercontent6: res.data.oa[5].content

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