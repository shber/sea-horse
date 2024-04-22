/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-22 11:05:34
 * @Description: 
 */
// var n = new getApp();
var a = new getApp(), t = a.siteInfo.uniacid;

Page({
  data: {
    username: '',
    password: '',
  },
  onLoad: function (a) {
  },
  bindKeyInput: function (e) {
    const {name} = e.currentTarget.dataset
    this.setData({
      [name]: e.detail.value
    })
  },
  submit(){
    const self = this
    if(this.data.username.length != 11){
      return wx.showToast({ title: "手机号不正确", icon: "none", });
    }
    if(!this.data.password){
      return wx.showToast({ title: "请输入密码", icon: "none", });
    }
    const userInfo = wx.getStorageSync("userInfo")
    wx.showLoading({
      title: "登录中..."
    }) 
    a.util.request({
      url: "entry/wxapp/class",
      data: {
          op: "login",
          control: "login",
          uniacid: t,
          ...self.data
      },
      success: function({data}) {
        if(data.code == 0){
          // if(!userInfo.sessionid){
          //   self.setData({setAuth:true})
          //   return wx.showToast({ title: "登录成功,请绑定微信账号", icon: "none", });
          // }else{
              wx.setStorage("open_uid", data.userInfo.uid)
              wx.setStorageSync("userInfo", data)
              wx.setStorageSync("uid_" + data.userInfo.uniacid, data.userInfo.uid)
              wx.setStorageSync("kundian_farm_sessionid", data.sessionid)
              wx.setStorageSync("kundian_farm_wxInfo", data.userInfo);
              // wx.reLaunch({
              //   url: '/kundian_farm/pages/HomePage/index/index'
              // });
              self.setData({setAuth:true})
              return wx.showToast({ title: "登录成功,请绑定微信账号", icon: "none", });
          // }
          // wx.showToast({ title: "登录成功,请绑定微信账号", icon: "none", });
          // self.setData({setAuth:true})
          // self.updateUserInfo()
        }else{
          wx.showToast({ title: data.msg, icon: "none", });
        }
        wx.hideLoading();
      }
    });

  },
  updateUserInfo(){
    const self = this
    a.util.getUserInfo(function (n) {
        console.log(n, '测试打印1');
        // wx.setStorageSync("uid_" + t, n.userInfo.uid), 
        wx.setStorageSync("kundian_farm_sessionid", n.sessionid),
        // wx.setStorageSync("kundian_farm_wxInfo", n.wxInfo);
        wx.showToast({ title: "授权成功", icon: "none", });
        self.setData({setAuth:false})
                
        wx.reLaunch({
          url: '/kundian_farm/pages/HomePage/index/index'
        });
    })

  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/register/index'
    });
  },

});