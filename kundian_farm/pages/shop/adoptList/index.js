/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-06-18 14:24:52
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
    stylePrice:'',
    itemData:{},
    animalData:[],
    number:function(a, b){
        console.log(a, b);
       return  a / b == 0 ?  1 : (a / b)*100
    }
  },
  onLoad(e){
    this.setData({activeNum: e.status || 0})
  },
  onShow: function (a) {
    this.getOrderData();
  },
  inputChange(e){
    this.setData({stylePrice: e.detail.value*1})
  },
  intoAdoptDetail: function(t) {
    var a = t.currentTarget.dataset.adoptid;
    wx.navigateTo({
        url: "../../shop/adoptiveState/index?adopt_id=" + a
    });
  },
  onSale(e){
    const self = this
    var count = this.data.count;
    let itemData = this.data.itemData
    if(!self.data.stylePrice){
      return wx.showToast({ title: '请输入转卖价格', icon: "none" })
    }
    t.util.request({
      url: "entry/wxapp/class",
      data: {
          control: "animal",
          op: "re_sale",
          uniacid: e,
          id: itemData.id,
          count: count,
          price: self.data.stylePrice,
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
                self.setData({count:1,popupShow:false})
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
    // wx.showLoading({
    //     title: "玩命加载中..."
    // }),
     t.util.request({
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
    let itemcount = this.data.itemcount * 1
      if(a.detail.value*1 > itemcount){
        wx.showToast({
          title: "已超出可选数量",
          icon: "none"
        })
        this.setData({
          count: itemcount
        });
      }else{
        this.setData({
          count: a.detail.value
        });
      }
  },
  setPopupShow(e){
    var {item} = e.currentTarget.dataset;
    this.data.itemData = item
    this.data.itemcount = item.count
    this.setData({
      itemData: item
    })
    this.setData({count:1, popupShow:true})
  },
  setPopupHide(){
    this.setData({popupShow:false})
  },

});