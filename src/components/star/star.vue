<template>
    <div class="star" ref="star">
      <span :class="{'star-onItem':item.isOn,'star-halfItem':item.isHalf}" class="star-item" v-for="item in _color"></span>
    </div>
</template>

<script>
    export default {
        name: "" ,
        //挂载之后获取dom节点,
        data(){
          return {

          }
        },
        props:{
          _color:{
            type:Array,
            default(){
              return [{isOn:false,isHalf:false},{isOn:false,isHalf:false},{isOn:false,isHalf:false},{isOn:false,isHalf:false},{isOn:false,isHalf:false}] ;
            }
          } ,

        },
        methods:{

        },
        mounted(){

          let size = this.$refs.star.getAttribute('size') ;
          //根据size来改变颜色
          let maxSize = Math.floor(size) ;

          if (maxSize > 4){
            maxSize = 5 ;
          }
          for(let i = 0 ; i < maxSize ;i++){
            this._color[i].isOn = true ;
            this._color[i].isHalf = false ;
          }
          if (maxSize === 5){
            return ;
          }
          this._color[maxSize].isHalf = true ;
          this._color[maxSize].isOn = false ;

        } ,

    }
</script>

<style scoped>
  .star{
      font-size: 20px;
      display: inline-block;
      margin-left: -13px;
  }
  .star-item{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(../../../resource/img/star24_off@2x.png) center;
    background-repeat: no-repeat;
    margin-left: 5px;
    margin-top: 5px;
  }
  .star-onItem{
    background: url(../../../resource/img/star24_on@2x.png) center;
    background-repeat: no-repeat;
  }
  .star-halfItem{
    background: url(../../../resource/img/star24_half@2x.png) center;
    background-repeat: no-repeat;
  }
</style>
