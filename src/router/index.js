import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
    {path:"*/",redirect: "/home"},
    {path:"/home",component:()=>import("@/pages/Home/Home")},
    {path:"/detail",component:()=>import("@/pages/Detail/Detail")},
    {path:"/order",component:()=>import("@/pages/Order/Order")},
    {path:"/search",component:()=>import("@/pages/Search/Search")},
 
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
