// pages/test_detail/test_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disflag:false,
    tag:0,
      id:0,
      title:'',
      desc:'',
      subject:'',
      oid:'',
      user:{},
      list1:[],
      list2: [],
      list3: [],
      list4: [],
      list5:[],
      answer1: {},
      answer2: {},
      answer3: {},
      answer4: {},
      answer5: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id:options.id
    })

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
      url: app.globalData.baseUrl+'wx/getUserDetail',
      data: {
        oid: that.data.oid
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.length == "0") {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '../personal_info/personal_info'
              })
            }
          })
        } else {
          that.setData({
            user: res.data
          })


        }
      }
    })


    if (options.id==1){
      that.setData({
        title: '职业兴趣测试',
        desc:'人的个性与职业有着密切的关系，不同职业对从业者的人格特征的要求是有差距的，如果通过科学的测试，可以预知自己的个性特征，这有助于选择适合于个人发展的职业。您将要阅读的这个《职业兴趣自测问卷》，可以帮助您作个性自评，从而获自己的个性特征更适合从事哪方面的工作。',
        subject:'请根据对每一题目的第一印象作答，不必仔细推敲，答案没有好坏、对错之分。具体填写方法是，根据自己的情况，选择“是”或“否”'
      })

      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/subject_list',
        data: {
          cishiid: that.data.id
        },
        success: function (res) {
          //console.log(res.data)
          

            that.setData({
              list1: res.data.subject
            })
          wx.hideLoading()
        }
      })

    } else if (options.id == 2) {
      that.setData({
        title: '抑郁自评',
        desc: '',
        subject: '请根据您一周来的实际感觉在每个项目后打分'
      })

      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/subject_list',
        data: {
          cishiid: that.data.id
        },
        success: function (res) {
          //console.log(res.data)
          

          that.setData({
            list2: res.data.subject
          })
          wx.hideLoading()
        }
      })

    }else if (options.id == 3) {
      that.setData({
        title: '气质测试',
        desc: '',
        subject: '请仔细阅读下列各题，对于每一题，请选择你认为符合自己情况的选项'
      })

      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/subject_list',
        data: {
          cishiid: that.data.id
        },
        success: function (res) {
          //console.log(res.data)
          

          that.setData({
            list3: res.data.subject
          })
          wx.hideLoading()
        }
      })

    }else if (options.id == 4) {
      that.setData({
        title: '抑郁自评',
        desc: '',
        subject: '请做下面20道题，选择符合自己的程度――偶尔、少有、常有和持续，测试你是否出现了抑郁征兆。'
      })

      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/subject_list',
        data: {
          cishiid: that.data.id
        },
        success: function (res) {
          //console.log(res.data)
          

          that.setData({
            list4: res.data.subject
          })
          wx.hideLoading()
        }
      })

    } else if (options.id == 5) {
      that.setData({
        title: 'MBTI职业测试',
        desc: '',
        subject: '请闭上眼睛，深呼吸三次，调适您的心态到没有任何干扰和压力的舒服状态，在每一行的两个选项中选出更符合你的情况的一项。'
      })

      wx.showLoading({
        mask: true,
        title: '加载中'
      })
      wx.request({
        url: app.globalData.baseUrl+'wx/subject_list',
        data: {
          cishiid: that.data.id
        },
        success: function (res) {
          //console.log(res.data)


          that.setData({
            list5: res.data.subject
          })
          wx.hideLoading()
        }
      })

    }

  }, formSubmit:function(e){
    var that = this
    if (that.data.id==1){
      for(var i in that.data.list1){
        if (e.detail.value['t' +that.data.list1[i].id]==''){
          wx.showModal({
            title: '提示',
            content: '第'+(parseInt(i)+1)+'题还未选择答案',
            showCancel: false,
            success: function (res) {
              
            }
          })
          return;
        }
      }

      
    } else if (that.data.id == 2){
      for (var i in that.data.list2) {
        if (e.detail.value['t' +that.data.list2[i].id] == '') {
          wx.showModal({
            title: '提示',
            content: '第' + (parseInt(i) + 1) + '题还未选择答案',
            showCancel: false,
            success: function (res) {

            }
          })
          return;
        }
      }
    } else if (that.data.id == 3) {
      for (var i in that.data.list3) {
        if (e.detail.value['t' +that.data.list3[i].id] == '') {
          wx.showModal({
            title: '提示',
            content: '第' + (parseInt(i) + 1) + '题还未选择答案',
            showCancel: false,
            success: function (res) {

            }
          })
          return;
        }
      }
    } else if (that.data.id == 4) {
      for (var i in that.data.list4) {
        if (e.detail.value['t'+that.data.list4[i].id] == '') {
          wx.showModal({
            title: '提示',
            content: '第' + (parseInt(i) + 1) + '题还未选择答案',
            showCancel: false,
            success: function (res) {

            }
          })
          return;
        }
      }
    } else if (that.data.id == 5) {
      for (var i in that.data.list5) {
        if (e.detail.value['t' + that.data.list5[i].id] == '') {
          wx.showModal({
            title: '提示',
            content: '第' + (parseInt(i) + 1) + '题还未选择答案',
            showCancel: false,
            success: function (res) {

            }
          })
          return;
        }
      }
    }
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl+'wx/save_subject_answer',
      data: e.detail.value,
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "fail") {
          wx.showModal({
            title: '提示',
            content: '请先填写资料',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '../personal_info/personal_info'
              })
            }
          })
        } else {
          that.setData({
            disflag: true
          })
          if (that.data.id == 1){
            that.setData({
              answer1: res.data,
              tag: that.data.id
            })
          } else if (that.data.id == 2){
            that.setData({
              answer2: res.data,
              tag: that.data.id
            })
          } else if (that.data.id == 3) {
            that.setData({
              answer3: res.data,
              tag: that.data.id
            })
          } else if (that.data.id == 4) {
            that.setData({
              answer4: res.data,
              tag: that.data.id
            })
          } else if (that.data.id == 5) {
            that.setData({
              answer5: res.data,
              tag: that.data.id
            })
          }
        }
        
      }
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

})