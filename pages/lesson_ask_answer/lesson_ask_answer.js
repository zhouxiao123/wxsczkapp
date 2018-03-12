// pages/lesson_ask_answer/lesson_ask_answer.js
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
  data: {
    j: 0,//帧动画初始图片 
    isSpeaking: false,//是否正在说话 
    img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    def_img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    src: '',
    voiceUrl: '',
    sec: 0,
    disflag: 'none',
    oid: '',
    item: {},
    id: 0,
    userInfo: {}
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "问题问答" })
    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    that.setData({
      id: options.id
    })

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

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/lesson_ask_detail',
      data: {
        id: options.id
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          item: res.data.lessonask
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  }/*,
  switchv:function(){
    this.setData({
      src: 'c7a4ae21-d6e8-4be5-aee8-dc72a96e91a7.mp3',
      voiceUrl: app.globalData.baseUrl+'temp/c7a4ae21-d6e8-4be5-aee8-dc72a96e91a7.mp3'
    })
    this.audioCtx.setSrc(this.data.voiceUrl)
  }*/,
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
    /*wx.startRecord({
      success: function (res) {

        _this.setData({
          isSpeaking: false,
        })
        clearInterval(this.timer)
        _this.setData({
          sec: parseInt(_this.data.j) + parseInt(_this.data.sec),
          j: 0
        })
       
        setTimeout(function () {
          //结束录音  
          wx.stopRecord({

            fail: function (res) {
              //录音失败
              wx.showModal({
                title: '提示',
                content: '请开启录音授权',
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
          })
        }, 500)


        //临时路径,下次进入小程序时无法正常使用 
        var tempFilePath = res.tempFilePath
        //console.log("tempFilePath: " + tempFilePath)

        wx.showLoading({
          mask: true,
          title: '加载中'
        })

        wx.uploadFile({
          url: app.globalData.baseUrl+'upload/uploadVoice', 
          filePath: tempFilePath,
          name: 'file',
          formData: {
            'src': _this.data.src
          },
          success: function (res) {
            console.log(res.data)
            //var data = JSON.parse(res.data)
            //console.log(data.path)
            //do something
            _this.setData({
              src: res.data
            })
            _this.setData({
              voiceUrl: app.globalData.baseUrl+'temp/' + _this.data.src
            })
            _this.audioCtx.setSrc(_this.data.voiceUrl)
            wx.hideLoading()
          }


        })


      },
      fail: function (res) {
        //录音失败 
        wx.showModal({
          title: '提示',
          content: res,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            }
          }
        })
      }
    })*/
  },touchup: function () {
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
        url: app.globalData.baseUrl + 'upload/uploadMp3Voice',
        filePath: tempFilePath,
        name: 'file',
        formData: {
          'src': _this.data.src
        },
        success: function (res) {
          console.log(res.data)
          //var data = JSON.parse(res.data)
          //console.log(data.path)
          //do something
          _this.setData({
            src: res.data
          })
          _this.setData({
            voiceUrl: app.globalData.baseUrl + 'temp/' + _this.data.src
          })
          _this.audioCtx.setSrc(_this.data.voiceUrl)
          wx.hideLoading()
        }
      })
    })
    /*setTimeout(function () {
      //结束录音  
      wx.stopRecord({

        fail: function (res) {
          //录音失败
          wx.showModal({
            title: '提示',
            content: '请开启录音授权',
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
      })
    }, 500)*/
  },
  listen: function (event) {
    var ids = event.currentTarget.dataset.id;
    var this_t = this
    if (this.data.img_url[ids] == 'yy@2x2.png') {

      if (this_t.data.src.length == "0") {
        wx.showModal({
          title: '提示',
          content: '没有可播放的录音',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        this.setData({
          img_url: this.data.def_img_url
        })
        this.data.img_url[ids] = 'yy.gif';
        this.setData({
          img_url: this.data.img_url
        })

        this_t.audioCtx.play();
        /*wx.playVoice({
          filePath: this_t.data.src,
          complete: function () {
            this_t.data.img_url[ids] = 'yy@2x2.png';
            this_t.setData({
              img_url: this_t.data.img_url
            })
            wx.stopVoice();
            //console.log(this_t.data.src)
          }
        })*/
      }

    } else {
      this.data.img_url[ids] = 'yy@2x2.png';
      this.setData({
        img_url: this.data.img_url
      })
      this.audioCtx.seek(0);
      this.audioCtx.pause();

    }
  },
  voiceEnd: function () {

    this.data.img_url[0] = 'yy@2x2.png';
    this.setData({
      img_url: this.data.img_url
    })
    this.audioCtx.seek(0);
    this.audioCtx.pause();
  },
  submitVoice: function (event) {
    if (this.data.src.length == "0") {
      wx.showModal({
        title: '提示',
        content: '请先录音',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      var _this = this
      wx.showModal({
        title: '提示',
        content: '是否确认保存答案?',
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              mask: true,
              title: '加载中'
            })
            wx.request({
              url: app.globalData.baseUrl+'wx/lesson_answer_save',
              data: {
                id: _this.data.id,
                oid: _this.data.oid,
                path: _this.data.src,
                sec: _this.data.sec
              },
              success: function (res) {
                //console.log(res.data)
                if (res.data == "ok") {
                  wx.showModal({
                    title: '提示',
                    content: '保存成功',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {

                        //获取上一个页面实例对象
                        var prePage = getCurrentPages()[1];
                        prePage.onLoad()
                        wx.navigateBack({

                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '保存失败，请重试',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {

                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })

                }
                wx.hideLoading()
              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
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