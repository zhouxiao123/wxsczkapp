// pages/check_point/check_point.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  oid:'',
  user:{},
  feeValue: '',
  param:{},
  tag:0
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
        if (res.data == null) {
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
            url: app.globalData.baseUrl + 'wx/is_check_score',
            data: {
              oid: that.data.oid
            },
            success: function (res) {
              if (res.data.result == "fail") {
                wx.request({
                  url: app.globalData.baseUrl + 'wx/yizhenfenshuduan',
                  data: {
                    oid: that.data.oid,
                    score: 0
                  },
                  success: function (res) {
                    if (res.data.result == "fail") {
                      wx.showModal({
                        title: '提示',
                        content: '查看失败，请重试',
                        showCancel: false,
                        success: function (res) {

                        }
                      })
                    } else {
                      //console.log(res.data)
                      that.setData({
                        tag: 1,
                        param: res.data
                      })


                    }
                  }
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
  setValue: function (event) {
    this.setData({
      feeValue: event.detail.value
    });
  },
  checkScore:function(){
      //console.log(this.data.feeValue)
var that=this
    var value = this.data.feeValue;
    if(value==''){
      wx.showModal({
        title: '提示',
        content: '请填写正确的分数',
        showCancel: false,
        success: function (res) {
        }
      })
    } else {

    var reg = /^[0-9]*$/; //验证规则

    var flag = reg.test(this.data.feeValue);
    if (!flag) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的分数',
        showCancel: false,
        success: function (res) {
        }
      })
    } else {
      if (this.data.user.type == 1 && this.data.feeValue > 703){
        wx.showModal({
          title: '提示',
          content: '请填写正确的分数',
          showCancel: false,
          success: function (res) {
          }
        })
      } else if (this.data.user.type == 0 && this.data.feeValue > 663){
        wx.showModal({
          title: '提示',
          content: '请填写正确的分数',
          showCancel: false,
          success: function (res) {
          }
        })
      } else {
        wx.request({
          url: app.globalData.baseUrl + 'wx/yizhenfenshuduan',
          data: {
            oid: that.data.oid,
            score:value
          },
          success: function (res) {
            if (res.data.result == "fail") {
              wx.showModal({
                title: '提示',
                content: '查看失败，请重试',
                showCancel: false,
                success: function (res) {
                  
                }
              })
            } else {
              console.log(res.data)
              that.setData({
                tag:1,
                param:res.data
              })


            }
          }
        })

      }
    }
    
    } 
  },
  
  schoolDetail:function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_detail/school_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
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