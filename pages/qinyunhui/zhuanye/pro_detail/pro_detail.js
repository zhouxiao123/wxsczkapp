var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majorId: '',
    toubuxinxi:{},
    jyqk:{},
    tag:0,
    collect: 0,
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0,
    tag1: -1,
    disflag: 'none',
    animationData: {},
    pageNo: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "专业详情" })
    var that = this
    //专业详细分类
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var id = options.id
    that.data.id = id
    console.log('id的值'+that.data.id)
    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey
    //头部信息
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/v2/major/info',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        majorId: that.data.id,
        uid: that.data.uid,
        secKey: that.data.secKey,

      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          toubuxinxi: res.data.list[0]
        })
        wx.hideLoading()
      }
    })

    wx.request({
      //判断是否已经收藏专业
      url: app.globalData.baseUrl + 'qinyun/v2/major/info',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        majorId: that.data.id,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        if (res.data.list[0].attention != null) {
          that.setData({
            collect: 1
          });
        } else {
          that.setData({
            collect: 0
          });
        }
        wx.hideLoading()
      }
    })

    //简介
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/v2/major/detail',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        majorId: that.data.id,
        uid: that.data.uid,
        secKey: that.data.secKey,

      },
      success: function (res) {
        console.log('简介---------------------------------')
        console.log(res.data.list[0])
        that.setData({
          jianjie: res.data.list[0]
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
        tag: event.target.dataset.current
      })
      var that = this
      if (this.data.tag == 1) {//开设院校
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'qinyun/v2/major/schools',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            majorId: that.data.id,
            uid: that.data.uid,
            secKey: that.data.secKey,
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              kaisheyuanxiao: res.data.list
            })
            wx.hideLoading()
          }
        })
      } else if (this.data.tag == 2) {
        //招生章程
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'qinyun/v2/major/nears',//相近专业
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            majorId: that.data.id,
            uid: that.data.uid,
            secKey: that.data.secKey,
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              xjzy: res.data.list
            })
            wx.hideLoading()
          }
        })

      } else if (this.data.tag == 3) {
        //就业情况

       wx.showLoading({
         mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'qinyun/v2/major/works',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            majorId: that.data.id,
            uid: that.data.uid,
            secKey: that.data.secKey,
          },
          success: function (res) {
            console.log("就业情况--------------------------")
            console.log(res.data)
            that.setData({
              jyqk: res.data.data
            })
            wx.hideLoading()
          }
        })

      }
    }
  },
    /**
   * 上拉加载回调接口
   */
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
    if(that.data.tag==1){
    that.setData({
      hasMore: true,
      opacityflag: 1
    })

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var poff = parseInt(that.data.pageNo) + 1;

    wx.request({
      url: app.globalData.baseUrl + 'qinyun/v2/major/schools',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {   
        pageNo: poff,
        majorId: that.data.id,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.list==null || res.data.list.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.data.list = that.data.kaisheyuanxiao.concat(res.data.list)
          //console.log(poff)
          that.setData({
            kaisheyuanxiao: that.data.list,
            pageNo: poff,
            opacityflag: 0
          })
        }
        wx.hideLoading()
      }
    })
    }
  },
  /**
   * 点击院校标题，跳转到高校中的院校详情中
   */
  kaisheyuanxiao_Detail: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../../school/school_detail/school_detail?id=' + event.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
    })
    wx.hideLoading()
  },
  /**
* 点击相近专业的标题，调到相应的内容
*/
  xjzy_Detail: function (event) {
    var that = this
    //跳转到
    console.log('循环出id的值' + event.currentTarget.dataset.id)
    wx.redirectTo({
      url: '../pro_detail/pro_detail?&id=' + event.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
    })
  },
  //收藏专业
  collect: function (event) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/u/support/attentionMajor',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        tid: that.data.id,//	专业id
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        //console.log('专业的收藏=================')
        //console.log(res.data)
        if (res.data.status == 200) {
          that.setData({
            collect: 1
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '收藏失败',
            showCancel: false,
            success: function (res) {
            }
          })
        }
      }
    })
  },

  //取消收藏专业
  cansleCollect: function (event) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/u/support/attentionMajor',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        tid: that.data.id,//学校id
        uid: that.data.uid,
        secKey: that.data.secKey,
        cancel: 0
      },
      success: function (res) {
        //console.log('取消收藏=================')
        //console.log(res.data)
        if (res.data.status == 200) {
          that.setData({
            collect: 0
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '取消收藏失败',
            showCancel: false,
            success: function (res) {
            }
          })
        }
      }
    })
  },
  //跳转找专家
  tiaozhuanwenzhuanjia: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/ask_index/ask_index',
    })
    wx.hideLoading()
  },

  //跳转测录取
  tiaozhuanceluqu: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/qinyunhui/celuqu/celuqu',
    })
    wx.hideLoading()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})