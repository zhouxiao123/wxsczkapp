// video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePath:'112',
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src:'https://wxsign.sczk.com.cn/wxsczkappback/voice/f6092e8f-63d1-427c-bf7b-88aa5d85b3be.silk',
    time_long:'1'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  startRecord:function(e){
    var this_t = this
    wx.startRecord({
      success: function (res) {
        console.log(res)
        var tempFilePath = res.tempFilePath
        
          
            //持久路径 
            //本地文件存储的大小限制为 100M 
            
            wx.uploadFile({
              url: 'https://wxsign.sczk.com.cn/wxsczkappback/upload/uploadFile', //仅为示例，非真实的接口地址
              filePath: tempFilePath,
              name: 'file',
              headers: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                var data = JSON.parse(res.data)
                console.log(data.path)
                //do something
                this_t.setData({
                  src: 'https://wxsign.sczk.com.cn/wxsczkappback/voice/'+data.path
                })
              }
            
            
          })
        
        
      },
      fail: function (res) {
        //录音失败
        wx.showModal({
          title: '提示',
          content: '请开启录音授权',
          showCancel:false,
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
  },
  stopRecord: function (e) {
    wx.stopRecord({
      success: function (res) {
        
        
      },
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
  },
  startVoice: function(){
    var this_t=this;
    console.log(this_t.data.src)
    wx.playVoice({
      filePath: this_t.data.src,
      complete: function () {
        console.log(this_t.data.src)
      }
    })
    
  }
})