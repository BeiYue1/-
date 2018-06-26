<template>
    <div class="header" v-if="$store.state.seller">

      <img class="bg" :src="$store.state.seller.avatar" alt="">
      <div class="content-wrapper">
          <div class="avatar">
            <img :src="$store.state.seller.avatar" alt="">
          </div>

          <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name">{{$store.state.seller.name }}</span>
            </div>

            <div class="description">
              {{$store.state.seller.description}}/{{$store.state.seller.deliveryTime}}分钟送达
            </div>

            <div class="support">
              <span v-if="$store.state.seller.supports" class="icon" :class = "classMap[($store.state.seller.supports)[0].type]">

              </span>
              <span v-if="$store.state.seller.supports" class="text">{{($store.state.seller.supports)[0].description}}</span>
            </div>
          </div>
          <div v-if="$store.state.seller.supports" class="support-count" @click = 'showDetail'>
            <span class="count">{{ $store.state.seller.supports.length }}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
      </div>

      <div class="bulletin-wrapper" @click = 'showDetail'>
        <span class="bulletin-title"></span><span class="bulletin-text">{{ $store.state.seller.bulletin }}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>

      <!--弹层-->
      <transition name="fade">
        <div class="detail" v-show="$store.state.detailShow">
        <div class="detail-wrapper clearFix">
          <div class="detail-main">
            <!--标题-->
            <h1 class="name">{{ $store.state.seller.name }}</h1>
            <!--评分-->
            <div class="star-wrapper">
              <star size = '4.6'></star>
            </div>
            <!--title-->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>

            <ul v-if="$store.state.seller.supports" class="supports">
              <li class="support-item" v-for="item in $store.state.seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text"> {{ item.description }} </span>
              </li>
            </ul>

            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>

            <div class="bulletin">
              <p class="content">{{ $store.state.seller.bulletin }}</p>
            </div>

          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click = 'detailHide'></i>
        </div>
      </div>
      </transition>
    </div>
</template>

<script>
    import star from '../star/star.vue' ;
    export default {
        name: "" ,
        data() {
            return {
                //弹层是否显示
                detailShow:false ,
                //存放class
                classMap : ['decrease' , 'discount' , 'special' , 'invoice' , 'guarantee'] ,
            }
        } ,
        methods:{
          showDetail(){
            this.$store.state.detailShow = true ;
          } ,
          detailHide(){
            this.$store.state.detailShow = false ;
          }
        } ,
        components:{
            star ,
        }
    }
</script>

<style scoped>
  @import "../../../src/common/stylus/ico.css";

  .header{
    background-color: rgba(7,17,27,.5);
    color: white;
    position: relative;
    overflow: hidden;
  }
  .header .bg{
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(10px);
  }
  .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }
  .avatar{
    display: inline-block;
    font-size: 14px;
    vertical-align: top;

  }
  .content {
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;
  }
  .support-count{
    position: absolute;
    padding: 0 8px;
    line-height: 24px;
    height: 24px;
    border-radius: 14px;
    background-color: rgba(0,0,0,0.2);
    right: 12px;
    bottom: 14px;
  }
  .icon-keyboard_arrow_right{
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
  }
  .support-count .count{
    font-size: 10px;
  }
  .content div{
    text-align: left;
  }
  .content .title{
    margin: 2px 0 8px 0;
  }
  .title .brand{
    width: 30px;
    height: 18px;
    background:url(../../../resource/img/brand@2x.png) no-repeat center center;
    background-size: 30px 18px;
    display: inline-block;
  }
  .title .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    vertical-align: top;
  }
  .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }

  .support .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px;
    background-repeat: no-repeat;
  }
  .support .text{
    line-height: 12px;
    font-size: 10px;

    vertical-align: top;
  }

  .decrease{
    background-image: url(../../../resource/img/decrease_1@3x.png);
  }
  .discount{
    background-image: url(../../../resource/img/discount_1@3x.png);
  }
  .special{
    background-image: url(../../../resource/img/special_1@3x.png);
  }
  .invoice{
    background-image: url(../../../resource/img/invoice_1@3x.png);
  }
  .guarantee{
    background-image: url(../../../resource/img/guarantee_1@3x.png);
  }

  .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background-color: rgba(7,17,27,.2);
  }
  .detail{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99;
    overflow: auto;
    top: 0;
    left: 0;
    background-color: rgba(7,17,27,0.8);
    transition: all 0.5s;
  }

  .bulletin-wrapper .icon-keyboard_arrow_right{
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 2px;
  }
  .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .title{
    display: flex;
    width: 80%;
    margin: 28px auto 28px auto;
  }
  .title .line{
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .title .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }

  .supports{
    width: 80%;
    text-align: left;
    margin: 0 auto;
  }
  .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .support-item:last-child{
    margin-bottom: 0;
  }
  .supports .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px;
    background-repeat: no-repeat;

  }
  .supports .text{
    line-height: 16px;
    font-size: 12px;
  }

  .bulletin{
    width: 80%;
    margin: 0 auto;
    text-align: left;
  }
  .bulletin .content{
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
    margin: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  /*bulletin@2x.png*/
  .bulletin-wrapper .bulletin-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    background-image: url(../../../resource/img/bulletin@2x.png);
    background-size: 22px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
    margin-top: 8px;
  }
  .bulletin-wrapper .bulletin-text{
    font-size: 10px;
    vertical-align: top;
    font-weight: 200;
    margin: 0 4px;
  }
  .detail-wrapper{
    min-height: 100%;
    width: 100%;
  }
  .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .detail-main .name{
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    line-height: 16px;
  }
  .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    clear: both;
    font-size: 32px;
    margin: -64px auto 0 auto;
  }
  .avatar img{
    width: 64px;
    height: 64px;
    border-radius: 2px;
  }
  .clearFix{
    display: inline-block;
  }
  .clearFix:after{
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
  }
</style>
