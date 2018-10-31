<template>
    <div class="container">
        <!-- <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="ruleForm2.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form> -->
        <div class="">
            <input type="text" name="name" v-model="formData.username" value=""/>
            <input type="pwd" name="password" v-model="formData.pwd" value=""/>
            <input type="submit" value="提交" @click="submit"/>
        </div>
            <router-view></router-view>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                formData:{
                    username:'',
                    pwd:''
                },
            };
        },
        methods: {
            submit: function(){
                let _this = this
                let userName = _this.formData.username
                let password = _this.formData.pwd
                _this.$axios.post(_this.apiUrl+'/user/login',
                    {userName:userName,password:password}, 
                    {'Content-Type': 'application/json'})
                    .then(function (response) {
                        if(!response.data.sucess){
                            alert(response.data.info)
                            return;
                        }
                        sessionStorage.setItem('token',response.data.token);
                        _this.$router.push({'path':'./index'})
                       
                     })
                    .catch(function (error) {});
            },
            register:function(){
                this.$router.push({'path':'./register'})
            }
        }
        
    }
</script>

<style scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
body,html{
    padding: 0;
    margin: 0;
    min-height: 100%;
}

</style>
