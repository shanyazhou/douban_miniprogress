// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "",
    latitude: "",
    city: "",
    address: "",
    allMovies: [
      {
        title: "想看的电影",
        url: "me/shelf/wishlist",
        movies: []
      },
      {
        title: "在看的电影",
        url: "me/shelf/progress",
        movies: []
      },
      {
        title: "看过的电影",
        url: "me/shelf/complete",
        movies: []
      }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 调用自己的loadCity
    this.loadCity((city) => {
      console.log('获取的城市信息123：'+ city)
      this.loadData(city)
    })


    this.requestLocaMoviesData()

    // this.requetMoveList(0)
    // this.requetMoveList(1)
    // this.requetMoveList(2)

  },

  // 加载城市信息
  loadCity(cityBlock){
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
            // location: `${result.longitude},${result.latitude}`
          },
          header: {'content-type':'application/json'},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            console.log(result);
            let city = result.data.regeocode.addressComponent.city;
            this.data.city = city;
            this.data.address = result.data.regeocode.formatted_address;
            this.setData(this.data)
            // 如果cityBlock成立，才调用后面的（防止前面的cityBlock没有传值）
            cityBlock && cityBlock(city)
          },
          fail: () => {
            console.log("获取城市失败")
          },
          complete: () => {}
        });
      },
      fail: (error) => {
        console.log("获取城市失败")
      },
      complete: () => {}
    });
  },

  // 拿到城市信息，去加载想要的数据
  loadData(city) {
    
    wx.request({
      url: 'https://neodb.social/discover/',
      data: {
        city: city
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result);
      },
      fail: (error) => {
        wx.db.toast(error.errMsg)
      },
      complete: () => {}
    })
  },

  requetMoveList(index) {
    wx.request({
      url: wx.db.url(this.data.allMovies[index].url),
      data: {
        page: 1
      },
      method: 'GET',
      header: {
        'Authorization': 'Bearer TjCZoxryvf4DxbL9nl4RLQLnsPK23b7us69gjdo9216-OjQdQWnBJbJuJw'
      },
      success: (result) => {
        console.log(result);
        let moviesWantToWatch = result.data.data;
        const obj = this.data.allMovies[index]
        for (let index = 0; index < moviesWantToWatch.length; index++ ) {
          this.updateMovie(moviesWantToWatch[index])
        }
        obj.movies = moviesWantToWatch
        this.setData(this.data)

        // 缓存数据
        wx.setStorage({
          key: obj.title,
          data: obj.movies,
          success: (result) => {
            console.log( "234"+ result)
          },
          fail: (error) => {
            console.log(error)
          },
          complete: () => {}
        });
          
      },
      fail: (error) => {
        console.log(error.errMsg);
      }
    });
  },

  // 获取之前的缓存数据
  requestLocaMoviesData(){
    for (let index = 0; index < this.data.allMovies.length; index++) {

      /// 异步方法获取并赋值
      let obj = this.data.allMovies[index]
      wx.getStorage({
        key: obj.title,
        success:  (result) => {
            obj.movies = result.data
            // console.log('123' + result)
            this.setData(this.data)
        },
      }) || []

      // 使用同步方法获取缓存
      // const movies = wx.getStorageSync(obj.title)
      // if (movies) {
      //     obj.movies = movies
      //     console.log('获取缓存成功：', obj.title, movies)
      // } else {
      //     console.log('暂无缓存数据：', obj.title)
      //     obj.movies = []
      // }
      // this.setData(this.data)
    }
    
  },

  /// 将获取到的电影数据进行加工
  updateMovie(movie) {
    let rating = movie.item.rating / 2
    if (rating == 0) return
    movie.stars = {}
    movie.stars.on = parseInt(rating * 10 / 10)
    movie.stars.half = (rating - movie.stars.on) > 0
    movie.stars.off = parseInt(5 - movie.stars.on - (movie.stars.half == true ? 1 : 0))

    console.log(movie)
  },


  /// 关于我
  requetAboutMe() {
    wx.request({
      url: 'https://neodb.social/api/me',
      method: 'GET',
      header: {
        'Authorization': 'Bearer TjCZoxryvf4DxbL9nl4RLQLnsPK23b7us69gjdo9216-OjQdQWnBJbJuJw'
      },
      success: (result) => {
        console.log(result.data);
      },
      fail: (error) => {
        console.log(error.errMsg);
      }
    });
    
  },

  // 注册App
  registApp() {
    wx.request({
      url: 'https://neodb.social/api/v1/apps',
      data: {
        client_name: "myMiniProgress",
        redirect_uris: "urn:ietf:wg:oauth:2.0:oob",
        website: "https://my.site"

      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result);
      },
      fail: (error) => {
        console.log(error.errMsg);
      },
      complete: () => {}
    })
    //返回值
//     client_id: "tk-Qf7hw2Tg7M_K2OPk4DKcew"
// client_secret: "mmQ4aWxQMI1PCdqNMONl5dLfdhPyvAs6MOM958hgTcslcc59hDm9Ag"
// id: "637"
// name: "myMiniProgress"
// redirect_uri: "urn:ietf:wg:oauth:2.0:oob"
// vapid_key: "BJDBcsP7ouFt8sCiAu75QO-KMfOtqKlNljNSs9647vOinNxgFvdJJTl3K7EgSqcnpHbgU6xoa0jJTJ-ZWrAGGow"
// website: "https://my.site"
  },

   //调用这个，得到Authorization Code
  //https://neodb.social/oauth/authorize?response_type=code&client_id=tk-Qf7hw2Tg7M_K2OPk4DKcew&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=read+write
  // Authorization Code
  // esJTYEHCYJkUJW3ZoC1PFU9oJbAIkcE7aGC3b_v6vI41LrDDB8UKie_uEA


  // 获取访问令牌
  requestAccessToken() {
    wx.request({
      url: 'https://neodb.social/oauth/token',
      data: {
        client_id: "tk-Qf7hw2Tg7M_K2OPk4DKcew",
        client_secret: "mmQ4aWxQMI1PCdqNMONl5dLfdhPyvAs6MOM958hgTcslcc59hDm9Ag",
        code: "RuEwUQO8-xaRplUQBh3PwUon2lzpc7SlusjsFrPU-w5HlVRncBU2s9mntQ",
        redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
        grant_type: "authorization_code"
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'  // 确保请求头正确
      },
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result);
      },
      fail: (error) => {
        console.log(error.errMsg);
      },
      complete: () => {}
    })

    // 返回结果
//     access_token: "TjCZoxryvf4DxbL9nl4RLQLnsPK23b7us69gjdo9216-OjQdQWnBJbJuJw"
// created_at: 1735796108
// scope: "read write"
// token_type: "Bearer"
  },

  seeMoreMoviesListClick(res) {
    console.log(res)
    const index = res.currentTarget.dataset.index
    const title = this.data.allMovies[index].title
    const url = this.data.allMovies[index].url
    wx.navigateTo({
      url: `/pages/moviesList/moviesList?title=${ title }&url=${ url }`,//注意是``而不是''
      success: (result) => {
        console.log(result)
      },
      fail: (res) => {
        console.log(res)
      },
      complete: (res) => {},
    })
  }
})