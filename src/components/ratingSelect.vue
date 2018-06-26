<template>
  <div class="ratingSelect">
    <div class="ratingType">
      <span @click="select(2,$event)" :class="{'posActive':$store.state.selectType === 2}" class="block positive">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" :class="{'posActive':$store.state.selectType === 0}" class="block positive">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" :class="{'negActive':$store.state.selectType === 1}" class="block negative">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="ratingSwitch" @click="toggleContent">
      <span :class="{'onIcon':$store.state.isContent}" class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>

  export default {
    name: "" ,
    props:{
      ratings:{
        type:Array,
        default(){
          return [] ;
        }
      } ,
      index:{
        type:Number,
        default(){
          return 2 ;
        }
      },
      onlyContent:{
        type:Boolean,
        default(){
          return false ;
        }
      } ,
      desc:{
        type:Object,
        default(){
          return {
            all:'全部',
            positive:'满意',
            negative:'不满意'
          }
        }
      }
    } ,
    data(){
      return {


      }
    },
    computed:{
      positives(){
        return this.ratings.filter( (item) => {
          return item.rateType === 0 ;
        } )
      } ,
      negatives(){
        return this.ratings.filter( (item) => {
          return item.rateType === 1 ;
        } )
      }
    },
    methods:{
      select(type,event){
        if(!event._constructed){
          return ;
        }
        this.$store.state.selectType = type ;
        let thisFood = this.$store.state.isFoods.ratings ;
        //先判断是否是只显示有内容的区域
        if(this.$store.state.isContent){   //只显示有内容的区域
          switch (type) {
            case 0:      //显示赞
              for(let i = 0 ; i < thisFood.length ; i++) {
                (thisFood[i].rateType === 0 && thisFood[i].text !== '')?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break ;
            case 1:    //显示吐槽
              for(let i = 0 ; i < thisFood.length ; i++){
                (thisFood[i].rateType === 1 && thisFood[i].text !== '')?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break;
            case 2:   //显示全部
              for(let i = 0 ; i < thisFood.length ; i++){
                (thisFood[i].text !== '')?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break;
          }
        } else{                             //全部显示
          switch (type){
            case 0:
              for(let i = 0 ; i < thisFood.length ; i++){
                (thisFood[i].rateType === 0)?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break ;
            case 1:    //显示吐槽
              for(let i = 0 ; i < thisFood.length ; i++){
                (thisFood[i].rateType === 1)?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break;
            case 2:   //显示全部

              for(let i = 0 ; i < thisFood.length ; i++){
                thisFood[i].isShow = true ;
              }
              break;
          }
        }
      } ,
      toggleContent(event){
        let thisFood = this.$store.state.isFoods.ratings ;
        let index = this.$store.state.selectType ;

        if(!event._constructed){
          return ;
        }
        this.$store.state.isContent = !this.$store.state.isContent;
        //判断是否只显示y有内容的区域
        if (this.$store.state.isContent){  //只显示有内容的区域赫
          switch (index){
            case 2:  //全部
              for(let i= 0 ; i< thisFood.length ; i++){
                (thisFood[i].text === '')?thisFood[i].isShow = false:thisFood[i].isShow = true ;
              }
              break ;
            case 1:
              for(let i= 0 ; i< thisFood.length ; i++){
                (thisFood[i].rateType === 1 && thisFood[i].text !== '')?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break ;
            case 0:
              for(let i = 0 ; i < thisFood.length ; i++) {
                (thisFood[i].rateType === 0 && thisFood[i].text !== '')?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break ;
          }

        } else{
          switch (index){
            case 0:
              for(let i = 0 ; i < thisFood.length ; i++){
                (thisFood[i].rateType === 0)?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break ;
            case 1:    //显示吐槽
              for(let i = 0 ; i < thisFood.length ; i++){
                (thisFood[i].rateType === 1)?thisFood[i].isShow = true:thisFood[i].isShow = false ;
              }
              break;
            case 2:   //显示全部
              console.log(2) ;
              for(let i = 0 ; i < thisFood.length ; i++){
                thisFood[i].isShow = true ;
              }
              break;
          }
        }


      }
    }
  }
</script>

<style scoped>
  @import "../../src/common/stylus/ico.css";

  .ratingSelect{
    /*text-align: left;*/
  }
  .ratingSelect .ratingType{
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,.2);
    font-size: 0;
  }
  .block{
    display: inline-block;
    padding: 8px 12px;
    border-radius: 2px;
    margin-right: 8px;
    color: rgb(77,85,93);
    font-size: 12px;
    line-height: 16px;
  }
  .positive{
    background-color: rgba(0,160,220,.2);
  }
  .negative{
    background-color: rgba(77,85,93,.2);
  }
  .count{
    font-size: 8px;
    margin-left: 2px;
  }
  .posActive{
    color: white;
    background-color: rgb(0,160,220);
  }
  .negActive{
    color: white;
    background-color: rgb(77,85,93);
  }
  .ratingSwitch{
    font-size: 0;
    padding: 12px 10px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    color: rgb(147,153,159);
  }
  .icon-check_circle{
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    margin-right: 4px;
  }
  .text{
    font-size: 12px;
  }
  .onIcon{
    color: #00c850;
  }
</style>
