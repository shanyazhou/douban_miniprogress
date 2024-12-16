// pages/login/login.js
Page({
  wechatLogin: function(){
    console.log('wechatLogin');
    // 跳转到profile页面
    wx.navigateTo({
      url: '/pages/profile/profile',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  },

  doubanLogin: function(){
    console.log('doubanLogin');
  },

  agreementClick: function(){
    console.log('agreementClick');
    wx.navigateTo({
      url: '/pages/agreement/agreement',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
  }


})