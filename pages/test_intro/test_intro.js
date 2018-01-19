// pages/test_intro/test_intro.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    disflag:true,
    desc:'',
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
    })

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
              url: app.globalData.baseUrl+'wx/login',
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
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/test_intro',
      data: {

        ceshiid: options.id
      },
      success: function (res) {
        //设置介绍内容
        that.setData({
          title:res.data.ceshi.title,
          desc: res.data.ceshi.content
        })

        //判断是否测试过
        wx.request({
          url: app.globalData.baseUrl+'wx/is_test',
          data: {
            oid: that.data.oid,
            ceshiid: options.id
          },
          success: function (res) {
            console.log(res.data)
            wx.hideLoading()
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
            } else if (res.data.result == "ok") {
              that.setData({
                disflag: false
              })

            } else if (res.data.result == "is") {

              if (that.data.id != 5) {

                that.setData({
                  disflag: false
                })
              }


            }
          }
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

  },


  testDetail: function (e) {
    var that = this
    if (that.data.id == 5 ){
    //判断是否测试过
    wx.request({
      url: app.globalData.baseUrl+'wx/is_test',
      data: {
        oid: that.data.oid,
        ceshiid: that.data.id
      },
      success: function (res) {
        //console.log(res.data)
        //wx.hideLoading()
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
        } else if (res.data.result == "ok") {
          wx.navigateTo({
            url: '../test_detail/test_detail?id=' + that.data.id,
          })

        } else if (res.data.result == "is") {
          wx.showModal({
            title: '提示',
            content: '该测评只能测试一次',
            showCancel: false,
            success: function (res) {
              that.setData({
                disflag: true
              })
            }
          })

        }
      }
    })
    }else{
      wx.navigateTo({
        url: '../test_detail/test_detail?id='+that.data.id,
      })
    }
  }
})