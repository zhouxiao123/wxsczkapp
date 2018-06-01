// pages/zixunhuimenpiao/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  tag:1,
  oid:''
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  clickbutton:function(e){
    this.setData({
      tag:e.currentTarget.dataset.index
    })
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
wx.showLoading({
  title: '请稍等',
})
    var that = this;
    //console.log(e.detail.value.phone)
    if (!validatePhone(e.detail.value.phone)) {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '请填写正确的手机号',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              disflag: "none"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      //console.log(e.detail.value.userid)
      /*wx.request({
        url: app.globalData.baseUrl + 'wx/saveUserDetail',
        data: e.detail.value,
        success: function (res) {
          wx.hideLoading()
          //console.log(res.data)
          if (res.data.result == "fail") {
            wx.showModal({
              title: '提示',
              content: '请开启用户授权',
              showCancel: false,
              success: function (res) {

              }
            })
          } else {

          }
        }
      })*/
    }
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

function validatePhone(phone) {

  var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

  var flag = reg.test(phone); //true
  /*if(phone.length == "0" || phone.length != "11"){
    return false;
  }*/
  return flag
}