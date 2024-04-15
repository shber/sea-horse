/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-14 16:02:57
 * @Description: 
 */
var a = require("../../../wxParse/wxParse.js")

var app = new getApp();
let cid = app.siteInfo.uniacid;
Page({
  data: {
    details: {},
    progressNum:0,
    index: 0,
    count: 1,
  },
  onLoad: function (a) {
    this.getDetailsData(a.id)
  },
  checkTab(e){
    const {index} = e.currentTarget.dataset;
    this.setData({index: index})
  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/register/index'
    });
  },
  getDetailsData(id){
    const self = this
    a.wxParse("article", "html", '<p>11</p>', self, 5);
    app.util.request({
      url: "entry/wxapp/class",
      data: {
          control: "animal",
          op: "animalDetail",
          aid: id,
          uniacid: cid
      },
      success(res) {
          let _data = res.data
          let num = (_data.animalData.putaway_time *1/ _data.animalData.mature_period*1) * 100
          self.setData({
              details: _data.animalData,
              progressNum: num
          }),
          "" != _data.detail_desc && a.wxParse("article", "html", _data.detail_desc, self, 5);
      }
    })
  },
  reduceNum() {
    1 != this.data.count && this.setData({
        count: this.data.count - 1
    });
  },
  addNum() {
      var a = this.data, t = a.count, i = a.details;
      parseInt(t) + 1 > i.count ? wx.showToast({
          title: "库存不足",
          icon: "none"
      }) : this.setData({
          count: parseInt(t) + 1
      });
  },
  chooseNum(a) {
      var t = this.data, i = (t.count, t.details);
      a.detail.value > i.count ? wx.showToast({
          title: "库存不足",
          icon: "none"
      }) : this.setData({
          count: a.detail.value
      });
  },
  sureAnimal(a) {
    var t = this.data, i = t.aid, e = t.details, n = t.count;
    t.is_limit || e.limit_purchase > 0 && parseInt(n) > e.limit_purchase ? wx.showToast({
        title: "该商品有限购" + e.limit_purchase + e.unit,
        icon: "none"
    }) : parseInt(n) > parseInt(e.count) ? wx.showToast({
        title: "库存不足",
        icon: "none"
    }) : (wx.setStorageSync("kundian_farm_buy_animal", e), wx.navigateTo({
      // /kundian_farm/pages
        url: "/kundian_farm/pages/shop/confirmAdopt/index?count=" + n + "&aid=" + i
    }));
},

})