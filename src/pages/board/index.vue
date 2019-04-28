<template>
  <div class="md-board">
    <view class="md-board__slide">
      <swiper
        class="md-board__swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="1000"
      >
        <swiper-item v-for="(movie, index) in movies" :key="index">
          <image class="md-board__slide-image" :src="movie.images.large" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="md-board__list" :scroll-y="true">
      <block v-for="(item, index) in boards" :key="item.key">
        <view class="md-board__item">
          <navigator
            :url="'../list/main?type=' + item.key + '&title=' + item.title"
            hover-class="none"
          >
            <view class="md-board__title">
              <text class="md-board__title-text">{{ item.title }}</text>
              <image
                class="md-board__title-image"
                src="../../../static/images/arrowright.png"
                mode="aspectFill"
              ></image>
            </view>
          </navigator>
          <scroll-view class="md-board__content" :scroll-x="true">
            <view class="md-board__inner" v-if="item.key !== 'us_box'">
              <navigator
                v-for="(movie, i) in item.movies"
                :key="movie.id + index + i"
                :url="'../item/main?id=' + movie.id"
              >
                <view class="md-board__movie">
                  <image class="md-board__movie-image" :src="movie.images.large" mode="aspectFill"></image>
                  <text class="md-board__movie-text">{{ movie.title }}</text>
                </view>
              </navigator>
            </view>
            <view class="md-board__inner" v-else>
              <navigator
                v-for="(movie, i) in item.movies"
                :key="movie.rank + index + i"
                :url="'../item/main?id=' + movie.subject.id"
              >
                <view class="md-borad__movie">
                  <image
                    class="md-board__movie-image"
                    :src="movie.subject.images.large"
                    mode="aspectFill"
                  ></image>
                  <text class="md-board__movie-text">{{ movie.subject.title }}</text>
                </view>
              </navigator>
            </view>
          </scroll-view>
        </view>
      </block>
    </view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('board', {
      boards: state => state.boards,
      movies: state => state.movies
    })
  },

  methods: {
    ...mapActions('board', [
      'getBoards'
    ]),
    async getBoardData () {
      await this.getBoards()
    }
  },

  mounted () {
    this.getBoardData()
  }
}
</script>

<style lang="scss">
@include c("board") {
  @include e("swiper") {
    height: 480rpx;
  }

  @include e("slide-image") {
    height: 100%;
    width: 100%;
  }

  @include e("list") {
    box-sizing: border-box;
    background-color: #f8f9fb;
  }

  @include e("item") {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-size: 20rpx;
    margin: 40rpx 0;
    padding: 20rpx;
    background-color: #fff;
  }

  @include e("title") {
    display: flex;
    margin-bottom: 10rpx;
    width: 100%;
  }

  @include e("title-text") {
    flex: 1;
  }

  @include e("title-image") {
    height: 20rpx;
    width: 20rpx;
  }

  @include e("content") {
    height: 300rpx;
  }

  @include e("inner") {
    display: flex;
    flex-direction: row;
    height: 300rpx;
    width: 900rpx;
  }

  @include e("movie") {
    display: flex;
    flex-direction: column;
    width: 180rpx;
    margin: 10rpx;
  }

  @include e("movie-image") {
    width: 180rpx;
    height: 250rpx;
  }

  @include e("movie-text") {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
