<template>
    <div class="on">
      <section class="msite">
        <!--首页头部-->    
      <Header :title="address.name">
             <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </span>
           <span class="header_login" slot="right">
            <span class="header_login_text">登录|注册</span>
          </span>

        </Header>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-swiper:mySwiper="swiperOption" v-if="foodList.length">
            <div class="swiper-wrapper" >
              <div class="swiper-slide" v-for="(item, index) in foodList" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(item1) in item" :key="item1.id">
                  <div class="food_container">
                    <img :src="imgurl+item1.image_url">
                  </div>
                  <span>{{item1.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"> </div>
          </div>
          <img src="../../assets/images/msite_back.svg" alt="" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <div class="shop_container">
                <Shoplist/>
          </div>
        </div>
      </section>
   
    </div>
    
</template>
<script>
import Header from '@/components/Header/Header'
import Shoplist from '@/components/ShopList/shoplist'
import { directive} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from "vuex";
export default {
    data() {
        return {
          imgurl:"https://fuss10.elemecdn.com",
            swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable:true,
          },
          // Some Swiper option/callback...
        }
        }
    },
  mounted() {
    // this.$store.dispatch('getFoodList')
        // console.log(this.categorys)
  },
  computed: {
      ...mapState(["address","categorys"]),
      foodList(){//根据一维数组生成二维数组,每个数组最多八个元素
      const {categorys}=this
        let arr=[],newarr=[]
        categorys.forEach(item=>{
        arr.length==8?arr=[]:"";//如果大于8则生成新数组
         arr.length==0?newarr.push(arr):"";//两种情况考虑1不满8，2超过8
           /* if (arr.length==8) {
            arr=[]
          }
          if (arr.length==0) {
           newarr.push(arr)
          } */
          arr.push(item)
        })
        return newarr
      }
  },
    directives: {
    swiper: directive
  },
    components:{
        Header,
        Shoplist
    }
}
</script>
<style lang="stylus" scoped>
  @import "../../assets/stylus/mixin.styl";
  &.msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
         
</style>