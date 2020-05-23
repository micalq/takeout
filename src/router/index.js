import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
    {path:"*/",redirect: "/home"},
    {path:"/home",component:()=>import("@/pages/Home/Home"),meta:{showFooter:true}},
    {path:"/detail",component:()=>import("@/pages/Detail/Detail"),meta:{showFooter:true}},
    {path:"/order",component:()=>import("@/pages/Order/Order"),meta:{showFooter:true}},
    {path:"/search",component:()=>import("@/pages/Search/Search"),meta:{showFooter:true}},
    {path:"/login",component:()=>import("@/pages/Login/Login")},
    {path:""}
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
