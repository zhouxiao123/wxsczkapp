// pages/chatroom_teacher/adduser/adduser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yxid:'0',
  userList:[],
  showModal: true,
  name:'',
  phone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this
    that.setData({
      yxid:options.yxid
    })

    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/userList',
      data: {
        yxid: that.data.yxid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()

        that.setData({
          userList:res.data.aus
        })


      }
    })
  },
  delRecord:function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      showCancel: true,
      success: function (res) {
        if(res.confirm){
          wx.showLoading({
            mask: true,
            title: '加载中'
          })
          wx.request({
            url: 'https://wxsign.sczk.com.cn/chatroom/service/delUser',
            data: {
              yxid: that.data.yxid,
              id: e.currentTarget.dataset.id
            },
            success: function (res) {
              //console.log(res.data)
              wx.hideLoading()
              var aus = res.data.aus
              if (res.data.result == "false") {
                wx.showModal({
                  title: '提示',
                  content: '不可删除所有账号',
                  showCancel: false,
                  success: function (res) {

                  }
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '删除成功',
                  showCancel: false,
                  success: function (res) {
                    that.setData({
                      userList: aus
                    })
                  }
                })

              }


            }
          })
        }
      }
    })

    
  },
  /**
   * 弹窗
   */
  addUser: function () {
    var that = this

        that.setData({
          showModal: true
        })


  }, backUrl:function(){
      wx.redirectTo({
        url: '/pages/chatroom_teacher/list/list?yxid='+this.data.yxid,
      })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.setData({
      phone: '',
      name:''
    });
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that=this
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: 'https://wxsign.sczk.com.cn/chatroom/service/addUser',
      data: {
        yxid: that.data.yxid,
        phone: that.data.phone,
        name:that.data.name
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "false") {
          var aus = res.data.aus
          wx.showModal({
            title: '提示',
            content: '该账号已存在',
            showCancel: false,
            success: function (res) {
              that.setData({
                userList: aus,

              })
            }
          })
        } else {
          that.setData({
            userList: res.data.aus,

          })

          that.hideModal();

        }


      }
    })
    
  },

  setPhone: function (event) {
    this.setData({
      phone: event.detail.value
    });
  },
  setName: function (event) {
    this.setData({
      name: event.detail.value
    });
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})