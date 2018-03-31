<template>
  <div class="md-board">
    榜单
  </div>
</template>

<script>
import { getBoardData } from '@/utils/api'
export default {
  async mounted () {
    let res = await getBoardData()
    console.log(res)
  }
}
</script>

<style>

</style>
