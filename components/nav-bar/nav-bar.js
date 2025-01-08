// components/nav-bar/nav-bar.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    titleColor: {
      type: String,
      value: "#000000"
    },
    backgroundColor: {
      type: String,
      value: "#FFFFFF"
    },
    back: {
      type: String,
      value: "true"
    },
    home: {
      type: String,
      value: "true"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarStyle: '',
    navBarStyle: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backClick() {
      wx.navigateBack()
    },

    homeClick() {
      wx.navigateBack({
        delta: 100
      })
    }
  },

  lifetimes: {
    attached() {
      const statusBarStyle = `
      height: ${ wx.db.statusBarHeight }px;
      background-color: ${ this.data.backgroundColor }
      `
      const navBarStyle = `
      color: ${ this.data.titleColor }
      height: ${ wx.db.navBarHeight }px;
      background-color: ${ this.data.backgroundColor }
      `
      this.setData({
        statusBarStyle: statusBarStyle,
        navBarStyle: navBarStyle
      })
    }
  }
})