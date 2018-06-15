var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: '',
    disflag: true,
    disflag1: true,
    xingbie:0,
    wenlike:0,
    yuzhong:0,
    gaokaojiafen:0,
    tijianshouxian:0,
    shouxiandaimaI:0,
    shouxiandaimaII:0,
    shouxiandaimaIII:0,
    beizhu_content:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: "考生基本信息" })
    /**
    * 加载的时候获取微信id
    */
    var that = this
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
        //console.log(res.data.id)
        that.data.userid = res.data.id

        //显示之前填写
        wx.request({
          url: app.globalData.baseUrl + 'wx/get_kaoshenjibenxinxi',
          data: {
            userid: that.data.userid
          },
          success: function (res) {
            console.log(res.data)
            //首先代码I
            var diyige = {};
            diyige.type1 = 0;
            diyige.type2 = 0;
            diyige.type3 = 0;
            diyige.type4 = 0;
            diyige.type5 = 0;
            diyige.type6 = 0;
            if (res.data.shouxiandaimaI.indexOf("1")!=-1){
              diyige.type1 =1
            }  if (res.data.shouxiandaimaI.indexOf("2") != -1){
              diyige.type2 = 1
            }  if (res.data.shouxiandaimaI.indexOf("3") != -1) {
              diyige.type3 = 1
            }  if (res.data.shouxiandaimaI.indexOf("4") != -1) {
              diyige.type4 = 1
            }  if (res.data.shouxiandaimaI.indexOf("5") != -1) {
              diyige.type5 = 1
            }  if (res.data.shouxiandaimaI.indexOf("6") != -1) {
              diyige.type6 = 1
            }
            //console.log(diyige)
            //首先代码II
            var dierge = {};
            dierge.type1 = 0;
            dierge.type2 = 0;
            dierge.type3 = 0;
            dierge.type4 = 0;
            dierge.type5 = 0;
            dierge.type6 = 0;
            if (res.data.shouxiandaimaII.indexOf("1") != -1) {
              dierge.type1 = 1
            } if (res.data.shouxiandaimaII.indexOf("2") != -1) {
              dierge.type2 = 1
            } if (res.data.shouxiandaimaII.indexOf("3") != -1) {
              dierge.type3 = 1
            } if (res.data.shouxiandaimaII.indexOf("4") != -1) {
              dierge.type4 = 1
            } if (res.data.shouxiandaimaII.indexOf("5") != -1) {
              dierge.type5 = 1
            }
            //console.log(dierge)
            //首先代码III
            var disange = {};
            disange.type1 = 0;
            disange.type2 = 0;
            disange.type3 = 0;
            disange.type4 = 0;
            disange.type5 = 0;
            disange.type6 = 0;
            if (res.data.shouxiandaimaIII.indexOf("1") != -1) {
              disange.type1 = 1
            } if (res.data.shouxiandaimaIII.indexOf("2") != -1) {
              disange.type2 = 1
            } if (res.data.shouxiandaimaIII.indexOf("3") != -1) {
              disange.type3 = 1
            } if (res.data.shouxiandaimaIII.indexOf("4") != -1) {
              disange.type4 = 1
            } if (res.data.shouxiandaimaIII.indexOf("5") != -1) {
              disange.type5 = 1
            }

            //专业调配和定向调配6
            var yuzhong1 = 0;
            if (res.data.yuzhong.indexOf("1") != -1) {
              yuzhong1 = 1
            }
            //是否显示受限列表
            if (res.data.tijianshouxian == 2) {
              that.setData({
                disflag1: false
              })
            } else {
              that.setData({
                disflag1: true
              })
            }
            //console.log(disange)
            that.setData({
              xingbie: res.data.xingbie,
              wenlike: res.data.wenlike,
              yuzhong: yuzhong1,
              gaokaojiafen: res.data.gaokaojiafen,
              userid: res.data.userid,
              lianxidianhua: res.data.lianxidianhua,
              kaoshengxingming: res.data.kaoshengxingming,
              zhengzhimianmao: res.data.zhengzhimianmao,
              minzu: res.data.minzu,
              jiudugaozhong: res.data.jiudugaozhong,
              jiudubanji: res.data.jiudubanji,
              shenfenzhenghao: res.data.shenfenzhenghao,
              zhunkaozhenghao: res.data.zhunkaozhenghao,
              kaoshenghao: res.data.kaoshenghao,
              yuzhongqita: res.data.yuzhongqita,
              gaokaojiafen_fenshu: res.data.gaokaojiafen_fenshu,
              zongfen: res.data.zongfen,
              yuwen: res.data.yuwen,
              shuxue: res.data.shuxue,
              yingyu: res.data.yingyu,
              zonghe: res.data.zonghe,
              wuli_zhengzhi: res.data.wuli_zhengzhi,
              huaxue_lishi: res.data.huaxue_lishi,
              shengwu_dili: res.data.shengwu_dili,
              tijianshouxian: res.data.tijianshouxian,
              shouxiandaimaI: diyige,
              shouxiandaimaII: dierge,
              shouxiandaimaIII: disange,
              beizhu_content: res.data.beizhu_content,

            })
          }
        })
      }
    })
  },

  /**
   * 男女
   */
  radioChangexingbie: function (e) {
    var that = this
    that.data.xingbie = e.detail.value
    console.log('性别，携带value值为：', that.data.xingbie)
  }, 


  /**
   * 文科 理科
   */
  radioChangewenlike: function (e) {
    var that = this
    that.data.wenlike = e.detail.value
    console.log('文科理科，携带value值为：', that.data.wenlike)
  }, 

  /**
 * 语种
 */
  checkboxChangeyuzhong: function (e) {
    var that = this
    that.data.yuzhong = e.detail.value
    console.log('语种，携带value值为：', that.data.yuzhong)
  },

  /**
   * 高考加分
   */
  radioChangegaokaojiafen: function (e) {
    var that = this
    that.data.gaokaojiafen = e.detail.value
  if (that.data.gaokaojiafen==1){
      that.setData({
        disflag: false
      })
   }else{
      that.setData({
        disflag: true
      })
   }
    console.log('高考加分，携带value值为：', that.data.gaokaojiafen)
  }, 
  /**
   * 体检受限
   */
  radioChangetijianshouxian: function (e) {
    var that = this
    that.data.tijianshouxian = e.detail.value
    if (that.data.tijianshouxian == 2) {
      that.setData({
        disflag1: false
      })
    } else {
      that.setData({
        disflag1: true
      })
    }
    console.log('体检受限，携带value值为：', that.data.tijianshouxian)
  }, 

  /**
 * 受限代码I、II、III
 */
  checkboxChangeshouxiandaimaI: function (e) {
    var that = this
    that.data.shouxiandaimaI = e.detail.value
    console.log('受限代码I，携带value值为：', that.data.shouxiandaimaI)
  },

  checkboxChangeshouxiandaimaII: function (e) {
    var that = this
    that.data.shouxiandaimaII = e.detail.value
    console.log('受限代码II，携带value值为：', that.data.shouxiandaimaII)
  },

  checkboxChangeshouxiandaimaIII: function (e) {
    var that = this
    that.data.shouxiandaimaIII = e.detail.value
    console.log('受限代码III，携带value值为：', that.data.shouxiandaimaIII)
  },
  //输入的内容
  setValue: function (event) {
    var that = this
    this.setData({
      beizhu_content: event.detail.value
    });
    console.log('备注信息，携带value值为：', that.data.beizhu_content)
  },
  /**
  * 表单输入
  */
  formSubmit: function (e) {
    var that = this
    var lianxidianhua= e.detail.value.lianxidianhua
    var kaoshengxingming=e.detail.value.kaoshengxingming
    var zhengzhimianmao=e.detail.value.zhengzhimianmao
    var minzu=e.detail.value.minzu
    var jiudugaozhong=e.detail.value.jiudugaozhong
    var jiudubanji=e.detail.value.jiudubanji
    var shenfenzhenghao=e.detail.value.shenfenzhenghao
    var zhunkaozhenghao=e.detail.value.zhunkaozhenghao
    var kaoshenghao=e.detail.value.kaoshenghao
    var yuzhongqita=e.detail.value.yuzhongqita
    var gaokaojiafen_fenshu=e.detail.value.gaokaojiafen_fenshu
    var xingbie = that.data.xingbie
    var wenlike = that.data.wenlike
    var yuzhong = that.data.yuzhong
    var gaokaojiafen = that.data.gaokaojiafen

    var zongfen=e.detail.value.zongfen
    var yuwen=e.detail.value.yuwen
    var shuxue=e.detail.value.shuxue
    var yingyu=e.detail.value.yingyu
    var zonghe=e.detail.value.zonghe
    var wuli_zhengzhi=e.detail.value.wuli_zhengzhi
    var huaxue_lishi=e.detail.value.huaxue_lishi
    var shengwu_dili=e.detail.value.shengwu_dili
    var tijianshouxian=that.data.tijianshouxian
    var shouxiandaimaI=that.data.shouxiandaimaI
    var shouxiandaimaII=that.data.shouxiandaimaII
    var shouxiandaimaIII=that.data.shouxiandaimaIII
    var beizhu_content=that.data.beizhu_content

    if (lianxidianhua==''||kaoshengxingming ==''|| zhengzhimianmao ==''|| minzu == ''|| jiudugaozhong ==''
    ||jiudubanji ==''|| shenfenzhenghao ==''|| zhunkaozhenghao ==''|| kaoshenghao =='') {
      wx.showModal({
        title: '提示',
        content: '请完善基础信息',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (xingbie == 0 || wenlike == 0  ||gaokaojiafen == 0 ){
      wx.showModal({
        title: '提示',
        content: '请完善基础信息',
        showCancel: false,
        success: function (res) {

        }
      })
    }
    else if (yuwen == '' || shuxue == '' ||yingyu == '' || wuli_zhengzhi == '' ||huaxue_lishi == '' || shengwu_dili == '') {
      wx.showModal({
        title: '提示',
        content: '请完善考生学业情况',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (tijianshouxian == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择是否体检受限',
        showCancel: false,
        success: function (res) {

        }
      })
    }
    else {
      wx.showLoading({
        mask: true,
        title: '加载中'
      })

    wx.request({
      url: app.globalData.baseUrl + 'wx/zhiyuanshenhe_kaoshenjibenxinxi',
      data: {
        xingbie: that.data.xingbie,
        wenlike: that.data.wenlike,
        yuzhong: that.data.yuzhong,
        gaokaojiafen: that.data.gaokaojiafen,
        userid: that.data.userid,

        lianxidianhua: e.detail.value.lianxidianhua,
        kaoshengxingming: e.detail.value.kaoshengxingming,
        zhengzhimianmao: e.detail.value.zhengzhimianmao,
        minzu: e.detail.value.minzu,
        jiudugaozhong: e.detail.value.jiudugaozhong,
        jiudubanji: e.detail.value.jiudubanji,
        shenfenzhenghao: e.detail.value.shenfenzhenghao,
        zhunkaozhenghao: e.detail.value.zhunkaozhenghao,
        kaoshenghao: e.detail.value.kaoshenghao,
        yuzhongqita: e.detail.value.yuzhongqita,
        gaokaojiafen_fenshu: e.detail.value.gaokaojiafen_fenshu,

        zongfen: e.detail.value.zongfen,
        yuwen: e.detail.value.yuwen,
        shuxue: e.detail.value.shuxue,
        yingyu: e.detail.value.yingyu,
        zonghe: e.detail.value.zonghe,
        wuli_zhengzhi: e.detail.value.wuli_zhengzhi,
        huaxue_lishi: e.detail.value.huaxue_lishi,
        shengwu_dili: e.detail.value.shengwu_dili,

        tijianshouxian: that.data.tijianshouxian,
        shouxiandaimaI: that.data.shouxiandaimaI,
        shouxiandaimaII: that.data.shouxiandaimaII,
        shouxiandaimaIII: that.data.shouxiandaimaIII,

        beizhu_content: that.data.beizhu_content,
     
      },
      success: function (res) {
        //console.log(res.data)
        wx.hideLoading()
        if (res.data.result == "ok") {
          wx.showModal({
            title: '提示',
            content: '保存考生基本信息！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '/pages/zhiyuan_shenhe/dengdai_fankui/dengdai_fankui'
                })
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
  formReset: function () {
    this.setData({
      date: '',
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