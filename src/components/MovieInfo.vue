<template>
    <div>
        <div class="top">
            <div class="logo">
                <span style="font-size: 35px;margin-left: 20px">土豆电影</span>
            </div>
            <div class="person">
                <el-button style="border: 0;margin-top: 5px">我的</el-button>
            </div>
        </div>
        <div style="height: 30px"></div>
        <div class="middle">
            <div class="movieName">{{info.movieTitle}}</div>
            <div style="float: left;width: 60%">
                <div style="height: 30px;width: 100%"></div>
                <div style="float: left;width: 30%">
                    <img :src="info.movieId" alt="图片" width="100%">
                </div>
                <div style="float: left;width: 70%">
                    <span style="padding-left: 20px;color: rgba(11,21,22,0.38);font-size: 20px">片名：</span>
                    <span style="font-size: 18px">{{info.movieTitle}}</span>
                    <div style="width: 100%;height: 20px"></div>
                    <span style="padding-left: 20px;color: rgba(11,21,22,0.38);font-size: 20px">发行日期：</span>
                    <span style="font-size: 18px">{{moreInfo.releaseDate}}</span>
                    <div style="width: 100%;height: 20px"></div>
                    <span style="padding-left: 20px;color: rgba(11,21,22,0.38);font-size: 20px">类型：</span>
                    <span style="font-size: 18px" v-for="(rank,index) in genre" :key="index">
                        <span v-if="index<genre_len-1">{{rank}}/</span>
                        <span v-if="index==genre_len-1">{{rank}}</span>
                    </span>
                    <div style="width: 100%;height: 20px"></div>
                    <span style="padding-left: 20px;color: rgba(11,21,22,0.38);font-size: 20px">语言：</span>
                    <span style="font-size: 18px">English</span>
                    <div style="width: 100%;height: 20px"></div>
                    <span style="padding-left: 20px;color: rgba(11,21,22,0.38);font-size: 20px">土豆评分：</span>
                    <div class="star">
                        <div class="lightStar" :style="{width: info.avgScore*10 + 'px'}"></div>
                        <div class="greyStar"></div>
                    </div>
                    <span class="num">{{info.avgScore}}分</span>
                    <div style="width: 100%;height: 5px"></div>
                    <span style="padding-left: 130px;color: #0f80ff;font-size: 13px">{{info.rank}}人评价</span>
                </div>
                <div style="width: 100%;height: 20px;float:left;"></div>
                <div style="float:left;height: 16px;width: 100%" v-if="!isMark">
                    <span style="float:left;color: rgba(11,21,22,0.38);font-size: 18px">按下你的评价：</span>
                    <div class="star1" v-on:mouseleave="onStar(0)">
                        <div class="lightStar1" :style="{width: light + 'px'}" @click="markDown(light)"></div>
                        <div class="greyStar1" v-on:mouseenter="onStar(1)"></div>
                        <div class="greyStar1" v-on:mouseenter="onStar(2)"></div>
                        <div class="greyStar1" v-on:mouseenter="onStar(3)"></div>
                        <div class="greyStar1" v-on:mouseenter="onStar(4)"></div>
                        <div class="greyStar1" v-on:mouseenter="onStar(5)"></div>
                    </div>
                    <span style="padding-left: 10px;font-size: 15px;color: rgba(0,0,0,0.65);">{{comment_show}}</span>
                </div>
                <div style="float:left;height: 16px;width: 100%" v-if="isMark">
                    <span style="float:left;color: rgba(11,21,22,0.38);font-size: 18px">你的评价：</span>
                    <div class="star1">
                        <div class="lightStar" :style="{width: ownScore*10 + 'px'}"></div>
                        <div class="greyStar"></div>
                    </div>
                    <span style="padding-left: 10px;font-size: 15px;color: rgba(0,0,0,0.65);">{{ownScore}}分</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js"></script>
