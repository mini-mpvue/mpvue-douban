<template>
  <div class="md-movie-list">
    <view class="md-movie-list__list">
      <template v-if="type !== 'us_box'">
        <navigator :url="'/pages/movie/item?id=' + item.id" v-for="(item, index) in movies" :key="item.id">
          <movie-item :movie="item"></movie-item>
        </navigator>
      </template>
      <template v-else>
        <navigator :url="'/pages/movie/item?id=' + item.subject.id" v-for="(item, index) in movies" :key="item.rank">
          <movie-item :movie="item.subject"></movie-item>
        </navigator>
      </template>
      <view class="md-movie-list__tips">
        <view v-if="hasMore">
          <image class="md-movie-list__tips-image"  src="/static/images/loading.gif" mode="aspectFill"/>
          <text class="md-movie-list__tips-text">正在加载...</text>
        </view>
        <view v-else>
          <text>--------------- 我也是有底线的 --------------</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import MovieItem from '@/components/movie-item'

export default {
  components: {
    'movie-item': MovieItem
  },

  props: {
    movies: {
      type: Array,
      default () {
        return []
      }
    },
    hasMore: {
      type: Boolean,
      default: true
    },

    type: String
  }
}
</script>

<style lang="scss">
@include c('movie-list') {

  @include e('list') {
    height: 100%;
  }

  @include e('tips') {
    font-size: 28rpx;
    text-align: center;
    padding: 50rpx;
    color: #ccc;
  }

  @include e('tips-text') {
    vertical-align: middle;
  }

  @include e('tips-image') {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
    vertical-align: middle;
  }
}

</style>
