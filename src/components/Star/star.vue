<template>
     <div class="star" :class="'star-'+size">
                          <span class="star-item " v-for="(item, index) in starList" :key="index" :class="item"></span>
                        </div>
</template>
<script>
export default {
    props:{
        score:Number,//分数
        size:Number,//大小
    },
    computed: {
        starList(){//根据分数计算星星个数最多五颗星
        const {score}=this;
        const arr=[];
        const sc=Math.floor(score)
        for (let i = 0; i < sc; i++) {//整数部分整星  on
            arr.push("on")
        }    
            (score-sc)*10>5?arr.push("half"):""//小数部分是半星，小数计算精度缺失故扩大十倍
            while (arr.length==5) {//大于五循环终止了
                arr.push("off")
            }           
        /* 
            3.2分 --三颗全星，0颗半星，两颗灰星
            2.8分--两颗全星，一颗半星，两颗灰星
         */
        return arr
        }
    },
}
</script>
<style lang="stylus" scoped>
@import "../../assets/stylus/mixin.styl"
        .star //2x图 3x图
                            float left
                            font-size 0
                            .star-item
                              display inline-block
                              background-repeat no-repeat
                            &.star-48
                              .star-item
                                width 20px
                                height 20px
                                margin-right 22px
                                background-size 20px 20px
                                &:last-child
                                  margin-right: 0
                                &.on
                                  bg-image('../../assets/images/stars/star48_on')
                                &.half
                                  bg-image('../../assets/images/stars/star48_half')
                                &.off
                                  bg-image('../../assets/images/stars/star48_off')
                            &.star-36
                              .star-item
                                width 15px
                                height 15px
                                margin-right 6px
                                background-size 15px 15px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('../../assets/images/stars/star36_on')
                                &.half
                                  bg-image('../../assets/images/stars/star36_half')
                                &.off
                                  bg-image('../../assets/images/stars/star36_off')
                            &.star-24
                              .star-item
                                width 10px
                                height 10px
                                margin-right 3px
                                background-size 10px 10px
                                &:last-child
                                  margin-right 0
                                &.on
                                  bg-image('../../assets/images/stars/star24_on')
                                &.half
                                  bg-image('../../assets/images/stars/star24_half')
                                &.off
                                  bg-image('../../assets/images/stars/star24_off')
</style>