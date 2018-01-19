// pages/edit_answer/edit_answer.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    answer:{},
    array:[],
    flag:0,
    path: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this
     that.setData({
       id:options.id
     })

     wx.request({
       url: app.globalData.baseUrl + 'wx/editAnswer',
       data: {
         id: that.data.id
       },
       success: function (res) {
         //console.log(res.data)
         var array = new Array
         var ai = res.data.answer.ai
         for(var i in ai){
           array.push('https://wxsign.sczk.com.cn/wxsczkappback/img/'+ai[i].path)
         }
         that.setData({
           answer:res.data.answer,
           array:array
         })
         

       }
     })
  },
  addpic: function () {
    var that = this
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          array: res.tempFilePaths,
          flag:1
        })
        //console.log(tempFilePaths)
      }
    })
  }
  ,
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value.text.length)
    if (e.detail.value.content.length == "0") {
      wx.showModal({
        title: '提示',
        content: '内容不可为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')

          }
        }
      })
      return false;
    }
    this.setData({
      disflag: "block"
    });

    var that = this;

    if(that.data.flag==0){

    wx.request({
      url: app.globalData.baseUrl + 'wx/saveEditAnswer',
      data: e.detail.value,
      success: function (res) {
    
        var prePage = getCurrentPages()[parseInt(getCurrentPages().length) - 2];
        prePage.reload()
        wx.navigateBack({

        })

        

      }
    })
    } else {
      var ar = that.data.array
      for (var i in ar) {
        wx.uploadFile({
          url: app.globalData.baseUrl + 'upload/uploadFile',
          filePath: ar[i],
          name: 'file',
          success: function (res) {
            //console.log(res.data)
            that.data.path.push(res.data)
            if (that.data.path.length == ar.length) {
              //console.log("over")
              //wx.hideLoading()
              
              wx.request({
                url: app.globalData.baseUrl + 'wx/saveEditAnswer',
                data: {
                  id: e.detail.value.id,
                  content: e.detail.value.content,
                  path: that.data.path
                },
                success: function (res) {
                  console.log(res.data)
                  if (res.data.result == "ok") {
                    wx.showModal({
                      title: '提示',
                      content: '回复成功',
                      showCancel: false,
                      success: function (res) {
                        wx.hideLoading()
                        var prePage = getCurrentPages()[parseInt(getCurrentPages().length) - 2];
                        prePage.reload()
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
                          url: '../personal_info/personal_info'
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