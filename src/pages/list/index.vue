<template>
  <div class="md-list">
    <movie-list :movies="movies" :has-more="hasMore" :type="type"></movie-list>
  </div>
</template>

<script>
import { getBoardData } from '@/utils/api'
import wx from '@/utils/wx'
import MovieList from '@/components/movie-list'

export default {
  components: {
    'movie-list': MovieList
  },

  data () {
    return {
      type: '',
      title: '',
      page: 1,
      hasMore: true,
      movies: []
    }
  },

  methods: {
    async getMovieList () {
      if (!this.hasMore) return

      let data = await getBoardData({ board: this.type, page: this.page++ })
      data = JSON.parse(data)

      if (data.subjects.length) {
        this.movies.push.apply(this.movies, data.subjects)

        if (this.type === 'us_box') {
          this.hasMore = false
        }
      } else {
        this.hasMore = false
      }
    }
  },

  mounted () {
    const { title, type } = this.$root.$mp.query
    wx.setNavigationBarTitle({ title: title + ' « 电影 « 豆瓣' })
    this.title = title
    this.type = type
    this.getMovieList()
  },

  async onPullDownRefresh () { // 下拉刷新
    this.page = 1
    this.movies = []
    this.hasMore = true
    await this.getMovieList()
    wx.stopPullDownRefresh()
  },

  onReachBottom () { // 上拉加载
    this.getMovieList()
  },

  onUnload () { // 清空状态
    this.page = 1
    this.movies = []
    this.hasMore = true
  }
}
</script>

<style>

</style>
