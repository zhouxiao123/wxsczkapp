//personal.js
//获取应用实例
var app = getApp()
Page({
  data: {
    disflag: "none",
    singleArray: ['大学', '高一', '高二', '高三', '初中'],
    userInfo: {},
    region: ['', '', ''],
    level: '大学',
    id: 0,
    userid: 0,
    name: '',
    phone: '',
    school: '',
    lcheck: true,
    wcheck: false,
    username: '',
    disabledflag: true

  },

  onLoad: function (options) {
    //console.log(getCurrentPages().length)
    wx.setNavigationBarTitle({ title: "个人主页" })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    if (options.userid) {
      that.setData({
        userid: options.userid
      })
      /*wx.request({
        url: app.globalData.baseUrl + 'wx/getUserDetailById',
        data: {
          id: options.userid
        },
        success: function (res) {

          
          that.setData({
            username:res.data.l.lecturername
          })
        }
      })*/

    } else {
      that.setData({
        userid: '-' + wx.getStorageSync('scene')
      })
    }
    //console.log(that.data.userid)
    //console.log(that.data.userid)

    //函数
    function setPersonalInfo(oid) {
      wx.request({
        url: app.globalData.baseUrl + 'wx/getUserDetail',
        data: {
          oid: oid
        },
        success: function (res) {
          console.log(res.data)
          var province = ['四川省', '成都市', '锦江区'];
          var uType = "";
          var l = true;
          var w = false;
          if (res.data.province != null) {
            province[0] = res.data.province.split(" ")[0];
            province[1] = res.data.province.split(" ")[1];
            province[2] = res.data.province.split(" ")[2];
          } else {
            wx.getLocation({
              type: 'wgs84',
              success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                //console.log(latitude + "--" + longitude)
                wx.request({
                  url: app.globalData.baseUrl + 'wx/getLocation',
                  data: {
                    latitude: latitude,
                    longitude: longitude
                  },
                  success: function (res) {
                    if (res.data.result == "ok") {
                      province[0] = res.data.province;
                      province[1] = res.data.city;
                      province[2] = res.data.district;
                      that.setData({
                        region: province
                      })
                    }
                  }
                })
                //wx.hideLoading()
              }
            })
          }
          if (res.data.type != null) {
            if (res.data.type == 0) {
              l = false;
              w = true;
            }
          } else {
            that.setData({
              disabledflag: false
            })
          }

          if (res.data.isLecturer == 1) {
            that.setData({
              disabledflag: false
            })
          }
          that.setData({
            id: res.data.id,
            name: res.data.name,
            phone: res.data.phone,
            school: res.data.school,
            region: province,
            level: res.data.level,
            lcheck: l,
            wcheck: w,
            openId: oid
          })

        }
      })
    }



    var value = wx.getStorageSync('oid')
    if (value) {
      setPersonalInfo(value);
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
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
                setPersonalInfo(res.data);
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




  },
  mainIndex: function (event) {
    this.setData({
      disflag: "block"
    });
    wx.redirectTo({
      url: '../index/index'
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
  bindLevelChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      level: this.data.singleArray[e.detail.value]
    })
  }, bindRegionChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      disflag: "block"
    });
    var that = this;
    //console.log(e.detail.value.phone.length)
    if (!validatePhone(e.detail.value.phone)) {
      wx.showModal({
        title: '提示',
        content: '请填写正确的手机号',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              disflag: "none"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      //console.log(e.detail.value.userid)
      wx.request({
        url: app.globalData.baseUrl + 'wx/saveUserDetail',
        data: e.detail.value,
        success: function (res) {
          //console.log(res.data)
          if (res.data.result == "fail") {
            wx.showModal({
              title: '提示',
              content: '请开启用户授权',
              showCancel: false,
              success: function (res) {

              }
            })
          } else {


            var province = ['四川省', '成都市', '锦江区'];
            var uType = "";
            var l = true;
            var w = false;
            if (res.data.province != null) {
              province[0] = res.data.province.split(" ")[0];
              province[1] = res.data.province.split(" ")[1];
              province[2] = res.data.province.split(" ")[2];
            }
            if (res.data.type != null) {
              if (res.data.type == 0) {
                l = false;
                w = true;
              }
            }

            that.setData({
              id: res.data.user.id,
              name: res.data.user.name,
              phone: res.data.user.phone,
              school: res.data.user.school,
              region: province,
              lcheck: l,
              wcheck: w,
              openId: res.data.user.openId,
              disflag: "none"
            })

            if (res.data.result == "new") {
              wx.showModal({
                title: '提示',
                content: '注册成功,获得' + res.data.point + '积分',
                showCancel: false,
                success: function (res) {
                  if (getCurrentPages().length == 1) {
                    wx.redirectTo({
                      url: '../index/index',
                    })
                  } else {
                    wx.navigateBack()
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '保存成功',
                showCancel: false,
                success: function (res) {
                  if (getCurrentPages().length == 1) {
                    wx.redirectTo({
                      url: '../index/index',
                    })
                  } else {
                    wx.navigateBack()
                  }

                  /*if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }*/
                }
              })
            }
          }
        }
      })
    }
  },


  
  /*getPhoneNumber: function (e) {
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
    }
  }*/


  getPhoneNumber: function (e) {
    console.log(e.detail.iv);
    console.log(e.detail.encryptedData);
    wx.login({
      success: res => {
        console.log(res.code);
        wx.request({
          url: 'https://你的解密地址',
          data: {
            'encryptedData': encodeURIComponent(e.detail.encryptedData),
            'iv': e.detail.iv,
            'code': res.code
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          }, // 设置请求的 header
          success: function (res) {
            console.log()
            console.log(res.data)
            if (res.status == 1) {//我后台设置的返回值为1是正确
              //存入缓存即可
              wx.setStorageSync('phone', res.phone);
            }
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  }






})

function validatePhone(phone) {

  var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

  var flag = reg.test(phone); //true
  /*if(phone.length == "0" || phone.length != "11"){
    return false;
  }*/
  return flag
}