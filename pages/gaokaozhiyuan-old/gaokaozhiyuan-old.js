// pages/gaokaozhiyuan/gaokaozhiyuan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: 0,
    tag2: 0,
    diqu:"",
    fenlei:"",
    adv:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/adv_list',
      data: {
        tag: 13
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          adv: res.data
        })

        //wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }

  , changePage: function (e) {
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
  swichNav: function (event) {
    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {

      this.setData({
        tag: event.target.dataset.current
      })
      var that = this


    }

  },
  typeList1:function(e){
    this.setData({
      tag2: 1,
      diqu: e.currentTarget.dataset.id
    })
  },
  typeList2: function (e) {
    if (e.currentTarget.dataset.id == "重置") {
      this.setData({
        tag2: 0
      })
    } else {
    /*this.setData({
      tag2: 2,
      fenlei: e.currentTarget.dataset.id
    })*/
      wx.showLoading({
        mask: true,
        title: '加载中'
      })

      wx.navigateTo({
        url: '../paper/paper?diqu=' + this.data.diqu + '&fenlei=' + e.currentTarget.dataset.id
      })

      wx.hideLoading()
    }
    
  },
  typeList3: function (e) {
    if (e.currentTarget.dataset.id=="重置"){
      this.setData({
        tag2: 0
      })
    } else {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })

    wx.navigateTo({
      url: '../paper/paper?diqu=' + this.data.diqu + '&fenlei=' + this.data.fenlei + '&plei=' + e.currentTarget.dataset.id
    })

    wx.hideLoading()
    }
  }
  ,
  toask:function(){
    wx.redirectTo({
      url: '../ask_index/ask_index?tag=1'
    })
    
  }
  ,
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