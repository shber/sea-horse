/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-09 21:42:43
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
    // if (a.type == 1) {
    //   let t = wx.getStorageSync("kundian_farm_wxInfo");
    //   wx.setNavigationBarTitle({
    //     title: '修改信息',
    //   })
    //   this.setData({
    //     imgSrc: t.avatarUrl,
    //     nickName: t.nickName
    //   })
    //   this.setData({
    //     btnText: '确认修改'
    //   })
    // }
    // n.util.setNavColor(n.siteInfo.uniacid);
  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/register/index'
    });
  },

});