// components/movie-item/movie-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,// 类型
      value: null // 默认值
    }// 属性
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick() {
      const movieJsonString = encodeURIComponent(JSON.stringify(this.data.item));
      // const movieJsonString = JSON.stringify(this.data.item)
      wx.navigateTo({
        url: `/pages/movieDetail/movieDetail?movie=${movieJsonString}`,
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }
  }
})