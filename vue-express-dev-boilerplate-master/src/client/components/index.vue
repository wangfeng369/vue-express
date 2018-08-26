<template>
    <div class="container">
        <h1>你好，全栈!11111111</h1>
        <h1>{{ message }}</h1>
        <el-button @click="get">获取数据</el-button>
        <el-button type="primary" @click="tz">点击跳转</el-button>
    </div>
      
</template>

<script>
export default {
    data() {
        return{
             message: ''
        }
    },
    methods:{
        tz(){
            this.$router.push({path:'/Hello'})
        },
        get(){
            let _this = this
            _this.$axios.get('/user/userInfo',{'Content-Type':'application/json'})
                .then(function (response) {
                    _this.message = response.data.test.password;
                })
                .catch(function (error) {
                console.log(error);
});
    }
    }
}
</script>

<style scoped>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
