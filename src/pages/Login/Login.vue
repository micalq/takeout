<template>
 <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}"  @touchend="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @touchend="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!checkPhone" class="get_verification" :class="{bg:checkPhone}" ref="phoneCode" @touchend.prevent="getCode">
                {{time>0?`已发送${time}秒`:"获取验证码"}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}" >
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                  <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @touchend="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?"abc":""}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" ref="captcha" @touchend="getcaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back">
          <i class="iconfont icon-jiantou2" @touchend="$router.back()"></i>
        </a>
      </div>
    <AlertTip v-if="showAlert" :alertText="alerttext" @closeTip="handleAlert"/>
    </section>
  </div>
          
</template>
<script>
import AlertTip from '@/components/AlertTip/AlertTip'
import { reqPhone,reqPhoneCode,reqLogin} from "../../api";
export default {
    data() {
      return {
        loginWay:false,//true短信登录  false 密码登录
        phone:"",//手机号验证
        time:0,//倒计时时间
        showPwd:false,//默认隐藏密码
        pwd:"",//双向绑定密码
        code:"",//短信验证码
        name:"",//用户名
        captcha:"",//图形验证码
        showAlert:false,//默认隐藏提示框
        alerttext:"",//提示框内容
      }
    },
    methods: {
     async getCode(){//获取验证码
        if (!this.time) {//防抖定时器没完不重复开启
             this.time=30
    this.T= setInterval(() => {//倒计时
          this.time--
      this.time==0?clearInterval(this.T):this.time
      }, 1000);
        }
    const res=await reqPhone(this.phone)//发送短信验证码
    if (res.code==1) {
      this.alertText(res.msg)
       if (this.time) {
         this.time=0;
         clearInterval(this.T)
         this.T=null
       }
    }
      },
      alertText(alerttext){//验证规则提取
        this.showAlert=true;
        this.alerttext=alerttext
      },
     async login(){
     let res;
          if (this.loginWay) {//短信登录
            const {code,phone}=this;
            if (!this.checkPhone) {//验证手机号
              this.alertText("请输入正确手机号")
              return
            }else if (!/^\d{6}$/.test(code)) {//验证短信验证码
              this.alertText("请输入正确短信验证码")
              return
            }
            res=await reqPhoneCode(phone,code)//发送请求短信验证码登录
          }else{//密码登录
              const {name,pwd,captcha}=this;
              if (!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(name)) {//验证用户名
              this.alertText("请输入正确用户名")
              return
              }else if (!pwd) {//验证密码
              this.alertText("请输入正确密码")
              return
              }else if (!captcha) {//图形验证码
              this.alertText("请输入正确图形验证码")
              return
              }
            res =await reqLogin(name,pwd,captcha)
              // if (qq.code==1) {
              //   this.alertText(qq.msg)
              //   return
              // }
              // console.log(qq)
          }
           if (this.time) {
         this.time=0;
         clearInterval(this.T)
         this.T=null
       }
              if (res.code==0) {//同意判断数据 0成功  1失败
                // const user=res.data
                //保存数据到state
                this.$router.replace("/detail")
              }else{
                this.alertText(res.msg)
                this.getcaptcha()//发生错更新验证码
              }
      },
     
      handleAlert(){//关闭提示框
        this.showAlert=false
        this.alerttext=""
      },
      getcaptcha(){//随即验证码
          // e=e||window.event;
         this.$refs.captcha.src=`http://localhost:4000/captcha?time${Date.now()}`
      }
    },
    computed: {//模板变量来自props，data,computed
      checkPhone(){
        const rgb=/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        return rgb.test(this.phone)
      }
    },
    components:{
      AlertTip
    }
}
</script>
<style lang="stylus">
@import "../../assets/stylus/mixin.styl"
    >.off
       display none
  >.on
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 200
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.bg
                    color  #111
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%) 
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>