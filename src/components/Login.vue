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
                    <el-input v-model="userId" placeholder="用户名" style="width:250px"></el-input>
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
                            <span v-show="!show">{{count}} s</span>
                        </button>
                    </el-form>
                    <div style="height: 50px;">
                        <span class="login_tips">{{code_error}}</span>
                        <span class="login_tips">{{mail_error}}</span>
                    </div>
                    <el-button type="success" icon="el-icon-check"  @click="mailLogin" circle></el-button>
                    <div style="height: 140px;"></div>
                </el-tab-pane>
                <el-tab-pane label="注册">
                    <div class="top_bar">
                        <div class="name">土豆电影网</div>
                    </div>
                    <div style="height: 30px;"></div>
                    <el-input v-model="res_mail" placeholder="邮箱" style="width:260px"></el-input>
                    <div style="height: 30px;"></div>
                    <el-form class="pr">
                        <el-input v-model="res_code" placeholder="验证码" style="width:260px"></el-input>
                        <button @click.prevent="resCode()"  class="code-btn" :disabled="!show">
                            <span v-show="show">获取验证码</span>
                            <span v-show="!show">{{count}} s</span>
                        </button>
                    </el-form>
                    <div style="height: 50px;"><span class="login_tips">{{register_error}}</span></div>
                    <el-button type="success" icon="el-icon-check"  @click="nextStep" circle></el-button>
                    <div style="height: 140px;"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-container>
            <el-dialog :visible.sync="dialog_show" width="50%" style=" text-align: center;" :before-close="handleClose">
                <div style="color: #999">个人信息填写</div>
                <div style="height: 20px;"></div>
                <el-input v-model="age" placeholder="年龄" style="width:200px;" @change="check_age"></el-input>
                <div style="height: 20px;"><span style="color: #999;font-size: 12px">{{ageTip}}</span></div>
                <el-form label="性别">
                    <el-select v-model="sex" placeholder="请选择" style="width: 200px">
                        <el-option v-for="item in sexArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form>
                <div style="height: 20px;"></div>
                <el-form label="职业">
                    <el-select v-model="occupation" placeholder="请选择" style="width: 200px">
                        <el-option v-for="item in occArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form>
                <div style="height: 20px;"></div>
                <el-input v-model="password1" placeholder="密码" style="width:200px" show-password></el-input>
                <span slot="footer">
                    <el-button @click="dialog_show = false">取 消</el-button>
                    <el-button type="primary" @click="register">确 定</el-button>
                </span>
            </el-dialog>
        </el-container>
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
<script>
    export default {
        name: "Login",
        data () {
            return {
                userId: '',
                password: '',
                e_mail: '',
                res_mail: '',
                check_code: '',
                res_code: '',
                age: '',
                password1: '',
                sex: '',
                occupation: '',
                mailbox: '',
                login_error: '',
                code_error: '',
                mail_error: '',
                register_error: '',
                show: true,
                dialog_show: false,
                count: 0,
                timer: 0,
                ageTip: '',
                sexArr: [
                    {value: 'M', label: 'M'},
                    {value: 'F', label: 'F'}
                ],
                occArr: [
                    {value: 'administrator', label: 'administrator'},
                    {value: 'artist', label: 'artist'},
                    {value: 'doctor', label: 'doctor'},
                    {value: 'educator', label: 'educator'},
                    {value: 'engineer', label: 'engineer'},
                    {value: 'entertainment', label: 'entertainment'},
                    {value: 'executive', label: 'executive'},
                    {value: 'healthcare', label: 'healthcare'},
                    {value: 'homemaker', label: 'homemaker'},
                    {value: 'lawyer', label: 'lawyer'},
                    {value: 'librarian', label: 'librarian'},
                    {value: 'marketing', label: 'marketing'},
                    {value: 'none', label: 'none'},
                    {value: 'other', label: 'other'},
                    {value: 'programmer', label: 'programmer'},
                    {value: 'retired', label: 'retired'},
                    {value: 'salesman', label: 'salesman'},
                    {value: 'scientist', label: 'scientist'},
                    {value: 'student', label: 'student'},
                    {value: 'technician', label: 'technician'},
                    {value: 'writer', label: 'writer'}
                ]
            }
        },
        mounted: function(){

        },
        methods: {
            async login(){
                // 账号密码登录
                axios.post(
                    'http://chenda.work:8866/login/password',
                    {
                        username: this.userId,
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
                        //let userInfo = {'userName': this.userId};
                        let session = window.sessionStorage;      // 使用一个session对象保存登录状态
                        session.setItem('user', this.userId);   // 记录登录的用户
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
            async mailLogin(){
                //邮箱及验证码登录
                axios.post(
                    'http://chenda.work:8866/login/mailbox',
                    {
                        mailbox: this.e_mail,
                        verificationCode: this.check_code
                    }
                ).then((res)=>{
                    let a = res.data.result;
                    if(a==1){
                        this.mail_error = "邮箱未注册";
                        let _this = this;
                        setTimeout(function(){
                            _this.mail_error = '';
                        }, 1500);
                        return;
                    }
                    else if(a==2){
                        let userId = res.data.userId;
                        console.log("用户："+userId);
                        let session = window.sessionStorage;      // 使用一个session对象保存登录状态
                        session.setItem('user', userId);   // 记录登录的用户
                        this.$router.push({name: 'Film'});
                    }
                    else if(a==3){
                        this.mail_error = "验证码错误";
                        let _this = this;
                        setTimeout(function(){
                            _this.mail_error = '';
                        }, 1500);
                        return;
                    }
                    else if(a==4){
                        this.mail_error = "验证码过期,请重新获取";
                        let _this = this;
                        setTimeout(function(){
                            _this.mail_error = '';
                        }, 1500);
                        return;
                    }
                }).catch(function () {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {
                })
            },
            getCode(){
                //邮箱登录-获取验证码
                let url = 'http://chenda.work:8866/sendEmail/'+this.e_mail;
                axios.get(
                    url,
                ).then((res)=>{
                    let b = res.data;
                    if(b==1){
                        this.code_error = "邮箱未注册";
                        let _this = this;
                        setTimeout(function(){
                            _this.code_error = '';
                        }, 1500);
                        if(!this.timer){
                            this.count = 1;
                            this.show = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= 1) {
                                    this.count--;
                                } else {
                                    this.show = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000);
                        }
                        return;
                    }
                    else if(b==2){
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
                        return;
                    }
                    else if(b==3){
                        this.code_error = "邮箱不存在";
                        let _this = this;
                        setTimeout(function(){
                            _this.code_error = '';
                        }, 1500);
                        if(!this.timer){
                            this.count = 1;
                            this.show = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= 1) {
                                    this.count--;
                                } else {
                                    this.show = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000);
                        }
                        return;
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {
                    console.log("检测邮箱成功")
                })
            },
            resCode(){
                //注册-获取验证码
                let url1 = 'http://chenda.work:8866/register/'+this.res_mail;
                axios.get(
                    url1,
                ).then((res)=>{
                    let c = res.data;
                    if(c==1){
                        this.register_error = "邮箱已注册，请直接登录";
                        let _this = this;
                        setTimeout(function(){
                            _this.register_error = '';
                        }, 1500);
                        if(!this.timer){
                            this.count = 1;
                            this.show = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= 1) {
                                    this.count--;
                                } else {
                                    this.show = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000);
                        }
                        return;
                    }
                    else if(c==2){
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
                        return;
                    }
                    else if(c==3){
                        this.register_error = "邮箱不存在";
                        let _this = this;
                        setTimeout(function(){
                            _this.register_error = '';
                        }, 1500);
                        if(!this.timer){
                            this.count = 1;
                            this.show = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= 1) {
                                    this.count--;
                                } else {
                                    this.show = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000);
                        }
                        return;
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {

                })
            },
            nextStep(){
                //邮箱注册验证
                axios.post(
                    'http://chenda.work:8866/register/mailboxCheck',
                    {
                        mailbox: this.res_mail,
                        verificationCode: this.res_code
                    }
                ).then((res)=>{
                    let d = res.data;
                    if(d==1){
                        this.register_error = "邮箱已注册，请直接登录";
                        let _this = this;
                        setTimeout(function(){
                            _this.register_error = '';
                        }, 1500);
                        return;
                    }
                    else if(d==2){
                        this.dialog_show = true;
                    }
                    else if(d==3){
                        this.register_error = "验证码错误";
                        let _this = this;
                        setTimeout(function(){
                            _this.register_error = '';
                        }, 1500);
                        return;
                    }
                    else if(d==4){
                        this.register_error = "验证码过期,请重新获取";
                        let _this = this;
                        setTimeout(function(){
                            _this.register_error = '';
                        }, 1500);
                        return;
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {

                })
            },
            handleClose(done) {
                //关闭注册信息弹窗
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            check_age(value){
                //检测注册的年龄是否合法
                let reg = /^[1-9]\d*$/;
                let _this = this;
                if (value) {
                    if (new RegExp(reg).test(value) == false) {
                        _this.ageTip = "请输入正确年龄";
                        setTimeout(() => {
                            _this.ageTip = "";
                        }, 1500); }

                    else {
                        this.errorTip = false;
                    }
                }
            },
            async register(){
                axios.post(
                    'http://chenda.work:8866/register/add/userEntity',
                    {
                        age: this.age,
                        sex: this.sex,
                        occupation: this.occupation,
                        password: this.password1,
                        mailbox: this.res_mail
                    }
                ).then((res)=>{
                    this.dialog_show = false;
                    let e = res.data.result;
                    if(e==1){
                        this.register_error = "邮箱已注册，请直接登录";
                        let _this = this;
                        setTimeout(function(){
                            _this.register_error = '';
                        }, 1500);
                        return;
                    }
                    else if(e==2){
                        let userId = res.data.userId;
                        console.log("用户："+userId);
                        let session = window.sessionStorage;      // 使用一个session对象保存登录状态
                        session.setItem('user', userId);   // 记录登录的用户
                        this.$router.push({name: 'Film'});
                    }
                    else if(e==3){
                        this.register_error = "注册出错";
                        let _this = this;
                        setTimeout(function(){
                            _this.register_error = '';
                        }, 1500);
                        return;
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {

                })
            },
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
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>