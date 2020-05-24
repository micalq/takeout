import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css' 
import "./mock/mockServer"
import loading from "./assets/images/loading/loading.gif"
Vue.config.productionTip = false
Vue.use(Mint)
Vue.use(VueLazyload,{
  // loading:require("./assets/images/loading/loading.gif")
  loading
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
