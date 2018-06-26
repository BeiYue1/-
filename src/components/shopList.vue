<template>
  <!--购物车具体组件-->
  <transition name="fade">
    <div class="shopList">
      <div class="listHeader">
        <div class="title">购物车</div>
        <div class="empty" @click="delSelect">清空</div>
      </div>
      <div class="listContent" ref="shopList">
        <ul>
          <li class="food" v-for="item in $store.state.selectFoods">
            <span class="name">{{ item.name }}</span>
            <div class="price">
              <span>¥{{item.price}}</span>
            </div>
            <div class="cart-wrap">
              <!--加减组件-->
              <cart-control :food = 'item'></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  import cartControl from '@/components/cartContral';
  import BScroll from 'better-scroll' ;
    export default {
        name: "" ,
        data(){
          return {
            foods: 0 ,
          }
        },
        props:{
          food:{
            type:Object ,
          }
        } ,
        mounted(){
          this.shopList = new BScroll(this.$refs.shopList,{
            click:true ,
          }) ;
        },

        methods:{
          delSelect(){
            for (let i = 0 ; i < this.$store.state.selectFoods.length ; i++){
              this.$store.state.selectFoods[i].count = 0 ;
              this.$store.state.selectFoods.splice(i,1) ;
              i-- ;
            }
            this.$store.state.listShow = false ;
          }
        },
        components:{
          'cartControl':cartControl ,
        }
    }
</script>

<style scoped>
  .shopList{
    text-align: left;
    position: absolute;
    bottom: 48px;
    left: 0;
    z-index: 2;
    width: 100%;
    overflow: hidden;
    /*background-color: black;*/
  }

  .listHeader{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;

  }
  .listHeader .title{
    float: left;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .listHeader .empty{
    float: right;
    font-size: 12px;
    color: rgb(0,160,220);
  }
  .listContent{
    background-color: #ffffff;
    overflow: hidden;
    max-height: 217px;
  }
  .food{
    position: relative;
    padding: 12px 18px;
    box-sizing: border-box;
    border-bottom: 1px solid #f3f5f7;
  }
  .food:nth-of-type(odd){
    background-color: #eeeeee;
  }
  .food:nth-of-type(even){
    background-color: #ffffff;
  }
  .food .name{
    line-height: 24px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  .food .price{
    position: absolute;
    right: 108px;
    bottom: 12px;
    line-height: 24px;
    color: red;
    font-weight: 700;
    font-size: 14px;
  }
  .cart-wrap{
    position: absolute;
    right: 18px;
    bottom: 6px;
  }

  .fade-enter-active,.fade-leave-active{
    transition: 0.5s;
  }
  .fade-enter,.fade-leave-to{
    transform: scale(0);
  }
</style>
