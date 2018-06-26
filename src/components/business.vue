<template>
  <div class="business"  ref="business">
    <div class="bus">
      <div class="bus-title">
        <h1 class="bus-h1">{{seller.name}}</h1>
        <div class="bus-star">
          <star :size="seller.score"></star><span class="bus-661">(661)</span><span class="bus-month">月售690单</span>
        </div>

        <div class="bus-news">
          <div>
            <h2>起送价</h2>
            <p>{{seller.minPrice}}<span>元</span></p>
          </div>
          <div>
            <h2>商家配送</h2>
            <p>{{seller.deliveryPrice}}<span>元</span></p>
          </div>
          <div>
            <h2>平均配送时间</h2>
            <p>{{seller.deliveryTime}}<span>分钟</span></p>
          </div>
        </div>
      </div>

      <split></split>

      <!--公告部分-->
      <div class="tell">
        <h1>公告和活动</h1>
        <!--内容区域-->
        <p>{{seller.bulletin}}</p>
        <!--折扣部分-->
        <ul>
          <li v-for="item in seller.supports"><span :class="color[item.type]"></span>{{item.description}}</li>
        </ul>
      </div>
      <split></split>

      <!--商品实景-->
      <div class="tell shop">
        <h1>商家实景</h1>
        <!--实景图-->
        <div class="scroll-x" ref="tScroll">
          <div class="shop-img" ref="toScroll">
            <img v-for="item in seller.pics" :src="item" alt="">
          </div>
        </div>
      </div>

      <split></split>

      <div class="tell">
        <h1>商家信息</h1>
        <ul>
          <li v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '@/components/star/star' ;
  import split from '@/components/split';
  import BScroll from 'better-scroll' ;
  export default {
    name: "" ,
    props:{
      seller:{
        type:Object,
      } ,

    },
    data(){
      return {
        color:['type1','type2','type3','type4','type5'] ,
      }
    } ,
    components:{
      star ,
      split,
    },
    mounted(){
      this.business = new BScroll(this.$refs.business,{
        click:true ,
      }) ;

      let picWidth = 120;
      let margin = 6 ;
      let width = (picWidth + margin)*4 - margin ;
      this.$refs.toScroll.style.width = width + 'px' ;
      this.$nextTick(() =>{
        this.toScroll = new BScroll(this.$refs.tScroll,{
          scrollX:true ,
          eventPassthrough:'vertical'
        }) ;
      })
    },



  }
</script>

<style scoped>
  .business{
    position: fixed;
    top: 193px;
    left: 0;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    text-align: left;
  }
  .bus{
    min-height: 700px;
  }
  .bus-title{
    height: 150px;
    padding: 18px;
    box-sizing: border-box;
  }
  .bus-news{
    display: flex;
  }
  .bus-661{
    margin-right: 12px;
    font-size: 10px;
    color: rgb(77,66,93);
    line-height: 18px;
    vertical-align: top;
    display: inline-block;
    margin-top: 10px;
    margin-left: 8px;
  }
  .bus-h1{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
  }
  .bus-month{
    font-size: 10px;
    color: rgb(77,66,93);
    line-height: 18px;
    vertical-align: top;
    margin-top: 10px;
    display: inline-block;
  }
  .bus-news{
    padding: 18px;
    border-top: 1px solid rgba(7,17,27,0.1);
    display: flex;
  }
  .bus-news div{
    display: block;
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7,17,27,0.1);
  }
  .bus-news div:last-child{
    border-right: 1px solid transparent;
  }
  .bus-news h2{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .bus-news p{
    margin-top: 4px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(7,17,27);
    font-weight: 200;
  }
  .bus-news p span{
    font-size: 10px;
    color: rgb(7,17,27);
  }
  .scroll-x{
    width: 100%;
  }
  .tell{
    padding: 18px 18px 16px 18px;
  }
  .tell h1{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 28px;
  }
  .tell p{
    font-size: 12px;
    font-weight: 200;
    color: rgb(240,20,20);
    line-height: 24px;
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 16px;
  }
  .tell ul li{
    padding: 16px 12px;
    border-top: 1px solid rgba(7,17,27,.1);
    line-height: 16px;
  }
  .tell ul li span{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    margin-right: 6px;
  }
  /*减免*/
  .tell ul li .type1{
    background: url(../../resource/img/decrease_3@2x.png) no-repeat center;
    background-size: 16px;
  }
  /*折扣*/
  .tell ul li .type2{
    background: url(../../resource/img/discount_3@2x.png) no-repeat center;
    background-size: 16px;
  }
  /*特价*/
  .tell ul li .type3{
    background: url(../../resource/img/special_3@2x.png) no-repeat center;
    background-size: 16px;
  }
  /*发票*/
  .tell ul li .type4{
    background: url(../../resource/img/invoice_3@2x.png) no-repeat center;
    background-size: 16px;
  }
  /*保险*/
  .tell ul li .type5{
    background: url(../../resource/img/guarantee_3@2x.png) no-repeat center;
    background-size: 16px;
  }
  .shop-img{
    display: flex;
    margin-top: 12px;
  }
  .shop-img img{
    width: 120px;
    height: 90px;
    margin-right: 6px;

  }
</style>
