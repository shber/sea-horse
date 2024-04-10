var t = new getApp(), e = t.siteInfo.uniacid;

Page({
    data: {
        bgColor: t.bgColor,
        currentIndex: "4",
        orderData: [],
        status: "",
        page: 1,
        isContent: !0,
        show_verify: !0,
        verify_qrcode: "",
        store_id:"",
        is_show:"",
        order_id:""
    },
    onLoad: function(a) {
        var r = this;
        if (a.status) n = a.status; else var n = 4;
        wx.getStorageSync("uid_" + e);
        r.setData({
            currentIndex: n,
            store_id:a.store_id
        }), this.getOrderData(), t.util.setNavColor(e);
    },
    onShow: function(t) {
        this.getOrderData();
    },
    getOrderData: function() {
        var a = this, r = a.data.currentIndex, n = wx.getStorageSync("uid_" + e);
        wx.showLoading({
            title: "玩命加载中..."
        }), t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "order",
                op: "orderShopList",
                uniacid: e,
                uid: n,
                status: r,
                store_id:a.data.store_id
            },
            success: function(t) {
                var e = t.data.orderData;
                e.length > 0 ? a.setData({
                    orderData: e,
                    page: 1,
                    isContent: !0
                }) : a.setData({
                    isContent: !1
                }), wx.hideLoading();
            }
        });
    },
    changeIndex: function(t) {
        this.setData({
            currentIndex: t.currentTarget.dataset.index
        }), this.getOrderData();
    },
    sendRequest: function(e, a, r) {
        var n = this;
        wx.showModal({
            title: "提示",
            content: e,
            success: function(e) {
                e.confirm && t.util.request({
                    url: "entry/wxapp/class",
                    data: a,
                    success: function(t) {
                        1 == t.data.code ? wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1,
                            success: function() {
                                n.getOrderData();
                            }
                        }) : wx.showToast({
                            title: "取消失败"
                        });
                    }
                });
            }
        });
    },
    cancelOrder: function(t) {
        var a = wx.getStorageSync("uid_" + e), r = t.currentTarget.dataset.orderid, n = {
            control: "order",
            op: "cancelOrder",
            uid: a,
            uniacid: e,
            order_id: r
        };
        this.sendRequest("确认取消订单吗？", n, 1);
    },
    payOrder: function(a) {
        wx.getStorageSync("uid_" + e);
        var r = a.currentTarget.dataset.orderid;
        t.util.request({
            url: "entry/wxapp/pay",
            data: {
                op: "getShopPayOrder",
                orderid: r,
                uniacid: e,
                file: "shop"
            },
            cachetime: "0",
            success: function(a) {
                if (a.data && a.data.data && !a.data.errno) {
                    var n = a.data.data.package;
                    wx.requestPayment({
                        timeStamp: a.data.data.timeStamp,
                        nonceStr: a.data.data.nonceStr,
                        package: a.data.data.package,
                        signType: "MD5",
                        paySign: a.data.data.paySign,
                        success: function(a) {
                            wx.showLoading({
                                title: "加载中"
                            }), t.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    control: "shop",
                                    order_id: r,
                                    op: "sendMsg",
                                    uniacid: e,
                                    prepay_id: n
                                },
                                success: function() {
                                    wx.showModal({
                                        title: "提示",
                                        content: "支付成功",
                                        showCancel: !1,
                                        success: function() {
                                            wx.redirectTo({
                                                url: "../orderList/index"
                                            });
                                        }
                                    }), wx.hideLoading();
                                }
                            });
                        },
                        fail: function(t) {
                            wx.showModal({
                                title: "系统提示",
                                content: "您取消了支付!",
                                showCancel: !1,
                                success: function(t) {}
                            }), wx.hideLoading();
                        }
                    });
                } else console.log("fail1");
            },
            fail: function(t) {
                "JSAPI支付必须传openid" == t.data.message ? wx.navigateTo({
                    url: "/kundian_farm/pages/login/index"
                }) : wx.showModal({
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
    applyRefund: function(t) {
        var a = wx.getStorageSync("uid_" + e), r = t.currentTarget.dataset.orderid, n = {
            control: "order",
            op: "applyRefund",
            uid: a,
            uniacid: e,
            order_id: r
        };
        this.sendRequest("确认申请退款吗？", n, 2);
    },
    sureGoods: function(t) {
        var a = wx.getStorageSync("uid_" + e), r = t.currentTarget.dataset.orderid, n = {
            control: "order",
            op: "sureGoods",
            uid: a,
            uniacid: e,
            order_id: r
        };
        this.sendRequest("确认已经收到货了吗?", n, 3);
    },
    deliverGoods: function(t) {
        var order_id = t.currentTarget.dataset.orderid;
        this.setData({
            is_show: 2,
            buy_type: 1,
            order_id: order_id
        })
        // console.log(this.data);
        // var a = wx.getStorageSync("uid_" + e), r = t.currentTarget.dataset.orderid, n = {
        //     control: "order",
        //     op: "deliverGoods",
        //     uid: a,
        //     uniacid: e,
        //     order_id: r
        // };
        // this.sendRequest("确认发货吗?", n, 3);
    },
    hideModal: function() {
        this.setData({
            is_show: 1
        });
    },
    intoOrderDetail: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../orderDetails/index?order_id=" + e
        });
    },
    onReachBottom: function(e) {
        var a = this, r = t.siteInfo.uniacid, n = wx.getStorageSync("uid_" + r), d = a.data, o = d.currentIndex, i = d.page, s = d.orderData;
        t.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "order",
                op: "orderShopList",
                uniacid: r,
                uid: n,
                status: o,
                page: i,
                store_id:a.data.store_id
            },
            success: function(t) {
                if (t.data.orderData) {
                    for (var e = t.data.orderData, r = 0; r < e.length; r++) s.push(e[r]);
                    a.setData({
                        orderData: s,
                        page: parseInt(i) + 1
                    });
                }
            }
        });
    },
    deleteOrder: function(t) {
        var a = wx.getStorageSync("uid_" + e), r = t.currentTarget.dataset.orderid, n = {
            control: "order",
            op: "deleteOrder",
            uniacid: e,
            orderid: r,
            uid: a
        };
        this.sendRequest("确认删除订单吗?", n, 4);
    },
    commentOrder: function(t) {
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/comment/index?order_id=" + t.currentTarget.dataset.orderid
        });
    },
    showVerifyQrocde: function(t) {
        var e = t.currentTarget.dataset.orderid, a = "";
        this.data.orderData.map(function(t) {
            t.id == e && (a = t.offline_qrocde);
        }), this.setData({
            verify_qrcode: a,
            show_verify: !1
        });
    },
    hideVerify: function(t) {
        this.setData({
            show_verify: !0
        });
    },
    deliverSubmit: function(t) {
        var a = this,store_id = a.data.store_id, uid= wx.getStorageSync("uid_" + e), order_id=a.data.order_id;
        var tt = new getApp()
        var url = tt.util.getNewUrl("entry/wxapp/class", "kundian_farm");
       
        if(t.detail.value.deliverNumber == ""){
            wx.showToast({
                title: "快递单号不能为空",
                icon: "none"
            });
            return ;
        }
        if(t.detail.value.deliverCompany == ""){
            wx.showToast({
                title: "快递公司不能为空",
                icon: "none"
            });
            return ;
        }
        wx.request({
            url: url,   
            data: {
                control: "shop",
                op: "deliverSubmit",
                order_id: order_id,
                deliverNumber: t.detail.value.deliverNumber,
                deliverCompany:  t.detail.value.deliverCompany,
                store_id: store_id,
                uid: uid
            },
            success: function(t) {
                0 == t.data.code ? wx.showToast({
                    title: "发货成功!",
                    icon: "none",
                    duration: 1000,
                    success: function(t) {
                        wx.navigateTo({
                            url: "../order/index?store_id=" + store_id
                        })
                    }
                }) : wx.showToast({
                    title: "发货失败",
                    icon: "none"
                });
            }
        })
    },
});