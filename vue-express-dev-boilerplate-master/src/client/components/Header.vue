<template>
  <div class="head">
    <div class="">
<div @click="goLogin()" :class= " [tab==0?'on':'']">login</div>
  <div @click="goIndex()" :class= " [tab==1?'on':'']">index</div> 
  
    </div>
  <div class="">
  <router-view></router-view>
  </div>
    
  </div> 
 
</template>

<script>
export default {
  data(){
    return{
      tab:0
    }
  },
  methods:{
    goLogin: function(){
      this.tab = 0
      this.$router.push('./login');
    },
    goIndex: function() {
      this.tab = 1
      this.$router.push('./index');
    }
  }
}
</script>

<style scoped>
.head{
  width: 100%;
  height: 50px;
  background: #fff;
}
.on{
  color: #188eef;

}
</style>
