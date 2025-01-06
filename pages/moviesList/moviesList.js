// pages/moviesList/moviesList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(obj) {
    /// 设置标题
    wx.setNavigationBarTitle({
      title: obj.title,
    })

    // 使用同步方法获取缓存
    const movies = wx.getStorageSync(obj.title)
    if (movies) {
      this.data.movies = movies
    } else {
      this.data.movies = []
    }
    this.setData(this.data)
  },

})