/*
 * @Author: Shber
 * @Date: 2019-08-23 19:19:20
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-19 16:46:57
 * @Description: 
 */
var r = new getApp()
var a = new getApp(), t = a.siteInfo.uniacid;
import * as echarts from '../../../../components/echarts/ec-canvas/echarts';


// function initChart(canvas, width, height=100, dpr) {
//     const chart = echarts.init(canvas, null, {
//       width: width,
//       height: height,
//       devicePixelRatio: dpr // 像素比
//     });
//     canvas.setChart(chart);
  
//     var option = {
//         grid: {
//           containLabel: false,
//         },
//         xAxis: {
//           type: 'category',
//           boundaryGap: false,
//           data: ['15号', '16号', '17号', '18号', '19号', '20号'],
//         },
//         yAxis: {
//           x: 'center',
//           type: 'value',
//           axisLabel: {
//             show: false  // 隐藏 Y 轴标签
//             },
//           splitLine: {
//             show: false, // 隐藏 Y 轴的分割线
//           }
//         },
//         series: [{
//           name: '价格',
//           type: 'line',
//           data: [18, 36, 65, 30, 78, 40, 33],
//           symbol: 'none', lineStyle: { color: '#ED4F4F' }
//         }, {
//           name: '销量',
//           type: 'line',
//           data: [12, 50, 51, 35, 70, 30, 20],
//           symbol: 'none',
//           lineStyle: { color: '#447FFF' }
//         }]
//       };
//     chart.setOption(option);
//     return chart;
//   }

Page({
    data: {
        ec: {
          onInit: null
        },
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
    },
    onLoad: function(e) {
      this.getFirstData()
      this.getAdoptList()
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
            url: "/kundian_farm/pages/shop/AdoptRules/index?id="+id
        });
    },
    onPageScroll: function(a) {
        // var t = a.scrollTop;
        // this.setData({
        //     scrollTop: t
        // });
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
            console.log('aaa', a);
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
              // wx.hideLoading();
              // option.xAxis.data = res.data.x
              // option.series[0].data = res.data.y1
              // option.series[1].data = res.data.y2


              function initChart(canvas, width, height=100, dpr) {
                const chart = echarts.init(canvas, null, {
                  width: width,
                  height: height,
                  devicePixelRatio: dpr // 像素比
                });
                canvas.setChart(chart);
              
                var option = {
                    grid: {
                      containLabel: false,
                    },
                    xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data:res.data.x
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
                      data:res.data.y1,
                      symbol: 'none', lineStyle: { color: '#ED4F4F' }
                    }, {
                      name: '销量',
                      type: 'line',
                      data: res.data.y2,
                      symbol: 'none',
                      lineStyle: { color: '#447FFF' }
                    }]
                  };
                chart.setOption(option);
                return chart;
              }
              self.setData({'ec.onInit': initChart })
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

    onShow: function() {

    }
});