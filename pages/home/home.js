// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "",
    latitude: "",
    city: "",
    address: ""
  },


  getLocation2() {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getLocation({
      type: 'wgs84',
      
      altitude: false,
      success: (result) => {
        console.log(result);
        // this.setData({
        //   longitude: result.longitude,
        //   latitude: result.latitude
        // });

        this.data.longitude = result.longitude;
        this.data.latitude = result.latitude;
        this.setData(this.data)

        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?',
          data: {
            key: "8f59962e6c9c8d61bf7c86af814ce33b",
            location: result.longitude + "," + result.latitude
          },
          header: {'content-type':'application/json'},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            console.log(result);
            this.data.city = result.data.regeocode.addressComponent.city;
            this.data.address = result.data.regeocode.formatted_address;
            this.setData(this.data)
          },
          fail: () => {},
          complete: () => {}
        });
      },
      fail: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
  
})