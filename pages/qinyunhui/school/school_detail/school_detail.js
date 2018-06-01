var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    param: {},
    disflag: 'none',
    showLecturer: "none",
    slideflag: 'none',
    img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    def_img_url: [
      'yy@2x2.png',
      'yy@2x2.png'
    ],
    animationData: {},
    item: {},
    tag: 0,
    collect: 0,
    id: "0",
    oid: "",
    yxfs: {},
    yxxq: {},
    zyfs: {},
    zszc: [],
    jhgx: {},
    isAdmissions:0,
    scode:'',
    secKey: '',
    uid: 0,
    tag: 0,
    type: 0,
    tag1: -1,
    tag2:0,
    wenlikeid: 5,
    wenlike: [{ id: 5, name: '理科' }, { id: 1, name: '文科' }],
    wenlikeIndex: 0,
    quanbuwenlike: '理科',
    
    quanbuyear: '2017',
    yearlist: [{ id: 0, name: '2017' }, { id: 1, name: '2016' }, { id: 2, name: '2015' }, { id: 3, name: '2014' }, { id: 4, name: '2013' }, { id: 5, name: '2012' }],
    quanbuyear1: '2016',
    yearlist1: [{ id: 1, name: '2016' }, { id: 2, name: '2015' }, { id: 3, name: '2014' }, { id: 4, name: '2013' }, { id: 5, name: '2012' }],
    yearIndex: 0,
    yearid:0,

    quanbupici: '',
    pici: [],
    piciIndex: 0,
    piciid: 2,
    kl:0,
    pc:0,
    zsdm:0,
    tag3: -1,
    tag4:-1,
  },
  onLoad: function (options) {
    var WxParse = require('../../../../wxParse/wxParse.js');//引入WxParse模块
    wx.setNavigationBarTitle({ title: "院校详情" })
    var that = this
    var uid = options.uid
    that.data.uid = uid
    var secKey = options.secKey
    that.data.secKey = secKey

    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation
    console.log('院校id的值：')
    console.log(options.id)
    this.setData({
      id: options.id
    });

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

    //调用登录接口
   /*wx.request({

      url: app.globalData.baseUrl + 'qinyun/pub/auth',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        openId: that.data.oid,
        typeId: 73,
        unionid: that.data.oid
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading()
        //跳转到注册页面
        if (res.data.status == 300 || res.data.status == 403) {
          //跳转到测录取页面
          wx.showModal({
            title: '注册账号',
            //content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.redirectTo({
                  url: '/pages/qinyunhui/denglu/gaoxiao_denglu/gaoxiao_denglu'
                })
              } else if (res.cancel) {
                wx.navigateTo({
                  url: '/pages/index/index'
                })
                console.log('用户点击取消')
              }
            },
          })
        } else if (res.data.status == 200) {
          that.setData({
            secKey: res.data.list[0].secKey,
            uid: res.data.list[0].id
          })
          //取secKey和uid
          that.data.secKey = res.data.list[0].secKey
          that.data.uid = res.data.list[0].id*/
      
          //登录成功后 获取uid和secKey
          wx.showLoading({
            mask: true,
            title: '加载中'
          })
          wx.request({
            url: app.globalData.baseUrl + 'qinyun/school/info',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'qyh-appid': '07',
              'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
            },
            data: {
              id: options.id,
              uid: that.data.uid,
              secKey: that.data.secKey,
            },
            success: function (res) {
              console.log('院校基础信息')
              console.log(res.data)//加载院校详情的初始信息
          
              //console.log('第一个')
              //console.log(res.data.list[0].pics[0].pic)

              var str = res.data.list[0].pics[0].pic;

              if (res.data.list[0].pics.length==3){
                if (str.startsWith("https:")) {
                  var xuexiaotupian1 = res.data.list[0].pics[0].pic.replace('cdn.img.up678.com', 'wxsign.sczk.com.cn/tp')
                  var xuexiaotupian2 = res.data.list[0].pics[1].pic.replace('cdn.img.up678.com', 'wxsign.sczk.com.cn/tp')
                  var xuexiaotupian3 = res.data.list[0].pics[2].pic.replace('cdn.img.up678.com', 'wxsign.sczk.com.cn/tp')
                } else {

                  var xuexiaotupian1 = 'https://wxsign.sczk.com.cn/tp/icon/school/' + res.data.list[0].pics[0].pic
                  var xuexiaotupian2 = 'https://wxsign.sczk.com.cn/tp/icon/school/' + res.data.list[0].pics[1].pic
                  var xuexiaotupian3 = 'https://wxsign.sczk.com.cn/tp/icon/school/' + res.data.list[0].pics[2].pic
                }
                that.setData({
                  item: res.data.list[0],
                  xuexiaotupian1: xuexiaotupian1,
                  xuexiaotupian2: xuexiaotupian2,
                  xuexiaotupian3: xuexiaotupian3,
                })
              } else if (res.data.list[0].pics.length == 2){
                if (str.startsWith("https:")) {
                  var xuexiaotupian1 = res.data.list[0].pics[0].pic.replace('cdn.img.up678.com', 'wxsign.sczk.com.cn/tp')
                  var xuexiaotupian2 = res.data.list[0].pics[1].pic.replace('cdn.img.up678.com', 'wxsign.sczk.com.cn/tp')
                } else {
                  var xuexiaotupian1 = 'https://wxsign.sczk.com.cn/tp/icon/school/' + res.data.list[0].pics[0].pic
                  var xuexiaotupian2 = 'https://wxsign.sczk.com.cn/tp/icon/school/' + res.data.list[0].pics[1].pic
                }
                that.setData({
                  item: res.data.list[0],
                  xuexiaotupian1: xuexiaotupian1,
                  xuexiaotupian2: xuexiaotupian2,
                })
              } else if (res.data.list[0].pics.length == 1) {
                if (str.startsWith("https:")) {
                  var xuexiaotupian1 = res.data.list[0].pics[0].pic.replace('cdn.img.up678.com', 'wxsign.sczk.com.cn/tp')
                } else {
                  var xuexiaotupian1 = 'https://wxsign.sczk.com.cn/tp/icon/school/' + res.data.list[0].pics[0].pic
                }
                that.setData({
                  item: res.data.list[0],
                  xuexiaotupian1: xuexiaotupian1,
                })
              }
              that.data.scode = res.data.list[0].scode//学校id
              //that.data.pcdm = res.data.list[0].historyParams.pcdm//批次代码
              //that.data.year = res.data.list[0].historyParams.year//year
              that.data.yxdh = res.data.list[0].yxdh//yxdh
              that.data.school_id = res.data.list[0].school_id//school_id
              WxParse.wxParse('article', 'html', res.data.list[0].info, that, 5);       
           
              //加载初始化参数
              wx.request({
                url: app.globalData.baseUrl + 'qinyun/v2/school/init/plan',//招生计划
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'qyh-appid': '07',
                  'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
                },
                data: {
                  sid: that.data.school_id,//院校代码
                  uid: that.data.uid,
                  secKey: that.data.secKey,
                },
                success: function (res) {
                  console.log('批次初始参数====================')
                  //console.log(res.data)
                  that.setData({
                    pici: res.data.list
                  })
                  console.log(res.data.list)
                  if (res.data.list != null || res.data.list.length!=0){
                    that.setData({
                      quanbupici: res.data.list[0].name//设置批次的默认值
                    })
                  }
                  wx.hideLoading()
                }
              })

              wx.request({
                //判断是否已经收藏学校
                  url: app.globalData.baseUrl + 'qinyun/school/info',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'qyh-appid': '07',
                    'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
                  },
                  data: {
                    id: options.id,
                    uid: that.data.uid,
                    secKey: that.data.secKey,
                  },
                success: function (res) {
                  if (res.data.list[0].attention!=null) {
                    that.setData({
                      collect: 1
                    });
                  } else {
                    that.setData({
                      collect: 0
                    });
                  }
                  wx.hideLoading()
                }
              })
            }
          })
       // }
      //}
    //})
  },
  swichNav: function (event) {

    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {
      this.setData({
        tag: event.target.dataset.current
      })
      var that = this
      if (this.data.tag == 1) {//历年录取
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        //历年录取-录取分数走势图
          wx.request({
            url: app.globalData.baseUrl + 'qinyun/school/histroyYears',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'qyh-appid': '07',
              'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
            },
            data: {
              kl: that.data.wenlikeid,
              pc: that.data.piciid,
              zsdm: that.data.yxdh,
              uid: that.data.uid,
              secKey: that.data.secKey,
            },
            success: function (res) {
              //console.log(res.data)
              that.setData({
                lnlq: res.data.list
              })
              wx.hideLoading()
            }
          })
      } else if (this.data.tag == 2) {
        //招生章程
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'qinyun/news/list',//章程
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            schoolId: that.data.scode,
            isAdmissions:1,
            uid: that.data.uid,
            secKey: that.data.secKey,
          },
          success: function (res) {
            //将时间戳转换
            var i=0;
            var ZCdata=[];
            for (var i in res.data.list) {
              var n = res.data.list[i].createTime;
              var date = new Date(n);
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
              var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
              ZCdata.push(M + D) ;
              res.data.list[i].time = M + D;//获取到的集合list基础上，增加一个字段
            }
              that.setData({
                zszc: res.data.list
              })
            //var WxParse = require('../../../../wxParse/wxParse.js');
            //WxParse.wxParse('zszc', 'html', res.data.content1 + (res.data.content2 == null ? '' : res.data.content2), that, 5);
            wx.hideLoading()
          }
        })

      } else if (this.data.tag == 3) {
        //招生计划
        //console.log(that.data.wenlikeid)
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'qinyun/plan/professes',//招生计划
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'qyh-appid': '07',
            'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
          },
          data: {
            ptid: that.data.piciid,//批次代码
             year: that.data.quanbuyear,
             kldm: that.data.wenlikeid,
             yxdh: that.data.yxdh,//院校代码
             uid: that.data.uid,
             secKey: that.data.secKey,
          },
          success: function (res) {
            //console.log("招生计划目录--------------------------")
            //console.log(res.data)
            that.setData({
              zsjh: res.data.list
            })
            wx.hideLoading()
          }
        })

      }
    }
  },
  /**
   * 点击招生简章标题，跳转到招生简章页面
   */
  zsjzdetail: function (e) {
    var that = this
        //跳转到
        wx.navigateTo({
          url: '../zsjz_detail/zsjz_detail?schoolId=' + that.data.scode + '&newsId=' + e.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
        })
  },
  /**
   * 点击招生计划标题，跳转到招生计划详细页面
   */
  zsjh_Detail: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../zsjh_detail/zsjh_detail?id=' + event.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
    })
    wx.hideLoading()
  },
  //定义招生计划-搜索方法
  search: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/plan/professes',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        ptid: that.data.piciid,//批次代码
        year: that.data.quanbuyear,
        kldm: that.data.wenlikeid,
        yxdh: that.data.yxdh,//院校代码
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        that.setData({
          zsjh: res.data.list
        })
        wx.hideLoading()
      }
    })
  },
  //定义招生录取-录取分数走势图-搜索方法
  search1: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/school/histroyYears',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        kl: that.data.wenlikeid,
        pc: that.data.piciid,
        zsdm: that.data.yxdh,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        that.setData({
          lnlq: res.data.list
        })
        wx.hideLoading()
      }
    })
  },

  //定义招生录取-录取分数走势图-搜索方法
  search2: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/histories/list',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        yxdh: that.data.yxdh,
        year: that.data.quanbuyear1,
        pcdm: that.data.piciid,
        kldm: that.data.wenlikeid,
        numType: 3,
        isProfessional: 1,
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        that.setData({
          lnlqfenshuxian: res.data.list
        })
        wx.hideLoading()
      }
    })
  },

  //在招生计划中，选择文理科
  bindWenLiKeChange: function (e) {
    this.setData({
      quanbuwenlike: this.data.wenlike[e.detail.value].name,
      wenlikeid: this.data.wenlike[e.detail.value].id,
      tag1: -1
    })
    this.search();
  },
  //在招生计划中，选择年份
  bindYearChange: function (e) {
    console.log(this.data.yearlist)
    this.setData({
      quanbuyear: this.data.yearlist[e.detail.value].name,
      yearid: this.data.yearlist[e.detail.value].id,
      tag1: -1
    })
    this.search();
  },
  //在招生计划中，选择批次
  bindPiCiChange: function (e) {
    this.setData({
      quanbupici: this.data.pici[e.detail.value].name,
      piciid: this.data.pici[e.detail.value].id,
      tag1: -1
    })
    this.search();
  },

  //在历年录取中，选择文理科
  bindWenLiKeChange1: function (e) {
    this.setData({
      quanbuwenlike: this.data.wenlike[e.detail.value].name,
      wenlikeid: this.data.wenlike[e.detail.value].id,
      tag3: -1
    })
    this.search1();
  },
  //在历年录取中，选择批次
  bindPiCiChange1: function (e) {
    this.setData({
      quanbupici: this.data.pici[e.detail.value].name,
      piciid: this.data.pici[e.detail.value].id,
      tag3: -1
    })
    this.search1();
  },

  //在历年录取中，选择文理科
  bindWenLiKeChange2: function (e) {
    this.setData({
      quanbuwenlike: this.data.wenlike[e.detail.value].name,
      wenlikeid: this.data.wenlike[e.detail.value].id,
      tag1: -1
    })
    this.search2();
  },
  //在历年录取中，选择年份
  bindYearChange2: function (e) {
    this.setData({
      quanbuyear1: this.data.yearlist1[e.detail.value].name,
      yearid: this.data.yearlist1[e.detail.value].id,
      tag1: -1
    })
    this.search2();
  },
  //在历年录取中，选择批次
  bindPiCiChange2: function (e) {
    this.setData({
      quanbupici: this.data.pici[e.detail.value].name,
      piciid: this.data.pici[e.detail.value].id,
      tag1: -1
    })
    this.search2();
  },

  //收藏学校
  collect: function (event) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/u/support/attentionSchool',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        tid: that.data.school_id,//学校id
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        //console.log('高校中的收藏=================')
        //console.log(res.data)
        if (res.data.status == 200) {
          that.setData({
            collect: 1
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '收藏失败',
            showCancel: false,
            success: function (res) {
            }
          })
        }
      }
    })
  },

  //取消收藏学校
  cansleCollect: function (event) {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/u/support/attentionSchool',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        tid: that.data.school_id,//学校id
        uid: that.data.uid,
        secKey: that.data.secKey,
        cancel:0
      },
      success: function (res) {
        console.log('取消收藏=================')
        console.log(res.data)
        if (res.data.status == 200) {
          that.setData({
            collect: 0
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '取消收藏失败',
            showCancel: false,
            success: function (res) {
            }
          })
        }
      }
    })
  },
  /*cansleCollect: function () {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + 'wx/cancel_collect_school',//取消收藏学校
      data: {
        oid: that.data.oid,
        yxId: that.data.item.yxid
      },
      success: function (res) {
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '取消收藏失败',
            showCancel: false,
            success: function (res) {

            }
          })
        } else {
          that.setData({
            collect: 0
          });
        }

      }
    })
  },*/














  toFsDetail: function (e) {
    //console.log(e.target.dataset.id + "----" + e.target.dataset.tag)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_fs_detail/school_fs_detail?id=' + e.currentTarget.dataset.id + '&tag=' + e.target.dataset.tag + '&name=' + this.data.item.yxname
    })
    wx.hideLoading()
  },
  toJhDetail: function (e) {
    //console.log(e.target.dataset.id + "----" + e.target.dataset.tag)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_jh_detail/school_jh_detail?jhid=' + e.currentTarget.dataset.id + '&name=' + this.data.item.yxname
    })
    wx.hideLoading()
  },
