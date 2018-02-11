// pages/answer_ask/answer_ask.wxml.js
var app = getApp()
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
    src:'',
    voiceUrl: '',
    sec:0,
    isfee:1,
    disflag: 'none',
    oid:'',
    item:{},
    id:0,
    userInfo: {},
    array:[],
    path:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "快速问答" })
    var that = this

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    that.setData({
      id:options.id
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
              url: app.globalData.baseUrl +'wx/login',
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
      url: app.globalData.baseUrl+'wx/ask_detail',
      data: {
        id: options.id
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          item: res.data
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
    wx.startRecord({
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



        //持久保存 
        /*wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            //持久路径 
            //本地文件存储的大小限制为 100M 
            var savedFilePath = res.savedFilePath
            console.log("savedFilePath: " + savedFilePath)
          }
        })
        wx.showToast({
          title: '恭喜!录音成功',
          icon: 'success',
          duration: 1000
        })
        //获取录音音频列表 
        wx.getSavedFileList({
          success: function (res) {
            var voices = [];
            for (var i = 0; i < res.fileList.length; i++) {
              //格式化时间 
              var createTime = new Date(res.fileList[i].createTime)
              //将音频大小B转为KB 
              var size = (res.fileList[i].size / 1024).toFixed(2);
              var voice = { filePath: res.fileList[i].filePath, createTime: createTime, size: size };
              console.log("文件路径: " + res.fileList[i].filePath)
              console.log("文件时间: " + createTime)
              console.log("文件大小: " + size)
              voices = voices.concat(voice);
            }
            _this.setData({
              voices: voices
            })
          }
        })*/
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
    })
  },
  //手指抬起 
  touchup: function () {
    console.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })    
    clearInterval(this.timer)

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
  },
  listen: function (event) {
    var ids = event.currentTarget.dataset.id;
    var this_t = this
    if (this.data.img_url[ids] == 'yy@2x2.png') {
      
      if (this_t.data.src.length=="0"){
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
      } else{
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
  voiceEnd:function(){
    
    this.data.img_url[0] = 'yy@2x2.png';
    this.setData({
      img_url: this.data.img_url
    })
    this.audioCtx.seek(0);
    this.audioCtx.pause();
  },
  radioChange:function(e){
    this.setData({
      isfee: e.detail.value
    })
  },
  addpic: function () {
    var that = this
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          array: res.tempFilePaths
        })
        //console.log(tempFilePaths)
      }
    })
  }
  ,
  submitVoice :function(event){
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
    } else{
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
          var ar = _this.data.array
          if (ar.length == 0) {

          wx.request({
            url: app.globalData.baseUrl+'wx/save_ask_answer_lecturer',
            data: {
              askid: _this.data.id,
              answerid:0,
              oid: _this.data.oid,
              answerurl: _this.data.src,
              sec: _this.data.sec,
              isfee: _this.data.isfee
            },
            success: function (res) {
              //console.log(res.data)
              if(res.data=="ok"){
                wx.showModal({
                  title: '提示',
                  content: '保存成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      //console.log(parseInt(getCurrentPages().length) - 1)
                        //获取上一个页面实例对象
                      var prePage = getCurrentPages()[parseInt(getCurrentPages().length)-2];
                      prePage.reload()
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
          } else {

            for (var i in ar) {
              wx.uploadFile({
                url: app.globalData.baseUrl + 'upload/uploadFile',
                filePath: ar[i],
                name: 'file',
                success: function (res) {
                  //console.log(res.data)
                  _this.data.path.push(res.data)
                  if (_this.data.path.length == ar.length) {
                    //console.log("over")
                    //wx.hideLoading()
                    wx.request({
                      url: app.globalData.baseUrl + 'wx/save_ask_answer_lecturer',
                      data: {
                        askid: _this.data.id,
                        answerid: 0,
                        oid: _this.data.oid,
                        answerurl: _this.data.src,
                        sec: _this.data.sec,
                        isfee: _this.data.isfee,
                        path:_this.data.path
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
                                //console.log(parseInt(getCurrentPages().length) - 1)
                                //获取上一个页面实例对象
                                var prePage = getCurrentPages()[parseInt(getCurrentPages().length) - 2];
                                prePage.reload()
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
                  }


                }


              })
            }

          }
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