import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { reqAddress ,reqFoodList,reqShopList} from "../api";
export default new Vuex.Store({
  state: {
    latidute:40.10038,//纬度
    longitude:116.36867,//经度
    address:{},//地址
    categorys:[],//食品信息数组
    shops:[]//商家数组
  },
  mutations: {//更改state数据
      address(state,address){
        state.address=address
      },
      categorys(state,categorys){
        state.categorys=categorys
      },
      shops(state,shops){
        state.shops=shops
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
      }
  },
  modules: {
  }
})
