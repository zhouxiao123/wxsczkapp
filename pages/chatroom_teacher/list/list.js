// pages/chatroom_teacher/list/list.js
var app = getApp()
const recorderManager = wx.getRecorderManager()
const options = {
  duration: 600000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    def_img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    j: 0,//帧动画初始图片 
    isSpeaking: false,//是否正在说话 
    voiceUrl: '',
    src: '',
    msg: '',
    bot:0,
    imgtag:0,
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
      console.log(json)
      var content = "";
      if (json.msgtype == 1) {
        that.data.list=json.rjs
        for (var i in that.data.list){
          that.data.list[i].online="离线"
          that.data.list[i].count=0
          that.data.list[i].createtime = that.data.list[i].createtime.split(" ")[1]
        }
        that.setData({
          list: that.data.list
        })
      }
      else if (json.msgtype == 2) {
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
              if (that.data.oid != json.oid){
                 var con = that.data.list[i]
                 that.data.list.splice(i, 1)
                 con.count++
                 con.online="在线"
                 that.data.list.splice(0,0, con)
              }
              break; 
            }
          }
          if(!flag){
            json.count = 1
            that.data.list.splice(0,0,json)
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
              else{                
                that.data.talkList.push(json.tc[0])
              }
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
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  //手指按下 
  touchdown: function () {
    console.log("手指按下了...")
    console.log("new date : " + new Date)

    this.audioCtx.seek(0);
    this.audioCtx.pause();
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    //开始录音 
    recorderManager.start(options)
    recorderManager.onError((res) => {
      //console.log('recorder stop', res)
      wx.showModal({
        title: '错误',
        content: res,
        showCancel: false,
        success: function (res) {

        }
      })
    })
    
  },
  //手指抬起 
  touchup: function () {
    console.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)
    var _this = this;
    _this.setData({
      sec: parseInt(_this.data.j) + parseInt(_this.data.sec),
      j: 0
    })
    recorderManager.stop()
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)

      //临时路径,下次进入小程序时无法正常使用 
      var tempFilePath = res.tempFilePath
      //console.log("tempFilePath: " + tempFilePath)

      wx.showLoading({
        mask: true,
        title: '加载中'
      })

      wx.uploadFile({
        url: 'https://wxsign.sczk.com.cn/chatroom/service/uploadMp3Voice',
        //app.globalData.baseUrl + 'upload/uploadMp3Voice',
        filePath: tempFilePath,
        name: 'file',
        success: function (res) {
          console.log(res.data)
          var msg = { msgtype: 2, toUser: '', usertype: 1, content: res.data, contenttype: 1, oid: _this.data.oid, yxid: _this.data.yxid }

          var m = JSON.stringify(msg)
          wx.sendSocketMessage({
            data: m,
          })

          /*_this.setData({
            src: res.data
          })
          _this.setData({
            voiceUrl: app.globalData.baseUrl + 'temp/' + _this.data.src
          })
          _this.audioCtx.setSrc(_this.data.voiceUrl)*/
          wx.hideLoading()
        }
      })
    })
    
  }, selectPic:function(){
    var _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        wx.showLoading({
          mask: true,
          title: '加载中'
        })

        wx.uploadFile({
          url: 'https://wxsign.sczk.com.cn/chatroom/service/uploadImg',
          
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            console.log(res.data)
            var msg = { msgtype: 2, toUser: '', usertype: 1, content: res.data, contenttype: 2, oid: _this.data.oid, yxid: _this.data.yxid }

            var m = JSON.stringify(msg)
            wx.sendSocketMessage({
              data: m,
            })

            wx.hideLoading()
          }
        })



        //console.log(tempFilePaths)
      }
    })
  },
  toBig:function(e){
wx.previewImage({
  urls: [e.currentTarget.dataset.src],
})
  },
  listen: function (event) {
    var ids = event.currentTarget.dataset.id;

    var this_t = this
    this.audioCtx.seek(0);
    this.audioCtx.pause();
    this_t.setData({
      imgtag:ids
    })
    this_t.audioCtx.setSrc(app.globalData.baseUrl + 'vi/' + event.currentTarget.dataset.src)
    this_t.audioCtx.play();
    /*if (this.data.src == event.currentTarget.dataset.src) {
      this.audioCtx.seek(0);
      this.audioCtx.pause();
      
        

    } else {
      console.log("34234")
      this.audioCtx.seek(0);
      this.audioCtx.pause();
      this.setData({
        img_url: this.data.def_img_url
      })
      this.data.img_url[ids] = 'yy.gif';
      this.setData({
        src: event.currentTarget.dataset.src,
        voiceUrl: app.globalData.baseUrl + 'vi/' + event.currentTarget.dataset.src
      })
      this_t.audioCtx.setSrc(this_t.data.voiceUrl)

      this_t.audioCtx.play();



    }*/
  },
  voiceEnd:function () {

    
    this.setData({
      imgtag: 0
    })
    this.audioCtx.seek(0);
    this.audioCtx.pause();
  }, changeBar:function(){
    if(this.data.bot==1){
      this.setData({
        bot:0
      })
    }else{
      this.setData({
        bot: 1
      })
    }
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
//麦克风帧动画 
function speaking() {
  var _this = this;
  //话筒帧动画 
  var i = 0;
  this.timer = setInterval(function () {
    i++;
    //i = i % 5;
    _this.setData({
      j: i
    })
  }, 1000);
}