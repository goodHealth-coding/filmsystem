<template>
    <div id="app">
        <div class="top">
            <img :src="require('../assets/login_top.png')" height="70px" width="100%">
        </div>
        <div class="left_bac">
            <img :src="require('../assets/left_bac.png')" width="400px">
        </div>
        <div class="login_box" onmouseout="style.opacity='0.8'" onmouseover="style.opacity='1'">
            <el-tabs type="border-card">
                <el-tab-pane label="密码登录">
                    <div class="top_bar">
                        <div class="name">土豆电影网</div>
                    </div>
                    <div style="height: 30px;"></div>
                    <i class="fa fa-user-o fa-2x" aria-hidden="true" style="float:left"></i>
                    <el-input v-model="userName" placeholder="用户名" style="width:250px"></el-input>
                    <div style="height: 30px;"></div>
                    <i class="fa fa-address-book fa-2x" aria-hidden="true" style="float:left"></i>
                    <el-input v-model="password" placeholder="密码" style="width:250px" show-password></el-input>
                    <div style="height: 50px;"><span class="login_tips">{{login_error}}</span></div>
                    <el-button type="success" icon="el-icon-check"  @click="login" circle></el-button>
                    <div style="height: 140px;"></div>
                </el-tab-pane>
                <el-tab-pane label="邮箱登录">
                    <div class="top_bar">
                        <div class="name">土豆电影网</div>
                    </div>
                    <div style="height: 30px;"></div>
                    <i class="fa fa-user-o fa-2x" aria-hidden="true" style="float:left"></i>
                    <el-input v-model="e_mail" placeholder="邮箱" style="width:260px"></el-input>
                    <div style="height: 30px;"></div>
                    <el-form class="pr">
                        <el-input v-model="check_code" placeholder="验证码" style="width:260px"></el-input>
                        <button @click.prevent="getCode()"  class="code-btn" :disabled="!show">
                            <span v-show="show">获取验证码</span>
                            <span v-show="!show" class="count">{{count}} s</span>
                        </button>
                    </el-form>
                    <div style="height: 30px;"></div>
                    <el-button type="success" icon="el-icon-check"  @click="register" circle></el-button>
                    <div style="height: 140px;"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
<script>
    export default {
        name: "Login",
        data () {
            return {
                userName: '',
                password: '',
                e_mail: '',
                check_code: '',
                age: '',
                password2: '',
                sex: '',
                occupation: '',
                login_error: '',
                register_error: '',
                show: true,
                count: 0,
                timer: 0
            }
        },
        mounted: function(){

        },
        methods: {
            async login(){
                axios.post(
                    'http://chenda.work:8866/login',
                    {
                        username: this.userName,
                        password: this.password
                    }
                ).then((res)=>{
                    let val = res.data;
                    if(val==1){
                        this.login_error = "用户名不存在";
                        let _this = this;
                        setTimeout(function(){
                            _this.login_error = '';
                        }, 1500);
                        return;
                    }
                    else if(val==2) {
                        let session = window.sessionStorage;      // 使用一个session对象保存登录状态
                        session.setItem('user', this.userName);   // 记录登录的用户
                        // this.$router.push({name: 'chat', params: userInfo}
                        this.$router.push({name: 'Film'});
                    }
                    else if(val==3){
                        this.login_error = "密码错误";
                        let _this = this;
                        setTimeout(function(){
                            _this.login_error = '';
                        }, 1500);
                        return;
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {
                    console.log('登录检测完成！');
                });
            },
            register(){
                //邮箱及验证码登录
                axios.post(
                    'http://chenda.work:8866/login/mailbox',
                    {
                        mailbox: this.e_mail,
                        verificationCode: this.check_code
                    }
                ).then((res)=>{
                    this.$router.push({name: 'Film'});
                }).catch(function () {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {
                })
            },
            getCode(){
                let url = 'http://chenda.work:8866/sendEmail/'+this.e_mail;
                axios.get(
                    url,
                ).then((res)=>{
                    let a = res.data;
                    console.log(a);
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {
                    console.log("获取验证码成功")
                })
                if(!this.timer){
                    this.count = 60;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= 60) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000);
                }
            }
        }
    }
</script>

<style scoped>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: black;
        vertical-align: center;
    }
    .top{
        height: 50px;
        width: 100%;
        /*background: url("../assets/login_top.png");*/
    }
    .left_bac{
        width: 350px;
        height: 450px;
        margin-top: 5%;
        margin-left: 10%;
    }
    .login_box {
        opacity: 0.8;
        width: 350px;
        height: 450px;
        background: #f5f5f5;
        border-radius: 4px;
        position: absolute;
        top: 60%;
        left: 70%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        overflow: hidden;
        box-shadow: 0 0 10px 0px #999;
    }
    .top_bar {
        width: 100%;
        height: 50px;
    }
    .top_bar .name {
        text-align: center;
        font-size: 20px;
        line-height: 64px;
        margin-left: 26px;
        color: black;
    }
    .login_tips{
        float: left;
        margin-top: 10px;
        font-size: 12px;
        color: #999;
    }
    .register_tips{
        float: left;
        margin-top: 5px;
        font-size: 12px;
        color: #999;
    }
    .pr {
        position: relative;
    }
    .code-btn {
        width: 80px;
        height: 20px;
        position: absolute;
        top: 10px;
        right: 30px;
        color: #47a4fc;
        font-size: 12px;
        border: none;
        border-left: 1px solid #bababa;
        padding-left: 10px;
        background: white;
        cursor: pointer;
    }
</style>