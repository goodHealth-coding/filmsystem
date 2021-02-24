<template>
    <div>
        <div class="top">
            <div class="logo">
                <span style="font-size: 35px;margin-left: 20px">土豆电影</span>
                <span v-html="msg"></span>
                <span style="font-size: 13px;cursor: pointer;" @click="toClassify">分类</span>
            </div>
            <div class="person">
                <el-button style="border: 0;margin-top: 5px">我的</el-button>
            </div>
        </div>
        <div style="height: 30px"></div>
        <div class="middle">
            <div style="color: rgba(101, 101, 101, 1)">热门电影</div>
            <div style="height: 15px"></div>
            <div style="width: 60%;">
                <div style="color: rgba(11,21,22,0.38);float: right;font-size: 14px">{{popular_show}}/2</div>
                <div style="cursor: pointer">
                    <img :src="require('../assets/left_arrow.jpg')" height="23px" @click="popular_show=1">
                    <img :src="require('../assets/right_arrow.jpg')" height="24px" @click="popular_show=2">
                </div>
            </div>
            <div class="line"></div>
            <div style="height: 20px;"></div>
            <ul class="film_list">         <!--  热门电影列表  -->
                <li class="hot_film" v-for="(movie, index) in popular_movie" v-bind:key="index">
                    <div v-if="index<10 && popular_show==1"  @click="toMovieInfo(movie.movieId)">
                        <img :src=movie.movieId alt="图片" width="80%" :title="movie.movieTitle">
                        <div class="movie_name" :title="movie.movieTitle">{{movie.movieTitle}}</div>
                        <div style="width: 80%;height: 36px">
                            <center>
                                <div class="star">
                                    <div class="greyStar" :style="{width:movie.avgScore*10 + 'px'}"></div>
                                    <div class="lightStar"></div>
                                    <span class="num">{{movie.avgScore}}分</span>
                                </div>
                            </center>
                        </div>
                    </div>
                    <div v-if="index>9 && popular_show==2" @click="toMovieInfo(movie.movieId)">
                        <img :src=movie.movieId alt="图片" width="80%" :title="movie.movieTitle">
                        <div class="movie_name" :title="movie.movieTitle">{{movie.movieTitle}}</div>
                        <div style="width: 80%;height: 36px">
                            <center>
                                <div class="star">
                                    <div class="greyStar" :style="{width:movie.avgScore*10 + 'px'}"></div>
                                    <div class="lightStar"></div>
                                    <span class="num">{{movie.avgScore}}分</span>
                                </div>
                            </center>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="charts">
                <div class="line_s"><span class="mid_text">口碑榜</span></div>
                <div style="height: 50px"></div>
                <ol style="margin-left: 8%">
                    <li v-for="(movie, index) in high_score" v-bind:key="index" style="color: #0f80ff">
                        <span class="ranking" @click="toMovieInfo1(movie.movieId)">{{movie.movieTitle}}</span>
                        <div style="height: 20px;"></div>
                    </li>
                </ol>
            </div>
            <div style="width: 60%;color: white;font-size: 30px">土豆电影</div>
            <div style="color: rgba(101, 101, 101, 1);width: 60%">猜你喜欢</div>
            <div style="height: 20px;width: 60%"></div>
            <div style="width: 60%;">
                <div style="color: rgba(11,21,22,0.38);float: right;font-size: 14px">{{rec_show}}/3</div>
                <div style="cursor: pointer">
                    <img :src="require('../assets/left_arrow.jpg')" height="23px" @click="changeRec(-1)">
                    <img :src="require('../assets/right_arrow.jpg')" height="24px" @click="changeRec(1)">
                </div>
            </div>
            <div class="line"></div>
            <div style="height: 15px;width: 60%"></div>
            <ul class="film_list">          <!--  猜你喜欢电影列表  -->
                <li class="hot_film" v-for="(movie, index) in recommend" v-bind:key="index">
                    <div v-if="index<10 && rec_show==1" @click="toMovieInfo(movie.movieId)">
                        <img :src=movie.movieId alt="图片" width="80%" :title="movie.movieTitle">
                        <div class="movie_name" :title="movie.movieTitle">{{movie.movieTitle}}</div>
                        <div style="width: 80%;height: 36px">
                            <center>
                                <div class="star">
                                    <div class="greyStar" :style="{width:movie.avgScore*10 + 'px'}"></div>
                                    <div class="lightStar"></div>
                                    <span class="num">{{movie.avgScore}}分</span>
                                </div>
                            </center>
                        </div>
                    </div>
                    <div v-if="index<20 && index>9 && rec_show==2" @click="toMovieInfo(movie.movieId)">
                        <img :src=movie.movieId alt="图片" width="80%" :title="movie.movieTitle">
                        <div class="movie_name" :title="movie.movieTitle">{{movie.movieTitle}}</div>
                        <div style="width: 80%;height: 36px">
                            <center>
                                <div class="star">
                                    <div class="greyStar" :style="{width:movie.avgScore*10 + 'px'}"></div>
                                    <div class="lightStar"></div>
                                    <span class="num">{{movie.avgScore}}分</span>
                                </div>
                            </center>
                        </div>
                    </div>
                    <div v-if="index>19 && rec_show==3" @click="toMovieInfo(movie.movieId)">
                        <img :src=movie.movieId alt="图片" width="80%" :title="movie.movieTitle">
                        <div class="movie_name" :title="movie.movieTitle">{{movie.movieTitle}}</div>
                        <div style="width: 80%;height: 36px">
                            <center>
                                <div class="star">
                                    <div class="greyStar" :style="{width:movie.avgScore*10 + 'px'}"></div>
                                    <div class="lightStar"></div>
                                    <span class="num">{{movie.avgScore}}分</span>
                                </div>
                            </center>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div style="height: 80px;width: 90%;float: left"></div>
        <div class="bottom">
            <div style="width: 100%;height: 0px;border-top: 1px #a69999 dashed;float: left" />
            <div style="height: 10px;width: 90%;float: left"></div>
            <span style="float: left;color: #a69999;font-size: 13px">
                &copy; 2021－2021 potato film, all rights reserved 广州华工科技有限公司
            </span>
            <span style="float: right;color: #a69999;font-size: 13px">关于我们</span>
            <div style="height: 10px;width: 90%;float: left"></div>
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
                msg: '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',
                userId: '',
                popular_movie:[],
                popular_show: 1,
                high_score: [],
                recommend: [],
                rec_show: 1,
            }
        },
        mounted: function () {

            this.userId = window.sessionStorage.user;   // 从session中获取userId
            console.log('欢迎, ' + this.userId);

            // 获取前20热度的电影
            axios.post(
                'http://chenda.work:8866/get/movieList/popular',
            ).then((res)=>{
                this.popular_movie = res.data;
                let pic = '';
                let s = 0.0;
                for(let i=0;i<this.popular_movie.length;i++){
                    pic = this.popular_movie[i].movieId + '.jpg';
                    this.popular_movie[i].movieId = 'http://chenda.work/imdb/jpg/'+pic;
                    s = this.popular_movie[i].avgScore;
                    this.popular_movie[i].avgScore = s*2.0;
                }
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function () {

            });

            //前20高分电影
            axios.post(
                'http://chenda.work:8866/get/movieList/highScore',
            ).then((res)=>{
                this.high_score = res.data;
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function () {

            });

            //猜你喜欢推荐30部电影
            axios.post(
                'http://chenda.work:8866/get/movieList/recommend',
                {
                    userId: this.userId
                }
            ).then((res)=>{
                this.recommend = res.data;
                let pic = '';
                let s = 0.0;
                for(let i=0;i<this.recommend.length;i++){
                    pic = this.recommend[i].movieId + '.jpg';
                    this.recommend[i].movieId = 'http://chenda.work/imdb/jpg/'+pic;
                    s = this.recommend[i].avgScore;
                    this.recommend[i].avgScore = s*2.0;
                }
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function () {

            })
        },
        methods: {

            //猜你喜欢换页
            changeRec(mark){
                if(mark==-1){
                    if(this.rec_show==1){
                        return;
                    }else{
                        this.rec_show--;
                    }
                }
                if(mark==1){
                    if(this.rec_show==3){
                        return;
                    }else{
                        this.rec_show++;
                    }
                }
            },
            //分类页面跳转
            toClassify(){
                this.$router.push({name: 'Classify'});
            },
            //前往电影详情页面（movieId字符串是图片路径）
            toMovieInfo(id){
                let index1 = id.lastIndexOf("/");
                let index2 = id.lastIndexOf(".");
                id = id.substring(index1+1, index2);
                this.$router.push({path: '/MovieInfo', query: {movie_id: id}});
            },
            //前往电影详情页面（movieId字符串不是图片路径）
            toMovieInfo1(id){
                this.$router.push({path: '/MovieInfo', query: {movie_id: id}});
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
        cursor: pointer;
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
        color: #0f80ff;
        font-size: 14px;
    }
    .ranking:hover{
        background-color: rgba(16,91,168,0.86);
        color: white;
        cursor: pointer;
    }
    .movie_name{
        height: 25px;
        width: 80%;
        text-align: center;
        font-size: 13px;
        color: #1590d1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .star{
        width: 100px;
        height: 16px;
        position: relative;
        display: inline-block;
    }
    .greyStar{
        height: 16px;
        background-image: url(//dn-piaoniu-static.qbox.me/pc/ui/img/star-full.04f7ab77.png);
        position: absolute;
    }
    .lightStar{
        height: 16px;
        background-image: url(//dn-piaoniu-static.qbox.me/pc/ui/img/star-empty.ebc71406.png);
        background-repeat: repeat-x;
    }
    .num{
        color: #ffb02e;
        font-weight: 400;
        font-size: 10px;
        display: inline-block;
    }
    .bottom{
        width: 90%;
        margin-left: 5%;
    }
</style>
