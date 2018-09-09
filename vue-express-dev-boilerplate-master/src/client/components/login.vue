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
        
            <input type="text" name="name" v-model="formData.username" value=""/>
            <input type="pwd" name="password" v-model="formData.pwd" value=""/>
            <input type="submit" value="提交" @click="submit"/>
        
    </div>

</template>
<script>
    export default {
        data() {
            // var checkAge = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('年龄不能为空'));
            //     }
            //     setTimeout(() => {
            //         if (!Number.isInteger(value)) {
            //             callback(new Error('请输入数字值'));
            //         } else {
            //             if (value < 18) {
            //                 callback(new Error('必须年满18岁'));
            //             } else {
            //                 callback();
            //             }
            //         }
            //     }, 1000);
            // };
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         if (this.ruleForm2.checkPass !== '') {
            //             this.$refs.ruleForm2.validateField('checkPass');
            //         }
            //         callback();
            //     }
            // };
            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请再次输入密码'));
            //     } else if (value !== this.ruleForm2.pass) {
            //         callback(new Error('两次输入密码不一致!'));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                // ruleForm2: {
                //     pass: '',
                //     checkPass: '',
                //     age: ''
                // },
                formData:{
                    username:'',
                    pwd:''
                },
                // rules2: {
                //     pass: [{
                //         validator: validatePass,
                //         trigger: 'blur'
                //     }],
                //     checkPass: [{
                //         validator: validatePass2,
                //         trigger: 'blur'
                //     }],
                //     age: [{
                //         validator: checkAge,
                //         trigger: 'blur'
                //     }]
                // }
            };
        },
        methods: {
            // submitForm(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             alert('submit!');
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // }
            submit: function(){
                let _this = this
                let userName = _this.formData.username
                let password = _this.formData.pwd
                _this.$axios.post('/user/login',
                    {userName:userName,password:password}, 
                    {'Content-Type': 'application/json'})
                    .then(function (response) {
                        console.log(response)
                        if(response.data.code==0){
                            _this.$router.push({'path':'./index'})
                        }else{
                            alert('用户名或密码错误')
                        }
                     })
                    .catch(function (error) {});
            }
        }
        
    }
</script>

<style scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: center;
}
body,html{
    padding: 0;
    margin: 0;
    min-height: 100%;
}

</style>
