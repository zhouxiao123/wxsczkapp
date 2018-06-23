// pages/quwei_detail/quwei_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    title:'',
    desc:'',
    subject:'',
    disflag:false,
    item:{},
    type:1,
    checkl: false,
    checkr:false,
    tag:0,
    dis1:'block',
    percent:'',
    result:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id:options.id,
      type:options.type
    })
      if(options.type==1){
        that.setData({
          title: '测你潜在的人格分裂程度',
          desc:'人格分裂，在影视剧中似乎很神秘，但现实生活中，却离我们并不遥远。本次的测试，是一个关于虚与实的小故事，请尽可能地进入角色，以获得准确的结果。'
        })

        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'wx/quwei_detail',
          data: {
            type: that.data.type,
            id: that.data.id
          },
          success: function (res) {
            //console.log(res.data)


            that.setData({
              item: res.data
            })
            wx.hideLoading()
          }
        })
      } else if (options.type == 2) {
        that.setData({
          title: '测你的个性成熟度',
          desc: '都是与食物有关的测试哦，一共10道题目'
        })

        wx.showLoading({
          mask: true,
          title: '加载中'
        })
        wx.request({
          url: app.globalData.baseUrl + 'wx/quwei_detail',
          data: {
            type: that.data.type,
            id: parseInt(that.data.id)+20
          },
          success: function (res) {
            //console.log(res.data)


            that.setData({
              item: res.data
            })
            wx.hideLoading()
          }
        })
      } else if (options.type == 3) {

      } else if (options.type == 4) {

      } else if (options.type == 5) {
        that.setData({
          title: '上升还是下降',
          desc: '在下面一组杠杆，齿轮和转轮的组合中，黑色的点是固定支点，灰色的点是不固定的支点，如果如图所示转动摇把，上端A和B的物体哪一个上升哪一个下降?'
        })
      }
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
  
  }, formSubmit: function (e) {
    var that = this
    if (that.data.type == 1) {
        if (e.detail.value['id'] == '') {
          wx.showModal({
            title: '提示',
            content: '还未选择答案',
            showCancel: false,
            success: function (res) {

            }
          })
          return;
        }

        if (e.detail.value['id']==-1){
          that.setData({
            disflag:'true',
            tag:1,
            percent: '0%',
            result: '你是个表里如一的人，坚持忠于自我。率直大方的性格自然会吸引来很多朋友，而不需要刻意地委屈自己来迎合他人。你做事遵循原则的同时又讲求效率，从一开始就直奔结果而去，不喜欢拐弯抹角。这不代表生活中的你很刻板，恰恰相反你是一个乐天派，因为追求内心的纯粹，所以无形之中少了很多不必要的负担。'
          })
          return;
        }
        if (e.detail.value['id'] == -2) {
          that.setData({
            disflag: 'true',
            tag: 1,
            percent: '30%',
            result: '你是常见的双重人格，但你唯一分裂出的这个人格又和你很接近，也许是过去某个阶段的你，也许是你曾憧憬的样子，甚至是你身边最亲近的人的性格成分。你的双重人格，既是你的心理防线，又是你的理想状态。简单来说，你活得很真实，处事有底限也有目标，为人讲义气也讲原则，是个会用心体验生活的人。'
          })
          return;
        }
        if (e.detail.value['id'] == -3) {
          that.setData({
            disflag: 'true',
            tag: 1,
            percent: '70%',
            result: '你是一个不折不扣的人格分裂者。你可以在不同场合呈现出不同的形象，也经常给不同的人留下不同的印象。你很聪明，会识人，也擅长把握人心。为人处事圆滑周到的你，总显得不可或缺，时常在身边的朋友中扮演不可或缺的角色。但不论环境造就了你怎样多变的面貌，你都能保持一种平和澄明的心态，实属不易。'
          })
          return;
        }
        if (e.detail.value['id'] == -4) {
          that.setData({
            disflag: 'true',
            tag: 1,
            percent:'100%',
            result:'你的精神分裂和多重人格现象非常严重，甚至已经到了不自知的程度。也许因为接收太多负面消息，你的心理设防程度很高，不会轻易以真面目示人。你心思很重，任何事情都喜欢计划周详，自然会考虑到所有可能发生的情况。所以有人觉得你性格多变，让人难以揣测。不过对你真正懂你的人来说，你的百变总能让他着迷。'
          })
          return;
        }
      


    } else if (that.data.type == 2) {

        if (e.detail.value['id'] == '') {
          wx.showModal({
            title: '提示',
            content: '还未选择答案',
            showCancel: false,
            success: function (res) {

            }
          })
          return;
        }

        if (e.detail.value['id'] == -1) {
          that.setData({
            disflag: 'true',
            tag: 2,
            percent: '100%',
            result: '处事很成熟又很果断的你，遇事很冷静理智，平时大家都愿意将烂摊子交给你，哈哈哈，也是醉了。而且和大家相处得很愉快。几乎每个与你合作过的人都觉得你是个值得信赖的朋友。不错哟！'
          })
          return;
        }
        if (e.detail.value['id'] == -2) {
          that.setData({
            disflag: 'true',
            tag: 2,
            percent: '75%',
            result: '和大部分同龄人相比，你算是比较成熟的。平易近人，遇事好商量，在酷酷的外表下其实有颗孩子般的心。'
          })
          return;
        }
        if (e.detail.value['id'] == -3) {
          that.setData({
            disflag: 'true',
            tag: 2,
            percent: '45%',
            result: '在处理事情上面，你懂得协调，但是某些时候缺少自己的想法，不能完全在众人面前展露才华。可借鉴他人的经验教训，遇事多思考，真正的让自己成熟起来。'
          })
          return;
        }
        if (e.detail.value['id'] == -4) {
          that.setData({
            disflag: 'true',
            tag: 2,
            percent: '20%',
            result: '性格黑白分明的你，遇到讨厌的人或者事情不懂得掩饰，以至于周围的人都怕了你。尝试控制自己的情绪，虽然有些事情很难接受，但忍耐一下，结果也许会更好噢！'
          })
          return;
        }
     
    } else {
      wx.showModal({
        title: '提示',
        content: '转发后看答案',
        showCancel: false,
        success: function (res) {
            
        }
      })
      return
    }
    //console.log(e.detail.value)
    wx.showLoading({
      mask: true,
      title: '加载中'
    })
    wx.request({
      url: app.globalData.baseUrl + 'wx/quwei_detail',
      data: e.detail.value,
      success: function (res) {
        //console.log(res.data)

        wx.hideLoading()
        that.setData({
          item: res.data,
          checkl:false,
          checkr:false
        })

      }
    })
    /*wx.redirectTo({
      url: '../quwei_detail/quwei_detail?id=' + e.detail.value.id+'&type='+that.data.type
    })*/
  }, onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '四川招考网',
      path: '/pages/index/index',
      imageUrl: 'https://wxsign.sczk.com.cn/wxsczkappback/img/backimg/logo.jpg',
      success: function (res) {
        // 转发成功
        if (that.data.type == 3){
          that.setData({
            tag: 3,
            dis1:'none'
          })
        } else if (that.data.type == 4){
          that.setData({
            tag: 4,
            dis1: 'none'
          })
        } else if (that.data.type == 5){
          that.setData({
            tag: 5,
            dis1: 'none'
          })
        }

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})