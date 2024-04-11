Component({
    /**
     * 组件的属性列表 //传过来的参数
     */
    properties: {
      showPopup:{ 
        type:Boolean,
      },
      height:{
        type:Number
        }
    },
    data: {
      localArray:["西安","重庆","北京市","西安","重庆","北京", ],
      // showPopup: true,
    },
    options: {
      multipleSlots: true // 复数插槽: 是
    },
    methods: {
      showPopup() { // 显示弹窗
        this.setData({ showPopup: true});
      },
      hidePopup() { // 隐藏弹窗
        this.setData({showPopup: false});
      },
    }
  })