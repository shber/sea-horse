/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-15 20:13:44
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
    console.log('name', name, e.detail.value);
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
          wx.showToast({ title: "登录成功", icon: "none", });
          // wx.setStorageSync("userInfo", data)
          wx.setStorageSync("uid_" + data.userInfo.uniacid, data.userInfo.uid)
          wx.setStorageSync("kundian_farm_sessionid", data.sessionid)
          wx.setStorageSync("kundian_farm_wxInfo", data.userInfo);
          wx.reLaunch({
            url: '/kundian_farm/pages/HomePage/index/index'
          });
        }else{
          wx.showToast({ title: data.msg, icon: "none", });
        }
        wx.hideLoading();
      }
  });

  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/register/index'
    });
  },

});