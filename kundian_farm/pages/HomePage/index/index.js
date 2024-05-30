/*
 * @Author: Shber
 * @Date: 2019-08-23 19:19:20
 * @LastEditors: Shber
 * @LastEditTime: 2024-05-30 15:55:17
 * @Description: 
 */
var r = new getApp()
var a = new getApp(), t = a.siteInfo.uniacid;
import * as echarts from '../../../../components/echarts/ec-canvas/echarts';

function setOption(chart, x=[], y1=[], y2=[]) {
  var option = {
    grid: {
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data:x
    },
    yAxis: {
      x: 'center',
      type: 'value',
      axisLabel: {
        show: false  // 隐藏 Y 轴标签
        },
      splitLine: {
        show: false, // 隐藏 Y 轴的分割线
      }
    },
    series: [{
      name: '价格',
      type: 'line',
      data:y1,
      // symbol: 'none', 
      lineStyle: { color: '#ED4F4F' },
      itemStyle: {
        color: '#ED4F4F' // 设置圆点的颜色
      },
      label: {
        show: true, // 显示标签
        color: '#ED4F4F',
        formatter: function (params) { // 使用函数来设置标签的内容
          if (params.value !== 0) {
              return params.value;
          } else {
              return ''; // 如果值为 0，返回空字符串，不显示标签
          }
        },
        position: 'top' // 标签位置
      }
    }, {
      name: '销量',
      type: 'line',
      data: y2,
      // symbol: 'none',
      lineStyle: { color: '#447FFF' },
      itemStyle: {
        color: '#447FFF' // 设置圆点的颜色
      },
      label: {
        show: true, // 显示标签
        color: '#447FFF',
        formatter: function (params) { // 使用函数来设置标签的内容
          if (params.value !== 0) {
              return params.value;
          } else {
              return ''; // 如果值为 0，返回空字符串，不显示标签
          }
        },
        position: 'top' // 标签位置
      }
    }]
  };
  chart.setOption(option);
}

Page({
    data: {
        ec: {
          onInit: null,
          lazyLoad: true
        },
        isLoaded: false,
        isDisposed: false,
        SystemInfo: a.globalData.sysData,
        tarbar: a.tarbar,
        background: ['https://st-b2b.maiyatian.com/product/202404/t254984736522305.png', 
        'https://st-b2b.maiyatian.com/product/202404/t254984736522305.png', 
        'https://st-b2b.maiyatian.com/product/202404/t254984736522305.png'],
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 500,
        page: [],
        Adopt:[],
        progressNum: 0,
        isOpen: 1,
    },
    onLoad: function(e) {
      const self = this
      this.getOpenStatus()
      this.getFirstData()
      this.getAdoptList()
      var u = e.user_uid || 0, g = wx.getStorageSync("uid_" + t);
      void 0 != u && 0 != u && (wx.setStorageSync("farm_share_uid", u), a.loginBindParent(u, g));

    },
    onShow: function() {
      // this.getStatistics()
    },
    onReady(){
      this.ecComponent = this.selectComponent('#mychart_line');
      this.getStatistics()
    },
    intoArticle(t) {
      wx.navigateTo({
          url: "/kundian_farm/pages/information/index/index"
      });
    },
    intoAdopt(e) {
      const {id} = e.currentTarget.dataset;
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/AdoptRules/index?aid="+id
        });
    },
    onPageScroll: function(a) {
        // var t = a.scrollTop;
        // this.setData({
        //     scrollTop: t
        // });
    },
    getOpenStatus: function(){
      const self = this
      a.util.request({
        url: 'entry/wxapp/class',
        data: {
            op: "getOpen",
            uniacid: t,
            control: "index"
        },
        success: function(res) {
          self.setData({isOpen: res.data.open })
          wx.setStorageSync("open", res.data.open)
        }
      });
    },
    getFirstData: function() {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r = this, n = wx.getStorageSync("uid_" + t);
      wx.getStorageSync("kundian_farm_setData");
      a.util.request({
          url: "entry/wxapp/class",
          data: {
              op: "getHomeData",
              control: "index",
              uniacid: t,
              uid: n,
              refresh: e
          },
          success: function(a) {
              new Array();
              var e = !1;
              "search" == a.data.page[0].type && (e = !0), e || (r.data.barDistance = 128, r.data.isIphoneX && (r.data.barDistance = 176));
              var n = a.data, i = n.page;
              n.icon;
              r.setData({
                  page: i,
                  loading: !1,
                  icon: a.data.icon,
                  barDistance: r.data.barDistance
              }), wx.setStorageSync("kundianFarmHomePage", a.data);
              var o = parseInt(new Date().valueOf()) + 18e5;
              wx.setStorageSync("kundianFarmHomePage_time" + t, o);
              console.log(this.data);
          }
      });
    },

    getAdoptList: function() {
      var t = this;
      // wx.showLoading({
      //     title: "玩命加载中"
      // }), 
      r.util.request({
          url: "entry/wxapp/class",
          data: {
              control: "animal",
              op: "index",
              uniacid: t
          },
          success: function(a) {
              var r = a.data.animalData, e = r[0].animal_src;
              let list = r.map(res=>{
                res.progressNum = (res.putaway_time *1/ res.mature_period*1) * 100
                return res
              })
              t.setData({
                  Adopt: list,
              })
              // wx.hideLoading();
          }
      })
    },

    getStatistics: function() {
      const self = this
      // wx.showLoading({
      //     title: "加载中"
      // }), 
      r.util.request({
          url: "entry/wxapp/class",
          data: {
              control: "index",
              op: "getTongJi",
              uniacid: t
          },
          success: function(res) {
            self.ecComponent.init((canvas, width, height=100, dpr)=> {
              const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // 像素比
              });
              canvas.setChart(chart);
            
              setOption(chart, res.data.x, res.data.y1, res.data.y2);
              self.chart = chart;
              self.setData({
                isLoaded: true,
                isDisposed: false
              });
              return chart;
            }) 
          }
      })
    },

    onShareAppMessage: function() {

    },
    onPullDownRefresh: function(e) {
        wx.showLoading({
            title: "玩命加载中..."
        });
    },
});