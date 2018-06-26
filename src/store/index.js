import Vue from 'vue' ;
import Vuex from 'vuex' ;
import router from '@/router' ;
Vue.use(Vuex) ;
Vue.use(router) ;
let store = new Vuex.Store({
  state:{
    seller:null ,
    //弹层是否显示
    detailShow:false ,
    //ratings
    ratings:null,
    //是否选中
    isSure:true ,
    //食物
    goods:null,
    //第几个显示
    _index: 0 ,
    //选中的商品
    selectFoods:[] ,
    //总价
    total: 0 ,
    //购物车详情是否显示
    listShow:false ,
    //详情是否显示
    isShade : false,
    //表示是满意选中
    selectType:2 ,
    //切换是否显示无内容页面
    isContent:false ,
    //点击详情页所添加的商品信息
    isFoods:null ,
    //星星
    colorList:null ,

  } ,
  getters:{
    //总价
    totalPrice(state){
      let total = 0 ;
      state.selectFoods.forEach( (food) => {
        total += food.price * food.count ;
      } ) ;
      return state.total = total ;
    } ,
    //商品总和
    totalCount(state){
      let total = 0 ;
      state.selectFoods.forEach( (food) => {
        total += food.count ;
      } ) ;
      return total ;
    } ,
    //
    getRatings(state){
      return state.ratings.length ;
    }
  } ,
  mutations:{

  } ,
}) ;

export default store ;
