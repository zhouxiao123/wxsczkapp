// pages/chatroom/chatroom.js
//获取应用实例
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'',
    list:[],
    tag:0,
    askschool:[],
    toUser:'',
    schoolname:'',
    scroll:0,
    scrollHeight:0,
    scrollid:'',
    oid:'',
    yxid:'',
    user:{},
    time:0,
    schoolhead:'',
    ser:0,
    search_name:'',
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    opacityflag: 0,
    showModal: false,
    adv:{},
    adv2:{},
    adv11:1,
    adv22: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({ title: "四川招考网在线咨询会" })
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

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: this.data.oid
      },
      success: function (res) {

        wx.hideLoading()
        if (res.data.length == "0") {

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
        } else{
          that.setData({
            user:res.data
          })
        }
      } 
    })


    var ress = wx.getSystemInfoSync()

    wx.request({
      url: app.globalData.baseUrl + 'wx/adv_list',
      data: {
        tag: 99
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          adv: res.data
        })
        wx.request({
          url: app.globalData.baseUrl + 'wx/adv_list',
          data: {
            tag: 98
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              adv2: res.data
            })
            //console.log(that.data.adv2.adv.length)
            var num = that.data.adv2.adv.length!=0 ? 310 : 180
            //console.log(num)
            var he = parseInt(750 * ress.windowHeight / ress.windowWidth - num)
            that.setData({
              scrollHeight: he
            })
            //wx.hideLoading()
          }
        })
        //wx.hideLoading()
      }
    })

    

    

    
    //console.log(he)

    //建立连接
    wx.connectSocket({
      url: "wss://wxsign.sczk.com.cn/ws",
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log('websocket连接成功！');
      that.data.time = setInterval(function(){
        wx.sendSocketMessage({
          data: '{"msgtype":0}',
        })
      },50000)
      var msg = '{"msgtype":1,"toUser":"all","usertype":0}'
      wx.sendSocketMessage({
        data: msg,
      })
    })


    wx.onSocketMessage(function (data) {
      //var ta = document.getElementById('responseText');
      var json = JSON.parse(data.data);
      //console.log(json)
      var content = "";
      if (json.msgtype == 1) {
        if(that.data.ser==0){
        that.setData({
          askschool: json.askschool
        })
        }

      } else if (json.msgtype == 2){

        //ta.value = ta.value + '\n' + json.content;
        that.data.list.push(json)
        that.setData({
          list: that.data.list,
          scrollid:'text-b'
        })

        
        wx.createSelectorQuery().select('.a-class').boundingClientRect(function (rect) {
          
            

          if (parseInt(rect.height * 1.5) > parseInt(that.data.scrollHeight)){
              that.setData({
                scroll: parseInt(rect.height * 1.5)
              })
          } else {
            that.setData({
              scroll: parseInt(that.data.scrollHeight)
            })
          }

        }).exec()



      } else if (json.msgtype == 4){
        that.setData({
          tag: 1,
          toUser: json.toUser,
          list:json.tc,
          adv11:0,
          adv22:1
        })
        wx.createSelectorQuery().select('.a-class').boundingClientRect(function (rect) {


          if (parseInt(rect.height * 1.5) > parseInt(that.data.scrollHeight)) {
            that.setData({
              scroll: parseInt(rect.height * 1.5)
            })
          } else {
            that.setData({
              scroll: parseInt(that.data.scrollHeight)
            })
          }

        }).exec()

      } else if (json.msgtype == 7) {
        that.setData({
          askschool: json.askschool
        })

      }  else if (json.msgtype == -1) {
        wx.showModal({
          title: '提示',
          content: '对方已下线',
          showCancel: false,
          success: function (res) {

          }
        })
      }

        /*console.log(data.data)
        that.data.list.push(data.data)
        that.setData({
          list: that.data.list
        })*/
    })
    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
    wx.onSocketClose(function(){
      console.log('websocket连接关闭！');
    })

    

    
  },
  //模糊查询
  setValue2: function (event) {
    this.setData({
      search_name: event.detail.value
    });
  }, toTop:function(){
wx.reLaunch({
  url: '/pages/index/index',
})
  },
  search: function (event) {
    //console.log(this.data.search_name)
    var msg = '{"msgtype":7,"toUser":"all","usertype":0,"search_name":"' + this.data.search_name+'"}'
    if (this.data.search_name==""){
      this.setData({
        ser: 0
      })
    } else {
      this.setData({
        ser:1
      })
    }
    wx.sendSocketMessage({
      data: msg,
    })

  }, setValue: function (event) {

    this.setData({
      msg: event.detail.value
    });
  },
  sendMsg: function (event) {
    //console.log(this.data.search_name)

    var that = this
    if (that.data.msg.length == "0") {
      wx.showModal({
        title: '提示',
        content: '请输入回复内容',
        showCancel: false,
        success: function (res) {

        }
      })

    } else {
      var msg = {msgtype:2,toUser:this.data.toUser,usertype:0,content:this.data.msg,oid:this.data.oid,yxid:this.data.yxid}
      this.setData({
        msg:''
      })
      var m = JSON.stringify(msg)
      wx.sendSocketMessage({
        data: m,
      })

      
    }

  }, goOut:function(){
    this.setData({
      tag: 0,
      list:[],
      adv11: 1,
      adv22: 0
    })
    var msg = '{"msgtype":3,"toUser":"' + this.data.toUser + '","usertype":0}'
    wx.sendSocketMessage({
      data: msg,
    })

  }, gotoText:function(e){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: this.data.oid
      },
      success: function (res) {

        wx.hideLoading()
        if (res.data.length == "0") {

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
        } else {
          that.setData({
            user: res.data
          })
          that.setData({
            schoolname: e.currentTarget.dataset.name,
            schoolhead: e.currentTarget.dataset.head
          })
          that.setData({
            yxid: e.currentTarget.dataset.id
          })
          var msg = '{"msgtype":4,"yxid":"' + e.currentTarget.dataset.id + '","usertype":0,"oid":"' + that.data.oid + '"}'
          wx.sendSocketMessage({
            data: msg,
          })
        }
      }
    })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }, onUnload:function(){
    
    wx.closeSocket()
    clearInterval(this.data.time)
    //console.log("------")
  },
  copy:function(e){
    //console.log(e)
    wx.showModal({
      title: '提示',
      content: '确认复制内容？',
      showCancel: true,
      success: function (res) {
        if(res.confirm){
        wx.setClipboardData({
          data: e.currentTarget.dataset.content,
          success: function (res) {

          }
        })
        }
      }
    })

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
   * 弹窗
   */
  showDialogBtn: function () {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/school_detail',
      data: {
        id: that.data.yxid
      },
      success: function (res) {

        WxParse.wxParse('article', 'html', res.data.desc, that, 5);
        that.setData({
          showModal: true
        })
      }
    })

  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
})