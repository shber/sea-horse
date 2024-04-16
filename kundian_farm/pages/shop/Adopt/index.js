/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-16 12:16:53
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
  },
  onLoad: function (a) {
    this.getDataList()
  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/register/index'
    });
  },
  getDataList(){
    a.util.request({
      url: "entry/wxapp/class",
      data: {
          op: "getReSale",
          control: "animal",
          uniacid: t,
      },
      success: function(res) {
        console.log('res', res);
      }
    });
  },
  setPopupShow(){
    this.setData({popupShow:true})
  },
  setPopupHide(){
    this.setData({popupShow:false})
  },

});