<template>
    <div class="">
        <div class="login-container">
            <el-row>
                <el-col :span="4" :offset="10">
                    <h1 class="page-title">自動テストプラットフォーム</h1>
                    <el-form ref="loginForm" :model="loginForm" label-width="80px" class="login-form" :rules="rules">
                        <el-form-item label="email" prop="username">
                            <el-input v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="password" prop="password">
                            <el-input v-model="loginForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="onsubmit">ログイン</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        {required: true, message: "アドレスを入れてください", trigger: "blur"},
                    ],
                    password: [
                        {required: true, message: "パスワード入れてください", trigger: "blur"},
                        {max: 100, message: "規定の長さを超えました", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
           onsubmit(){
             this.$refs.loginForm.validate( valid => {
                 if (!valid){
                     return
                 }
                 const params = {
                     username: this.loginForm.username,
                     password: this.loginForm.password
                 };
                 this.$http.login(this.loginForm).then(res=>{
                     const data = res.data;
                     const token = data.token;
                     const user = data.user;
                     this.$auth.setUserToken(user, token);
                     this.$router.push("/")
                 })
             })
           }
        },
        components: {}
    }
</script>

<style lang="scss">
.body{
    background-color: #eee;
}
.login-container{
    padding-top: 80px;
    .page-title{
        text-align: center;
    }
    .login-form{
        padding-top: 40px;
    }
}
</style>
