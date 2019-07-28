<template>
  <div class="v-main">
    <div class="v-main-left">
      <fir-nav></fir-nav>
    </div>
    <div class="v-main-right">
      <!-- {{'process.env.VUE_APP_URL: '+ websit }} -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Nav from './Nav'

export default {
  components: {
    FirNav: Nav
  },
  data () {
    return {
      websit: ''
    }
  },
  mounted () {
    this.websit = process.env.VUE_APP_URL
  }
}
</script>
<style lang="less" scoped>
.v-main{
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  &-left{
    width: 200px;
  }
  &-right{
    width: calc(~"100% - 220px");
  }
}
</style>
