<template>
  <div id="app">
    <router-view/>
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>
<script>
import Footer from '@/components/Footer/Footer';
// import { reqFoodList } from "./api";
import { mapActions } from "vuex";
export default {
 /* async mounted() {
    const res=await reqFoodList()
    console.log(res)
  }, */
    mounted() {//vuex数据是全局可见的
    this.getAddress()
    this.getFoodList()
    this.getShopList()
    },
    methods: {
      ...mapActions(['getAddress','getFoodList','getShopList'])
    },
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
