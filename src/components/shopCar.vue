<template>
<div class="shop-car">
  <div class="content">
    <div class="content-left">

      <div class="logo-wrap" @click = 'showList'>
        <div class="logo" :class="{'logoHighlight':($store.getters.totalCount > 0)}">
          <span class="icon-shopping_cart" :class="{'logoHighlight':($store.getters.totalCount > 0)}"></span>
        </div>

        <div v-show="$store.getters.totalCount > 0" class="num">{{ $store.getters.totalCount }}</div>
      </div>

      <div class="price" :class="{'color':($store.getters.totalCount > 0)}">¥ {{ $store.getters.totalPrice }}</div>
      <div class="desc">另需配送费¥ {{ getDesc }}元</div>
    </div>
    <div class="content-right">
      <div class="gay" :class ='gayClass'>{{ getRight }}</div>
    </div>
    <!--购物车具体内容-->
    <shop-list v-show="$store.state.listShow"></shop-list>
  </div>

</div>
</template>

<script>
    import shopList from '@/components/shopList' ;

    export default {
        name: "shop-car" ,
        props:{
          food:{
            type:Object ,
          }
        } ,
        components:{
          'shop-list':shopList ,
        } ,
        methods:{
          showList(){
            if(this.$store.state.selectFoods.length === 0 ){
              this.$store.state.listShow = false ;
              return ;
            }
            this.$store.state.listShow = !this.$store.state.listShow ;
          }
        } ,
        computed:{
          getDesc(){
            if(this.$store.state.seller){
              return this.$store.state.seller.deliveryPrice ;
            }
          } ,
          getRight(){
            if(this.$store.state.seller){
              let minPrice = this.$store.state.seller.minPrice ;
              let total = this.$store.state.total ;
                if (total === 0 ){
                  return `¥${minPrice}起送` ;
                } else if (total < minPrice){
                  let diff = minPrice - total ;
                  return `还差¥${ diff }元` ;
                } else{
                  return '去结算' ;
                }
            }
          } ,
          gayClass(){
            if(this.$store.state.seller){
              let minPrice = this.$store.state.seller.minPrice ;
              let total = this.$store.state.total ;
              if (total < minPrice) {
                return 'not-enough' ;
              }
              return 'enough' ;
            }
          }
        } ,
    }
</script>

<style scoped>
  @import "../../src/common/stylus/ico.css";
  .shop-car{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 8;
    height: 48px;
    width: 100%;
  }
  .content{
    display: flex;
    background-color: #141d27;
  }
  .content-left{
    flex: 1;
    height: 48px;
    font-size: 0;
    text-align: left;
  }
  .content-left .logo-wrap{
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background-color: #141d27;
    text-align: center;
    z-index: 30;
  }
  .logo-wrap .num{
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #ffffff;
    background-color: red;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
  }
  .logo-wrap .icon-shopping_cart{
    font-size: 24px;
    line-height: 44px;
    color: #80858a;
  }
  .logo-wrap .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #2b343c;
  }
  .content-left .logoHighlight{
    background-color: rgb(0,160,220);
    color: white;
  }
  .content-left .price{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    box-sizing: border-box;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,.1);
    font-size: 16px;
    color: rgba(255,255,255,.4);
    font-weight: 700;
  }
  .content-left .color{
    color: white;
  }
  .content-left .desc{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin:12px 0 0 12px;
    font-size: 16px;
    color: rgba(255,255,255,.4);
  }
  .content-right{
    height: 48px;
    flex: 0 0 105px;
    width: 105px;
    line-height: 48px;
  }
  .content-right .gay{
    color: rgba(255,255,255,.4);
    font-weight: 700;
    background-color: #2b333b;
    font-size: 16px;
  }
  .content-right .not-enough{
    background-color: #2b333b;
  }
  .content-right .enough{
    background-color: #00b43c;
    color: white;
  }
  /*.shopping-wrap{*/
    /*position: absolute;*/
    /*bottom: 48px;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*!*min-height: 400px;*!*/
    /*background-color: black;*/
  /*}*/
</style>
