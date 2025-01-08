// pages/moviesList/moviesList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(obj) {
    /// 设置标题
    // wx.setNavigationBarTitle({
    //   title: obj.title,
    // })

    this.data.title = obj.title
    // 使用同步方法获取缓存
    const movies = wx.getStorageSync(obj.title)
    if (movies) {
      this.data.movies = movies
    } else {
      this.data.movies = []
    }
    this.setData(this.data)
  },

  back(evt, obj){
    console.log(evt, obj)
  },

  home(evt, obj){
    console.log(evt, obj)
  }

})