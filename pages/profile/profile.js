// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'Jack',
    age: 18,
    items: [
      {
        icon: "/assets/imgs/icon_yz_ownercase_vr@2x.png",
        title: "观影分析",
        count: 0,
        seeType: "看过",
        mark: "标记10部影片\n开启观影分析"
      },
      {
        icon: "/assets/imgs/icon_yz_ownercase_vr@2x.png",
        title: "读书分析",
        count: 10,
        seeType: "读过",
        mark: "标记100部书\n开启读书分析"
      },
      {
        icon: "/assets/imgs/icon_yz_ownercase_vr@2x.png",
        title: "音乐分析",
        count: 11,
        seeType: "听过",
        mark: "听过10首音乐\n开启音乐分析"
      },
      {
        icon: "/assets/imgs/icon_yz_ownercase_vr@2x.png",
        title: "读书分析",
        count: 10,
        seeType: "读过",
        mark: "标记100部书\n开启读书分析"
      },
      {
        icon: "/assets/imgs/icon_yz_ownercase_vr@2x.png",
        title: "音乐分析",
        count: 11,
        seeType: "听过",
        mark: "听过10首音乐\n开启音乐分析"
      }
    ]
  },

  beginBtnClick: function(evt1){
    let index = evt1.currentTarget.dataset.index;
    if (index == 0){
      console.log("观影分析");
    }else if (index == 1){
      console.log("读书分析");
    }else if (index == 2){
      console.log("音乐分析");
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  login() {
    console.log("login");
    wx.navigateTo({
      url: '/pages/login/login',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  }
})