<script>
    export default {
        name: 'MovieInfo',
        data(){
            return{
                userId: '',
                movieId: '',
                info: '',
                moreInfo: '',
                genre: [],
                genre_len: 0,
                isMark: false,
                ownScore: 0,
                light: 0,
                comment_show: '',
            }
        },
        mounted: function () {

            this.userId = window.sessionStorage.user;
            this.movieId = this.$route.query.movie_id;

            axios.post(
                'http://localhost:8866/get/movie/info',
                {
                    movieId: this.movieId
                }
            ).then((res)=>{
                this.info = res.data;
                let pic = '';
                pic = this.info.movieId + '.jpg';
                this.info.movieId = 'http://chenda.work/imdb/jpg/'+pic;
                let s = this.info.avgScore;
                this.info.avgScore = Math.round(s*10)/5.0;
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function () {

            });

            axios.post(
                'http://localhost:8866/get/movie/moreInfo',
                {
                    movieId: this.movieId
                }
            ).then((res)=>{
                this.moreInfo = res.data;
                if(this.moreInfo.action==1)
                    this.genre.push("action");
                if(this.moreInfo.adventure==1)
                    this.genre.push("adventure");
                if(this.moreInfo.animation==1)
                    this.genre.push("animation");
                if(this.moreInfo.childrens==1)
                    this.genre.push("childrens");
                if(this.moreInfo.comedy==1)
                    this.genre.push("comedy");
                if(this.moreInfo.crime==1)
                    this.genre.push("crime");
                if(this.moreInfo.documentary==1)
                    this.genre.push("documentary");
                if(this.moreInfo.drama==1)
                    this.genre.push("drama");
                if(this.moreInfo.fantasy==1)
                    this.genre.push("fantasy");
                if(this.moreInfo.filmnoir==1)
                    this.genre.push("filmnoir");
                if(this.moreInfo.horror==1)
                    this.genre.push("horror");
                if(this.moreInfo.musical==1)
                    this.genre.push("musical");
                if(this.moreInfo.mystery==1)
                    this.genre.push("mystery");
                if(this.moreInfo.romance==1)
                    this.genre.push("romance");
                if(this.moreInfo.scifi==1)
                    this.genre.push("scifi");
                if(this.moreInfo.thriller==1)
                    this.genre.push("thriller")
                if(this.moreInfo.war==1)
                    this.genre.push("war");
                if(this.moreInfo.unknown==1)
                    this.genre.push("unknown");
                this.genre_len = this.genre.length;
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function () {

            });

            axios.post(
                'http://localhost:8866/check/isMark',
                {
                    userId: this.userId,
                    movieId: this.movieId
                }
            ).then((res)=>{
                if(res.data.score != null) {
                    this.isMark = true;
                    this.ownScore = res.data.score * 2;
                }
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function () {

            });
        },
        methods: {
            //评分鼠标悬停事件
            onStar(mark){
                if(mark==0){
                    this.light = 0;
                    this.comment_show = '';
                }
                if(mark==1){
                    this.light = 20;
                    this.comment_show = '很差';
                }
                if(mark==2){
                    this.light = 40;
                    this.comment_show = '较差';
                }
                if(mark==3){
                    this.light = 60;
                    this.comment_show = '还行';
                }
                if(mark==4){
                    this.light = 80;
                    this.comment_show = '推荐';
                }
                if(mark==5){
                    this.light = 100;
                    this.comment_show = '力荐';
                }
            },

            //按下评价
            markDown(starWidth){
                let score = starWidth / 20;
                axios.post(
                    'http://localhost:8866/add/markMovie',
                    {
                        userId: this.userId,
                        movieId: this.movieId,
                        score: score
                    }
                ).then((res)=>{
                    console.log(res.data);
                    if(res.data == 1){
                        this.isMark = true;
                        this.ownScore = score * 2;
                        this.comment_show = '';
                    }
                    else{
                        alert("服务器开小差了，请稍后再试");
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
    .top{
        height: 60px;
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
        width: 80%;
        margin-left: 10%;
    }
    .movieName{
        font-size: 28px;
    }
    .star{
        width: 100px;
        height: 16px;
        position: relative;
        display: inline-block;
    }
    .lightStar{
        height: 16px;
        background-image: url(//dn-piaoniu-static.qbox.me/pc/ui/img/star-full.04f7ab77.png);
        position: absolute;
    }
    .greyStar{
        height: 16px;
        background-image: url(//dn-piaoniu-static.qbox.me/pc/ui/img/star-empty.ebc71406.png);
        background-repeat: repeat-x;
    }
    .star1{
        padding-top: 3px;
        float: left;
        width: 100px;
        height: 16px;
        position: relative;
        display: inline-block;
    }
    .greyStar1{
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 16px;
        background-image: url(//dn-piaoniu-static.qbox.me/pc/ui/img/star-empty.ebc71406.png);
        background-repeat: no-repeat;
    }
    .lightStar1{
        cursor: pointer;
        height: 16px;
        background-image: url(//dn-piaoniu-static.qbox.me/pc/ui/img/star-full.04f7ab77.png);
        position: absolute;
    }
    .num{
        color: #ffb02e;
        font-weight: 400;
        font-size: 18px;
        display: inline-block;
    }
</style>