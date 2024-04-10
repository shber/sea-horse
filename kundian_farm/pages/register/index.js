/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-09 21:42:06
 * @Description: 
 */
// var n = new getApp();

Page({
  data: {
    imgSrc: '',
    nickName: '',
    btnText: '授权登录',
  },
  onLoad: function (a) {

  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/login/index'
    });
  },

});