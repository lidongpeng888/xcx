import {
  Movie
} from 'class/Movie.js';
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    movie: {},
    visible: false
  },
  onLoad: function (options) {
    let movieId = options.id;
    let url = `${app.globalData.doubanBase}/v2/movie/subject/${movieId}`
    let movie = new Movie(url)
    movie.getMovieData((movie) => {
      this.setData({
        movie
      })
      this.setData({
        visible: true
      })
    })
  },
  //点击查看图片
  viewMoviePostImg: function (e) {
    var src=e.currentTarget.dataset.src
    wx.previewImage({
      current:src,// 当前显示图片的http链接
      urls:[src]// 需要预览的图片http链接列表
    })
  }
})