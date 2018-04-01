<template>
  <div class="md-list">
    <view class="list">
      <template v-if="type !== 'us_box'">
        <navigator :url="'../item/item?id=' + item.id" v-for="(item, index) in movies" :key="item.id">
          <list-item :movie="item"></list-item>
        </navigator>
      </template>
      <template v-else>
        <navigator :url="'../item/item?id=' + item.subject.id" v-for="(item, index) in movies" :key="item.rank">
          <list-item :movie="item.subject"></list-item>
        </navigator>
      </template>
      <view class="tips">
        <view v-if="hasMore">
          <image src="/static/images/loading.gif" mode="aspectFill"/>
          <text>正在加载...</text>
        </view>
        <view v-else>
          <text>--------------- 我也是有底线的 --------------</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import { getBoardData } from '@/utils/api'
import wx from '@/utils/wx'
import ListItem from '@/components/list-item'

export default {
  components: {
    'list-item': ListItem
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

  onReachBottom () { // 上拉刷新
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
.list {
  height: 100%;
}

.list .item {
  display: flex;
  padding: 20rpx 40rpx;
  border-bottom: 1rpx solid #eee;
  cursor: pointer;
}

.list .item .poster {
  width: 128rpx;
  height: 168rpx;
  margin-right: 20rpx;
}

.list .item .meta {
  flex: 1;
}

.list .item .meta .title,
.list .item .meta .sub-title {
  display: block;
  margin-bottom: 15rpx;
}

.list .item .meta .title {
  font-size: 32rpx;
}

.list .item .meta .sub-title {
  font-size: 22rpx;
  color: #c0c0c0;
}

.list .item .meta .artists {
  font-size: 24rpx;
  color: #999;
}

.list .item .rating text {
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

.list .tips {
  font-size: 28rpx;
  text-align: center;
  padding: 50rpx;
  color: #ccc;
}

.list .tips image,
.list .tips text {
  vertical-align: middle;
}

.list .tips image {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

.header {
  display: flex;
  justify-content: center;
  border-bottom: 1rpx solid #ccc;
}


.header text {
  padding: 20rpx 40rpx;
  color: #999;
  font-size: 38rpx;
  text-align: center;
}

</style>
