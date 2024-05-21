var e = new getApp(),
  t = e.siteInfo.uniacid;
Page({
  data: {
    bgColor: e.bgColor,
    address: "",
    phone: "",
    userName: "",
    goodsData: [],
    count: "",
    totalPrice: [],
    copyTotalPrice: 0,
    cartData: [],
    is_buy_type: 1,
    goods_id: "",
    cart_id: "",
    spec_id: "",
    send_price: 0,
    couponCount: 0,
    userCoupon: [],
    order_id: 0,
    isIphoneX: e.globalData.isIphoneX,
    recovery_method: [],
    config: [],
    pay_text: "立即下单",
    discount: 0,
    store_id: "",
    gender: 1,
  },
  handleChange: function (e) {
    var t = e.detail.value;
    this.setData({ gender: t });
  },
  onLoad: function (a) {
    console.log(a);
    var o = this,
      s = e.bgColor,
      r = a.goodsid,
      i = a.spec_id,
      d = a.cart_id,
      n = a.count,
      c = wx.getStorageSync("uid_" + t),
      u = wx.getStorageSync("kundian_farm_setData"),
      p = 1;
    (o.store_id = a.store_id),
      2 == u.recovery_method && (p = 2),
      o.setData({ recovery_method: p, bgColor: s, config: u }),
      r &&
        (e.util.request({
          url: "entry/wxapp/class",
          data: {
            op: "getSureGoods",
            control: "shop",
            uniacid: t,
            goods_id: r,
            spec_id: i,
            count: n,
            uid: c,
          },
          success: function (e) {
            var t = e.data,
              a = t.goodsData,
              s = t.totalPrice,
              d = t.send_price,
              c = t.couponCount,
              u = t.address,
              l = t.discount;
            2 == p && (s = parseFloat(s - e.data.send_price).toFixed(2));
            var _ = "";
            u && (_ = u.region + " " + u.address),
              o.setData({
                count: n,
                totalPrice: s,
                goods_id: r,
                goodsData: a,
                copyTotalPrice: e.data.totalPrice,
                spec_id: i || "",
                send_price: d,
                couponCount: c,
                address: _,
                phone: u.phone || "",
                userName: u.name || "",
                discount: l,
              });
          },
        }),
        e.util.setNavColor(t)),
      d &&
        e.util.request({
          url: "entry/wxapp/class",
          data: {
            control: "cart",
            op: "getBuyCartData",
            uniacid: t,
            uid: c,
            cart_id: d,
          },
          success: function (e) {
            var t = e.data,
              a = t.address,
              s = t.cartData,
              r = t.totalPrice,
              i = t.send_price,
              n = t.couponCount,
              c = t.discount,
              u = "";
            a && (u = a.region + " " + a.address),
              o.setData({
                cartData: s,
                is_buy_type: 2,
                totalPrice: r,
                copyTotalPrice: r,
                cart_id: d,
                send_price: i,
                couponCount: n,
                address: u,
                phone: a.phone || "",
                userName: a.name || "",
                discount: c,
              });
          },
        });
  },
  chooseAddress: function (e) {
    wx.navigateTo({
      url: "/kundian_farm/pages/user/address/index?is_select=true",
    });
  },
  changeRecoveryMethod: function (e) {
    var t = e.currentTarget.dataset.state,
      a = this.data,
      o = a.totalPrice,
      s = a.send_price,
      r = a.copyTotalPrice;
    (o = 2 == t ? parseFloat(o - s).toFixed(2) : r),
      this.setData({ recovery_method: t, totalPrice: o });
  },
  addCount: function (e) {
    var t = this.data.goodsData,
      a = parseInt(this.data.count) + 1;
    if (1 == t.is_open_sku)
      o =
        parseFloat(this.data.goodsData.specVal.price * a) +
        parseFloat(this.data.send_price);
    else var o = parseFloat(t.price * a) + parseFloat(this.data.send_price);
    this.setData({ count: a, totalPrice: o, copyTotalPrice: o });
  },
  reduceCount: function (e) {
    if (this.data.count > 1) {
      var t = this.data.goodsData,
        a = parseInt(this.data.count) - 1;
      if (1 == t.is_open_sku)
        o =
          parseFloat(this.data.goodsData.specVal.price * a) +
          parseFloat(this.data.send_price);
      else var o = parseFloat(t.price * a) + parseFloat(this.data.send_price);
      this.setData({ count: a, totalPrice: o, copyTotalPrice: o });
    }
  },
  selectCoupon: function (e) {
    var t = this.data.copyTotalPrice - this.data.send_price;
    wx.navigateTo({
      url: "../../user/coupon/useCoupon/index?type=1&totalPrice=" + t,
    });
  },
  onShow: function (e) {
    var a = this.data.copyTotalPrice;
    if (wx.getStorageSync("user_coupon")) {
      var o = wx.getStorageSync("user_coupon");
      wx.removeStorageSync("user_coupon"),
        this.setData({
          userCoupon: o,
          totalPrice: parseFloat(a - o.coupon.coupon_price).toFixed(2),
        });
    } else this.setData({ userCoupon: [], totalPrice: a });
    var s = wx.getStorageSync("uid_" + t),
      r = wx.getStorageSync("selectAdd_" + s);
    r &&
      (this.setData({
        userName: r.name,
        phone: r.phone,
        address: r.region + " " + r.address,
      }),
      wx.removeStorageSync("selectAdd_" + s)),
      this.setData({ pay_text: "立即下单" });
  },
  subOrder: function (a) {
    var o = this,
      s = wx.getStorageSync("uid_" + t),
      r = a.detail.value.remark,
      i = o.data,
      d = (i.order_id, i.userName),
      n = i.address,
      c = i.phone,
      u = i.userCoupon,
      p = i.send_price,
      l = i.totalPrice,
      _ = i.recovery_method,
      g = i.is_buy_type,
      h = i.discount,
      f = 0,
      y = 0,
      w = o.store_id;
    if (
      ("" != u && ((f = u.coupon.id), (y = u.coupon.coupon_price)),
      1 == _ && ("" == d || "" == n || "" == c))
    )
      return wx.showToast({ title: "请选择收获地址", icon: "none" }), !1;
    if (
      2 != _ ||
      ((d = a.detail.value.userName),
      (c = a.detail.value.phone),
      "" != d && "" != c)
    ) {
      if (1 == g)
        var m = o.data,
          x = m.goods_id,
          v = m.count,
          P = m.spec_id,
          S = {
            control: "shop",
            op: "addOrder",
            address: n,
            name: d,
            phone: c,
            uniacid: t,
            goods_id: x,
            count: v,
            uid: s,
            remark: r,
            is_buy_type: 1,
            pay_method: i.gender,
            spec_id: P,
            coupon_id: f,
            coupon_price: y,
            send_price: p,
            totalPrice: l,
            recovery_method: _,
            formId: a.detail.formId,
            discount: h,
            store_id: w,
          };
      else {
        var D = o.data.cart_id;
        S = {
          control: "shop",
          op: "addOrder",
          address: n,
          name: d,
          phone: c,
          uniacid: t,
          cart_id: D,
          uid: s,
          remark: r,
          is_buy_type: 2,
          coupon_id: f,
          coupon_price: y,
          send_price: p,
          totalPrice: l,
          recovery_method: _,
          formId: a.detail.formId,
          discount: h,
          store_id: w,
          pay_method: i.gender,
        };
      }
      this.setData({ pay_text: "正在下单" }),
        e.util.request({
          url: "entry/wxapp/class",
          data: S,
          success: function (a) {
            if (1 == a.data.code) {
              var s = a.data.order_id;
              o.setData({ order_id: s }),
                1 == i.gender
                  ? e.util.request({
                      url: "entry/wxapp/pay",
                      data: {
                        op: "getShopPayOrder",
                        orderid: s,
                        uniacid: t,
                        file: "shop",
                      },
                      cachetime: "0",
                      success: function (a) {
                        if (a.data && a.data.data && !a.data.errno) {
                          var o = a.data.data.package;
                          wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: "MD5",
                            paySign: a.data.data.paySign,
                            success: function (a) {
                              wx.showLoading({ title: "加载中" }),
                                e.util.request({
                                  url: "entry/wxapp/class",
                                  data: {
                                    control: "shop",
                                    order_id: s,
                                    op: "sendMsg",
                                    uniacid: t,
                                    prepay_id: o,
                                  },
                                  success: function () {
                                    wx.showModal({
                                      title: "提示",
                                      content: "支付成功",
                                      showCancel: !1,
                                      success: function () {
                                        wx.redirectTo({
                                          url: "../orderList/index",
                                        });
                                      },
                                    }),
                                      wx.hideLoading();
                                  },
                                });
                            },
                            fail: function (e) {
                              wx.showModal({
                                title: "系统提示",
                                content: "您取消了支付!",
                                showCancel: !1,
                                success: function (e) {
                                  e.confirm &&
                                    wx.redirectTo({
                                      url: "../orderList/index",
                                    });
                                },
                              }),
                                wx.hideLoading();
                            },
                          });
                        } else console.log("fail1");
                      },
                      fail: function (e) {
                        "JSAPI支付必须传openid" == e.data.message
                          ? wx.navigateTo({
                              url: "/kundian_farm/pages/login/index",
                            })
                          : wx.showModal({
                              title: "系统提示",
                              content: e.data.message ? e.data.message : "错误",
                              showCancel: !1,
                              success: function (e) {
                                e.confirm;
                              },
                            });
                      },
                    })
                  : wx.showModal({
                      title: "提示",
                      content: "支付成功",
                      showCancel: !1,
                      success: function () {
                        wx.redirectTo({ url: "../orderList/index" });
                      },
                    });
            } else
              wx.showModal({
                title: "提示",
                content: a.data.msg,
                showCancel: !1,
              });
          },
        });
    } else wx.showToast({ title: "请填写取货信息", icon: "none" });
  },
  gotoMerchant: function () {
    var e = this.data.config;
    wx.openLocation({
      latitude: parseFloat(e.self_lifting_place.lat),
      longitude: parseFloat(e.self_lifting_place.lng),
      name: e.self_lifting_address,
    });
  },
});
