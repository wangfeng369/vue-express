<template>
    <div class="container">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="checkUserName">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="checkName">
                <el-input type="text" v-model="ruleForm2.name"></el-input>
            </el-form-item>
            <el-form-item>
                <mu-button color="primary" @click="submitForm('ruleForm2')">提交</mu-button>
                <mu-button @click="resetForm('ruleForm2')">重置</mu-button>
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
                    name: ''
                },
                formData: {
                    username: '',
                    pwd: '',
                    name: ''
                },
                rules2: {
                    checkUserName: [{
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
                    checkName: [{
                        required: true,
                        message: '姓名不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this
                        let userName = _this.ruleForm2.username
                        let password = _this.ruleForm2.pass
                        let name = _this.ruleForm2.name
                        _this.$axios.post('/user/register', {
                                userName: userName,
                                password: password,
                                name:name
                            }, {
                                'Content-Type': 'application/json'
                            })
                            .then(function (response) {
                                if (!response.data.sucess) {
                                    alert(response.data.info)
                                    return;
                                }
                                _this.$router.push({
                                    'path': './login'
                                })

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