var app = getApp()
Page({
  data: {
    awardsList: {},
    animationData: {},
    animationData2: {},
    btnDisabled: '',
    oid: '',
    result: '',
    disflag: 'none',
    imgsrc: '',
    locount:0
  },
  trans: function () {
    var that = this
    that.setData({
      disflag: 'block'
    })
    var animationRun2 = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease'
    })
    that.animationRun2 = animationRun2
    animationRun2.scale(0.2).step()
    animationRun2.scale(1.2).step()
    animationRun2.scale(1).step()
    that.setData({
      animationData2: animationRun2.export()
    })

    /*var ctx = wx.createCanvasContext('imageCanvas')
    //ctx.drawImage(app.globalData.baseUrl + 'img/获得一等奖.png', 0, 0, 39, 46)
    ctx.drawImage(app.globalData.baseUrl + 'img/1等奖图片.png', 0, 0, 390, 460)
    ctx.draw()*/
  },
  close: function () {
    var that = this
    that.setData({
      disflag: 'none'
    })
    if (that.data.point != 0){
      wx.showModal({
        title: '恭喜',
        content: '获得' + that.data.point+'积分',
        showCancel: false
      })
    }
  },
  gotoList: function () {
    wx.redirectTo({
      url: '../list/list'
    })
  },
  getLottery: function () {
    var that = this
    //var awardIndex = Math.random() * 6 >>> 0;

    // 获取奖品配置
    var awardsConfig = app.awardsConfig,
      runNum = 8
    //if (awardIndex < 2) awardsConfig.chance = false
    //console.log(awardIndex)


    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/getPointLottery',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "fail") {
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
        } else if (res.data.result == "lotteryed") {
          that.setData({
            locount: res.data.locount
          })
          wx.showModal({
            title: '提示',
            content: '您已经抽过奖了',
            showCancel: false,
            success: function (res) {

            }
          })
        } else {
          var awardIndex = res.data.lotteryIndex
          var point = res.data.point
          //var awardIndex = Math.random() * 6 >>> 0;
          // 旋转抽奖
          app.runDegs = app.runDegs || 0
          //console.log('deg', app.runDegs)
          app.runDegs = app.runDegs + (360 - app.runDegs % 360) + (360 * runNum - awardIndex * (360 / 6))
          //console.log('deg', app.runDegs)

          var animationRun = wx.createAnimation({
            duration: 4000,
            timingFunction: 'ease'
          })
          that.animationRun = animationRun
          animationRun.rotate(app.runDegs).step()
          that.setData({
            animationData: animationRun.export(),
            btnDisabled: 'disabled',
            locount: res.data.locount
          })

          // 记录奖品
          //var winAwards = wx.getStorageSync('winAwards') || { data: [] }
          //winAwards.data.push(awardsConfig.awards[awardIndex].name + '1个')
          //wx.setStorageSync('winAwards', winAwards)

          that.setData({
            imgsrc: app.globalData.baseUrl + 'img/' + (awardIndex + 1) + '等奖图片.png'
          })

          // 中奖提示
          setTimeout(function () {
            /*wx.showModal({
              title: '恭喜',
              content: '获得' + (awardsConfig.awards[awardIndex].name),
              showCancel: false
            })*/
            that.setData({
              disflag: 'block'
            })
            var animationRun2 = wx.createAnimation({
              duration: 400,
              timingFunction: 'ease'
            })
            that.animationRun2 = animationRun2
            animationRun2.scale(0.2).step()
            animationRun2.scale(1.2).step()
            animationRun2.scale(1).step()
            that.setData({
              animationData2: animationRun2.export()
            })


            that.setData({

              result: awardsConfig.awards[awardIndex].name,
              point: point,
              btnDisabled: ''
            })
            /*if (awardsConfig.chance) {
              that.setData({
                btnDisabled: ''
              })
            }*/
          }, 4000);
        }

      }
    })




    // 初始化 rotate
    /*  var animationInit = wx.createAnimation({
        duration: 10
      })
      this.animationInit = animationInit;
      animationInit.rotate(0).step()
      this.setData({
        animationData: animationInit.export(),
        btnDisabled: 'disabled'
      })*/




    /*wx.request({
      url: '../../data/getLottery.json',
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function(data) {
        console.log(data)
      },
      fail: function(error) {
        console.log(error)
        wx.showModal({
          title: '抱歉',
          content: '网络异常，请重试',
          showCancel: false
        })
      }
    })*/
  },
  onReady: function (e) {

    var that = this;
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


    // getAwardsConfig
    app.awardsConfig = {
      chance: true,
      awards: [
        { 'index': 0, 'name': '一等奖' },
        { 'index': 1, 'name': '二等奖' },
        { 'index': 2, 'name': '三等奖' },
        { 'index': 3, 'name': '四等奖' },
        { 'index': 4, 'name': '五等奖' },
        { 'index': 5, 'name': '继续努力' }
      ]
    }


    wx.request({
      url: app.globalData.baseUrl + 'wx/findPointLottery',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data.locount)
        if (res.data.result != "fail") {
          that.setData({
            //result: app.awardsConfig.awards[res.data.lotteryrecord.lottery].name
            locount: res.data.locount
          })
        } else {
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
        }
      }
    })
    // wx.setStorageSync('awardsConfig', JSON.stringify(awardsConfig))


    // 绘制转盘
    var awardsConfig = app.awardsConfig.awards,
      len = awardsConfig.length,
      rotateDeg = 360 / len / 2 + 90,
      html = [],
      turnNum = 1 / len  // 文字旋转 turn 值
    that.setData({
      btnDisabled: app.awardsConfig.chance ? '' : 'disabled'
    })
    //var ctx = wx.createContext()

    //var ctx = wx.createCanvasContext('lotteryCanvas')

    //ctx.translate(150, 150);
    for (var i = 0; i < len; i++) {
      /*ctx.beginPath();
      ctx.moveTo(0, 0)
      if(i==0){
        ctx.lineTo(150, 0)
      }
      ctx.arc(0, 0, 150, (2/len) * Math.PI*i, (2/len) * Math.PI*(i+1) , false);
      ctx.lineTo(0, 0)
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('rgba(228,55,14,.1)');
      ctx.stroke()
      if (i % 2 == 0) {
        ctx.setFillStyle('#ffcb3f');
      } else {
        ctx.setFillStyle('rgba(255,203,63,.1)');
      }
      ctx.fill()
*/


      // 保存当前状态
      //ctx.save();
      // 开始一条新路径
      //ctx.beginPath();
      // 位移到圆心，下面需要围绕圆心旋转
      /*ctx.translate(150, 150);
      // 从(0, 0)坐标开始定义一条新的子路径
      //ctx.moveTo(0, 0);
      // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
      //ctx.rotate((360 / len * i - rotateDeg) * Math.PI/180);
      // 绘制圆弧
      ctx.arc(0, 0, 150, 0,  2 * Math.PI / len, false);
      ctx.setFillStyle('#EEEEEE')
      // 颜色间隔
      if (i % 2 == 0) {
          ctx.setFillStyle('rgba(255,184,32,.1)');
      }else{
          ctx.setFillStyle('rgba(255,203,63,.1)');
      }

      // 填充扇形
      ctx.fill();
      //ctx.draw();
      // 绘制边框
      ctx.setLineWidth(0.5);
      ctx.setStrokeStyle('rgba(228,55,14,.1)');
      ctx.stroke();
      
      // 恢复前一个状态
      ctx.restore();*/

      // 奖项列表
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name });
    }
    //ctx.draw()
    that.setData({
      awardsList: html
    });

    // 对 canvas 支持度太差，换种方式实现
    /*wx.drawCanvas({
      canvasId: 'lotteryCanvas',
      actions: ctx.getActions()
    })*/

  },  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '四川招考网',
      path: 'pages/index/index',
      imageUrl: '/images/logo.jpg',
      success: function (res) {
        // 转发成功
        wx.request({
          url: app.globalData.baseUrl + 'wx/saveLotteryShare',
          data: {
            oid: that.data.oid
          },
          success: function (res) {
            if (res.data.result == "ok") {
              that.setData({
                locount: res.data.locount
              })
            }
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})
