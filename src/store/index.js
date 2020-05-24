import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { reqAddress ,reqFoodList,reqShopList,reqShopGoods,reqShopRatings,reqShopInfo} from "../api";
export default new Vuex.Store({
  state: {
    latidute:40.10038,//纬度
    longitude:116.36867,//经度
    address:{},//地址
    categorys:[],//食品信息数组
    shops:[],//商家数组
    shopGoods:[],//食物
    shopRatings:[],//评价
    shopInfo:{},//信息
    cartFoods:[]//购物车食物列表
  },
    getters: {
      totalCount(state){//总数
        return  state.cartFoods.reduce((preTotal,foods)=>preTotal+foods.count,0)
      },
      totalPrice(state){//总价
        return state.cartFoods.reduce((preTotal,foods)=>preTotal+foods.count*foods.price,0)
      }
    },
  mutations: {//更改state数据
      address(state,address){//第二个参数接收action传递来数据
        state.address=address
      },
      categorys(state,categorys){
        state.categorys=categorys
      },
      shops(state,shops){
        state.shops=shops
      },
      shopGoods(state,shopGoods){
        state.shopGoods=shopGoods
      },
      shopRatings(state,shopRatings){
        state.shopRatings=shopRatings
      },
      shopInfo(state,shopInfo){
        state.shopInfo=shopInfo
      },
      increatment(state,foods){//增加  state必须传不传无法显示
        // foods.count?foods.count++: Vue.set(foods,"count",1)//Vue.set给新增属性添加数据绑定
        if (!foods.count) {
          Vue.set(foods,"count",1)
          // foods.count=1
          state.cartFoods.push(foods)//把新增食物添加到食物列表中
        }else{
          foods.count++
        }
      },
      decreatment(state,{foods}){//减少
        // foods.count?foods.count--:""
        if (foods.count) {
          foods.count--
          if (foods.count==0) {
            state.cartFoods.splice(state.cartFoods.indexOf(foods),1)
          }
        }
      },
      clearcart(state){
        state.cartFoods.forEach(item=>item.count=0)//把数量置为0
        state.cartFoods=[]
      }
  },
  actions: {//提交mutation
    async  getAddress({state,commit}){//根据经纬度获取位置详情
      const geohash=state.latidute+","+state.longitude;
      const res=await reqAddress(geohash)
      if(res.code==0){
        const address=res.data;
        commit("address",address)
      }
      },
      async getFoodList({commit}){//2、获取食品分类列表
        const res=await reqFoodList()
        if (res.code==0) {
          const foodList=res.data;
          commit("categorys",foodList)
        }
      },
      async getShopList({state,commit}){//根据经纬度获取商铺列表
        const geohash=state.latidute+","+state.longitude;
        const res=await reqShopList(geohash)
        if(res.code==0){
          const shopList=res.data;
          commit("shops",shopList)
        }
      },
      async getShopGoods({commit},callback){//获取食物分类信息
        const res=await reqShopGoods()//发送请求获取数据
        if (res.code==0) {
          const shopgoods=res.data
            commit("shopGoods",shopgoods)//提交数据到mutation
            callback && callback()//通知Shopgoods更新数据
        }
      },
      async getShopRatings({commit}){
        const res=await reqShopRatings()
        if (res.code==0) {
          const shopratings=res.data
            commit("shopRatings",shopratings)
        }
      },
      async getShopInfo({commit}){
        const res=await reqShopInfo()
        if (res.code==0) {
          const shopinfo=res.data
            commit("shopInfo",shopinfo)
        }
      },
      updateCount({commit},{type,foods}){//更新食物数量  注意：不可以和commit一起传
        // if (type) {
        //   commit("increatment",foods)
        // }else{
        //   commit("decreatment",{foods})
        // }
        type?commit("increatment",foods):commit("decreatment",{foods})
      },
      clearCart({commit}){//清空购物车
        commit("clearcart")
      }
  },
  modules: {
  }
})
