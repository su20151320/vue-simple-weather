<template>
    <div>
        <transition name="form-fade" mode="in-out">
            <section v-show="showLogin">
                <div>
                    <p>查看天气预报</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            showLogin: false,
        }
    },
    mounted() {
        this.showLogin = true;
    },
    methods: {
      async  submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    // const res = await login({ user_name: this.loginForm.username, password: this.loginForm.password });
                    this.$message({
                        type: 'success',
                        message: '用户名是：'+this.loginForm.username+'密码是：'+this.loginForm.password
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '请输入正确的用户名密码'
                    });
                }
            });
        }
    }
}

</script>

<style>

</style>