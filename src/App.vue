<template>
  <div id="app">
    <router-view/>
    <Footer/>
  </div>
</template>
<script>
import Footer from '@/components/Footer/Footer'
export default {
  components:{
    Footer,
  }
}
</script>
<style lang="stylus">
@import "./assets/css/reset.css";
.app
 width 100%
  height 100%
  background #f5f5f5
</style>
