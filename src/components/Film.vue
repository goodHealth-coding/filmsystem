<template>
    <div>
        <div class="top">
            <div class="logo"><span style="font-size: 35px;margin-left: 20px">土豆电影</span></div>
            <div class="person">
                <el-button style="border: 0;margin-top: 5px">我的</el-button>
            </div>
        </div>
        <div style="height: 30px"></div>
        <div class="middle">
            <span style="color: rgba(101, 101, 101, 1)">热门电影</span>
            <div style="height: 20px"></div>
            <div class="line"></div>
            <div style="height: 15px"></div>
            <ul class="film_list">         <!--  热门电影列表  -->
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="text-align: center;font-size: 13px;color: #1590d1">神秘博士元旦特集：戴立克革命</div>
                </li>
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">11</div>
                </li>
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">11</div>
                </li>
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">11</div>
                </li>
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">11</div>
                </li>
            </ul>
            <div class="charts">
                <div class="line_s"><span class="mid_text">排行榜</span></div>
                <div style="height: 50px"></div>
                <ol style="margin-left: 8%">
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                    <li class="ranking">西红柿首富</li>
                </ol>
            </div>
            <div style="width: 60%;color: white;font-size: 30px">土豆电影</div>
            <div style="color: rgba(101, 101, 101, 1);width: 60%">猜你喜欢</div>
            <div style="height: 20px;width: 60%"></div>
            <div class="line"></div>
            <div style="height: 15px;width: 60%"></div>
            <ul class="film_list">          <!--  猜你喜欢电影列表  -->
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">神秘博士元旦特集：戴立克革命</div>
                </li>
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">11</div>
                </li>
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">11</div>
                </li>
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">11</div>
                </li>
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">神秘博士元旦特集：戴立克革命</div>
                </li>
            </ul>
            <div style="width: 60%;color: white;font-size: 20px">6</div>
            <ul class="film_list">
                <li class="hot_film">
                    <img :src="require('../assets/left_bac.png')" width="90%">
                    <div style="width: 100%;text-align: center;font-size: 13px;color: #1590d1">11</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
<script>
    export default {
        name: 'Film',
        data() {
            return {

            }
        },
        mounted: function () {

        },
        methods: {

        }
    }
</script>

<style scoped>
    .top{
        height: 50px;
        width: 100%;
        background: rgba(225,252,255,0.58);
    }
    .logo{
        float: left;
        width: 90%;
        color: #1a94ff;
    }
    .person{
        float: right;
        width: 10%;
    }
    .middle{
        width: 90%;
        margin-left: 5%;
    }
    .film_list{
        float: left;
        width: 60%;
    }
    .hot_film{
        list-style: none;
        float: left;
        width: 20%;
    }
    .line {
        position: relative;
        margin: 0 auto;
        width: 60%;
        height: 1px;
        background-color: #d4d4d4;
        font-size: 16px;
        float: left;
        color: rgba(101, 101, 101, 1);
    }
    .line_s {
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 1px;
        background-color: #d4d4d4;
        font-size: 16px;
        float: left;
        color: rgba(101, 101, 101, 1);
    }
    .charts{
        width: 30%;
        float: right;
    }
    .mid_text {
        position: absolute;
        left: 50%;
        background-color: #ffffff;
        padding: 0 15px;
        transform: translateX(-50%) translateY(-50%);
    }
    .ranking{
        height: 36px;
        color: #aab1b4;
        font-size: 15px;
    }
    .ranking:hover{
        color: #0f80ff;
        cursor: pointer;
    }
</style>
