/*
 * @Author: Shber
 * @Date: 2023-09-13 18:48:16
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-21 10:25:19
 * @Description: 
 */
// var n = new getApp();
var a = new getApp(), t = a.siteInfo.uniacid;


let timer = null
Page({
  data: {
    username: '',
    password: '',
    code:'',
    time: 60,
  },
  onLoad: function (a) {
  },
  sendCode(){
    const self = this
    if(this.data.username.length != 11){
      return wx.showToast({ title: "手机号不正确", icon: "none", });
    }
    a.util.request({
      url: "entry/wxapp/class",
      data: {
          op: "getCode",
          control: "login",
          uniacid: t,
          username: self.data.username
      },
      success: function(a) {
        wx.showToast({ title: "发送成功", icon: "none", });
        timer = setInterval(()=>{
          if(self.data.time == 0){clearInterval(timer) 
            self.setData({time: 60})
            return false
          }
          self.setData({time: self.data.time-1})
        },1000)
      }
    });
  },
  bindKeyInput: function (e) {
    const {name} = e.currentTarget.dataset
    this.setData({
      [name]: e.detail.value
    })
  },
  submit(){
    console.log(this.data);
    const self = this
    if(this.data.username.length != 11){
      return wx.showToast({ title: "手机号不正确", icon: "none", });
    }
    if(!this.data.password){
      return wx.showToast({ title: "请输入密码", icon: "none", });
    }
    if(!this.data.code){
      return wx.showToast({ title: "请输入验证码", icon: "none", });
    }

    a.util.request({
      url: "entry/wxapp/class",
      data: {
          op: "register",
          control: "login",
          uniacid: t,
          ...self.data
      },
      success: function(res) {
        if(res.data.code == 0){
          wx.showToast({ title: "注册成功", icon: "none", complete(){
            setTimeout(()=>{          
            wx.reLaunch({
              url: '/kundian_farm/pages/login/index'
            })},2000)
          }
          });
        }else{
          wx.showToast({ title: res.data.msg, icon: "none", });
        }
        wx.hideLoading();
      }
  });

  },
  goPath () {
    wx.reLaunch({
      url: '/kundian_farm/pages/login/index'
    });
  },

});