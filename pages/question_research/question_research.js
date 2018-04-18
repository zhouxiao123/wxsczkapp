// pages/question_research/question_research.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question1: [
      { name: 'A1', value: 'A、基本上一无所知，毫无头绪（）' },
      { name: 'B1', value: 'B、有所了解但并未完全知晓（）' },
      { name: 'C1', value: 'C、已经很了解且在不断学习提高（）' }
 
    ],
    question2: [
      { name: 'A2', value: ' A、考试发挥失常，考分远低于平时成绩（）' },
      { name: 'B2', value: ' B、高分低就，原本可以考一个好学校，好专业，但只被一般学校，一般专业录取（）' },
      { name: 'C2', value: ' C、高分滑档、退档，从一本滑到二本，二本滑到专科（）' },
      { name: 'D2', value: ' D、专业被调剂，被分配到不好的、考生不喜欢的专业（）' }
    ],
    question3: [
      { name: 'A3', value: ' A、志愿填报的基础知识（）' },
      { name: 'B3', value: ' B、院校选择的方法技巧（）' },
      { name: 'C3', value: ' C、专业选择的方法技巧（）' },
      { name: 'D3', value: ' D、特殊类招生的政策（）' },
      { name: 'E3', value: ' E、职业生涯规划（）' },
      { name: 'F3', value: ' F、志愿填报的案例分析（）' },
            
    ],
    wenti3input: {},
     question4: [
       { name: 'A4', value: ' A、可填写的院校和专业都填写完整（）' },
       { name: 'B4', value: ' B、填报院校的层次“冲、稳、保、垫”搭配合理（）' },
       { name: 'C4', value: ' C、每所院校的专业是否排列有序（）' },
       { name: 'D4', value: ' D、每所院校勾选专业调剂（）' },
     ],
     wenti5input:{},
     wenti1:0,
     wenti2: 0,
     wenti3: 0,
     wenti4: 0,
     oid: '',
     tag: 0,
     disflag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.tag != null) {
      that.setData({
        tag: options.tag
      })
    }

    /**
 * 加载的时候获取微信id
 */
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

    //that.data.oid
    /**
* 调用getUserDetail方法，通过oid查询对应的user集合
*/
    wx.request({
      url: app.globalData.baseUrl + 'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        console.log(res.data)

        that.setData({
          user: res.data
        })
        /**
     * 判断是否做过问卷调查
     */
        wx.request({
          url: app.globalData.baseUrl + 'wx/yesornoquestionresearch',
          data: {
            userid: that.data.user.id

          },
          success: function (res) {
            //console.log(res.data)
            wx.hideLoading()
            if (res.data.result == "fail") {
              wx.showModal({
                title: '提示',
                content: '您已做过问卷调查',
                showCancel: false,
                success: function (res) {
                      that.setData({
                        disflag:true
                      })
                }
              })
            }
          }
        })


      }
    })
  },
  /**
   * 问题1
   */
  radioChange: function (e) {
   // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.wenti1 = e.detail.value
    console.log('问题1，携带value值为：', this.data.wenti1)
  }, 
  /**
   * 问题2
   */
  checkboxChange2: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.wenti2 = e.detail.value
    console.log('问题2，携带value值为：', this.data.wenti2)
  },
  /**
   * 问题3
   */
  checkboxChange3: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.wenti3= e.detail.value
    console.log('问题3，携带value值为：', this.data.wenti3)
   
  },
  /**
   * 问题4
   */
  checkboxChange4: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.wenti4 = e.detail.value
    console.log('问题3，携带value值为：', this.data.wenti4)

  },
  /**
     * 表单输入
     */
  formSubmit: function (e) {
    var that = this
  
    var wenti1 = this.data.wenti1
    var wenti2 = this.data.wenti2
    var wenti3 = this.data.wenti3
    var wenti3input = e.detail.value.wenti3input
    var wenti4 = this.data.wenti4
    var wenti5input = e.detail.value.wenti5input
    var userid = e.detail.value.userid

    if (wenti1.length == 0 || wenti1==0) {
      wx.showModal({
        title: '提示',
        content: '请选择第一题',
        showCancel: false,
        success: function (res) {

        }
      })
    }
    else if (wenti2.length == 0 || wenti2 == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择第二题',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (wenti3.length == 0 || wenti3 == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择第三题',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (wenti4.length == 0 || wenti4 == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择第四题',
        showCancel: false,
        success: function (res) {
        }
      })
    } else {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })
  
      wx.request({
        url: app.globalData.baseUrl + 'wx/savequestionresearch',
        data: {
          wenti1 : this.data.wenti1,
          wenti2 : this.data.wenti2,
          wenti3 : this.data.wenti3,
          wenti3input : e.detail.value.wenti3input,
          wenti4 : this.data.wenti4,
          wenti5input : e.detail.value.wenti5input,
          userid : e.detail.value.userid

        },
        success: function (res) {
          //console.log(res.data)
          wx.hideLoading()
          if (res.data.result == "ok") {
            wx.showModal({
              title: '提示',
              content: '保存成功,奖励50积分，谢谢参与',
              showCancel: false,
              success: function (res) {

              }
            })
          }
        }
      })
    }
  },
  formReset: function () {
    this.setData({
      date: '',
      checked: true
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})