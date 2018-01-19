// pages/paper/paper.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diqu:'',
    fenlei:'',
    plei:'',
    plei2: '',
    list1:[],
    list2:[],
    array:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      diqu: options.diqu,
      fenlei: options.fenlei,
      plei: '试卷',//options.plei
      plei2:'答案'
    })

    console.log(that.data.diqu + that.data.fenlei + that.data.plei)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/yizhentupian',
      data: {
        diqu: that.data.diqu,
        fenlei: that.data.fenlei,
        plei: that.data.plei
      },
      success: function (res) {
        //console.log(res.data)
          var array = new Array
          for(var i in res.data){
            
            array.push("https://wxsign.sczk.com.cn/wxsczkappback/img/testpaper/" + res.data[i].diqu + "/" + res.data[i].fenlei + "/" + res.data[i].plei + "/" + res.data[i].path)
          }
          that.setData({
            list1: res.data,
            array:array
          })
        

          wx.request({
            url: app.globalData.baseUrl + 'wx/yizhentupian',
            data: {
              diqu: that.data.diqu,
              fenlei: that.data.fenlei,
              plei: that.data.plei2
            },
            success: function (res) {
              //console.log(res.data)
              //var array = new Array
              for (var i in res.data) {

                that.data.array.push("https://wxsign.sczk.com.cn/wxsczkappback/img/testpaper/" + res.data[i].diqu + "/" + res.data[i].fenlei + "/" + res.data[i].plei + "/" + res.data[i].path)
              }
              //console.log(that.data.array)
              that.setData({
                list2: res.data,
                array: that.data.array
              })



              wx.hideLoading()
            }
          })
        //wx.hideLoading()
      }
    })
  
  },
  bigPic: function (e) {
    //console.log('e.currentTarget.dataset.src')
    var that = this
    /*var array = new Array
    array.push(e.currentTarget.dataset.src)*/
    wx.previewImage({
      urls: that.data.array,
      current: e.currentTarget.dataset.src,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})