// pages/to_answer/to_answer.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askid: 0,
    oid: '',
    array: [],
    path: [],
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "志愿审核-本科第一批" })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //that.setData({
    //askid: options.askid
    //})

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
  //选择图片
  addpic: function () {
    var that = this
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          array: res.tempFilePaths
        })
        //console.log(tempFilePaths)
      }
    })
  }
  ,
  //输入的内容
  setValue: function (event) {
    this.setData({
      msg: event.detail.value
    });
  },

  //提交按钮
  sendMsg: function () {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var that = this
    console.log(that.data.msg)
    //选择的图片
    var ar = that.data.array
    console.log("打印上传图片=========")
    console.log(ar)

    if (ar.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请添加图片',
        showCancel: false,
        success: function (res) {

        }
      })
    } else {
      for (var i in ar) {
        wx.uploadFile({
          url: app.globalData.baseUrl + 'upload/uploadFile',
          filePath: ar[i],
          name: 'file',
          success: function (res) {
            //console.log(res.data)
            that.data.path.push(res.data)//先存到服务器的临时文件
            if (that.data.path.length == ar.length) {
              //console.log("over")
              //wx.hideLoading()
              wx.request({
                url: app.globalData.baseUrl + 'wx/save_zhiyuan_shenhe_tupian',//存到服务器的正式文件
                data: {
                  oid: that.data.oid,
                  beizhu_content: that.data.msg,//回复的内容
                  //askid: that.data.askid,
                  //answerid: 0,
                  path: that.data.path,
                  pici: 2,
                },
                success: function (res) {
                  //console.log(res.data)
                  if (res.data == "ok") {
                    wx.showModal({
                      title: '提示',
                      content: '提交成功',
                      showCancel: false,
                      success: function (res) {
                        wx.hideLoading()
                        var prePage = getCurrentPages()[parseInt(getCurrentPages().length) - 2];
                        //prePage.reload()
                        wx.navigateBack({

                        })
                      }
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '请先填写资料',
                      showCancel: false,
                      success: function (res) {
                        wx.navigateTo({
                          url: '/pages/personal_info/personal_info'
                        })
                      }
                    })
                  }
                  wx.hideLoading()
                }
              })
            }
          }
        })
      }
    }
  }
  ,
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