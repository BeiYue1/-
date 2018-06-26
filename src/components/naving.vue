<template>
  <div class="nav">
      <div>
        <router-link to="/shopping" class="font" :class="{'router-link-active':$store.state.isSure}">商品</router-link>
      </div>
    <div @click = 'changeSure()'>
        <router-link to="/comment" class="font">评论</router-link>
    </div>
    <div @click = 'changeSure()'>
      <router-link to="/business" class="font">商家</router-link>
    </div>
  </div>
</template>

<script>
    export default {
      name: "" ,
      methods:{
        changeSure(){
          this.$store.state.isSure = false ;
        }
      }
    }
</script>

<style scoped>
  .nav{
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(7,17,27,.1);
    box-sizing: border-box;

  }
  .nav div{
    flex: 1;
    text-align: center;
    line-height: 40px;

  }
  .font{
    font-size: 14px;
    color: rgb(77,85,93);
  }
  .active{
    color: rgb(240,20,20);
  }
  .router-link-active{
    color: rgb(240,20,20);
  }
</style>
