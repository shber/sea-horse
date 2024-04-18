/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-18 20:59:17
 * @Description: 
 */
// var n = new getApp();
var t = new getApp(), e = t.siteInfo.uniacid;

Page({
  data: {
    popupShow: false,
    activeNum: 0,
    tabInfo:[
      {label:'全部', val:0},
      {label:'认养中', val:1},
      {label:'转卖中', val:2},
      {label:'已完成', val:3}
    ],
    count:1,
    itemData:{},
    animalData:[],
    number:function(a, b){
        console.log(a, b);
       return  a / b == 0 ?  1 : (a / b)*100
    }
  },
  onShow: function (a) {
    this.getOrderData();

  },
  onSale(e){
    const self = this
    var count = this.data.count;
    let itemData = this.data.itemData
    t.util.request({
      url: "entry/wxapp/class",
      data: {
          control: "animal",
          op: "re_sale",
          uniacid: e,
          id: itemData.id,
          count: count,
          price: itemData.total_price,
      },
      success: function(res) {
        console.log('rs',res);
        if(res.data.code == 1){
          wx.showToast({ title: "转卖成功", icon: "none" })
          self.getOrderData()
          self.setData({popupShow:false})
        }else{
          wx.showToast({ title: res.data.msg, icon: "none" })
        }
      }
    })
  },
  closeSale(e){
    const self = this
    var {item} = e.currentTarget.dataset;

    wx.showModal({
      title: '提示',
      content: '您确定取消转卖吗？',
      success (res) {
        if (res.confirm) {
          t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "cancel_re_sale",
                uniacid: e,
                id: item.id,
            },
            success: function(res) {
              if(res.data.code == 1){
                wx.showToast({ title: "取消成功", icon: "none" })
                self.getOrderData()
                self.setData({popupShow:false})
              }else{
                wx.showToast({ title: res.data.msg, icon: "none" })
              }
            }
          })
        }
      }
    })  
  },
  checkTab(e){
    var {id} = e.currentTarget.dataset;
    this.setData({activeNum: id})
    console.log(id);
    this.setData({animalData: []})
    this.getOrderData();
  },
  getOrderData: function() {
    var a = this, r = a.data.currentIndex, n = wx.getStorageSync("uid_" + e);
    wx.showLoading({
        title: "玩命加载中..."
    }), t.util.request({
        url: "entry/wxapp/class",
        data: {
            control: "animal",
            op: "getMyAnimal",
            uniacid: e,
            uid: n,
            status: this.data.activeNum
        },
        success: function(t) {
            var e = t.data.animalData;
            e.length > 0 ? a.setData({
                animalData: e,
                page: 1,
                isContent: !0
            }) : a.setData({
                isContent: !1
            }), wx.hideLoading();
        }
    });
},

  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/register/index'
    });
  },
  reduceNum() {
    let count = this.data.count
    1 != count && this.setData({
      count: parseInt(count) - 1
    });
  },
  addNum() {
    let count = this.data.count
    let itemcount = this.data.itemcount
    parseInt(count) + 1 > itemcount? wx.showToast({
        title: "已超出可选数量",
        icon: "none"
    }) : this.setData({
        count: parseInt(count) + 1
    });
  },
  chooseNum(a) {
    let count = this.data.count
    let itemcount = this.data.itemcount
      a.detail.value > itemcount ? wx.showToast({
          title: "已超出可选数量",
          icon: "none"
      }) : this.setData({
          count: a.detail.value
      });
  },
  setPopupShow(e){
    var {item} = e.currentTarget.dataset;
    this.data.itemData = item
    this.data.itemcount = item.count
    this.setData({
      itemData: item
    })
    this.setData({popupShow:true})
  },
  setPopupHide(){
    this.setData({popupShow:false})
  },

});