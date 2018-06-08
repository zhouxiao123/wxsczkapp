// pages/zixunhuimenpiao/list/list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  list:[],
  oid:'',
  bigSrc:'',
  disflag: 'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "门票二维码" })
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

                if (that.openIdReadyCallback)
                  that.openIdReadyCallback(res.data)


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

    if (that.data.oid) {
      console.log("already" + that.data.oid)
      that.setTicket()
    } else {
      that.openIdReadyCallback = res => {
        console.log("oid" + res)
        that.setTicket()

      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  setTicket:function(){
    var that = this
    wx.showLoading({
      title: '请稍等',
    })
    wx.request({
      url: app.globalData.baseUrl + 'wxsign/mini_check_code',
      data: {openId:that.data.oid},
      success: function (res) {
        wx.hideLoading()
        //console.log(res.codeList)
        for (var i in res.data.codeDetailList){
          res.data.codeDetailList[i].createTime = transDate(res.data.codeDetailList[i].createTime)
        }
        that.setData({
          list: res.data.codeDetailList
        })
      }
    })
  },
  bigImg:function(e){
    /*wx.previewImage({
      urls: [e.currentTarget.dataset.src]
    })*/
    this.setData({
      bigSrc: e.currentTarget.dataset.src,
      disflag:'block'
    })
  },
  cancelBig:function(){
    this.setData({
      bigSrc: '',
      disflag: 'none'
    })
  }
  ,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  goBuy: function(){
    wx.redirectTo({
      url: '/pages/zixunhuimenpiao/buy/buy',
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
function transDate(mescStr) {
  var n = mescStr;
  var date = new Date(n);
  var Y = date.getFullYear() + '.';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return (Y + M + D + ' ' + hour + ':' + minute)
}