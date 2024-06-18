/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-06-18 10:45:41
 * @Description: 
 */
// var n = new getApp();
var a = new getApp(), t = a.siteInfo.uniacid;

Page({
  data: {
    popupShow: false,
    SystemInfo: a.globalData.sysData,
    isIphoneX: a.globalData.isIphoneX,
    tarbar: a.tarbar,
    orderType: '',
    type1: 'asc',
    type2: 'asc',
    type3: 'asc',
    dataList:[],
    animalData:[],
    itemData:{},
    count: 1,
  },
  onLoad: function (a) {

  },
  onShow(){
    let uid = wx.getStorageSync("uid_" + t)
    uid || wx.navigateTo({
        url: "../../login/index"
    })
    
    this.getDataList()
  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/register/index'
    });
  },
  onFilter(e){
    let { type } = e.currentTarget.dataset
    console.log('e.detail', type);
    this.setData({dataList:[], orderType:type, [`type${type}`]: this.data[`type${type}`] == 'asc' ? 'desc' : 'asc'})
    console.log('e.detail', type, this.data['type'+type]);
    this.getDataList()
  },
  getDataList(){
    const self = this
    a.util.request({
      url: "entry/wxapp/class",
      data: {
          op: "getReSale",
          control: "animal",
          uniacid: t,
          order: this.data.orderType,
          asc : this.data['type'+this.data.orderType]
      },
      success: function(res) {
        self.setData({
          animalData: res.data.animalData,
      })
      }
    });
  },

  onAdopt(e){
    const self = this
    a.util.request({
      url: "entry/wxapp/class",
      data: {
          control: "animal",
          op: "animalDetail",
          aid: self.data.itemData.aid,
          uniacid: t
      },
      success(res) {
        let _data = res.data
        wx.setStorageSync("kundian_farm_buy_animal", _data.animalData)
        self.setData({popupShow:false})
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/confirmAdopt/index?type=1&count=" + self.data.count + "&aid=" + self.data.itemData.aid + "&adid=" + self.data.itemData.id + "&price=" + self.data.itemData.resale_price
        })
      }
    })
  },

  reduceNum() {
    let count = this.data.count
    1 != count && this.setData({
      count: parseInt(count) - 1
    });
  },
  numInput(e){
    var a = this.data, t = e.detail.value*1, itemcount = this.data.itemcount;
    if(parseInt(t) > itemcount){
      return  wx.showToast({ title: "已超出可选数量", icon: "none" })
   }else{
       this.setData({count:e.detail.value*1})
   }
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
    if(a.detail.value > itemcount){
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
    // this.data.itemData = item
    this.data.itemcount = item.count
    this.setData({count:1, itemData:item, popupShow:true})
  },
  setPopupHide(){
    this.setData({popupShow:false})
  },

});