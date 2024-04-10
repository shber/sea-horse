/*
 * @Author: Shber
 * @Date: 2019-08-23 19:19:20
 * @LastEditors: Shber
 * @LastEditTime: 2024-04-10 18:49:08
 * @Description: 
 */
var a = new getApp(), t = a.siteInfo.uniacid;
import * as echarts from '../../../../components/echarts/ec-canvas/echarts';

function initChart(canvas, width, height=100, dpr) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // 像素比
    });
    canvas.setChart(chart);
  
    var option = {
        // legend: {
        //   data: ['价格', '销量'],
        //   top: 100,
        //   left: 'top',
        //   backgroundColor: 'white',
        //   z: 100
        // },
        grid: {
          containLabel: false,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['15号', '16号', '17号', '18号', '19号', '20号'],
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
          data: [18, 36, 65, 30, 78, 40, 33],
          symbol: 'none', lineStyle: { color: '#ED4F4F' }
        }, {
          name: '销量',
          type: 'line',
          data: [12, 50, 51, 35, 70, 30, 20],
          symbol: 'none',
          lineStyle: { color: '#447FFF' }
        }]
      };
    chart.setOption(option);
    return chart;
  }

Page({
    data: {
        ec: {
            onInit: initChart
        },
        SystemInfo: a.globalData.sysData,
        tarbar: a.tarbar,
        background: ['https://st-b2b.maiyatian.com/product/202404/t254984736522305.png', 
        'https://st-b2b.maiyatian.com/product/202404/t254984736522305.png', 
        'https://st-b2b.maiyatian.com/product/202404/t254984736522305.png'],
        indicatorDots: false,
        autoplay: true,
        interval: 5000,
        duration: 500
    },
    onLoad: function(e) {

    },
    onPageScroll: function(a) {
        // var t = a.scrollTop;
        // this.setData({
        //     scrollTop: t
        // });
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