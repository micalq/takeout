<template>
        <div>
        <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
        <ul>
        <li class="menu-item " :class="{current: index==currentIndex}" v-for="(item, index) in shopGoods" :key="index" @touchend="scrollto(index)">
        <span class="text bottom-border-1px">
        <img class="icon"  :src="item.icon" v-if="item.icon">
        {{item.name}}
        </span>
        </li>
        </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsTop">
        <li class="food-list-hook"  v-for="(item, index) in shopGoods " :key="index">
        <h1 class="title">{{item.name}}</h1>
        <ul>
        <li class="food-item bottom-border-1px" v-for="(item1, index) in item.foods" :key="index" @touchend="showFood(item1)">
        <div class="icon">
        <img width="57" height="57" :src="item1.icon">
        </div>
        <div class="content">
        <h2 class="name">{{item1.name}}</h2>
        <p class="desc">{{item1.description}}</p>
        <div class="extra">
        <span class="count">月售 {{item1.sellCount}} 份</span>
        <span>好评率{{item1.rating}} %</span></div>
        <div class="price">
        <span class="now">￥{{item1.price}}</span>
        <span class="old" v-if="item1.oldPrice">{{item1.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
        <CartControl :foods="item1" />
        </div>
        </div>
        </li>
        </ul>
        </li>
        </ul>
        </div>
        <shop-cart/>
        </div>
        <Food :foods="food" ref="food"/>
        </div>
</template>
<script>
import { mapState } from "vuex";
import BScroll  from 'better-scroll'
import CartControl from '@/components/CartControl/Cartcontrol'
import Food from '@/components/Food/Food'
import ShopCart from '@/components/ShopCart/Shopcart'
export default {
    data() {
        return {
            scrollY:0,//右侧滑动坐标
            tops:[],//右侧每一个li坐标，初始化完了就不改
            food:{}//需要显示的食物
        }
    },
    components: {
        CartControl,
        Food,
        ShopCart
    },
    mounted() {
        this.$store.dispatch("getShopGoods",()=>{//接受一个回调函数数据更新完触发
             this.$nextTick(()=>{//列表数据显示了才加载
           this.initFoods();
           this.initTops()
        })
        })
    },
    computed:{
        ...mapState(["shopGoods"]),
        currentIndex(){
            const {scrollY,tops}=this;
        const index=tops.findIndex((item,index)=>{
            return scrollY>=item&&scrollY<tops[index+1]//比上一个大小于下一个
        })
        return index
        }
    },
    methods: {
        initFoods(){//实时获取右侧食物栏滑动距离
         this.scrollMenu=new BScroll(this.$refs.menuWrapper,{ })
            this.scrollFoods=new BScroll(this.$refs.foodsWrapper,{
                probeType:2//probeType 有4个值， 分别是 0，1，2 ，3  其中0，1代表了不进行侦测，2和3代表了侦测，当probeType：2时，
                //在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测当probeType：3时，只要是滚动都进行侦测
            })
             this.scrollFoods.on("scroll",({x,y})=>{
                console.log(x,y)
                this.scrollY=Math.abs(y)
            })
             this.scrollFoods.on("scrollEnd",({x,y})=>{
                console.log(x,y)
                this.scrollY=Math.abs(y)
            })
        },
         initTops(){//初始化保存右侧菜单栏每一个li坐标
            const arr=[];//声明一个空数组保存每一个
               let top=0;//一开始为零
                   arr.push(top);
            // const lis=document.getElementsByClassName("foodsTop")[0].children;//获取所有li元素
            const lis=this.$refs.foodsTop.getElementsByClassName('food-list-hook')
            // console.log(lis)
            Array.from(lis).forEach(item=>{//遍历li元素获取到顶部高度
                top+=item.clientHeight;
                arr.push(top)
            })
            this.tops=arr;
            console.log(arr)
        },
        scrollto(i){
            // console.log(i)
            const y=this.tops[i]
            this.scrollY=y
            this.scrollFoods.scrollTo(0,-y,400)
        },
        showFood(foods){
          this.food=foods;//更新食物信息
          this.$refs.food.toggleShow()//调用子组件方法
        }
    },
}
</script>
<style lang="stylus">
@import "../../../assets/stylus/mixin.styl";
.goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>