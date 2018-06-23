// pages/chatroom_teacher/list/list.js
var app = getApp()
/*const recorderManager = wx.getRecorderManager()
const options = {
  duration: 600000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3'
}*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '',
tag:0,
yxid:'0',
list:[],
talkList:[],
askSchool:{},
    nickName:'',
    head:'',
    oid:'',
    scroll: 0,
    scrollHeight: 0,
    scrollid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      yxid:options.yxid
    })

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/yxDetail',
      data: {
        yxid: that.data.yxid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()

        that.setData({
          askSchool: res.data.askSchool,

        })


      }
    })

    var res = wx.getSystemInfoSync()

    //console.log(res)
    var he = parseInt(750 * res.windowHeight / res.windowWidth - 180)
    that.setData({
      scrollHeight: he
    })

    //建立连接
    wx.connectSocket({
      url: "wss://wxsign.sczk.com.cn/ws",
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log('websocket连接成功！');
      that.data.time = setInterval(function () {
        wx.sendSocketMessage({
          data: '{"msgtype":0}',
        })
      }, 50000)
      var msg = '{"msgtype":1,"toUser":"all","usertype":1,"yxid":"' + that.data.yxid + '"}'
      //var msg = '{"msgtype":1,"toUser":"all","usertype":0}'
      wx.sendSocketMessage({
        data: msg,
      })
    })


    wx.onSocketMessage(function (data) {
      //var ta = document.getElementById('responseText');
      var json = JSON.parse(data.data);
      //console.log(json)
      var content = "";
      if (json.msgtype == 2) {
        //console.log(json)
        json.online="在线"
        json.createtime = json.createtime.split(" ")[1]
        if(that.data.list.length==0){
          json.count=1
          that.data.list.push(json)
          that.setData({
            list: that.data.list
          })
        } else {
          var flag=false
          for (var i = 0 ;i<that.data.list.length;i++){
            if (that.data.list[i].oid == json.oid){
              flag=true
              if (that.data.oid != json.oid)
                that.data.list[i].count++
              break; 
            }
          }
          if(!flag){
            json.count = 1
            that.data.list.push(json)
          }
          that.setData({
            list: that.data.list
          })


        }
        
        if(that.data.tag==1){
          //console.log(that.data.talkList)
          //console.log(json.tc)
            if (that.data.oid == json.oid) {
              if (json.usertype==0)
                that.data.talkList=json.tc
              else
                that.data.talkList.push(json.tc[0])
          
            }
            console.log(that.data.talkList)
          that.setData({
            talkList: that.data.talkList
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
        }



      } else if (json.msgtype == 3) {
        for (var i = 0; i < that.data.list.length; i++) {
          if (that.data.list[i].oid == json.oid) {
            that.data.list[i].online='离线'
            break;
          }
        }
        that.setData({
          list: that.data.list
        })

      } else if (json.msgtype == 5) {
        for (var i = 0; i < that.data.list.length; i++) {
          if (that.data.list[i].oid == json.oid) {
            that.data.list[i].online = '在线'
            break;
          }
        }
        that.setData({
          list: that.data.list
        })
      } else if (json.msgtype == 6){
        
        that.setData({
          tag: 1,
          nickName: json.nickname,
          head:json.head,
          talkList:json.tc
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

      } else if (json.msgtype == -1) {

      }


    })
    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
    wx.onSocketClose(function () {
      console.log('websocket连接关闭！');
    })
  },
  gotoTalk:function(e){
    var that = this
    that.setData({
      oid: e.currentTarget.dataset.oid
    })

    for (var i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i].oid == e.currentTarget.dataset.oid) {
       
        that.data.list[i].count=0
        break;
      }
    }

    that.setData({
      list: that.data.list
    })

    var msg = '{"msgtype":6,"toUser":"","usertype":1,"yxid":"' + that.data.yxid + '","oid":"'+e.currentTarget.dataset.oid+'"}'
    //var msg = '{"msgtype":1,"toUser":"all","usertype":0}'
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
      var msg = { msgtype: 2, toUser: '', usertype: 1, content: this.data.msg, oid: this.data.oid, yxid: this.data.yxid }
      this.setData({
        msg: ''
      })
      var m = JSON.stringify(msg)
      wx.sendSocketMessage({
        data: m,
      })


    }

  }, goOut:function () {
    this.setData({
      tag: 0,
      talkList: [],
      oid:''
    })
    /*var msg = '{"msgtype":3,"toUser":"' + this.data.toUser + '","usertype":0}'
    wx.sendSocketMessage({
      data: msg,
    })*/

  }, adduser:function(){
    wx.redirectTo({
      url: '/pages/chatroom_teacher/adduser/adduser?yxid='+this.data.yxid,
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
 onUnload:function () {

    wx.closeSocket()
    clearInterval(this.data.time)
    //console.log("------")
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
  setWindow: function () {
    wx.navigateBack({
      
    })
    /*wx.redirectTo({
      url: '/pages/chatroom_teacher/setting/setting',
    })*/

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