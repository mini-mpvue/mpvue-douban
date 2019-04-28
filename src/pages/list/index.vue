<template>
  <div class="md-list">
    <movie-list :movies="movies" :has-more="hasMore" :type="type"></movie-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import wx from '@/utils/wx'
import MovieList from '@/components/movie-list'
import { LIST_CLEAR_STATE } from '@/store/mutations-type'

export default {
  components: {
    'movie-list': MovieList
  },

  data () {
    return {
      type: ''
    }
  },

  computed: {
    ...mapState('list', ['movies', 'hasMore', 'type'])
  },

  methods: {
    ...mapMutations('list', {
      clearState: LIST_CLEAR_STATE
    }),
    ...mapActions('list', [
      'getMovies'
    ]),
    async getMovieList () {
      await this.getMovies({ type: this.type })
    }
  },

  mounted () {
    const { title, type } = this.$root.$mp.query
    wx.setNavigationBarTitle({ title: title + ' « 电影 « 豆瓣' })
    this.type = type
    this.getMovieList()
  },

  async onPullDownRefresh () { // 下拉刷新
    this.clearState()
    await this.getMovieList()
    wx.stopPullDownRefresh()
  },

  onReachBottom () { // 上拉加载
    this.getMovieList()
  },

  onUnload () { // 清空状态
    this.clearState()
  }
}
</script>

<style>
</style>
