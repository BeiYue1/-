
<template>
  <div>
    <div class="goods">
      <div class="menu-wrap" ref="menuWrapper">
        <ul>
          <li @click = 'changes(index , $event)' v-for="(item , index) in $store.state.goods" class="menu-item goodsList" :key = 'index' :class="{'current': index === Number($store.state._index) }" >
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
          </span>
          </li>
        </ul>
      </div>
      <div class="foots-wrapper" ref="footsWrapper">
        <ul>
          <li v-for="item in $store.state.goods" class="foodList">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li @click = 'addFood(food,$event)' v-for="food in item.foods" class="foodItem">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                  </div>

                  <div class="cartControl-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <foods v-show ='$store.state.isShade' :food="selectedFood"></foods>
  </div>
</template>

<script>
    //引入better-scroll
    import BScroll from 'better-scroll' ;
    import shopCar from '@/components/shopCar' ;
    import cartControl from '@/components/cartContral';
    import foods from '@/components/foods' ;
    export default {
        name: "" ,

        data(){
          return {
            classMap : ['decrease' , 'discount' , 'special' , 'invoice' , 'guarantee'] ,
            listHeight:[] ,
            //选中的food
            selectedFood:{} ,
          }
        } ,

        updated(){
          this.getHeight() ;
        } ,
        mounted(){
          this.meunScroll = new BScroll(this.$refs.menuWrapper,{
            click:true ,
          }) ;
          this.foodScroll = new BScroll(this.$refs.footsWrapper,{
            probeType:3 ,
            click:true ,
          }) ;
          this.getHeight() ;

          this.foodScroll.on('scroll' , (pos) => {

            this.scrollY = Math.abs(Math.round(pos.y)) ;
            for (let i = 0 ; i < this.listHeight.length ; i++){
              let height1 = this.listHeight[i] ;
              let height2 = this.listHeight[i+1] ;
              if ( !height2 ||(this.scrollY >= height1 && this.scrollY < height2)){
                    this.$store.state._index = i ;
                    return ;
              }
            }
          })
        } ,

        methods:{
          getHeight(){
            let foodList = this.$refs.footsWrapper.getElementsByClassName('foodList') ;
            let height = 0 ;
            this.listHeight = [] ;
            this.listHeight.push(height) ;
            for (let i = 0 ; i < foodList.length ; i++){
              let item = foodList[i] ;
              height += item.clientHeight ;
              this.listHeight.push(height) ;
            }
          } ,
          changes(index , event){
            if (!event._constructed){
              return ;
            }
            let foodList = this.$refs.footsWrapper.getElementsByClassName('foodList') ;
            let els = foodList[index] ;
            this.foodScroll.scrollToElement(els , 500) ;
          } ,
          addFood(obj , event){
            if (!event._constructed){
              return ;
            }
            this.selectedFood = obj ;
            this.$store.state.isShade = true ;

            //将isFoods变为obj
            this.$store.state.isFoods = obj ;

          }
        } ,
        components:{
          'shopCar':shopCar ,
          'cartControl':cartControl ,
          'foods':foods ,
        }


    }
</script>

<style scoped>
  .goods{
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 193px;
    width: 100%;
    bottom: 46px;
  }

  .menu-wrap{
    flex: 0 0 80px;
    width: 80px;
    text-align: left;
  }
  .menu-item{
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
    background-color: #f3f5f7;
  }
  .menu-item .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 2px;
    margin-top: -1px;
    background-size: 16px;
    background-repeat: no-repeat;
  }
  .menu-item .text{
    font-size: 12px;
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }

  .foots-wrapper {
    flex: 1;
    text-align: left;
  }
  .foots-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background-color: #f3f5f7;
  }
  .foodItem{
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
  .foodItem:last-child{
    border-bottom: none;
    margin-bottom: 0;
  }
  .foodItem .icon{
    flex: 0 0 57px;
    margin-right: 10px;
  }
  .foodItem .content{
    flex: 1;
    position: relative;
  }
  .content .name{
    font-size: 14px;
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    color: rgb(7,17,27);
  }
  .content .desc{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .content .extra{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .extra .count{
    margin-right: 12px;
    font-size: 10px;
  }
  .price{
    font-weight: 700;
    line-height: 24px;
  }
  .cartControl-wrapper{
    position: absolute;
    right: 0;
    bottom: -10px;
  }
  .price .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20);
  }
  .price .old{
    font-size: 10px;
    color: rgb(147,153,159);
    text-decoration: line-through;
  }
  .current{
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background-color:  #fff;
    font-weight: 700;
  }
  .current .text{
    border: none;
  }







  .decrease{
    background-image: url(../../resource/img/decrease_1@3x.png);
  }
  .discount{
    background-image: url(../../resource/img/discount_1@3x.png);
  }
  .special{
    background-image: url(../../resource/img/special_1@3x.png);
  }
  .invoice{
    background-image: url(../../resource/img/invoice_1@3x.png);
  }
  .guarantee{
    background-image: url(../../resource/img/guarantee_1@3x.png);
  }
</style>
