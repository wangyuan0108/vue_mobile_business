<template>
    <div>
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />

        <div class="register-panel">
            <van-field v-model="userName" :error-message="usernameErrorMsg" label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="userName = ''" />

            <van-field v-model="password" :error-message="passwordErrorMsg" type="password" label="密码" placeholder="请输入密码" required />
            <div class="register-button">
                <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
            </div>
        </div>

    </div>
</template>
<script>
// import { Toast } from 'vant';
import axios from 'axios';
import url from '@/serviceAPI.config.js';
export default {
    data() {
        return {
            userName: '',
            password: '',
            openLoading: false,
            usernameErrorMsg: '',
            passwordErrorMsg: ''
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        axiosRegisterUser() {
            this.openLoading = true;
            axios({
                url: url.registerUser,
                method: 'POST',
                data: {
                    userName: this.userName,
                    password: this.password
                }
            })
                .then(response => {
                    console.log(response);
                    if (response.data.code === 200) {
                        this.Toast.success('注册成功');
                        this.openLoading = false;
                    } else {
                        console.log(response.data.mesage);
                        this.Toast.fail('注册失败');
                        this.openLoading = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.Toast.fail('注册失败');
                    this.openLoading = false;
                });
        },
        checkForm() {
            let isOk = true;
            if (this.userName.length < 5) {
                this.usernameErrorMsg = '用户名不能小于5位';
                isOk = false;
            } else {
                this.usernameErrorMsg = '';
            }
            if (this.password.length < 6) {
                this.passwordErrorMsg = '密码不能少于6位';
                isOk = false;
            } else {
                this.passwordErrorMsg = '';
            }
            return isOk;
        },
        registerAction() {
            if (this.checkForm()) {
                this.axiosRegisterUser();
            }
        }
    }
};
</script>
<style scoped>
.register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
}
.register-button {
    padding-top: 10px;
}
</style>