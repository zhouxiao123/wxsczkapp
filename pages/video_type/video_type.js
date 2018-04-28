// pages/video_type/video_type.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList:[],
    adv:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this
    wx.request({
      url: app.globalData.baseUrl+'wx/video_type',
      data: {

      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          typeList:res.data
        })
        wx.request({
          url: app.globalData.baseUrl + 'wx/adv_list',
          data: {
            tag: 9
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              adv: res.data
            })

            //wx.hideLoading()
          }
        })
        }
          
    })

  },
  lessonList: function (event) {
    //console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../lesson/lesson?lessontypeid=' + event.currentTarget.dataset.id
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },changePage: function (e) {
    //console.log(e.currentTarget.dataset.id)
    //console.log("--" + e.currentTarget.dataset.type)
    //console.log(e.currentTarget.dataset.link)

    /*wx.navigateTo({
      url: '../web_view/web_view'
    })*/
    if (e.currentTarget.dataset.type == 2) {
      wx.navigateTo({
        url: '../article/article?id=' + e.currentTarget.dataset.id
      })
    } else if (e.currentTarget.dataset.type == 3) {
      wx.navigateTo({
        url: e.currentTarget.dataset.link
      })
    } else if (e.currentTarget.dataset.type == 4) {
      wx.navigateTo({
        url: '/pages/adv/adv?id=' + e.currentTarget.dataset.id
      })
    }

  },
})