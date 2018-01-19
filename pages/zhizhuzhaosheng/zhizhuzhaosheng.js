// pages/zhizhuzhaosheng/zhizhuzhaosheng.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: 0,
    contentList:[],
    oid:'',
    search_name: '',
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 10,
    opacityflag: 0,
    disflag: 'none',
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


    /*wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/school_content_list',
      data: {
        search_name: '',
        year:'2017',
        pageOffset:0,
        pageSize:10
      },
      success: function (res) {
        //console.log(res.data)

        that.setData({
          contentList: res.data.schoolContent
        })

        wx.hideLoading()
      }
    })*/
  
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

  // 上拉加载回调接口
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
    that.setData({
      hasMore: true,
      opacityflag: 1
    })

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var poff = parseInt(that.data.pageOffset) + 1;
    wx.request({
      url: app.globalData.baseUrl + 'wx/school_content_list',
      data: {
        pageOffset: poff,
        pageSize: 10,
        search_name: that.data.search_name,
        year:'2017'

      },
      success: function (res) {
        //console.log(res.data.schools.length)
        if (res.data.schoolContent.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {

          that.data.contentList = that.data.contentList.concat(res.data.schoolContent)
          //console.log(that.data.contentList)
          that.setData({
            contentList: that.data.contentList,
            pageOffset: poff,
            opacityflag: 0
          })
        }
        wx.hideLoading()


      }
    })

  },
  setValue: function (event) {
    this.setData({
      search_name: event.detail.value
    });
  },
  search: function (event) {
    //console.log(this.data.search_name)
    var that = this

      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl + 'wx/school_content_list',
        data: {
          search_name: that.data.search_name,
          year: '2017',
          pageSize:10
        },
        success: function (res) {

          that.setData({
            contentList: res.data.schoolContent,
            pageOffset: 0,
            opacityflag: 0
          })

          wx.hideLoading()
        }
      })
    
  },
  swichNav: function (event) {

    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      this.setData({
        tag: event.target.dataset.current,
        search_name:''
      })
      var that = this
      if (that.data.tag==1){
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl + 'wx/school_content_list',
        data: {
          search_name: '',
          year: '2017',
          pageSize:10
        },
        success: function (res) {

          that.setData({
            contentList: res.data.schoolContent,
            pageOffset: 0,
            opacityflag: 0
          })

          wx.hideLoading()
        }
      })
      }
    }


  },
  schoolDetail: function (event){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_content_detail/school_content_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  }
})