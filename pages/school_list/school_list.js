// school_list.js
var app = getApp()
Page({
  data: {
    disflag: 'none',
    opacityflag: 0,
    animationData: {},
    param:{},
    search_name:'',
    provinceList:[],
    province:'全部',
    diyu:[],
    yxzd:'全部',
    biaoqian: ['全部','985', '211', '示范高职', '骨干高职'],
    yxtype:'全部',
    leixing: ['全部', '政法', '综合', '理工', '师范', '医药', '财经', '语言', '艺术', '民族', '农林', '军事', '体育',],
    lqcc:'全部',
    cengci: ['全部', '一本', '二本', '高职',],
    tag:-1,
    //下拉加载
    hasMore:true,
    pageOffset:0,
    pageSize:20
  }, 
  onLoad: function () {
    wx.setNavigationBarTitle({title:"院校大全"})
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'linear',
    })
    this.animation = animation
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/school_list',
      success: function (res) {
        console.log(res.data)
        that.setData({
          param : res.data
        })
        wx.hideLoading()
      }
    })
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/getProvince',
      success: function (res) {
        //console.log(res.data)
        var diyu = new Array();
        diyu.push('全部')
        for (var i in res.data){
          diyu.push(res.data[i].provinceName)
        }
        that.setData({
          diyu: diyu
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
      url: app.globalData.baseUrl+'wx/school_list',
      data:{
        pageOffset:poff,
        pageSize:20,
        search_name: this.data.search_name,
        province: this.data.province == '全部' ? '' : this.data.province,
        yxzd: this.data.yxzd == '全部' ? '' : this.data.yxzd,
        yxtype: this.data.yxtype == '全部' ? '' : this.data.yxtype,
        lqcc: this.data.lqcc == '全部' ? '' : this.data.lqcc
      },
      success: function (res) {
        console.log(res.data.schools.length)
        if (res.data.schools.length==0){
            that.setData({
              hasMore:false,
            })
        }else{
          that.data.param.schools = that.data.param.schools.concat(res.data.schools)
          //console.log(poff)
          that.setData({
            param: that.data.param,
            pageOffset:poff,
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
  slideDown: function(event){
    if(this.data.slideflag=="none"){
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
  schoolDetail:function(event){
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.navigateTo({
      url: '../school_detail/school_detail?id=' + event.currentTarget.dataset.id
    })
    wx.hideLoading()
  },
  setValue:function(event){
    this.setData({
      search_name: event.detail.value
    });
  },
  search:function(event){
    //console.log(this.data.search_name)
    var that = this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/school_list',
      data:{
        search_name: this.data.search_name,
      province: this.data.province == '全部' ? '' : this.data.province,
      yxzd: this.data.yxzd == '全部' ? '' : this.data.yxzd,
      yxtype: this.data.yxtype == '全部' ? '' : this.data.yxtype,
      lqcc: this.data.lqcc == '全部' ? '' : this.data.lqcc
      },
      success: function (res) {
        //console.log(res.data)
        that.setData({
          param: res.data,
          pageOffset:0
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
  bindDiYuChange:function(e){
    this.setData({
      province: this.data.diyu[e.detail.value],
      tag:-1
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
      yxzd: this.data.biaoqian[e.detail.value],
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
      tag: -1
    })
    this.search();
  },/*
  setLqcc: function (e) {
    this.setData({
      tag: 4
    })
  }, */
  bindCengCiChange:function(e){
    this.setData({
      lqcc: this.data.cengci[e.detail.value],
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