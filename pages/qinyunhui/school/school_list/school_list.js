// school_list.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    opacityflag: 0,
    animationData: {},
    param: {},
    search_name: '',
    search_xinankeji: '西南科技大学',
    provinceList: [],
    province: '全部',
    provinceId: 0,
    diyu: [],
    diyuIndex:0,
    yxzd: '全部',
    biaoqian: [{ id: 0, name: '全部' }, { id: 1, name: '985'}, {id: 2, name: '211'}, {id: 3, name: '示范高职'}, {id: 4, name:'骨干高职'}],
    biaoqianIndex:0,
    type:0,
    yxtype: '全部',
    leixing: ['全部', '政法', '综合', '理工', '师范', '医药', '财经', '语言', '艺术', '民族', '农林', '军事', '体育',],
    stype:'',
    lqcc: '全部',
    cengci: [{id:0,name:'全部'},  {id:1,name:'本科'}, {id:2,name:'专科'}],
    times:0,
    tag: -1,
    //下拉加载
    hasMore: true,
    pageOffset: 1,
    pageSize: 10
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "院校大全" })
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'linear',
    })
    this.animation = animation
    var that = this
    //获取oid---
    var value = wx.getStorageSync('oid')
    console.log(value)
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
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'qyh-appid': '07',
                'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
              },
              data: {
                code: res.code
              },
              success: function (res) {
                console.log(res.data);
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
    wx.request({

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
        if (res.data.status == 300) {
          //跳转到测录取页面
          wx.showModal({
            title: '验证手机号',
            //content: res.data.msg,
            content: '验证后查看院校信息',
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
          that.data.uid = res.data.list[0].id

        }
      }
    })
      wx.request({
        url: app.globalData.baseUrl + 'qinyun/school/list',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'qyh-appid': '07',
          'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
        },
        data: {
          uid: that.data.uid,
          secKey: that.data.secKey,
          keyword: '西南科技大学',
        },
        success: function (res) {
          //console.log('搜索结果======================')
          //console.log(res.data.list[0])
          that.setData({
            xinankejidaxue: res.data.list[0],
            pageOffset: 1
          })
          that.data.xinankejidaxue = res.data.list[0]

          wx.showLoading({
            mask: true,
            title: '加载中'
          })
          wx.request({
            url: app.globalData.baseUrl + 'qinyun/school/list',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'qyh-appid': '07',
              'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
            },
            data: {
              uid: that.data.uid,
              secKey: that.data.secKey,
            },
            success: function (res) {
              //console.log('列出院校------------------------------------------')
              console.log(res.data.list)
              var xxx = that.data.xinankejidaxue
              console.log(res.data.list.unshift(xxx))//添加西科大为第一位
              that.setData({
                param: res.data
              })
              wx.hideLoading()
            }
          })

        }
      })
    
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/v2/init',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: {
        uid: that.data.uid,
        secKey: that.data.secKey,
      },
      success: function (res) {
        //console.log(res.data)
        if (res.data.status==200){
          var diyu = new Array();

          diyu.push({id:0,name:'全部'})
          for (var i in res.data.data.provinces) {
            diyu.push({ id: res.data.data.provinces[i].id, name: res.data.data.provinces[i].name });
          }
          
          that.setData({
            diyu: diyu
          })

          //console.log(that.data.diyu)
        }
        wx.hideLoading()
      }
    })

  },// 上拉加载回调接口
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    var that = this
    that.setData({
      hasMore: true,
      opacityflag: 1
    })

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    var poff = parseInt(that.data.pageOffset) + 1;

    var datas = {}
    if (this.data.search_name != '') {
      datas.keyword = this.data.search_name;
    }
    if (this.data.stype != '') {
      datas.stype = this.data.stype;
    }
    if (this.data.provinceId != 0) {
      datas.province = this.data.provinceId;
    }
    if (this.data.type != 0) {
      datas.type = this.data.type;
    }
    if (this.data.times != 0) {
      datas.times = this.data.times;
    }
    datas.pageNo = poff

    wx.request({
      url: app.globalData.baseUrl + 'qinyun/school/list',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: datas,
      success: function (res) {
        //console.log(res.data.schools.length)
        if (res.data.list.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.data.param.list = that.data.param.list.concat(res.data.list)
          //console.log('-----------------666666666666666666666')
          console.log(that.data.param)
          that.setData({
            param: that.data.param,
            pageOffset: poff,
            opacityflag: 0
          })
        }
        wx.hideLoading()


      }
    })

  },
  personalIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../personal/personal'
    })
  },
  askIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../ask_index/ask_index'
    })
  },
  mainIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../index/index'
    })
  },
  slideDown: function (event) {
    if (this.data.slideflag == "none") {
      // 先旋转
      this.animation.rotate(180).step()
      this.setData({
        animationData: this.animation.export()
      })

      this.setData({
        slideflag: "block"
      });
    } else {
      this.animation.rotate(0).step()
      this.setData({
        animationData: this.animation.export()
      })
      this.setData({
        slideflag: "none"
      });
    }
  },
  schoolDetail: function (event) {
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '/pages/qinyunhui/school/school_detail/school_detail?id=' + event.currentTarget.dataset.id + '&secKey=' + that.data.secKey + '&uid=' + that.data.uid
    })
    wx.hideLoading()
  },
  setValue: function (event) {
    this.setData({
      search_name: event.detail.value
     
    });
  },
  search: function (event) {
    var that = this
    console.log('打印第一个数据-------------------')
    console.log(this.data.times)
    
    wx.showLoading({
      mask: true,
      title: '加载中'
    })

    var datas = {}
    if (this.data.search_name!=''){
      datas.keyword = this.data.search_name;
    }
    if (this.data.stype != '') {
      datas.stype = this.data.stype;
    }
    if (this.data.provinceId != 0) {
      datas.province = this.data.provinceId;
    }
    if (this.data.type != 0) {
      datas.type = this.data.type;
    }
    if (this.data.times != 0) {
      datas.times = this.data.times;
    }
    wx.request({
      url: app.globalData.baseUrl + 'qinyun/school/list',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'qyh-appid': '07',
        'qyh-appsecret': '11248CFCB0CBC5F96392AA96B3FE271A'
      },
      data: datas,
      success: function (res) {
        //console.log('search的结果---------------------')
        //console.log(res.data)
        that.setData({
          param: res.data,
          pageOffset: 1
        })
        wx.hideLoading()
      }
    })
  },/*
  setProvince:function(){
    this.setData({
      tag:1
    })
    //this.search();
  },*/
  bindDiYuChange: function (e) {
    this.setData({
      province: this.data.diyu[e.detail.value].name,
      provinceId: this.data.diyu[e.detail.value].id,
      tag: -1
    })
    this.search();
  }/*,
  setYxzd: function (e) {
    this.setData({
      tag: 2
    })
  }*/,
  bindBiaoQianChange: function (e) {
    this.setData({
      yxzd: this.data.biaoqian[e.detail.value].name,
      type: this.data.biaoqian[e.detail.value].id,
      tag: -1
    })
    this.search();
  },/*
  setYxtype: function (e) {
    this.setData({
      tag: 3
    })
  },*/
  bindLeiXingChange: function (e) {
    this.setData({
      yxtype: this.data.leixing[e.detail.value],
      stype: this.data.leixing[e.detail.value],
      tag: -1
    })
    this.search();
  },/*
  setLqcc: function (e) {
    this.setData({
      tag: 4
    })
  }, */
  bindCengCiChange: function (e) {
    this.setData({
      lqcc: this.data.cengci[e.detail.value].name,
      times: this.data.cengci[e.detail.value].id,
      tag: -1
    })
    this.search();
  },
  swichNav: function (event) {


    this.setData({
      tag: event.currentTarget.dataset.current
    })



  }
})