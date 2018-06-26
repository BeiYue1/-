<template>
  <div id="app">
    <transition name="fade">
      <div class="shade"  v-show="$store.state.listShow"></div>
    </transition>
    <v-header></v-header>
    <v-nav></v-nav>
    <router-view :seller="seller"></router-view>
    <shop-car></shop-car>
  </div>
</template>

<script>
import vHeader from '@/components/header/v-header' ;
import vNav from '@/components/naving' ;
import Vue from 'vue' ;
import shopCar from '@/components/shopCar' ;

const ERR_OK = 0 ;
export default {
    name: 'App' ,
    data(){
      return {
        seller:{} ,
      }
    },
    components:{
      'vHeader':vHeader ,
      'vNav':vNav,
      'shopCar':shopCar,
    } ,
    created(){
        //获取信息
        this.$http.get('/api/seller').then( (res) => {
            res = JSON.parse(JSON.stringify(res.body));
            if (res.errno === ERR_OK ){
              this.$store.state.seller = this.seller = res.data ;

            }
        }) ;
        //获取食物
        this.$http.get('/api/goods').then( (res) => {
          res = JSON.parse(JSON.stringify(res.body));
          if (res.errno === ERR_OK ){
            this.$store.state.goods = res.data ;
            for (let i = 0 ; i < this.$store.state.goods.length ; i++){
              for (let j = 0 ; j < this.$store.state.goods[i].foods.length;j++){
                for (let k = 0 ; k < this.$store.state.goods[i].foods[j].ratings.length;k++){
                  Vue.set(this.$store.state.goods[i].foods[j].ratings[k] , 'isShow',true) ;
                }
              }
            }
          }
        }) ;


    },
    mounted(){

      if(this.$router.history.current.name === null) {
        this.$store.state.isSure = true ;
        return ;
      }
      this.$store.state.isSure = false ;
    },
    updated(){
      if(this.$router.history.current.name === 'shopping'){
        this.$store.state.isSure = true ;
      }
      this.seller = this.$store.state.seller ;
    } ,
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
  .shade{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 7 ;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
</style>
