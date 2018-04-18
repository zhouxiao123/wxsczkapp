// pages/gaokaozhiyuan/gaokaozhiyuan.js
var app = getApp()
var image = 0
var touchDot = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录
var flag=0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tag: 0,
    tag2: 0,
    diqu:"",
    fenlei:"",
    animationData: {},
    animationData2: {},
    animationData3: {},
    top1:0,
    imageHeight:0,
    touchDot:0,
    touchEnd:0,
    scroll:0,
    height:0,
    date: '',
    checked: true,
    oid:'',
    user:{}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.tag != null){
      that.setData({
        tag:options.tag
      })
    }

    /**
 * 加载的时候获取微信id
 */
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

    //that.data.oid
    /**
* 调用getUserDetail方法，通过oid查询对应的user集合
*/
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)

        that.setData({
          user: res.data
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }

  ,
  swichNav: function (event) {
    //console.log(event.target.dataset.current)
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
  
  }, onPageScroll: function (e) { // 获取滚动条当前位置
    this.setData({
      scroll:e.scrollTop
    })
  },
  touchStart: function (e) {
    touchDot = e.touches[0].pageY; // 获取触摸时的原点 
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件 
  touchMove: function (e) {
    var touchMove = e.touches[0].pageY;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    // 向左滑动  
    if (touchMove - touchDot <= -40 && time < 10) {
      /*wx.switchTab({
        url: '../左滑页面/左滑页面'
      });*/
      flag=1
      console.log("上")
      
    }
    // 向右滑动 
    if (touchMove - touchDot >= 40 && time < 10) {
      console.log('向下滑动');
      flag=2
      /*wx.switchTab({
        url: '../右滑页面/右滑页面'
      });*/
    }
  },
  // 触摸结束事件 
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval 
    
    if (flag == 1 && time < 10 && image < 3){
      image++
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation.translateY(-this.data.imageHeight * image).step()
      if (this.data.tag == 0) {
        this.setData({
          //top1: -(this.data.imageHeight * image),
          animationData: animation.export()
        })
      } else if (this.data.tag == 1) {
        this.setData({
          //top1: -(this.data.imageHeight * image),
          animationData2: animation.export()
        })
      } else if (this.data.tag == 2) {
        this.setData({
          //top1: -(this.data.imageHeight * image),
          animationData3: animation.export()
        })
      }
      wx.pageScrollTo({
        scrollTop: 0
      })
      
      console.log(image+"xx")
    } else if (flag == 2 && time < 10 && image > 0){
      image--
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation.translateY(-this.data.imageHeight * image).step()
      if(this.data.tag==0){
        this.setData({
          //top1: -(this.data.imageHeight * image),
          animationData: animation.export()
        })
      } else if(this.data.tag==1){
        this.setData({
          //top1: -(this.data.imageHeight * image),
          animationData2: animation.export()
        })
      } else if (this.data.tag == 2) {
        this.setData({
          //top1: -(this.data.imageHeight * image),
          animationData3: animation.export()
        })
      }
      
      console.log(image+"ss")
    }

    flag=0
    time = 0;
  },
 /**
   * 表单输入
   */
  formSubmit: function (e) {
  var that = this
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var name = e.detail.value.name
    var phone = e.detail.value.phone
    var school = e.detail.value.school
    var type = e.detail.value.type
    var userid = e.detail.value.userid


    if (name.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false,
        success: function (res) {

        }
      })
    }
    else if (phone.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入联系电话',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (school.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入学校',
        showCancel: false,
        success: function (res) {
        }
      })
    } else {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl + 'wx/savezhiyuanappoint',
        data: e.detail.value,
        success: function (res) {
          //console.log(res.data)
          wx.hideLoading()
          if (res.data.result == "ok") {
            wx.showModal({
              title: '提示',
              content: '保存成功',
              showCancel: false,
              success: function (res) {

              }
            })
          }
        }
      })
    }
  },
  formReset: function () {
    this.setData({
      date: '',
      checked: true
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  /*onPullDownRefresh: function () {
    image--
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translateY(-this.data.imageHeight * image).step()

    this.setData({
      //top1: -(this.data.imageHeight * image),
      animationData: animation.export()
    })
    
  },*/

  /**
   * 页面上拉触底事件的处理函数
   */
  /*onReachBottom: function (e) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translateY(-this.data.imageHeight * image).step()

    this.setData({
      //top1: -(this.data.imageHeight * image),
      animationData: animation.export()
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
    image++
  },*/ imageLoad:function(e){
    var res = wx.getSystemInfoSync()

    

    this.setData({
      imageHeight: e.detail.height * res.windowWidth / e.detail.width,
      height:res.windowHeight
    })
    
  }
})