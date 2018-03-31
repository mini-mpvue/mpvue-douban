<template>
  <div class="md-board">
    <view class="slide">
      <swiper class="slider-wrap" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
        <swiper-item v-for="(movie, index) in movies" :key="index">
          <image class="slide-image" :src="movie.images.large" mode="aspectFill"/>
        </swiper-item>
      </swiper>
    </view>
    <view class="board" :scroll-y="true">
      <block v-for="(item, index) in boards" :key="item.key">
        <view class="board-item">
          <navigator :url="'../list/list?type=' + item.key + '&title=' + item.title" hover-class="none">
            <view class="title">
              <text>{{ item.title }}</text>
              <image src="../../../static/images/arrowright.png" mode="aspectFill"/>
            </view>
          </navigator>
          <scroll-view class="content" :scroll-x="true">
            <view class="inner" v-if="item.key !== 'us_box'">
              <navigator v-for="(movie, i) in item.movies" :key="movie.id + index + i" :url="'../item/item?id=' + movie.id">
                <view class="movie-item">
                  <image :src="movie.images.large" mode="aspectFill"/>
                  <text>{{ movie.title }}</text>
                </view>
              </navigator>
            </view>
            <view class="inner" v-else>
              <navigator v-for="(movie, i) in item.movies" :key="movie.rank + index + i" :url="'../item/item?id=' + movie.subject.id">
                <view class="movie-item">
                  <image :src="movie.subject.images.large" mode="aspectFill"/>
                  <text>{{ movie.subject.title }}</text>
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
import { getBoardData } from '@/utils/api'

export default {
  data () {
    return {
      boards: [
        { key: 'top250' },
        { key: 'us_box' },
        { key: 'in_theaters' },
        { key: 'coming_soon' }
      ],
      movies: []
    }
  },

  methods: {
    async getBoards () {
      console.log(this.boards)
      const tasks = this.boards.map(board => {
        return getBoardData({ board: board.key, page: 1, count: 8 })
      })
      let boards = await Promise.all(tasks)
      let data
      this.boards = this.boards.map((board, i) => {
        data = JSON.parse(boards[i])
        board.title = data.title
        board.movies = data.subjects
        return board
      })
      this.movies = this.boards[0].movies
    }
  },

  mounted () {
    this.getBoards()
  }
}
</script>

<style>
.slide swiper {
  height: 480rpx;
}

.slide swiper image {
  height: 100%;
  width: 100%;
}

.board {
  box-sizing: border-box;
  background-color: #f8f9fb;
}

.board-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 20rpx;
  margin: 40rpx 0;
  padding: 20rpx;
  background-color: #fff;
}

.board-item .title {
  display: flex;
  margin-bottom: 10rpx;
  width: 100%;
}

.board-item .title text {
  flex: 1;
}

.board-item .title image {
  height: 20rpx;
  width: 20rpx;
}

.board-item .content {
  height: 300rpx;
}

.board-item .content .inner {
  display: flex;
  flex-direction: row;
  height: 300rpx;
  width: 900rpx;
}

.board-item .content .inner .movie-item {
  display: flex;
  flex-direction: column;
  width: 180rpx;
  margin: 10rpx;
}

.board-item .content .inner .movie-item image {
  width: 180rpx;
  height: 250rpx;
}

.board-item .content .inner .movie-item text {
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>
