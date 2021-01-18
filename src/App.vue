<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
<script>
    //import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'App',
        data() {
            return {

            }
        },
        mounted: function () {
            // axios.post(
            //     'http://chenda.work:8866/get/userList',
            //     {
            //
            //     }
            // ).then((res) => {
            //     // 处理正常结果
            //     this.list = res.data;
            //     this.msg = this.list[1].age;
            //     console.log(this.msg);
            // }).catch(function (error) {
            //     // 处理异常结果
            //     console.log(JSON.stringify(error));
            //     console.log(error.result);
            // }).finally(function () {
            //     console.log('完成！');
            // });
        },
        methods: {}
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: black;
        vertical-align: center;
    }
</style>

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
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        overflow: hidden;
        box-shadow: 0 0 10px 0px #999;
    }

    .in_box {
        margin-top: 50%;
    }
</style>
