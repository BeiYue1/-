<template>
  <div class="ratings" >
    <div class="ratings-content">
      <div class="over">
        <div class="over-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="over-right">
          <div class="score-wrapper">
            <div>
              <span class="title">服务态度</span><star size="4.1"></star><span class="title">{{seller.serviceScore}}</span>
            </div>

           <div>
             <span class="title">商品评分</span><star size='4.3'></star><span class="title">{{seller.foodScore}}</span>
           </div>

            <div>
              <span class="title">送达时间</span></star><span class="title _title">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>

        </div>
      </div>
      <split></split>
      <div class="btn">
        <div @click="selectIndex(2)" class="positives" :class="{'active':index === 2}">全部<span class="count">{{ratings.length}}</span></div><div @click="selectIndex(0)" class="positive" :class="{'active':index === 0}">满意<span class="count">{{getSeller}}</span></div><div @click="selectIndex(1)"  class="negative" :class="{'active':index === 1}">不满意<span class="count">{{getNoSeller}}</span></div>
      </div>
      <p class="choice" @click = 'toggleSelect'>
        <span class="icon-check_circle" :class="{'checked':select}"></span>只看有内容的评价
      </p>

    <!--评论部分-->
      <div ref="disScroll" class="disScroll">
        <ul class="dis" >
          <li v-for="item in ratings" v-show="item.isShow">
            <div class="dis-left">
              <img :src="item.avatar" alt="">
            </div>
            <div class="dis-right">
              <h1 class="dis-name">{{item.username}}</h1>
              <div class="dis-all">
                <star class="dis-star" :size="item.score"></star><span class="dis-span" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span><span class="dis-time">{{item.rateTime | changeDate(item.rateTime)}}</span>
                <p class="item-text">{{item.text}}</p>
                <div class="dis-icon">
                  <span class="icon" :class="{'icon-thumb_up':item.rateType === 0 ,'icon-thumb_down':item.rateType === 1}"></span><div class="dis-til"><span v-for="title in item.recommend" class="dis-title">{{title}}</span></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import star from '@/components/star/star';
  import split from '@/components/split';
  import BScroll from 'better-scroll' ;
  import Vue from 'vue' ;
  import index from "../router";
  export default {
    name: "" ,
    props:{
      seller:{
        type:Object,
      }
    } ,
    data(){
      return {
        ratings:{} ,
        select:false ,
        index:2 ,
      }
    },
    created(){
      //获取信息
      this.$http.get('/api/ratings').then( (res) => {
        res = JSON.parse(JSON.stringify(res.body));
        if (res.errno === 0 ){
          this.$store.state.rantings = this.ratings = res.data ;
          for (let i = 0 ; i < this.ratings.length ; i++){
            Vue.set(this.ratings[i],'isShow',true) ;
          }

        }
      }) ;
    },
    methods:{
      //切换是否只显示内容
      toggleSelect(){
        this.select = !this.select ;
        let index = this.index ;

        if (this.select){  //只显示有内容的
          if (index === 2) {
            for (let i = 0 ; i < this.ratings.length ; i++){
              (this.ratings[i].text !== '')?this.ratings[i].isShow = true:this.ratings[i].isShow = false ;
            }
            return ;
          }
          for (let i = 0 ; i < this.ratings.length ; i++){
            (this.ratings[i].text !== '' && this.ratings[i].rateType === index)?this.ratings[i].isShow = true:this.ratings[i].isShow = false ;
          }

        } else{  //全部显示
          if (index === 2){
            for (let i = 0 ; i < this.ratings.length ; i++){
              this.ratings[i].isShow = true ;
            }
          }else {
            for (let i = 0 ; i < this.ratings.length ; i++){
              (this.ratings[i].rateType === index)?this.ratings[i].isShow = true:this.ratings[i].isShow = false ;
            }
          }
        }
      } ,

      //切换是否满意
      selectIndex(index){
        this.index = index ;
        if (this.select){
          switch (index){
            case 2:
              console.log(1) ;
              for(let i = 0 ; i < this.ratings.length;i++){
                (this.ratings[i].text !== '')?this.ratings[i].isShow = true:this.ratings[i].isShow = false ;
              }
              break ;
            case 0:
              for(let i = 0 ; i < this.ratings.length;i++){
                (this.ratings[i].rateType === index && this.ratings[i].text !== '')?this.ratings[i].isShow = true:this.ratings[i].isShow = false ;
              }
              break ;
            case 1:
              for(let i = 0 ; i < this.ratings.length;i++){
                (this.ratings[i].rateType === index && this.ratings[i].text !== '')?this.ratings[i].isShow = true:this.ratings[i].isShow = false ;
              }
              break ;
          }
        } else{
          switch (index){
            case 2:
              for(let i = 0 ; i < this.ratings.length;i++){
                this.ratings[i].isShow = true ;
              }
              break ;
            case 0:
              for(let i = 0 ; i < this.ratings.length;i++){
                (this.ratings[i].rateType === index)?this.ratings[i].isShow = true:this.ratings[i].isShow = false ;
              }
              break ;
            case 1:
              for(let i = 0 ; i < this.ratings.length;i++){
                (this.ratings[i].rateType === index)?this.ratings[i].isShow = true:this.ratings[i].isShow = false ;
              }
              break ;
          }
        }
      }

    },
    computed:{
      //获取满意评分
      getSeller(){
        let arr = [] ;
        for (let i = 0 ; i < this.ratings.length ;i++){
          if (this.ratings[i].rateType === 0){
            arr.push(this.ratings[i]) ;
          }
        }
        return arr.length ;
      } ,
      //获取不满意评分
      getNoSeller(){
        let arr = [] ;
        for (let i = 0 ; i < this.ratings.length ;i++){
          if (this.ratings[i].rateType === 1){
            arr.push(this.ratings[i]) ;
          }
        }
        return arr.length ;
      } ,
    },

    components:{
      star,
      'split':split ,
    } ,
    mounted(){

      this.disScroll = new BScroll(this.$refs.disScroll,{

      }) ;
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
  }
</script>

<style scoped>
  @import "../../src/common/stylus/ico.css";
  .ratings{
    position: fixed;
    top: 193px;
    left: 0;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }
  .over{
    display: flex;
    padding: 18px 0;
  }
  .over-left{
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7,17,27,.3);
    text-align: center;
    padding: 6px 0;
  }
  .over-right{
    flex: 1;
  }
  .over-left .score{
    font-size: 24px;
    line-height: 28px;
    color: rgb(255,253,0);
    margin-bottom: 6px;
  }
  .over-left .title{
    font-size: 12px;
    line-height: 12px;
    color: rgb(7,17,27);
    margin-bottom: 8px;
  }
  .rank{
    line-height: 10px;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .score-wrapper{
    margin-bottom: 8px;
    line-height: 18px;
    font-size: 0;
  }
  .score-wrapper div{
    text-align: left;
  }
  .score-wrapper .title{
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    color: rgb(7,17,27);
    margin-left: 10px;
    margin-top: 10px;
  }
  .score-wrapper ._title{
      margin-left: 18px;
   }
  .score-wrapper .star{
    vertical-align: top;
    margin:0 10px;
  }
  .btn{
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid #e6e7e8;
  }
  .btn div{
    display: inline-block;
    padding: 8px 12px;
    border-radius: 2px;
    margin-right: 8px;
    color: rgb(77,85,93);
    font-size: 12px;
    line-height: 16px;
  }
  .btn .positive{
    background-color: rgba(0,160,220,.2);
  }
  .btn .positives{
    background-color: rgba(0,160,220,.5);
  }
  .btn .negative{
    background-color: rgba(77,85,93,.2);
  }
  .btn .count{
    font-size: 8px;
    margin-left: 2px;
  }
  .btn .active{
    color: white;
    background-color: rgb(0,160,220);
  }
  .choice{
    padding-left: 20px;
    text-align: left;
    line-height: 49px;
    border-bottom: 1px solid #e6e7e8;
  }
  .choice .icon-check_circle{
    display: inline-block;
    font-size: 24px;
    vertical-align: middle;
    padding-right: 10px;
  }
  .choice .checked{
    color: rgb(0,160,220);
  }
  .disScroll{
    max-height: 240px;
    overflow: hidden;
  }
  .dis li{
    overflow: hidden;
    padding: 18px;
    border-bottom: 1px solid #e6e7e8;
    text-align: left;
    display: flex;
    position: relative;
  }

  .dis .dis-left{
    margin-right: 12px;
  }
  .dis .dis-right{
  }
  .dis .dis-left img{
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  .dis-name{
    font-size: 10px;
    color: rgb(7,17,27);
    line-height: 12px;
  }
  .dis-star{
    margin-right: 6px;
    vertical-align: top;
  }
  .dis-span{
    display: inline-block;
    margin-top: 14px;
    vertical-align: top;
    line-height: 12px;
    color: rgb(147,153,159);
    font-weight: 200;
    font-size: 10px;
  }
  .item-text{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
  }
  .dis-icon{
    display: flex;
    margin-top: 5px;
  }
  .icon{
    font-size: 12px;
    margin-right: 8px;
    line-height: 16px;
  }
  .dis-til{
    display: inline-block;
    vertical-align: top;
  }
  .dis-title{
    border: 1px solid rgba(7,17,27,.1);
    border-radius: 2px;
    background-color: rgb(255,255,255);
    font-size: 9px;
    color: rgb(147,153,159);
    line-height: 32px;
    margin-right: 8px;
    padding:0 6px;
    display: inline-block;
    margin-bottom: 3px;
    width: 62px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
  }
  .dis-time{
    font-size: 10px;
    font-weight: 200;
    color: rgb(147,153,159);
    line-height: 12px;
    position: absolute;
    top: 19px;
    right: 16px;
  }
  .icon-thumb_up{
    color: rgb(0,160,220);
    font-size: 12px;
    line-height: 16px;
  }
  .icon-thumb_down{
    color: rgb(183,187,190);
  }
</style>
