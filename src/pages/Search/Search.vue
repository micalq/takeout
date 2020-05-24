<template>
    <div>
    <section class="search">
    <Header  title="搜索"/>
    <form class="search_form" @submit.prevent="searchShop">
    <input type="search" placeholder=" 请输入商家名称" class="search_input" v-model="searchWord">
    <input type="submit" class="search_submit">
    </form>
    <section class="list" v-if="!noSearchShops">
    <ul class="list_container">
    <router-link class="list_li" tag="li" :to="{path:'/shop', query:{id:item.id}}" v-for="(item, index) in searchShops" :key="index">
    <section class="item_left">
    <img :src="imgBaseUrl+item.image_path"
    class="restaurant_img">
    </section>
    <section class="item_right">
    <div class="item_right_text">
    <p>
    <span>{{item.name}}</span>
    </p>
    <p>月售  {{item.month_sales||item.recent_order_num}} 单</p>
    <p>{{item.delivery_fee||item.float_minimum_order_amount}}元起送 / 距离{{item.distance}}公里</p>
    </div>
    </section>
    </router-link>
    </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
    </section>
    </div>
</template>
<script>
import Header from '@/components/Header/Header'
import {mapState} from "vuex"
export default {
  data() {
    return {
      searchWord:"",//搜索商家信息
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      noSearchShops:false//没搜到显示
    }
  },
    components:{
      Header,
    },
    mounted() {
    },
    computed: {
      ...mapState(['searchShops']),
      // ...mapState({searchShops:state=>state.searchShops}),
     /*  shops:{
        get(){
          return this.$store.state.searchShops
        },
        set(val){
           this.$store.commit("shopList",val)
        }
      } */
  
    },
    methods: {
      searchShop(){//不可以和计算属性重名
        const searchWord=this.searchWord.trim();
        if(searchWord){
          // this.noSearchShops=false
         this.$store.dispatch('getSearchShops', searchWord)
        }
      }
    },
    watch: {
      searchShops(value){
          value.length?this.noSearchShops=false:this.noSearchShops=true;
      }
    },
}
</script>
<style lang="stylus" scoped>
  @import "../../assets/stylus/mixin.styl";
.search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>