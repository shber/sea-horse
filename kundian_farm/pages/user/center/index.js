/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-17 15:15:30
 * @Description: 
 */
// var n = new getApp();
var a = new getApp(), t = a.siteInfo.uniacid;
Page({
  data: {
    popupShow: false,
    price:'',
    nickName: "",
    avatarUrl: "../../../images/icon/moren.png",
    SystemInfo: a.globalData.sysData,
    isIphoneX: a.globalData.isIphoneX,
    tarbar: a.tarbar,
    userInfo:{}
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
                back_img: s,
                userInfo:e.userInfo
            }) : tt.setData({
                noPayCount: n,
                peiCount: r,
                getCount: i,
                is_admin: o,
                userInfo: d,
                aboutData: u,
                back_img: s,
                userInfo:e.userInfo
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
    this.getUserData(), 
    e.setData({
        tarbar: wx.getStorageSync("kundianFarmTarbar")
    });
},
  onLoad(a) {
    let uid = wx.getStorageSync("uid_" + t)
    uid || wx.navigateTo({
        url: "../../login/index"
    })
  },
  inputNum(e){
    this.setData({price:e.detail.value})
},
recharge(){
    const self = this
    if(!this.data.price){
        return wx.showToast({ title: "请输入充值金额", icon: "none", });
    }
    let url = a.util.getNewUrl("entry/wxapp/class", "kundian_farm_plugin_play");
    a.util.request({
        url: url,
        data: {
            op: "user_recharge",
            control: "user",
            uniacid: t,
            price  : self.data.price
        },
        success: function(res) {
            console.log('充值结果', res);
        }
      });
},
nowPay: function(r) {
    const self = this
    if(!this.data.price){
        return wx.showToast({ title: "请输入充值金额", icon: "none", });
    }
   let wx_info = wx.getStorageSync("kundian_farm_wxInfo")
   let userInfo = wx.getStorageSync("userInfo")
    // var n = r.currentTarget.dataset.orderid;
    a.util.request({
        url: "entry/wxapp/class",
        data: {
            op: "user_recharge",
            control: "user",
            uniacid: t,
            state:'we7sid-'+ userInfo.sessionid,
            m: 'kundian_farm',
            uid: wx_info.uid,
            price  : self.data.price
        },
        cachetime: "0",
        success: function(r) {
            if (r.data && r.data.data && !r.data.errno) {
                var i = r.data.data.package;
                wx.requestPayment({
                    timeStamp: r.data.data.timeStamp,
                    nonceStr: r.data.data.nonceStr,
                    package: r.data.data.package,
                    signType: "MD5",
                    paySign: r.data.data.paySign,
                    success: function(r) {
                        wx.showModal({
                            title: "提示",
                            content: "充值成功",
                            showCancel: !1
                        });
                    },
                    fail: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: "您取消了支付",
                            showCancel: !1
                        });
                    }
                });
            }
            "JSAPI支付必须传openid" == r.data.message && wx.navigateTo({
                url: "../../login/index"
            });
        },
        fail: function(t) {
            wx.showModal({
                title: "系统提示",
                content: t.data.message ? t.data.message : "错误",
                showCancel: !1,
                success: function(t) {
                    t.confirm;
                }
            });
        }
    });
},

  setPopupShow(){
    this.setData({popupShow:true})
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