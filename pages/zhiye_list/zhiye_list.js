// pages/zhiye_list/zhiye_list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    instlist:[],
    jobtypelist:[],
    jobdetaillist:[],
    jobdetail:{},
    tag2:-1,
    tag3: -1,
    tag4: -1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 一级菜单
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/zy_instutry_list',
      success: function (res) {
        //继续处理上面的
        that.setData({ instlist: res.data.instlist })
        console.log(res.data)
      }
    })
  },
  /**
   * 二级菜单
   */
  jobType:function(e){
    var that = this
    //console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.baseUrl + 'wx/zy_jobtype_list',
      data:{
        id: e.currentTarget.dataset.id
      },
      success: function (res) {
        //继续处理上面的
        that.setData({
           jobtypelist: res.data.jobtypelist,
           tag2: e.currentTarget.dataset.id
            })
        console.log(res.data)
      }
    })

  },
  /**
   * 三级菜单
   */
  jobdetail: function (e) {
    var that = this
    //console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.baseUrl + 'wx/zy_jobdetail_list',
      data: {
        id: e.currentTarget.dataset.id
      },
      success: function (res) {
        //继续处理上面的
        that.setData({
          jobdetaillist: res.data.jobdetaillist,
          tag3: e.currentTarget.dataset.id
        })
        console.log(res.data)
      }
    })

  },
  /**
   * 四级菜单，奇葩声内容
   */
 /* job: function (e) {
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: app.globalData.baseUrl + 'wx/zy_jobdetail',
      data: {
        id: e.currentTarget.dataset.id
      },
      success: function (res) {
        //继续处理上面的
        that.setData({
          jobdetail: res.data.jobdetail,
          tag4: e.currentTarget.dataset.id
        })
        console.log(res.data)
      }
    })

  },*/
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
   * 页面跳转
   */
  job: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/jobdetail/jobdetail?id=' + event.currentTarget.dataset.id
     
    })
    wx.hideLoading()
  }
})