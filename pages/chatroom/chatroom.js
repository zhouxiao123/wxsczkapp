// pages/chatroom/chatroom.js
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
    oid:''
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

    var res = wx.getSystemInfoSync()

    //console.log(res)
    var he = parseInt(750 * res.windowHeight / res.windowWidth - 180)
    that.setData({
      scrollHeight:he
    })
    //console.log(he)

    //建立连接
    wx.connectSocket({
      url: "wss://wxsign.sczk.com.cn/ws",
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log('websocket连接成功！');
      setInterval(function(){
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
        that.setData({
          askschool: json.askschool
        })

      } else if (json.msgtype == 2){

        //ta.value = ta.value + '\n' + json.content;
        that.data.list.push(json)
        that.setData({
          list: that.data.list,
          scrollid:'text-b'
        })

        
        wx.createSelectorQuery().select('.a-class').boundingClientRect(function (rect) {
          
            
          console.log()
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
          toUser: json.toUser
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
      var msg = '{"msgtype":2,"toUser":"' + this.data.toUser + '","usertype":0,"content":"' + this.data.msg + '","oid":"' + this.data.oid+'"}'
      wx.sendSocketMessage({
        data: msg,
      })

      
    }

  }, goOut:function(){
    this.setData({
      tag: 0,
      list:[]
    })
    var msg = '{"msgtype":3,"toUser":"' + this.data.toUser + '","usertype":0}'
    wx.sendSocketMessage({
      data: msg,
    })

  }, gotoText:function(e){
    this.setData({
      schoolname: e.currentTarget.dataset.name
    })
    var msg = '{"msgtype":4,"yxid":"' + e.currentTarget.dataset.id + '","usertype":0}'
    wx.sendSocketMessage({
      data: msg,
    })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }, onUnload:function(){
    
    wx.closeSocket()
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
  
  }
})