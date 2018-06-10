<template>
  <div class="md-profile">
    <!-- <view class="md-profile__header">
      <text class="md-profile__title">{{ title }}</text>
    </view> -->
    <button open-type="getUserInfo">授权访问</button>
    <view class="md-profile__user" @click="getUserInfo">
      <image class="md-profile__user-avatar" :src="userInfo.avatarUrl" mode="aspectFit"/>
      <text class="md-profile__user-nickname">{{ userInfo.nickName }}</text>
      <text :hidden="!userInfo.city">{{ userInfo.city }}, {{ userInfo.province }}</text>
      <text :hidden="!userInfo.city"> Thanks~ </text>
    </view>
  </div>
</template>

<script>
import { login, getUserInfo } from '@/utils/wechat'
export default {
  data () {
    return {
      title: '关于',
      userInfo: {
        wechat: 'SG',
        nickName: 'https://github.com/mini-mpvue/mpvue-douban',
        avatarUrl: '/static/images/qrcode-sg.png'
      }
    }
  },

  methods: {
    async getUserInfo () {
      const data = await getUserInfo()
      this.userInfo = data.userInfo
    }
  },

  mounted () {
    login().then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss">
@include c('profile') {

  @include e('header') {
    display: flex;
    justify-content: center;
    border-bottom: 1rpx solid #ccc;
  }

  @include e('title') {
    padding: 40rpx;
    color: #999;
    font-size: 148rpx;
    text-align: center;
  }

  @include e('user') {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @include e('user-avatar') {
    width: 100%;
    height: 620rpx;
    margin: 40rpx;
  }

  @include e('user-nickname') {
    color: #aaa;
    font-size: 30rpx;
    margin-bottom: 30rpx;
  }
}

</style>
