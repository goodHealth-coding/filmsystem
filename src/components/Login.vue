<template>
    <div class="login_box" onmouseout="style.opacity='0.8'" onmouseover="style.opacity='1'">
        <el-tabs type="border-card">
            <el-tab-pane label="登录">
                <div class="top_bar">
                    <div class="name">电影推荐系统</div>
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
            <el-tab-pane label="注册">
                <div class="top_bar">
                    <div class="name">电影推荐系统</div>
                    <div class=""></div>
                </div>
                <div style="height: 20px;"></div>
                <i class="fa fa-user-o fa-2x" aria-hidden="true" style="float:left"></i>
                <el-input v-model="age" placeholder="年龄" style="width:250px"></el-input>
                <div style="height: 30px;"></div>
                <i class="fa fa-address-book fa-2x" aria-hidden="true" style="float:left"></i>
                <el-input v-model="sex" placeholder="性别" style="width:250px" show-password></el-input>
                <div style="height: 30px;"></div>
                <i class="fa fa-quora fa-2x" aria-hidden="true" style="float:left"></i>
                <el-input v-model="occupation" placeholder="职业" style="width:250px"></el-input>
                <div style="height: 30px;"></div>
                <el-input v-model="password2" placeholder="密码" style="width:250px"></el-input>
                <div style="height: 30px;"><span class="register_tips">{{register_error}}</span></div>
                <el-button type="success" icon="el-icon-check"  @click="register" circle></el-button>
                <div style="height: 140px;"></div>
            </el-tab-pane>
        </el-tabs>
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
                age: '',
                password2: '',
                sex: '',
                occupation: '',
                login_error: '',
                register_error: ''
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
                    console.log('完成！');
                });
            }
        }
    }
</script>

<style scoped>
    .login_box {
        opacity: 0.8;
        width: 350px;
        height: 500px;
        background: #f5f5f5;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        overflow: hidden;
        box-shadow: 0 0 10px 0px #999;
    }
    .top_bar {
        width: 100%;
        height: 64px;
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
</style>