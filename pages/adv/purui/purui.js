// pages/adv/purui/purui.js
// pages/paper/paper.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diqu: '',
    fenlei: '',
    plei: '',
    plei2: '',
    list1: [],
    list2: [],
    array: [],
    date:'',
    checked:true,
    start:'',
showModalStatus: false,
tag:1,
dataCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var myDate = new Date();
    myDate.toLocaleDateString();
    that.setData({start:myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate()})
    that.data.array.push("https://wxsign.sczk.com.cn/wxsczkappback/img/adv/普瑞1-1.png")
            for (var i=1;i < 9;i++ ) {

              that.data.array.push("https://wxsign.sczk.com.cn/wxsczkappback/img/adv/"+i+".png")
            }
            //console.log(that.data.array)
            that.setData({
              array: that.data.array
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
  call : function(){
    wx.makePhoneCall({
      phoneNumber: '028-83319875',
    })
  },
  timeChange:function(e){
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    var name = e.detail.value.username
    var age = e.detail.value.age
    var sex = e.detail.value.sex
    var phone = e.detail.value.phone
    var appointtime = e.detail.value.date

    if(name.length == 0){
      wx.showModal({
        title: '提示',
        content: '请输入姓名',
        showCancel: false,
        success: function (res) {
          
        }
      })
    } else if(age.length==0){
      wx.showModal({
        title: '提示',
        content: '请输入年龄',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (sex.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择性别',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的联系电话',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (appointtime.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入预约时间',
        showCancel: false,
        success: function (res) {

        }
      })
    } else{
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      //console.log(e.detail.value)
      //http://web.prykweb.com/index.php?m=purui&amp;c=datadeal&amp;a=add_book&amp;host=2
        //< input hidden name= "fasongurl" id= "fasongurl" value= "http://mob.p028.com" />
      //e.detail.value.fasongurl = encodeURIComponent("http://mob.p028.com")
      var data = {m:'purui',
      c: 'datadeal',
      a: 'Getajax_phone_time',
      phone: phone,
      host: 2,
      callback: 't',
      name: 'getitems',
      _: 1525831176743}

      wx.request({
        url: app.globalData.baseUrl + 'purui',
        data: data,
        success: function (res) {
          //console.log(res.data)
          var result = res.data.replace('t(', '').replace(')', '').replace(/"/g, '')
          //console.log(result)
          if(result=="2"){
wx.request({
        url: app.globalData.baseUrl + 'purui?m=purui&c=datadeal&a=add_book&host=2',
        method: 'POST',
        header: {
          //设置参数内容类型为json
          "content-type": "application/x-www-form-urlencoded"
        },
        data: e.detail.value,
        success: function (res) {
          //console.log(res.data)
          var result = res.data.replace('<script type="text/javascript">window.top.postcallback(', '').replace(');</script>', '').replace(/"/g, '')
          console.log(result)
          wx.hideLoading()
          if (result == "1") {
            wx.showModal({
              title: '提示',
              content: '提交失败',
              showCancel: false,
              success: function (res) {

              }
            })
          } else if (result == "5"){
            wx.showModal({
              title: '提示',
              content: '24小时内只可预约一次',
              showCancel: false,
              success: function (res) {

              }
            })
          } else {
            that.setData({
              dataCode: result,
              tag:2
            })
            that.util('open')
          }
        }
      })
          } else {
            wx.hideLoading()
            that.setData({
              dataCode: result,
              tag:1
            })
            that.util('open')
          }
        }
      })


      
    }
  }, powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } ,
  formReset: function () {
    this.setData({
      date:'',
      checked:true
    })
  },
  puruiAsk:function(){
    wx.navigateTo({
      url: 'ask/ask'
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