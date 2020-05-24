<template>
  <div>
       <div class="shopcart">
        <div class="content">
        <div class="content-left"  @touchend="toggleCart">
        <div class="logo-wrapper">
        <div class="logo" :class="{highlight:totalCount}">
        <i class="iconfont icon-shopping_cart" :class="{highlight:totalCount}"></i>
        </div>
        <div class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{shopInfo.deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
        <div class="pay" :class="payClass">
            {{payText}}
        </div>
        </div>
        </div>
       <transition name="move">
        <div class="shopcart-list" v-if="isshowCart">
        <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @touchend="clearCart">清空</span>
        </div>
        <div class="list-content" ref="listContent">
        <ul>
        <li class="food" v-for="(item, index) in cartFoods" :key="index">
        <span class="name">{{item.name}}</span>
        <div class="price"><span>￥{{item.price}}</span></div>
        <div class="cartcontrol-wrapper">
        <cart-control :foods="item"/>
        </div>
        </li>
        </ul>
        </div>
        </div>
       </transition>
        </div>
        <div class="list-mask" v-if="isshowCart" @touchend="toggleCart"></div>
  </div>
</template>
<script>
import { mapState,mapGetters } from "vuex";
import CartControl from '@/components/CartControl/Cartcontrol'
import Scroll from "better-scroll"
import { MessageBox } from 'mint-ui';
export default {
    data() {
    return {
        showCart:false,//默认隐藏购物车
    }
},
    computed: {
        ...mapState(["cartFoods","shopInfo"]),
        ...mapGetters(["totalCount","totalPrice"]),
        payClass(){//不同价格不同样式
            return this.totalPrice>=this.shopInfo.minPrice?"enough":"not-enough"
        },
        payText(){//不同价格不同文字
            if (this.totalPrice==0) {
                return    `还差${this.shopInfo.deliveryPrice}元起送`
            }else if(this.totalPrice<this.shopInfo.minPrice){
                return   `还差${this.shopInfo.minPrice-this.totalPrice}元起送`
            }else{
               return "去结算"
            }
        },
            isshowCart(){  //不要在计算属性内直接修改data里面的数据，eslint会报 no-side-effects-in-computed-properties 错误，如果非要改可以写在一个函数里，然后在计算属性里调用该函数。
              return  this.isshow()
            }
    },
    mounted() {
       
    },
    methods: {
        toggleCart(){
           if (this.totalCount>0) {
                this.showCart=!this.showCart
           }
        },
        isshow(){
            if (this.totalCount==0) {
                this.showCart=false;
                return false
            }
            if (this.showCart) {// 实现Scroll的实例是一个单例
                 this.$nextTick(()=>{
                     if (!this.scroll) {
                         this.scroll=new Scroll(this.$refs.listContent,{click:true})
                     }else{
                         this.scroll.refresh() // 让滚动条刷新一下: 重新统计内容的高度
                     }
                     
        })
            }
            return this.showCart
        },
        clearCart(){
            MessageBox.confirm('确认删除购物车食物吗?').then(action => {
                if (action === 'confirm') {
          console.log(1)
                this.$store.dispatch('clearCart')
                }
},()=>{});
        }
    },
    components: {
        CartControl,
    }
}
</script>
<style lang="stylus">
@import "../../assets/stylus/mixin.styl";
.shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>