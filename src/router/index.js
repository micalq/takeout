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
    {path:"/shop",component:()=>import("@/pages/Shop/Shop"),children:[
      {path:"",redirect: "/shop/goods"},
      {path:"/shop/goods",component:()=>import("@/pages/Shop/Shopgoods/Shopgoods")},
      {path:"/shop/rating",component:()=>import("@/pages/Shop/Shoprating/Shoprating")},
      {path:"/shop/info",component:()=>import("@/pages/Shop/Shopinfo/Shopinfo")},
    ]}
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
