<template>
    <div class="cartControl">
      <transition name="_fade">
        <div @click.stop.prevent="delShopping" class="cart-del icon-remove_circle_outline"
             v-show="food.count > 0 "></div>
      </transition>
      <transition name="fade">
        <div class="cart-count" v-show="food.count > 0 ">{{food.count}}</div>
      </transition>
      <div @click.stop.prevent="addShopping" class="cart-add icon-add_circle"></div>
    </div>
</template>

<script>
  import Vue from 'vue' ;
  export default {
    name: "" ,
    props:{
      food:{
        type:Object ,
      }
    } ,
    created(){
      // console.log() ;
    } ,
    methods:{
      //增加商品
      addShopping(event){
        if (!event._constructed){
          return ;
        }
        if (!this.food.count){
          Vue.set(this.food , 'count',1) ;
          //添加选中的商品
          this.$store.state.selectFoods.push(this.food) ;
        }else {
          this.food.count++ ;
        }
      },
      //减少商品
      delShopping(){
        if (!event._constructed){
          return ;
        }
        let foods = this.$store.state.selectFoods ;



        if (this.food.count){
          this.food.count-- ;
          if (this.food.count === 0){
            for (let i = 0 ; i < foods.length ;i++){
              if (this.food.name === foods[i].name){
                foods.splice(i,1) ;
              }
            }
          }
        }
        if (foods.length === 0 ){
          this.$store.state.listShow = false ;
        }
      } ,
    }
  }
</script>

<style scoped>
  @import "../../src/common/stylus/ico.css";
  .cartControl{
    font-size: 0;
  }
  .cartControl .cart-del{
    display: inline-block;
    padding: 6px ;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0,160,220);
    vertical-align: top;
  }
  .cartControl .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .cartControl .cart-add{
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0,160,220);
    vertical-align: top;
    padding: 6px ;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 0.5s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
    transform: translate3d(24px,0,0);
  }

  ._fade-enter-active,._fade-leave-active{
    transition: all 0.5s;
  }
  ._fade-enter,._fade-leave-to{
    opacity: 0;
    transform: translate3d(24px,0,0) rotate(180deg);
  }
</style>
