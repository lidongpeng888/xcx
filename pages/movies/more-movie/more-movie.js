//index.js
//获取应用实例
//引用整个项目的app.js用来获取其中的公共变量等
const app = getApp()
const util = require('../../../utils/util')
Page({
    data: {
        movies: {},
        disabledRemind: false,
        isEmpty: true
    },
    onLoad: function (options) {
        const category = options.category
        this.data.navigateTile = category
        let dataUrl = '';
        let path = ''
        switch (category) {
            case '正在热映':
                path = 'in_theaters'
                break;
            case '即将上映':
                path = 'coming_soon'
                break;
            case '豆瓣Top250':
                path = 'top250'
                break;
        }
        dataUrl = `${app.globalData.doubanBase}/v2/movie/${path}`
        wx.setNavigationBarTitle({
            title: category
        })
        this.data.requestUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData)
        wx.showNavigationBarLoading();
    },
    processDoubanData: function (moviesDouban) {
        const movies = []
        if (moviesDouban.subjects.length <= 0) {
            var _this = this;
            if (!_this.data.disabledRemind) {
                _this.setData({
                    disabledRemind: true
                });
                setTimeout(function () {
                    _this.setData({
                        disabledRemind: false
                    });
                }, 2000);
            }
        }
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var score = subject.rating.average + "";
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: score.length == 1 ? subject.rating.average + '.0' : subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp)
        }
        var totalMovies = {}
        if (!this.data.isEmpty) {
            totalMovies = this.data.movies.concat(movies);
        } else {
            totalMovies = movies;
            this.data.isEmpty = false;
        }
        this.setData({
            movies: totalMovies
        });
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
        this.setData({
            hiddenLoading: true
        })
    },
    onMovieTap: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + movieId
        })
    },
})