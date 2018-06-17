//index.js
//获取应用实例
var app = getApp()
var timer = 0
Page({
  data: {
    motto: 'Hello World',
    img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
      ],
    def_img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    disflag:'none',
    disflag2: 'none',
    disflag3: 'none',
    userInfo: {},
    user:{},
    askList:[],
    clock:'',
    cd:10,
    swiperList:[],
    page:3,
    //广告
    adv:{},
    //日期管理
    tday:{},
    year:'',
    month:'',
    m:'',
    monthE:'',
    flag:0,
    positionHeight:0,
    zhibo:0,
    zhibologo:'/images/xz-2@2x.png',
    zhiboUrl:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //console.log('onLoad')
    wx.setNavigationBarTitle({title:"四川招考网"})
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })


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

                if (that.openIdReadyCallback)
                  that.openIdReadyCallback(res.data)

                
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
      url: app.globalData.baseUrl +'wx/askList',
      data: {
        search_name: '',
        type:1
      },
      success: function (res) {
        //console.log(res.data)
        for (var i in res.data) {
          res.data[i].createTime = transDate(res.data[i].createTime)
        }
          that.setData({
            askList: res.data
          })
        
        //wx.hideLoading()
      }
    })



    /*wx.showLoading({
      mask: true,
      title: '加载中'
    })*/
    wx.request({
      url: app.globalData.baseUrl +'wx/adv_list',
      data: {
       
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          adv: res.data
        })

        //wx.hideLoading()
      }
    })

    countdown(that)
    //console.log("+++++++++++")
    //console.log("onload")
  },onShow:function(){

    var that = this
//console.log("show")
if(that.data.oid){
  console.log("already" + that.data.oid)
  that.setUserInfo()
}else{
  that.openIdReadyCallback = res => {
    console.log("oid"+res)
    that.setUserInfo()
    
  }
}

    




    

  },
  setUserInfo:function(){
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl +'wx/getUserDetail',
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
              /*wx.navigateTo({
                url: '../first_zhuce/first_zhuce'
              })*/
              wx.navigateTo({
                url: '../personal_info/personal_info'
              })

            }
          })
        } else {
          that.setData({
            user: res.data,
            zhibo: res.data.zhibo,
            zhiboUrl:res.data.zhiboUrl
          })
          if(res.data.zhibo==1){
            that.setData({
              zhibologo: 'https://wxsign.sczk.com.cn/wxsczkappback/img/backimg/zhibo-2.gif'
            })
          }

          var date = new Date();
          var sList=[]
          if (that.data.swiperList.length=="0"){
          var today = date.getDate()
          for(var j = 0;j<3;j++){
            var list = []
          if (date.getDay()==0){
            //var d = { year: 0, month: 0, week: 0, day: 0 }

            date.setDate(date.getDate() - 7+7*(j!=0))
            //console.log(date)
            for (var i = 0; i < 7; i++) {
              date.setDate(date.getDate()+1)
              var d1 = { year: 0, month: 0, week: 0, day: 0,today:0,m:0}
              d1.year = date.getFullYear()
              d1.m = (date.getMonth() + 1)
              d1.month = (date.getMonth() + 1) + '月'
              d1.week = transWeek(date.getDay())
              d1.day = date.getDate()
              if(d1.day==today){
                d1.today=1
                that.data.tday = d1
              }
              list.push(d1)
            }
          }else {
            date.setDate(date.getDate() - date.getDay() + 7 * (j != 0))
            //console.log(date)
            for (var i = 0; i < 7; i++) {
              date.setDate(date.getDate() + 1)
              var d1 = { year: 0, month: 0, week: 0, day: 0,today: 0,m:0 }
              d1.year = date.getFullYear()
              d1.m = (date.getMonth() + 1)
              d1.month = (date.getMonth() + 1) + '月'
              d1.week = transWeek(date.getDay())
              d1.day = date.getDate()
              if (d1.day == today) {
                d1.today = 1
                that.data.tday = d1
                }
              list.push(d1)
            }
          }
          sList.push(list)
          }

          that.setData({
            swiperList:sList,
            year: that.data.tday.year,
            month: that.data.tday.month,
            m: that.data.tday.m,
            monthE: transMonth(that.data.tday.m)
          })
          }
          var first = wx.getStorageSync('first');

          if (first == "1") {
            that.countDown()
            wx.removeStorageSync('first')
          }
          that.tankuang();
        }
      }
    })

  }
  /*,
  onHide:function(){
    //console.log("rrrrr")
    wx.showModal({
      title: '提示',
      content: '是否确认关闭小程序',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {

        } else{
          //console.log('用户点击取消')
          wx.redirectTo({
            url: '../index/index',
          })
        }
      }
    })
  }*/
  , toBuyTicket:function(){
    wx.navigateTo({
      url: '/pages/zixunhuimenpiao/buy/buy',
    })
  }
  , bchange:function(e){
    var that = this
    if (e.detail.current == 0){
      that.setData({
        year: that.data.tday.year,
        month: that.data.tday.month,
        m: that.data.tday.m,
        monthE: transMonth(that.data.tday.m)
      })
      
    } else {
      that.setData({
        year: that.data.swiperList[e.detail.current][0].year,
        month: that.data.swiperList[e.detail.current][0].month,
        m: that.data.swiperList[e.detail.current][0].m,
        monthE: transMonth(that.data.swiperList[e.detail.current][0].m)
      })
    }
    if (this.data.page - e.detail.current==2){
      
      var sList = []
      var date = new Date()
      var today = date.getDate()
      if (date.getDay() == 0) {
        date.setDate(date.getDate() + 7 * (parseInt(that.data.page)-1))
      } else {
        date.setDate(date.getDate()+ 7 * parseInt(that.data.page))
      }
      for (var j = that.data.page; j < that.data.page+3; j++) {
        var list = []
        
        /*if (date.getDay() == 0) {
          //var d = { year: 0, month: 0, week: 0, day: 0 }

          date.setDate(date.getDate()-7)
          //console.log(date)
          for (var i = 0; i < 7; i++) {
            date.setDate(date.getDate() + 1)
            var d1 = { year: 0, month: 0, week: 0, day: 0, today: 0 }
            d1.year = date.getFullYear()
            d1.month = (date.getMonth() + 1) + '月'
            d1.week = transWeek(date.getDay())
            d1.day = date.getDate()
            //if (d1.day == today) d1.today = 1
            list.push(d1)
          }
        } else {*/
        
          date.setDate(date.getDate() - date.getDay())
          //console.log(date)
          for (var i = 0; i < 7; i++) {
            date.setDate(date.getDate() + 1)
            var d1 = { year: 0, month: 0, week: 0, day: 0, today: 0,m:0 }
            d1.year = date.getFullYear()
            d1.m = (date.getMonth() + 1)
            d1.month = (date.getMonth() + 1) + '月'
            d1.week = transWeek(date.getDay())
            d1.day = date.getDate()
            //if (d1.day == today) d1.today = 1
            list.push(d1)
          }
        /*}*/
        sList.push(list)
      
      }
      //console.log("-----")
      that.setData({
        swiperList: that.data.swiperList.concat(sList),
        page:parseInt(that.data.page)+3
      })
    }
  },
  personalIndex: function (event) {

    wx.redirectTo({
      url: '../personal/personal'
    })
  },
  askIndex: function (event) {

    wx.navigateTo({
      url: '../ask_index/ask_index'
    })

  },
  mainIndex: function (event) {

    wx.redirectTo({
      url: '../index/index'
    })
  }
  ,
  /*school_list: function (event) {

    wx.navigateTo({
      url: '../school_list/school_list'
    })

  },
  pro_list: function (event) {

    wx.navigateTo({
      url: '../pro_list/pro_list'
    })

  },*/
  school_list: function (event) {
    wx.navigateTo({
      url: '/pages/qinyunhui/school/school_list/school_list'
    })
  },
  pro_list: function (event) {

    wx.navigateTo({
      url: '/pages/qinyunhui/zhuanye/pro_list/pro_list'
    })

  },
  lesson: function (event) {
    if(this.data.zhibo==1){
      wx.navigateTo({
        url: this.data.zhiboUrl
      })
    } else {
      wx.navigateTo({
       url: '../video_type/video_type'
      })
    }
    /*wx.navigateTo({
      url: '../lesson/lesson'
    })*/

  }/*,
  listen:function(event){
    var ids = event.currentTarget.dataset.id;
    if (this.data.img_url[ids] == 'yy@2x2.png'){
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
  }*/
  ,
  ask: function (event) {

    wx.navigateTo({
      url: '../ask_index/ask_index'
    })

  },
  ask_detail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../ask_detail/ask_detail?id='+event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  signUpIndex: function(){

    wx.navigateTo({
      url: '../sign_up/sign_up'
    })

  },
  toGaokaozhiyuan: function(){
    wx.navigateTo({
      url: '../gaokaozhiyuan/gaokaozhiyuan'
      //url: '../gaokaozhiyuan-old/gaokaozhiyuan-old'
    })
  }
  ,
  online:function(){
   /* wx.showModal({
      title: '提示',
      content: '敬请期待',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      //url: '../small_video/small_video'
      //url: '../live_list/live_list'
      url: '../zhiye_list/zhiye_list'
    })
    wx.hideLoading()
  },countDown:function(){
    var _this = this
    _this.setData({
      disflag2: 'block'
    }) 
    timer = setInterval(function () {
      //i = i % 5;
      //console.log(_this.data.cd)
      if (parseInt(_this.data.cd)==0){
        _this.setData({
          disflag2: 'none'
        })
        clearInterval(timer) 
        _this.signUp();   
      } else {
      _this.setData({
        cd: parseInt(_this.data.cd)-1
      })
      }
    }, 1000);
  },
  imageLoad:function(e){
    this.setData({
      positionHeight: parseInt(e.detail.height * 700 / e.detail.width)
    })
    //console.log(e.detail + "------" + this.data.positionHeight)
  },
  testPage:function(){
    wx.navigateTo({
      url: '../lesson/lesson?lessontypeid=1'
    })
  }
  , onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '四川招考网',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {

        // 转发失败
      }
    }
  }, article_detail:function(e){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../article/article?id='+e.currentTarget.dataset.id
    })
    wx.hideLoading()
  },close:function(){
    clearInterval(timer)
    this.setData({
      disflag2: 'none'
    })
    this.signUp();
  }, close2: function () {
    //clearInterval(timer)
    this.setData({
      disflag3: 'none'
    })
    //this.tankuang();
  },
  signUp:function(){
    var that = this
    //没有签到的才弹出
    wx.request({
      url: app.globalData.baseUrl + 'wx/getSignCount',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.result == "fail") {

        } else {

          if (res.data.today == 0) {

            /*that.setData({
              disflag3: 'block'
            })*/
          }
        }
      }
    })

  },toSign:function(){
    wx.navigateTo({
      url: '../sign_up/sign_up'
    })
  },testList:function(e){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../test_list/test_list'
    })
    wx.hideLoading()
  },
  testTypeList:function(){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../test_type_list/test_type_list'
    })
    wx.hideLoading()
  },
  zzzs: function () {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      //url: '../zhizhuzhaosheng/zhizhuzhaosheng'
      url: '/pages/chatroom/chatroom'
    })
    wx.hideLoading()
  },
  changePage: function (e) {
    //console.log(e.currentTarget.dataset.id)
    //console.log("--" + e.currentTarget.dataset.type)
    //console.log(e.currentTarget.dataset.link)

    /*wx.navigateTo({
      url: '../web_view/web_view'
    })*/
    if (e.currentTarget.dataset.type==2){
      wx.navigateTo({
        url: '../article/article?id=' + e.currentTarget.dataset.id
      })
    } else if (e.currentTarget.dataset.type == 3){
      wx.navigateTo({
        url: e.currentTarget.dataset.link
      })
    } else if (e.currentTarget.dataset.type == 4) {
      wx.navigateTo({
        url: '/pages/adv/adv?id=' + e.currentTarget.dataset.id
      })
    }
    
  },
  tanchuang:function(e){
    /*console.log(e.currentTarget.dataset.year + '-' + e.currentTarget.dataset.m + '-'+e.currentTarget.dataset.day);
    wx.showModal({
      title: '提示',
      content: e.currentTarget.dataset.year + '-' + e.currentTarget.dataset.m + '-' + e.currentTarget.dataset.day+'\n一个活动',
      showCancel: false,
      success: function (res) {

      }
    })*/
  },
  tankuang: function (e) {
    
    wx.showLoading({
      mask: true,
      title: '加载中'
    })

var that = this



    if(that.data.user.isLecturer!=1){
    wx.request({
      url: app.globalData.baseUrl + 'wx/is_has_answer',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "ok") {

          wx.showModal({
            title: '提示',
            content: '您的提问有新的回复',
            showCancel: true,
            confirmText: '查看回复',
            cancelText: '稍后提醒',
            success: function (res) {
              if (res.confirm) {
              wx.navigateTo({
                url: '../my_ask/my_ask'
              })
              }
            }
          })
        }
      }
    })
    } else {
      wx.request({
        url: app.globalData.baseUrl + 'wx/is_has_ask',
        data: {
          oid: that.data.oid
        },
        success: function (res) {
          console.log(res.data)
          wx.hideLoading()
          if (res.data.result == "ok") {
            var tag = res.data.tag
            var name = res.data.name
            var names = ''
            if (res.data.names.length!=0){
              for(var i in res.data.names ){
                names += res.data.names[i] + ','
              }
            }
            var text = ''
            if (res.data.names.length != 0){
              text += '有指定' + names + '回答的问题，请注意回复。'
            } 
            if (res.data.flag==1) {
              text += '有需要回复的公共提问,今日值班老师:' + name
            }
            wx.showModal({
              title: '提示',
              content: text,
              showCancel: true,
              confirmText: '去回答',
              cancelText: '稍后提醒',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../answer_ask_list/answer_ask_list?tag=' + tag
                  })
                }
              }
            })
            /*if(tag==0){
            wx.showModal({
              title: '提示',
              content: '有指定您回答的问题，请注意回复,今日值班老师:'+name,
              showCancel: true,
              confirmText: '去回答',
              cancelText: '稍后提醒',
              success: function (res) {
                if(res.confirm){
                wx.navigateTo({
                  url: '../answer_ask_list/answer_ask_list?tag='+tag
                })
                }
              }
            })
          } else if(tag==1) {
              wx.showModal({
                title: '提示',
                content: '有需要回复的公共提问,今日值班老师:' + name,
                showCancel: true,
                confirmText: '去回答',
                cancelText: '稍后提醒',
                success: function (res) {
                  if (res.confirm) {
                  wx.navigateTo({
                    url: '../answer_ask_list/answer_ask_list?tag=' + tag
                  })
                  }
                }
              })
          }*/
          }
        }
      })
    }
  },
  mpoint:function(e){
    wx.navigateTo({
      url: '../month_point/month_point?m=' + e.currentTarget.dataset.m
    })
  },
  news:function(e){
    wx.navigateTo({
      url: '../news_list/news_list'
    })
  }

  ,
  testLink: function (e) {
    wx.navigateTo({
      url: '../check_point/check_point'
    })
  }
})
function transDate(mescStr) {
  var n = mescStr;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return (Y + M + D + ' ' + hour + ':' + minute)
}
// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(micro_second) {
  // 总秒数
  var second = Math.floor(micro_second / 1000);
  // 天数
  var day = Math.floor(second / 3600 / 24);
  // 小时
  var hr = Math.floor(second / 3600 % 24);
  // 分钟
  var min = Math.floor(second / 60 % 60);
  // 秒
  var sec = Math.floor(second % 60);
  return day + "天" + hr + "时" + min + "分" + sec + "秒";
}

function countdown(that) {
  var now = new Date()
  var arr = "2018/6/7 09:00:00".split(/[- : \/]/)
  var end = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
   
  var total_micro_second = end.getTime() - now.getTime()
  if (total_micro_second < 0){
    that.setData({
      clock: '高考已结束'
    });
    return
  }
  //console.log(total_micro_second)
  that.setData({
    clock: dateformat(total_micro_second)
  });
  if (total_micro_second <= 1000) {

    return
  }
  setTimeout(function () {
    total_micro_second -= 1000;
    countdown(that);
  }
    , 1000)
}

function transWeek(week){
  switch(week){
    case 0:return "星期日";
    case 1: return "星期一";
    case 2: return "星期二";
    case 3: return "星期三";
    case 4: return "星期四";
    case 5: return "星期五";
    case 6: return "星期六";

  }
}

function transMonth(month) {
  switch (month) {
    case 1: return "January";
    case 2: return "February";
    case 3: return "March";
    case 4: return "April";
    case 5: return "May";
    case 6: return "June";
    case 7: return "July";
    case 8: return "August";
    case 9: return "September";
    case 10: return "October";
    case 11: return "November";
    case 12: return "December";

  }
}