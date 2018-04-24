<template>
  <div class="md-movie-item">
    <view class="md-movie-item__item">
      <image class="md-movie-item__poster" :src="movie.images.small"></image>
      <view class="md-movie-item__meta">
        <text class="md-movie-item__title">{{ movie.title }}</text>
        <text class="md-movie-item__sub-title">{{ movie.original_title }} ({{ movie.year }})</text>
        <view class="md-movie-item__artists">导演：<block v-for="(director, i) in movie.directors" :key="director.id"> {{ director.name }} </block></view>
      </view>
      <view class="md-movie-item__rating">
        <text class="md-movie-item__rating-text">{{ movie.rating.average }}</text>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
    default () {
      return {}
    }
  }
}
</script>

<style lang="scss">
@import "node_modules/sass-bem/bem";
$bem-component-namespace: 'md';

@include c('movie-item') {

  @include e('item') {
    display: flex;
    padding: 20rpx 40rpx;
    border-bottom: 1rpx solid #eee;
    cursor: pointer;
  }

  @include e('poster') {
    width: 128rpx;
    height: 168rpx;
    margin-right: 20rpx;
  }

  @include e('meta') {
    flex: 1;
  }

  @include e('title') {
    display: block;
    margin-bottom: 15rpx;
    font-size: 32rpx;
  }

  @include e('sub-title') {
    display: block;
    margin-bottom: 15rpx;
    font-size: 22rpx;
    color: #c0c0c0;
  }

  @include e('artists') {
    font-size: 24rpx;
    color: #999;
  }

  @include e('rating-text') {
    display: inline-block;
    width: 40rpx;
    font-size: 28rpx;
    font-weight: bold;
    text-align: center;
    background-color: rgba(247, 76, 49, 0.8);
    color: #fff;
    padding: 10rpx;
    border-radius: 20rpx;
  }
}

</style>
