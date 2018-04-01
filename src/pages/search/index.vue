<template>
  <div class="md-board">
    <view class="header">
      <input class="search" v-model="q" :placeholder="subtitle" placeholder-class="search-placeholder" auto-focus @change="handleSearch"/>
    </view>
    <movie-list v-if="movies.length" :movies="movies" :has-more="hasMore"></movie-list>
  </div>
</template>

<script>
import { getBoardData } from '@/utils/api'
import MovieList from '@/components/movie-list'

export default {
  components: {
    'movie-list': MovieList
  },

  data () {
    return {
      q: '',
      subtitle: '请在此输入搜索内容',
      movies: [],
      page: 1,
      hasMore: true
    }
  },

  methods: {
    async getSearchData () {
      if (!this.hasMore) return

      let data = await getBoardData({ board: 'search', page: this.page++, search: this.q })
      data = JSON.parse(data)

      if (data.subjects.length) {
        this.movies.push.apply(this.movies, data.subjects)
      } else {
        this.hasMore = false
      }
    },

    resetData () {
      this.movies = []
      this.page = 1
      this.hasMore = true
    },

    handleSearch () {
      this.resetData()
      this.getSearchData()
    }
  },

  onReachBottom () { // 上拉加载
    this.getSearchData()
  },

  onUnload () { // 清空状态
    this.resetData()
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: center;
  border-bottom: 1rpx solid #ccc;
}

.header .search {
  width: 100%;
  padding: 20rpx 40rpx;
  color: #666;
  font-size: 38rpx;
  text-align: center;
}

.header .search-placeholder {
  color: #ccc;
  font-size: 38rpx;
  text-align: center;
}
</style>
