<template>
  <div class="md-splash">
    <swiper class="splash" indicator-dots>
      <swiper-item v-for="(item, index) in movies" :for-index="index" :key="item.id">
        <image :src="item.images.large" class="slide-image" mode="aspectFill"/>
        <button class="start" @click="handleStart" v-if="index === movies.length - 1">立即体验</button>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { getStorage, setStorage } from '@/utils/wechat'
import { getBoardData } from '@/utils/api'

export default {
  data () {
    return {
      movies: []
    }
  },

  methods: {
    async getCache () {
      try {
        let res = await getStorage('last_splash_data')
        const { movies, expires } = res.data
        // 有缓存，判断是否过期
        if (movies && expires > Date.now()) {
          return res.data
        }
        // 已经过期
        console.log('uncached')
        return null
      } catch (error) {
        return null
      }
    },

    handleStart () {
      // TODO: 访问历史的问题
      wx.switchTab({
        url: '../board/main'
      })
    },

    async getInitData () {
      let cache = await this.getCache()
      if (cache) {
        this.movies = cache.movies
        return
      }
      let data = await getBoardData({board: 'coming_soon', page: 1, count: 3})
      this.movies = data.subjects
      await setStorage('last_splash_data', {
        movies: data.subjects,
        expires: Date.now() + 1 * 24 * 60 * 60 * 1000
      })
    }
  },

  mounted () {
    this.getInitData()
  }
}
</script>

<style>
page {
  height: 100%;
}

.container {
  height: 100%;
}

.md-splash {
  height: 100%;
}

.splash {
  height: 100%;
}

.splash swiper-item {
  flex: 1;
}

.splash swiper-item image {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: .9;
}

.start {
  position: absolute;
  bottom: 200rpx;
  left: 50%;
  width: 300rpx;
  margin-left: -150rpx;
  background-color: rgba(64, 88, 109, .4);
  color: #fff;
  border: 1rpx solid rgba(64, 88, 109, .8);
  border-radius: 200rpx;
  font-size: 40rpx;
}

</style>

