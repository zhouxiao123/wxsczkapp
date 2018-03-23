// pages/gaokaozhiyuan/gaokaozhiyuan.js
var app = getApp()
var image = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tag: 0,
    tag2: 0,
    diqu:"",
    fenlei:"",
    animationData: {},
    animationData2: {},
    animationData3: {},
    top1:0,
    imageHeight:0,
    touchDot:0,
    touchEnd:0,
    scroll:0,
    height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.tag != null){
      that.setData({
        tag:options.tag
      })
    }
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }

  ,
  swichNav: function (event) {
    //console.log(event.target.dataset.current)
    if (this.data.tag == event.target.dataset.current) {
      return false;
    } else {

      this.setData({
        tag: event.target.dataset.current
      })
      var that = this


    }

  },
  typeList1:function(e){
    this.setData({
      tag2: 1,
      diqu: e.currentTarget.dataset.id
    })
  },
  typeList2: function (e) {
    if (e.currentTarget.dataset.id == "重置") {
      this.setData({
        tag2: 0
      })
    } else {
    /*this.setData({
      tag2: 2,
      fenlei: e.currentTarget.dataset.id
    })*/
      wx.showLoading({
        mask: true,
        title: '加载中'
      })

      wx.navigateTo({
        url: '../paper/paper?diqu=' + this.data.diqu + '&fenlei=' + e.currentTarget.dataset.id
      })

      wx.hideLoading()
    }
    
  },
  typeList3: function (e) {
    if (e.currentTarget.dataset.id=="重置"){
      this.setData({
        tag2: 0
      })
    } else {
    wx.showLoading({
      mask: true,
      title: '加载中'
    })

    wx.navigateTo({
      url: '../paper/paper?diqu=' + this.data.diqu + '&fenlei=' + this.data.fenlei + '&plei=' + e.currentTarget.dataset.id
    })

    wx.hideLoading()
    }
  }
  ,
  toask:function(){
    wx.redirectTo({
      url: '../ask_index/ask_index?tag=1'
    })
    
  }
  ,
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
  
  }, onPageScroll: function (e) { // 获取滚动条当前位置
    this.setData({
      scroll:e.scrollTop
    })
  },
  touchStart: function (e) {
    
    this.data.touchDot = e.touches[0].pageY; // 获取触摸时的原点 
    // 使用js计时器记录时间  
    //interval = setInterval(function () {
      //time++;
    //}, 100);
  },
  // 触摸移动事件 
  touchMove: function (e) {
    this.data.touchEnd = e.touches[0].pageY
  },
  touchEnd: function (e) {
    if(this.data.touchDot - this.data.touchEnd > 40){
      if (this.data.scroll == this.data.height){

      }
    }
    //this.data.touchDot=0
    //this.data.touchEnd=0
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    image--
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translateY(-this.data.imageHeight * image).step()

    this.setData({
      //top1: -(this.data.imageHeight * image),
      animationData: animation.export()
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translateY(-this.data.imageHeight * image).step()

    this.setData({
      //top1: -(this.data.imageHeight * image),
      animationData: animation.export()
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
    image++
  }, imageLoad:function(e){
    var res = wx.getSystemInfoSync()

    

    this.setData({
      imageHeight: e.detail.height * res.windowWidth / e.detail.width,
      height:res.windowHeight
    })
    
  }
})