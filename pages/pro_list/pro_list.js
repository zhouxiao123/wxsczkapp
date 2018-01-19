// pro_list.js
// school_list.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    opacityflag: 0,
    animationData: {},
    param: {},
    search_name: '',
    zycc:"全部",
    cengci:['全部','本科','专科'],
    zyml:"全部",
    menglei: [[{ id: 0, name: '全部' }], [{ id: 0, name: '全部' }]],
    multiIndex:[0,0],
    tag:-1,
    //下拉加载
    hasMore: true,
    pageOffset: 0,
    pageSize: 20,
    mlList:[],
    pmlList:[]
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: "专业大全" })
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    })
    this.animation = animation

    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/zy_list',
      success: function (res) {
        console.log(res.data)
        that.setData({
          param: res.data
        })
        wx.hideLoading()
      }
    })

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/zyml',
      data:{
        pid:0
      },
      success: function (res) {
        //console.log(res.data)
        for (var i in res.data) {
          that.data.menglei[0].push({ id: res.data[i].id, name: res.data[i].name})
        }
        //console.log(that.data.menglei)
        that.setData({
          menglei: that.data.menglei
        })
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
    wx.request({
      url: app.globalData.baseUrl+'wx/zy_list',
      data: {
        pageOffset: poff,
        pageSize: 20,
        search_name: this.data.search_name,
        zycc: this.data.zycc == '全部' ? '' : this.data.zycc,
        zyml: this.data.zyml == '全部' ? '' : this.data.zyml
      },
      success: function (res) {
        //console.log(res.data.schools.length)
        if (res.data.Zybgs.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.data.param.Zybgs = that.data.param.Zybgs.concat(res.data.Zybgs)
          //console.log(poff)
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
  zyDetail: function (event) {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../zy_detail/zy_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  setValue: function (event) {
    this.setData({
      search_name: event.detail.value
    });
  },
  search: function (event) {
    //console.log(this.data.search_name)
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/zy_list',
      data: {
        search_name: this.data.search_name,
        zycc: this.data.zycc == '全部' ? '' : this.data.zycc,
        zyml: this.data.zyml == '全部' ? '' : this.data.zyml
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          param: res.data,
          pageOffset: 0
        })
        wx.hideLoading()
      }
    })
  },/*
  setZycc: function () {
    this.setData({
      tag: 1
    })
    //this.search();
  },*/
  bindCengciChange: function (e) {
    this.setData({
      zycc: this.data.cengci[e.detail.value],
      tag:-1
    })
    var that = this
    if (that.data.cengci[e.detail.value]=="专科"){
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/zyml',
        data: {
          pid: 0,
          type:0
        },
        success: function (res) {
          //console.log(res.data)
          that.data.menglei[0].splice(0, that.data.menglei[0].length);
          that.data.menglei[0].push({ id: 0, name: '全部' })
          that.data.menglei[1].splice(0, that.data.menglei[1].length);
          that.data.menglei[1].push({ id: 0, name: '全部' })
          for (var i in res.data) {
            that.data.menglei[0].push({ id: res.data[i].id, name: res.data[i].name });
          }
          that.data.multiIndex[0] = 0
          that.data.multiIndex[1] = 0
          //console.log(that.data.menglei)
          that.setData({
            menglei: that.data.menglei,
            multiIndex: that.data.multiIndex
          })

          wx.hideLoading()
        }
      })
    } else if (that.data.cengci[e.detail.value] == "本科") {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/zyml',
        data: {
          pid: 0,
          type: 1
        },
        success: function (res) {
          that.data.menglei[0].splice(0, that.data.menglei[0].length);
          that.data.menglei[0].push({ id: 0, name: '全部' })
          that.data.menglei[1].splice(0, that.data.menglei[1].length);
          that.data.menglei[1].push({ id: 0, name: '全部' })
          for (var i in res.data) {
            that.data.menglei[0].push({ id: res.data[i].id, name: res.data[i].name });
          }
          that.data.multiIndex[0] = 0
          that.data.multiIndex[1] = 0
          //console.log(that.data.menglei)
          that.setData({
            menglei: that.data.menglei,
            multiIndex: that.data.multiIndex
          })
          wx.hideLoading()
        }
      })
    }else{
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/zyml',
        data: {
          pid: 0
        },
        success: function (res) {
          that.data.menglei[0].splice(0, that.data.menglei[0].length);
          that.data.menglei[0].push({ id: 0, name: '全部' })
          that.data.menglei[1].splice(0, that.data.menglei[1].length);
          that.data.menglei[1].push({ id: 0, name: '全部' })
          for (var i in res.data) {
            that.data.menglei[0].push({ id: res.data[i].id, name: res.data[i].name });
          }
          that.data.multiIndex[0] = 0
          that.data.multiIndex[1] = 0
          //console.log(that.data.menglei)
          that.setData({
            menglei: that.data.menglei,
            multiIndex: that.data.multiIndex
          })
          wx.hideLoading()
        }
      })
    }
    this.setData({
      zyml: "全部"
    })
    this.search();
  },/*
  setZyml: function (e) {
    this.setData({
      tag: 2
    })
  },
  selectZyml: function (e) {
    var that=this
    if (e.currentTarget.dataset.text == "全部") {
      this.setData({
        tag: 0,
        zyml: e.currentTarget.dataset.text
      })
      this.search();
    } else {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/zyml',
        data: {
          pid: e.currentTarget.dataset.id
        },
        success: function (res) {
          //console.log(res.data)
          that.setData({
            pmlList: res.data
          })
          wx.hideLoading()
        }
      })
      this.setData({
        tag: 3,
        zyml: e.currentTarget.dataset.text
      })
    }
  },*/
  bindZymlChange:function(e){
    var that = this
    if (e.detail.column==0){

      if (that.data.menglei[0][e.detail.value].name == "全部") {
        /*this.setData({
          tag: 0,
          zyml: e.currentTarget.dataset.text
        })*/
        //this.search();
      } else {
        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl+'wx/zyml',
          data: {
            pid: that.data.menglei[0][e.detail.value].id
          },
          success: function (res) {
            //console.log(res.data)
            that.data.menglei[1].splice(0, that.data.menglei[1].length);
            that.data.menglei[1].push({ id: 0, name: '全部' })
            for(var i in res.data){
              that.data.menglei[1].push({ id: res.data[i].id, name: res.data[i].name });
            }
            that.data.multiIndex[0] = e.detail.value
            that.data.multiIndex[1]=0
            that.setData({
              menglei: that.data.menglei,
              multiIndex: that.data.multiIndex
            })
            wx.hideLoading()
          }
        })
        /*this.setData({
          tag: 3,
          zyml: e.currentTarget.dataset.text
        })*/
      }
      //console.log(that.data.menglei[0][e.detail.value])
      
    }
      //this.data.menglei[1].
  },
  bindMultiZymlChange: function (e) {
    var that = this
    /*if (that.data.menglei[0][e.detail.value[0]].name == "全部"){      
      that.setData({
          zyml: '全部'
        })

  }else {*/
      if (that.data.menglei[1][e.detail.value[1]].name == "全部") {
        that.setData({
          zyml: that.data.menglei[0][e.detail.value[0]].name,
          tag: -1
        })
      } else {
        that.setData({
          zyml: that.data.menglei[1][e.detail.value[1]].name,
          tag: -1
        })
      }
  //}
    that.search();
  },
  swichNav: function (event) {


    this.setData({
      tag: event.currentTarget.dataset.current
    })



  }
})