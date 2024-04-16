/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-16 14:56:02
 * @Description: 
 */
// var n = new getApp();
var a = new getApp(), t = a.siteInfo.uniacid;
Page({
  data: {
    popupShow: false,
    nickName: "",
    avatarUrl: "../../../images/icon/moren.png",
    SystemInfo: a.globalData.sysData,
    isIphoneX: a.globalData.isIphoneX,
    tarbar: a.tarbar,
  },
  getUserData: function() {
    var tt = this, n = wx.getStorageSync("uid_" + t);
    a.util.request({
        url: "entry/wxapp/class",
        data: {
            op: "getUserInfo",
            control: "index",
            uid: n,
            uniacid: t
        },
        success: function(a) {
            var e = a.data, n = e.noPayCount, r = e.peiCount, i = e.getCount, o = e.is_admin, s = e.back_img, u = e.aboutData, d = a.data.userInfo || {};
            Object.keys(d).length > 0 ? a.data.userInfo.avatarurl && void 0 != a.data.userInfo.avatarurl && tt.setData({
                nickName: d.nickname,
                avatarUrl: d.avatarurl,
                is_distributor: d.is_distributor || 0,
                noPayCount: n,
                peiCount: r,
                getCount: i,
                is_admin: o,
                userInfo: d,
                aboutData: u,
                back_img: s
            }) : tt.setData({
                noPayCount: n,
                peiCount: r,
                getCount: i,
                is_admin: o,
                userInfo: d,
                aboutData: u,
                back_img: s
            }), d || (wx.removeStorageSync("kundian_farm_wxInfo"), wx.removeStorageSync("userInfo"), 
            wx.navigateTo({
                url: "../../login/index"
            }));
        }
    });
},
  onShow: function(a) {
    var e = this, tt = wx.getStorageSync("kundian_farm_wxInfo");
    console.log('tt', tt);
    t && this.setData({
        avatarUrl: tt.avatarurl,
        nickName: tt.nickname
    }), 
    // this.getUserData(), 
    e.setData({
        tarbar: wx.getStorageSync("kundianFarmTarbar")
    });
},
  onLoad(a) {

  },
  intoOrder(a) {
    var {status} = a.currentTarget.dataset;
    wx.navigateTo({
        url: "../../shop/orderList/index?status=" + status
    });
  },
  intoCash(a) {
    // var {status} = a.currentTarget.dataset;
    console.log(123);
    wx.navigateTo({
        url: "../cash/cash"
    });
  },
  goLogin () {
    wx.reLaunch({
      url: '/kundian_farm/pages/login/index'
    });
  },
  setPopupShow(){
    this.setData({popupShow:true})
  },
  setPopupHide(){
    this.setData({popupShow:false})
  },

});