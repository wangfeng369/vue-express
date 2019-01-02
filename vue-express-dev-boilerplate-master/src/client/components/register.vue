<template>
    <div class="container">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username" >
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email"
                :rules="[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                <el-input type="text" v-model="ruleForm2.email"></el-input>
            </el-form-item>
            <el-form-item label='验证码' prop='code'>
                 <el-input type="text" v-model="ruleForm2.code" style="width:200px;"></el-input>
                <el-button type="primary" color="primary" @click="getcode">接收验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" color="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button type="danger" @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    username: '',
                    pass: '',
                    checkPass: '',
                    email: '',
                    code:''
                },
                rules2: {
                    username: [{
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur'
                    }],
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                    code:[{
                        required: true,
                        message: '验证码不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            getcode:function(){
                _this.$axios.post('/user/code', {
                    userName: userName,
                    password: password,
                    email:email
                }, {
                    'Content-Type': 'application/json'
                })
                .then(function (response) {
                    if (!response.data.sucess) {
                        return;
                    }
                })
                .catch(function (error) {});
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this
                        let userName = _this.ruleForm2.username
                        let password = _this.ruleForm2.pass
                        let email = _this.ruleForm2.email
                        let code = _this.ruleForm2.code
                        _this.$axios.post('/user/registerAdmin', {
                                userName: userName,
                                password: password,
                                email:email,
                                code:code
                            }, {
                                'Content-Type': 'application/json'
                            })
                            .then(function (response) {
                                if (!response.data.success) {
                                    return;
                                }
                            })
                            .catch(function (error) {});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>


</style>