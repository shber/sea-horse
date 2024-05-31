/*
 * @Author: Shber
 * @Date: 2019-08-23 19:19:20
 * @LastEditors: Shber
 * @LastEditTime: 2024-05-31 10:32:22
 * @Description: 
 */
Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        list: {
            type: Array,
            value: [
                {
                    "id": "24",
                    "name": "首页",
                    "icon": "https://yhm.m666m.cc/attachment/images/4/2024/04/nD9EROZzXE58N8z98xCeXNx18HhE9f.png",
                    "select_icon": "https://yhm.m666m.cc/attachment/images/4/2024/04/BDdlllmt9o1qtZHxlrha98XA1IAwEL.png",
                    "path": "kundian_farm/pages/HomePage/index/index",
                    "color": "#B3B3B3",
                    "select_color": "#447FFF",
                    "rank": "1",
                    "uniacid": "4"
                },
                {
                    "id": "28",
                    "name": "我的",
                    "icon": "https://yhm.m666m.cc/attachment/images/4/2024/04/H1vssRroS5zOb82BVJBWQCC8b6XWsj.png",
                    "select_icon": "https://yhm.m666m.cc/attachment/images/4/2024/04/o60FSk387KNR4Y846p8fR60fY60F4S.png",
                    "path": "kundian_farm/pages/user/center/index",
                    "color": "#B3B3B3",
                    "select_color": "#447FFF",
                    "rank": "5",
                    "uniacid": "4"
                }
            ]
        },
        path: {
            type: String,
            value: "kundian_farm/pages/HomePage/index/index"
        },
        SystemInfo: {
            type: Object,
            value: {}
        }
    },
    data: {
        os_x: !1,
        isOpen: wx.getStorageSync("isOpen"),
        newList:  [{
                "id": "24",
                "name": "首页",
                "icon": "https://yhm.m666m.cc/attachment/images/4/2024/04/nD9EROZzXE58N8z98xCeXNx18HhE9f.png",
                "select_icon": "https://yhm.m666m.cc/attachment/images/4/2024/04/BDdlllmt9o1qtZHxlrha98XA1IAwEL.png",
                "path": "kundian_farm/pages/HomePage/index/index",
                "color": "#B3B3B3",
                "select_color": "#447FFF",
                "rank": "1",
                "uniacid": "4"
            },
            {
                "id": "28",
                "name": "我的",
                "icon": "https://yhm.m666m.cc/attachment/images/4/2024/04/H1vssRroS5zOb82BVJBWQCC8b6XWsj.png",
                "select_icon": "https://yhm.m666m.cc/attachment/images/4/2024/04/o60FSk387KNR4Y846p8fR60fY60F4S.png",
                "path": "kundian_farm/pages/user/center/index",
                "color": "#B3B3B3",
                "select_color": "#447FFF",
                "rank": "5",
                "uniacid": "4"
            }]
    },
    attached: function() {
        var t = !1;
        this.data.SystemInfo.model.indexOf("iPhone X") > -1 && (t = !0), this.setData({
            os_x: t
        });
        if(wx.getStorageSync("isOpen") == 1){
            this.setData({
                newList: [{"id":"24","name":"首页","icon":"https://yhm.m666m.cc/attachment/images/4/2024/04/nD9EROZzXE58N8z98xCeXNx18HhE9f.png","select_icon":"https://yhm.m666m.cc/attachment/images/4/2024/04/BDdlllmt9o1qtZHxlrha98XA1IAwEL.png","path":"kundian_farm/pages/HomePage/index/index","color":"#B3B3B3","select_color":"#447FFF","rank":"1","uniacid":"4"},{"id":"29","name":"转卖","icon":"https://yhm.m666m.cc/attachment/images/4/2024/04/A18BHoMhvSAAhkhnOMZs8bb39A9VMD.png","select_icon":"https://yhm.m666m.cc/attachment/images/4/2024/04/fFFS9D9f0Xo69ZNaz8Qdxoq9IzF3oi.png","path":"kundian_farm/pages/shop/Adopt/index","color":"#B3B3B3","select_color":"#447FFF","rank":"2","uniacid":"4"},{"id":"27","name":"商城","icon":"https://yhm.m666m.cc/attachment/images/4/2024/04/D50j0ZUv5b0454B53i0cjBuJ0V03Ai.png","select_icon":"https://yhm.m666m.cc/attachment/images/4/2024/04/Wgh1DzUuET8g7hPqeVt8Ewd882761z.png","path":"kundian_farm/pages/shop/index/index","color":"#B3B3B3","select_color":"#447FFF","rank":"4","uniacid":"4"},{"id":"28","name":"我的","icon":"https://yhm.m666m.cc/attachment/images/4/2024/04/H1vssRroS5zOb82BVJBWQCC8b6XWsj.png","select_icon":"https://yhm.m666m.cc/attachment/images/4/2024/04/o60FSk387KNR4Y846p8fR60fY60F4S.png","path":"kundian_farm/pages/user/center/index","color":"#B3B3B3","select_color":"#447FFF","rank":"5","uniacid":"4"}]
            })
        }
    },
    methods: {
        navTo: function(t) {
            var e = t.currentTarget.dataset, a = e.path;
            e.current || wx.reLaunch({
                url: "/" + a + "?is_tarbar=true"
            });
        }
    }
});