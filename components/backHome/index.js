const app = getApp();
Component({
  data: {
    backBtnShow: true,
    statusBarHeight: 0,
    navBarHeight: 0,
    pageDepth: 1,
    width:''
  },
  properties: {
    title: {
      type: String,
      value: '名厨MINGCHU'
    },
    userId: {
      type: Number,
      value: 0
    },
    isShow: {
      type: Boolean,
      value: true
    },
    isTransparent: {
      type: Boolean,
      value: false
    },
    isBtnShow: {
      type: Boolean,
      value: true
    },
    isHome: {
      type: Boolean,
      value: false
    },
    titleLeft: {
      type: Boolean,
      value: false
    },
    Share:{
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    ready: function () {
      this.getNavigationInfo()
      const pages = getCurrentPages();
      const pagesLen = pages.length;
      console.log('页面栈层级', pagesLen);
      // 在组件实例进入页面节点树时执行
      const page = getCurrentPages();
      this.data.pageDepth = page.length;
      const launchType = app.globalData.launchType;
      let loginInfo = wx.getStorageSync('LOGININFO') ? JSON.parse(wx.getStorageSync('LOGININFO')) : {
        uid: '',
        auth_token: ''
      };

      // 页面栈层级限制返回按钮还是回首页按钮
      this.setData({
        backBtnShow: pagesLen == 1
      });
      // 判断场景值是不是分享（是则显示），不是在判断uid是不是一个人（是则显示），不是则看看是不是首页
      if (Boolean(loginInfo.uid) && loginInfo.uid == this.properties.userId) {
        this.setData({
          isBtnShow: false
        });
      }

      let systemInfo = wx.getSystemInfoSync(); // 自定义title的适配
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight
      }); // 获取到设备系统栏的高度
      if (systemInfo.model.indexOf('iPhone') !== -1) {
        // title的高度
        this.setData({
          navBarHeight: 44
        });
      } else {
        this.setData({
          navBarHeight: 48
        });
      }

      // this.safeMarginTop = this.data.statusBarHeight + this.data.navBarHeight
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      this.setData({
        launchBtnShow: false
      });
    }
  },
  onLoad ($info) {

  },
  methods: {
    goPathFn (e) {
      const {
        index,
        url
      } = e.currentTarget.dataset;
      console.log("33333", this.data.pageDepth);
      // let loginInfo = wx.getStorageSync("LOGININFO") ? JSON.parse(wx.getStorageSync("LOGININFO")) : { uid: '', auth_token: '' };
      if (this.data.pageDepth == 1) {
        wx.reLaunch({ // 拼好的跳转路径  不能用redirectTo 虽然不新开页面，但是不能清除历史访问记录
          url: '/kundian_farm/pages/HomePage/index/index'
        });
      } else {
        wx.navigateBack({
          delta: 1
        });
      }
    },
  // 获取导航栏胶囊宽高度
  getNavigationInfo () {
    var that = this;
    wx.getSystemInfo({
      success (res) {
        const menuButton = wx.getMenuButtonBoundingClientRect();
        that.setData({
          width: menuButton.width+(res.windowWidth - menuButton.right)+14,
        })
      }
    })
  }
  }
});