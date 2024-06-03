/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-06-03 17:05:12
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
    userInfo:{},
    setAuth: false,
    isOpen: 0,
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
    this.setData({
        isOpen: wx.getStorageSync("isOpen")
    })
    let uid = wx.getStorageSync("uid_" + t)
    uid || wx.navigateTo({
        url: "../../login/index"
    })
  },
  inputNum(e){
    this.setData({price:e.detail.value})
},
goDistribution(){
    if(this.data.userInfo.is_distributor == '1'){
        wx.navigateTo({
            url: "/kundian_farm/pages/distribution/index/index"
        })
    }else{
        wx.navigateTo({
            url: "/kundian_farm/pages/distribution/addinfo/index"
        });
    }
},
nowPay: function(r) {
    const self = this
    const userInfo = wx.getStorageSync("userInfo")
    if(!userInfo.sessionid){
        this.setData({setAuth:true})
        return wx.showToast({ title: "请先手动进行微信授权", icon: "none", });
    }
    if(!this.data.price){
        return wx.showToast({ title: "请输入充值金额", icon: "none", });
    }
    self.setPopupHide()
    a.util.request({
        url: "entry/wxapp/class",
        data: {
            op: "user_recharge",
            control: "user",
            uniacid: t,
            price  : self.data.price
        },
        cachetime: "0",
        success: function(r) {
            console.log('rrr', r);
            if (r.data && !r.data.errno) {
                // var i = r.data.data.package;
                console.log('srrr', r);
                wx.requestPayment({
                    timeStamp: r.data.timeStamp,
                    nonceStr: r.data.nonceStr,
                    package: r.data.package,
                    signType: "MD5",
                    paySign: r.data.paySign,
                    success: function(r) {
                        console.log('usccc', r);
                        wx.showModal({
                            title: "提示",
                            content: "充值成功",
                            showCancel: !1
                        });
                        self.getUserData()
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
            "JSAPI支付必须传openid" == r.data.message  // && self.setData({setAuth:true})
        },
        fail: function(t) {
            wx.showModal({
                title: "系统提示",
                content: t.data.message ? t.data.message : "错误",
                showCancel: !1,
                success: function(t) {
                   // self.setData({setAuth:true})
                }
            });
        }
    });
},

updateUserInfo(){
    const self = this
    a.util.getUserInfo(function (n) {
        console.log(n, '测试打印1');
        wx.setStorageSync("uid_" + t, n.memberInfo.uid), 
        wx.setStorageSync("kundian_farm_sessionid", n.sessionid),
        wx.setStorageSync("kundian_farm_wxInfo", n.wxInfo);
        wx.showToast({ title: "授权成功", icon: "none", });
        self.setData({setAuth:false})
    })
},

  setPopupShow(){
    this.setData({price: "", popupShow:true})
    },
    intoOrder: function(a) {
        var e = a.currentTarget.dataset.status;
        wx.navigateTo({
            url: "../../shop/orderList/index?status=" + e
        });
    },
  intoAdopt(a) {
    var {status} = a.currentTarget.dataset;
    wx.navigateTo({
        url: "../../shop/adoptList/index?status=" + status
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
  goWallet(){
    wx.navigateTo({
        url: "/kundian_farm/pages/user/wallet/index"
    });
  },
  setPopupShow(){
    this.setData({popupShow:true})
  },
  setPopupHide(){
    this.setData({popupShow:false})
  },

});