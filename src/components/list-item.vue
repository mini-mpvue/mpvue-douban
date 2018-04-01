<template>
  <div class="md-list-item">
    <view class="item">
      <image class="poster" :src="movie.images.small"></image>
      <view class="meta">
        <text class="title">{{ movie.title }}</text>
        <text class="sub-title">{{ movie.original_title }} ({{ movie.year }})</text>
        <view class="artists">导演：<block v-for="(director, i) in movie.directors" :key="director.id"> {{ director.name }} </block></view>
      </view>
      <view class="rating">
        <text>{{ movie.rating.average }}</text>
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

<style>
</style>
