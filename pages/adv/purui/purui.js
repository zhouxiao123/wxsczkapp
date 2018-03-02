// pages/adv/purui/purui.js
// pages/paper/paper.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diqu: '',
    fenlei: '',
    plei: '',
    plei2: '',
    list1: [],
    list2: [],
    array: [],
    date:'',
    checked:true,
    start:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var myDate = new Date();
    myDate.toLocaleDateString();
    that.setData({start:myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate()})
            for (var i=1;i < 16;i++ ) {

              that.data.array.push("https://wxsign.sczk.com.cn/wxsczkappback/img/adv/普瑞"+i+".png")
            }
            //console.log(that.data.array)
            that.setData({
              array: that.data.array
            })

  },
  bigPic: function (e) {
    //console.log('e.currentTarget.dataset.src')
    var that = this
    /*var array = new Array
    array.push(e.currentTarget.dataset.src)*/
    wx.previewImage({
      urls: that.data.array,
      current: e.currentTarget.dataset.src,
    })
  },
  call : function(){
    wx.makePhoneCall({
      phoneNumber: '4000-800-110',
    })
  },
  timeChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var name = e.detail.value.name
    var age = e.detail.value.age
    var sex = e.detail.value.sex
    var phone = e.detail.value.phone
    var appointtime = e.detail.value.appointtime

    if(name.length == 0){
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false,
        success: function (res) {
          
        }
      })
    } else if(age.length==0){
      wx.showModal({
        title: '提示',
        content: '请输入年龄',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (sex.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择性别',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (phone.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入联系电话',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (appointtime.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入预约时间',
        showCancel: false,
        success: function (res) {

        }
      })
    } else{
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl + 'wx/savepuruiappoint',
        data: e.detail.value,
        success: function (res) {
          //console.log(res.data)
          wx.hideLoading()
          if (res.data.result == "ok") {
            wx.showModal({
              title: '提示',
              content: '保存成功',
              showCancel: false,
              success: function (res) {

              }
            })
          }
        }
      })
    }
  },
  formReset: function () {
    this.setData({
      date:'',
      checked:true
    })
  },
  puruiAsk:function(){
    wx.navigateTo({
      url: 'ask/ask'
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