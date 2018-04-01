<template>
  <div class="md-profile">
    <!-- <view class="header">
      <text class="title">{{ title }}</text>
    </view> -->
    <view class="user" @click="getUserInfo">
      <image class="user-avatar" :src="userInfo.avatarUrl" mode="aspectFit"/>
      <text class="user-nickname">{{ userInfo.nickName }}</text>
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

<style>
.header {
  display: flex;
  justify-content: center;
  border-bottom: 1rpx solid #ccc;
}

.header text {
  padding: 40rpx;
  color: #999;
  font-size: 148rpx;
  text-align: center;
}

.user {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-avatar {
  width: 100%;
  height: 620rpx;
  margin: 40rpx;
}

.user-nickname {
  color: #aaa;
  font-size: 30rpx;
  margin-bottom: 30rpx;
}

</style>
