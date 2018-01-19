// pages/my_collect/my_collect.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    showLecturer: "none",
    slideflag: 'none',
    img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    def_img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    animationData: {},
    search_name: '',
    list1: [],
    list2: [],
    schoolList: [],
    zyList: [],
    tag: 0,
    oid: '',

  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "我的收藏" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation

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

    
  },onShow:function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/collect_list',
      data: {
        tag: this.data.tag,
        oid: this.data.oid,
        search_name: that.data.search_name
      },
      success: function (res) {
        //console.log(res.data)
        if (that.data.tag == "0") {
          that.setData({
            list1: res.data
          })
        } else if (that.data.tag == "1") {
          that.setData({
            list2: res.data
          })
        } else if (that.data.tag == "2") {
          that.setData({
            schoolList: res.data
          })
        } else {
          that.setData({
            zyList: res.data
          })
        }
        wx.hideLoading()
      }
    })

  }
  ,
  personalIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../personal/personal'
    })
  },
  askIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../ask_index/ask_index'
    })
  },
  mainIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../index/index'
    })
  }/*,
  listen: function (event) {
    var ids = event.currentTarget.dataset.id;
    if (this.data.img_url[ids] == 'yy@2x2.png') {
      this.setData({
        img_url: this.data.def_img_url
      })
      this.data.img_url[ids] = 'yy.gif';
      this.setData({
        img_url: this.data.img_url
      })
    } else {
      this.data.img_url[ids] = 'yy@2x2.png';
      this.setData({
        img_url: this.data.img_url
      })
    }
  }*/,
  ask_detail: function (event) {
    //console.log(event.target.dataset.id)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../ask_detail/ask_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  see_video: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../video_detail/video_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  swichNav: function (event) {

    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      this.setData({
        tag: event.target.dataset.current,
        search_name: ''
      })
      var that = this
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/collect_list',
        data: {
          tag: this.data.tag,
          oid: this.data.oid,
          search_name: that.data.search_name
        },
        success: function (res) {
          //console.log(res.data)
          if (that.data.tag == "0") {
            that.setData({
              list1: res.data
            })
          } else if (that.data.tag == "1"){
            that.setData({
              list2: res.data
            })
          }else if (that.data.tag == "2") {
            that.setData({
              schoolList: res.data
            })
            console.log(res.data)
          } else {
            that.setData({
              zyList: res.data
            })
          }
          wx.hideLoading()
        }
      })
    }


  },
   answerDetail: function (e) {
     //console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../test_answer_detail/test_answer_detail?id=' + e.currentTarget.dataset.id,
    })
  },
  bindChange: function (event) {
    this.setData({ tag: event.detail.current });

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
      url: app.globalData.baseUrl+'wx/collect_list',
      data: {
        tag: this.data.tag,
        oid: this.data.oid,
        search_name: that.data.search_name
      },
      success: function (res) {
        //console.log(res.data)
        if (that.data.tag == "0") {
          that.setData({
            list1: res.data
          })
        } else if (that.data.tag == "1") {
          that.setData({
            list2: res.data
          })
        } else if (that.data.tag == "2") {
          that.setData({
            schoolList: res.data
          })
        } else {
          that.setData({
            zyList: res.data
          })
        }
        wx.hideLoading()
      }
    })
  },
  lecturerDetail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../lecturer_detail/lecturer_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()


  },
  schoolDetail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_detail/school_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  zyDetail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../zy_detail/zy_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  }
})