<template>
  <div class="md-item">
    <image v-if="movie.images" class="background" :src="movie.images.large" mode="aspectFill"/>
    <block v-if="movie.title">
      <view class="meta">
        <image class="poster" :src="movie.images.large" mode="aspectFit"/>
        <text class="title">{{ movie.title }}({{ movie.year }})</text>
        <text class="info">评分：{{ movie.rating.average }}</text>
        <text class="info">导演：<block v-for="director in movie.directors" :key="director.id"> {{ director.name }} </block></text>
        <text class="info">主演：<block v-for="cast in movie.casts" :key="cast.id"> {{ cast.name }} </block></text>
      </view>
      <view class="summary">
        <text class="label">摘要：</text>
        <text class="content">{{ movie.summary }}</text>
      </view>
    </block>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { CLEAR_MOVIE } from '@/store/mutations-type'
import wx from '@/utils/wx'

export default {
  data () {
    return {
      id: null
    }
  },

  computed: {
    ...mapState('item', {
      movie: state => state.movie
    })
  },

  methods: {
    ...mapActions('item', [
      'getMovie'
    ]),
    ...mapMutations('item', {
      clearMovie: CLEAR_MOVIE
    }),
    async getMovieData (id) {
      await this.getMovie({ id })
      wx.setNavigationBarTitle({ title: this.movie.title + ' « 电影 « 豆瓣' })
    }
  },

  mounted () {
    const id = this.$root.$mp.query.id
    if (!id) {
      return wx.navigateBack()
    }
    this.id = id
    this.getMovieData(id)
  },

  onUnload () {
    this.clearMovie()
  }
}
</script>

<style>
.meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50rpx 40rpx;
}

.poster {
  width: 100%;
  height: 800rpx;
  margin: 20rpx;
}

.title {
  font-style: 42rpx;
  color: #444;
}

.info {
  font-size: 24rpx;
  color: #888;
  margin-top: 20rpx;
  width: 80%;
}

.summary {
  width: 80%;
  margin: 30rpx auto;
}

.label {
  display: block;
  font-size: 30rpx;
  margin-bottom: 30rpx;
}

.content {
  color: #666;
  font-size: 22rpx;
  padding: 2em;
}

.background {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: -1000;
  opacity: .1;
}

</style>
