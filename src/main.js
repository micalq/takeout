import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'//图片懒加载
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css' 
import "./mock/mockServer"
import loading from "./assets/images/loading/loading.gif"
import moment from 'moment'//时间格式化
Vue.config.productionTip = false
Vue.use(Mint)
Vue.use(VueLazyload,{
  // loading:require("./assets/images/loading/loading.gif")
  loading
})
Vue.filter('dateformat',(value)=>{
  return  moment(value).format('YYYY-MM-DD HH:mm:ss')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
