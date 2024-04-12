/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-12 17:51:54
 * @Description: 
 */
// var n = new getApp();

Page({
  data: {
    popupShow: false,
    activeNum: 1,
    tabInfo:[
      {label:'全部', val:1},
      {label:'认养中', val:2},
      {label:'转卖中', val:3},
      {label:'已完成', val:4}
    ]
  },
  onLoad: function (a) {

  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/register/index'
    });
  },
  setPopupShow(){
    this.setData({popupShow:true})
  },
  setPopupHide(){
    this.setData({popupShow:false})
  },

});