//跳转找专家
  tiaozhuanwenzhuanjia: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../../../ask_index/ask_index',
    })
    wx.hideLoading()
  },
  
  //跳转测录取
  tiaozhuanceluqu: function (e) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../../celuqu/celuqu',
    })
    wx.hideLoading()
  },
    swichNav1: function (event) {
    this.setData({
      tag1: event.currentTarget.dataset.current
    })
  },
    swichNav2: function (event) {
      if (this.data.tag2 == event.target.dataset.current) {
        return false;
      } else {
        this.setData({
          tag2: event.target.dataset.current
        })
        var that = this
        if (that.data.tag2 == 1) {
          //历年录取-专业分数线
          wx.request({
            url: app.globalData.baseUrl + 'qinyun/histories/list',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'qyh-appid': '07',
              'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
            },
            data: {
              yxdh: that.data.yxdh,
              year: that.data.quanbuyear1,
              pcdm: that.data.piciid,
              kldm: that.data.wenlikeid,
              numType: 3,
              isProfessional: 1,
              uid: that.data.uid,
              secKey: that.data.secKey,
            },
            success: function (res) {

              console.log('历年录取-专业分数线------------------------------------------')
              console.log(res.data)
              that.setData({
                lnlqfenshuxian: res.data.list
              })
              wx.hideLoading()
            }
          })
        }
      }
    },

    swichNav3: function (event) {
      
      if (this.data.tag3 == event.target.dataset.current) {
        return false;
      } else {
        this.setData({
          tag3: event.target.dataset.current
        })
        var that = this
      }
    },
    swichNav4: function (event) {

      if (this.data.tag4 == event.target.dataset.current) {
        return false;
      } else {
        this.setData({
          tag4: event.target.dataset.current
        })
        var that = this
      }
    },

})