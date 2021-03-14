<template>
    <div>
        <div class="top">
            <div class="logo">
                <span style="font-size: 35px;margin-left: 20px">土豆电影</span>
                <span v-html="msg"></span>
                <span style="font-size: 13px;cursor: pointer;" @click="toFilm">主页</span>
                <span v-html="msg"></span>
                <span style="font-size: 13px;cursor: pointer;" @click="toClassify">分类</span>
            </div>
            <div style="width: 10%;height: 10px"></div>
            <div class="person">
                <div class="me" v-on:mousedown="fav_show=!fav_show">
                    <img :src="require('../assets/img/favourite.jpg')" style="height: 40px;border-radius: 50%">
                </div>
                <div class="me" v-on:mousedown="user_show=!user_show">
                    <img :src="require('../assets/img/me.jpg')" style="height: 40px;border-radius: 50%;">
                </div>
            </div>
            <div class="favourites" v-if="fav_show">
                <div style="height: 10px"></div>
                <ul style="margin-left: 10px">
                    <li class="oneMovie" v-for="(movie, index) in collectedMovie" v-bind:key="index"
                        @click="toMovieInfo(movie.movieId)">
                        <img :src="movie.movieId" style="float: left;width: 30px;height: 30px;border-radius: 50%">
                        <div style="margin-top: 6px;"><span v-html="space"></span>{{movie.movieTitle}}</div>
                    </li>
                </ul>
            </div>
            <div class="userBox" v-if="user_show">
                <div style="margin-left: 20px;margin-top: 20px">
                    <div style="height: 40px"><p><span>账号：</span>{{userInfo.id}}</p></div>
                    <div style="height: 40px"><p><span>密码：</span>{{userInfo.code}}</p></div>
                    <div style="height: 40px"><p><span>性别：</span>{{userInfo.sex}}</p></div>
                    <div style="height: 40px"><p><span>年龄：</span>{{userInfo.age}}</p></div>
                    <div style="height: 40px"><p><span>职业：</span>{{userInfo.occupation}}</p></div>
                    <div style="height: 40px" v-if="userInfo.mailbox!=null">
                        <p><span>邮箱：</span>{{userInfo.mailbox}}</p>
                    </div>
                    <div style="margin-left: 30px;">
                        <el-button @click="logout">退出登录</el-button>
                    </div>
                    <div style="height: 20px"></div>
                </div>
            </div>
        </div>
        <div style="height: 30px"></div>
        <div class="middle">
            <div style="color: rgba(101, 101, 101, 1)">最新电影</div>
            <div style="height: 15px"></div>
            <div style="width: 60%;">
                <div style="color: rgba(11,21,22,0.38);float: right;font-size: 14px">{{latest_show}}/2</div>
                <div style="cursor: pointer">
                    <img :src="require('../assets/img/left_arrow.jpg')" height="23px" @click="latest_show=1">
                    <img :src="require('../assets/img/right_arrow.jpg')" height="24px" @click="latest_show=2">
                </div>
            </div>
            <div class="line"></div>
            <div style="height: 20px;"></div>
            <ul class="film_list">         <!--  最新电影列表  -->
                <li class="hot_film" v-for="(movie, index) in latest_movie" v-bind:key="index">
                    <div v-if="index<10 && latest_show==1"  @click="toMovieInfo(movie.movieId)">
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
                    <div v-if="index>9 && latest_show==2" @click="toMovieInfo(movie.movieId)">
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
            <div class="charts">   <!-- 口碑榜 -->
                <div class="line_s"><span class="mid_text">口碑榜</span></div>
                <div style="height: 50px"></div>
                <ol style="margin-left: 8%">
                    <li v-for="(movie, index) in high_score" v-bind:key="index" style="color: #1590d1">
                        <span class="ranking" @click="toMovieInfo1(movie.movieId)">{{movie.movieTitle}}</span>
                        <div style="height: 20px;"></div>
                    </li>
                </ol>
            </div>
            <div style="width: 60%;color: white;font-size: 30px">土豆电影</div>
            <div style="color: rgba(101, 101, 101, 1)">热门电影</div>
            <div style="height: 15px"></div>
            <div style="width: 60%;">
                <div style="color: rgba(11,21,22,0.38);float: right;font-size: 14px">{{popular_show}}/2</div>
                <div style="cursor: pointer">
                    <img :src="require('../assets/img/left_arrow.jpg')" height="23px" @click="popular_show=1">
                    <img :src="require('../assets/img/right_arrow.jpg')" height="24px" @click="popular_show=2">
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
            <div style="width: 60%;color: white;font-size: 30px">土豆电影</div>
            <div style="color: rgba(101, 101, 101, 1);width: 60%">猜你喜欢</div>
            <div style="height: 20px;width: 60%"></div>
            <div style="width: 60%;">
                <div style="color: rgba(11,21,22,0.38);float: right;font-size: 14px">{{rec_show}}/3</div>
                <div style="cursor: pointer">
                    <img :src="require('../assets/img/left_arrow.jpg')" height="23px" @click="changeRec(-1)">
                    <img :src="require('../assets/img/right_arrow.jpg')" height="24px" @click="changeRec(1)">
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
                space: '<span>&nbsp;&nbsp;</span>',
                userId: '',
                userInfo: '',
                fav_show: false,
                user_show: false,
                collectedMovie: [],
                popular_movie: [],
                latest_movie: [],
                latest_show: 1,
                popular_show: 1,
                high_score: [],
                recommend: [],
                rec_show: 1,
            }
        },
        mounted: function () {

            this.userId = window.sessionStorage.user;   // 从session中获取userId
            console.log('欢迎, ' + this.userId);

            //获取用户信息
            axios.post(
                'http://chenda.work:8866/get/userEntity',
                {
                    id: this.userId
                }
            ).then((res)=>{
                this.userInfo = res.data;
                let session = window.sessionStorage;      // 使用一个session对象保存用户信息
                session.setItem('userInfo', JSON.stringify(this.userInfo));
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function (error) {

            });

            //获取收藏夹电影列表
            axios.post(
                'http://chenda.work:8866/get/favourites',
                {
                    id: this.userId
                }
            ).then((res)=>{
                this.collectedMovie = res.data;
                let pic = '';
                let s = 0.0;
                for(let i=0;i<this.collectedMovie.length;i++){
                    pic = this.collectedMovie[i].movieId + '.jpg';
                    this.collectedMovie[i].movieId = 'http://chenda.work/imdb/jpg/'+pic;
                    s = this.collectedMovie[i].avgScore;
                    this.collectedMovie[i].avgScore = s*2.0;
                }
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function () {

            });

            // 获取20部最新电影
            axios.post(
                'http://chenda.work:8866/get/movieList/lastTwentyUpdate',
            ).then((res)=>{
                this.latest_movie = res.data;
                let pic = '';
                let s = 0.0;
                for(let i=0;i<this.latest_movie.length;i++){
                    pic = this.latest_movie[i].movieId + '.jpg';
                    this.latest_movie[i].movieId = 'http://chenda.work/imdb/jpg/'+pic;
                    s = this.latest_movie[i].avgScore;
                    this.latest_movie[i].avgScore = s*2.0;
                }
            }).catch(function (error) {
                console.log(JSON.stringify(error));
                console.log(error.result);
            }).finally(function () {

            })

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

            //用户退出登录
            logout(){
                // 用户登出，清除session
                window.sessionStorage.removeItem('user');
                window.sessionStorage.removeItem('userInfo');
                console.log("用户退出！");
                // 返回登录页
                this.$router.push('/');
            },

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

            //主页面(Film)跳转
            toFilm(){
                this.$router.push({name: 'Film'});
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

            //前往电影详情页面（movieId字符串是电影id）
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
        height: 60px;
        width: 90%;
        color: #1a94ff;
    }
    .person{
        height: 40px;
        float: left;
        width: 10%;
    }
    .me{
        float: left;
        height: 40px;
        width: 50%;
        cursor: pointer;
    }
    .favourites{
        width: 200px;
        height: 250px;
        position: absolute;
        top: 30px;
        right: 8%;
        z-index: 900;
        font-weight: 300;
        background: white;
        overflow: auto;
        border: 2px solid #DDDDDD;
        border-radius: 20px;
    }
    .oneMovie{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 50px;
        width: 180px;
    }
    .oneMovie:hover{
        color: #1590d1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 50px;
        width: 180px;
        cursor: pointer;
    }
    .userBox{
        width: 200px;
        position: absolute;
        top: 30px;
        right: 3%;
        z-index: 1000;
        font-weight: 300;
        background: white;
        border: 2px solid #DDDDDD;
        border-radius: 20px;
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
        color: #1590d1;
        font-size: 14px;
    }
    .ranking:hover{
        background-color: #1590d1;
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
