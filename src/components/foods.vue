<template>
    <transition name="fade">
      <div class="food" ref="food">
        <div class="food-content">
          <!--图片部分-->
          <div class="image-header">
            <img :src="food.image" alt="">
            <div class="back" @click = 'hideThis'>
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <!--内容部分-->
          <div class="content">
            <div class="title">{{food.name}}</div>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{ food.rating }}%</span>
            </div>
            <div class="price">
              <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
            </div>

            <!--购物车-->
            <div class="cart-wrap">
              <cart-control :food="food"></cart-control>
            </div>
            <div @click.stop.prevent = 'addFirst' class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </div>

          <split v-show="food.info"></split>

          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <div class="text">{{food.info}}</div>
          </div>

          <split></split>

          <div class="rating">
            <h1 class="title">商品评价</h1>
            <rating-select :select-type="selectType"
                           :only-content="onlyContent"
                           :desc="desc"
                           :ratings="food.ratings">

            </rating-select>

            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-show="rating.isShow" v-for="rating in food.ratings" class="rating-item">
                  <div class="user">
                    <span class="user-name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                  </div>

                  <div class="time">{{rating.rateTime | changeDate(rating.rateTime)}}</div>

                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType === 0 , 'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                  </p>
                </li>
              </ul>

              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
                暂无评价
              </div>
            </div>

          </div>
        </div>
      </div>
    </transition>
</template>

<script>
    import Vue from 'vue' ;
    import BScroll from 'better-scroll' ;
    import cartControl from '@/components/cartContral';
    import split from '@/components/split';
    import ratingSelect from '@/components/ratingSelect';
    const POSITIVE = 0 ;
    const MEGATIVE = 1 ;
    const ALL = 2 ;
    export default {
        name: "" ,
        props:{
          food:{
            type:Object ,
          }
        } ,
        data(){
          return {
            showFlag:false ,
            selectType:ALL,
            onlyContent:true ,
            desc:{
              all:'全部',
              positive:'推荐',
              negative:'吐槽',
            }
          }
        } ,
        mounted(){
          this.foods = new BScroll(this.$refs.food , {
            click:true ,
          }) ;
          this.showFlag = true ;
          this.selectType = ALL ;
          this.onlyContent = true ;
        },
        filters:{
          changeDate(time){

            function add(str) {
              if (str < 10){
                str = '0' + str;
              } else{
                str = '' + str ;
              }

              return str ;
            }
            let date = new Date(time) ;
            let y = date.getFullYear() ;
            let M = add(date.getMonth() + 1) ;
            let d = add(date.getDate() );
            let h = add(date.getHours() );
            let m = add(date.getMinutes()) ;

            return `${y}-${M}-${d} ${h}:${m}` ;
          }
        },
        methods:{
          hideThis(){
            this.$store.state.isShade = false ;
          } ,
          addFirst(event){

            if (!event._constructed){
              return ;
            }
            Vue.set(this.food,'count',1) ;
            this.$store.state.selectFoods.push(this.food) ;
          } ,

        } ,

        components:{
          'cartControl':cartControl,
          'split':split ,
          'ratingSelect':ratingSelect ,
        }
    }
</script>

<style scoped>
@import "../../src/common/stylus/ico.css";
.food{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  z-index: 3;
  text-align: left ;
  width: 100%;
  background-color: #ffffff;
}
.image-header{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.image-header img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.back{
  position: absolute;
  top: 10px;
  left: 0;
}

.icon-arrow_lift{
  display: block;
  padding: 10px;
  font-size: 20px;
  color: white;
}
.content{
  padding: 18px;
  position: relative;
}
.content .title{
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  margin-bottom: 8px;
  color: rgb(7,17,27);
}
.content .detail{
  margin-bottom: 18px;
  line-height: 10px;
}
.detail .sell-count{
  font-size: 10px;
  color: rgb(147,153,159);
  margin-right: 12px;
}

.detail .rating{
  font-size: 10px;
  color: rgb(147,153,159);
}
.price{
  font-weight: 700;
  line-height: 24px;
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
.cart-wrap{
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.buy{
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 10;
  height: 24px;
  line-height: 24px;
  color: white;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 10px;
  border-radius: 12px;
  background-color: rgb(0,160,220);
}
.info,
.rating
{
  padding:18px
}
.info .title,
.rating .title
{
  line-height: 14px;
  margin-bottom: 16px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.info .text{
  font-size: 12px;
  line-height: 24px;
  padding: 0 8px;
  color: rgb(77,85,93);
}

.rating-wrapper{

}
.rating-wrapper .rating-item{
  text-align: left;
  position: relative;
  padding: 16px 12px;
  border-bottom: 1px solid rgba(7,17,27,.1);
}
.rating-item .user{
  position: absolute;
  right: 0;
  top: 16px;
  font-size: 0;
  line-height: 12px;
}
.user .user-name{
  display: inline-block;
  vertical-align: top;
  font-size: 10px;
  color: rgb(147,153,159);
  margin-right: 6px;
}
.user .avatar{
  border-radius: 50%;
}
.time{
  margin-bottom: 6px;
  line-height: 12px;
  font-size: 12px;
  color: rgb(147,153,159);
}
.text{
  line-height: 16px;
  font-size: 12px;
  color: rgb(7,17,27);
}

.no-rating{
  padding: 16px 0;
  font-size: 12px;
  color: rgb(147,153,159);
}
















.icon-thumb_down,
.icon-thumb_up{
  margin-right: 4px;
  line-height: 24px;
  font-size: 12px;
}
.icon-thumb_up{
  color: rgb(0,100,200);
}

.icon-thumb_down{
  color: rgb(147,153,159);
}






















.fade-enter-active,.fade-leave-active{
  transition: all 0.5s;
}
.fade-enter,.fade-leave-to{
 transform: translate3d(100%,0,0);
}
</style>
