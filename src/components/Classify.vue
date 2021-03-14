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
                    <img :src="require('../assets/favourite.jpg')" style="height: 40px;width: 70%;border-radius: 50%">
                </div>
                <div class="me" v-on:mousedown="user_show=!user_show">
                    <img :src="require('../assets/me.jpg')" style="height: 40px;width: 70%;border-radius: 50%;">
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
            <div><span class="deadline">电影分类</span></div>
            <div style="height: 30px"></div>
            <div v-bind:class="rank_mark==-1?'grid':'grid_0'" @click="ranking(-1)">全部类型</div>
            <div v-bind:class="rank_mark==1?'grid_1':'grid1'" @click="ranking(1)">Action</div>
            <div v-bind:class="rank_mark==2?'grid_1':'grid1'" @click="ranking(2)">Adventure</div>
            <div v-bind:class="rank_mark==3?'grid_1':'grid1'" @click="ranking(3)">Animation</div>
            <div v-bind:class="rank_mark==4?'grid_1':'grid1'" @click="ranking(4)">Children's</div>
            <div v-bind:class="rank_mark==5?'grid_1':'grid1'" @click="ranking(5)">Comedy</div>
            <div v-bind:class="rank_mark==6?'grid_1':'grid1'" @click="ranking(6)">Crime</div>
            <div v-bind:class="rank_mark==7?'grid_1':'grid1'" @click="ranking(7)">Documentary</div>
            <div v-bind:class="rank_mark==8?'grid_1':'grid1'" @click="ranking(8)">Drama</div>
            <div v-bind:class="rank_mark==9?'grid_1':'grid1'" @click="ranking(9)">Fantasy</div>
            <div v-bind:class="rank_mark==10?'grid_1':'grid1'" @click="ranking(10)">Film-Noir</div>
            <div v-bind:class="rank_mark==11?'grid_1':'grid1'" @click="ranking(11)">Horror</div>
            <div v-bind:class="rank_mark==12?'grid_1':'grid1'" @click="ranking(12)">Musical</div>
            <div v-bind:class="rank_mark==13?'grid_1':'grid1'" @click="ranking(13)">Mystery</div>
            <div v-bind:class="rank_mark==14?'grid_1':'grid1'" @click="ranking(14)">Romance</div>
            <div v-bind:class="rank_mark==15?'grid_1':'grid1'" @click="ranking(15)">Sci-Fi</div>
            <div v-bind:class="rank_mark==16?'grid_1':'grid1'" @click="ranking(16)">Thriller</div>
            <div v-bind:class="rank_mark==17?'grid_1':'grid1'" @click="ranking(17)">War</div>
            <div v-bind:class="rank_mark==18?'grid_1':'grid1'" @click="ranking(18)">Western</div>
            <div v-bind:class="rank_mark==0?'grid_1':'grid1'" @click="ranking(0)">Unknown</div>
            <div style="height: 30px;float: left;width: 100%"></div>
            <ul class="film_list">
                <li class="hot_film" v-for="(movie,index) in all_movie" v-bind:key="index">
                    <div v-if="index<all_num" @click="toMovieInfo(movie.movieId)">
                        <img :src=movie.movieId alt="图片" width="80%" :title="movie.movieTitle">
                        <div class="movie_name" :title="movie.movieTitle">{{movie.movieTitle}}</div>
                    </div>
                </li>
            </ul>
            <div style="height: 25px;width: 60%;float: left"></div>
            <div class="more" @click="getMore">加载更多</div>
            <div style="height: 80px;width: 100%;float: left"></div>
        </div>
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
        name: "Classify",
        data(){
            return{
                msg: '<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',
                space: '<span>&nbsp;&nbsp;</span>',
                userInfo: '',
                fav_show: false,
                user_show: false,
                collectedMovie: [],
                all_movie: [],
                all_num: 30,
                rank_mark: -1,
            }
        },
        mounted: function () {

            let userJsonStr = window.sessionStorage.getItem('userInfo');
            this.userInfo = JSON.parse(userJsonStr);

            //获取收藏夹电影列表
            axios.post(
                'http://chenda.work:8866/get/favourites',
                {
                    id: this.userInfo.id
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

            //获取全部影片
            axios.post(
                'http://chenda.work:8866/get/movieList/movieType',
                {
                    movieTypeId: -1
                }
            ).then((res)=>{
                this.all_movie = res.data;
                let pic = '';
                for(let i=0;i<this.all_movie.length;i++){
                    pic = this.all_movie[i].movieId + '.jpg';
                    this.all_movie[i].movieId = 'http://chenda.work/imdb/jpg/'+pic;
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

            //主页面(Film)跳转
            toFilm(){
                this.$router.push({name: 'Film'});
            },

            //分类页面跳转
            toClassify(){
                this.$router.push({name: 'Classify'});
            },

            //加载更多电影
            getMore(){
                let nums = this.all_movie.length;
                if(nums >= this.all_num * 2){
                    this.all_num = this.all_num * 2;
                }
                else {
                    this.all_num = nums;
                }
            },

            //加载分类电影
            ranking(rank){
                axios.post(
                    'http://chenda.work:8866/get/movieList/movieType',
                    {
                        movieTypeId: rank
                    }
                ).then((res)=>{
                    this.all_movie = res.data;
                    this.all_num = 30;
                    this.rank_mark = rank;
                    let pic = '';
                    for(let i=0;i<this.all_movie.length;i++){
                        pic = this.all_movie[i].movieId + '.jpg';
                        this.all_movie[i].movieId = 'http://chenda.work/imdb/jpg/'+pic;
                    }
                }).catch(function (error) {
                    console.log(JSON.stringify(error));
                    console.log(error.result);
                }).finally(function () {

                })
            },

            //前往电影详情页面（movieId字符串是图片路径）
            toMovieInfo(id){
                let index1 = id.lastIndexOf("/");
                let index2 = id.lastIndexOf(".");
                id = id.substring(index1+1, index2);
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
        height: 60px;
        color: #1a94ff;
    }
    .person{
        float: left;
        width: 10%;
        height: 40px;
        cursor: pointer;
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
        background: white;
        font-weight: 300;
        border: 2px solid #DDDDDD;
        border-radius: 20px;
    }
    .middle{
        width: 90%;
        margin-left: 5%;
    }
    .deadline{
        font-size: 25px;
    }
    .grid{
        width: 100px;
        height: 23px;
        float: left;
        background-color: #51a4d7;
        color: white;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }
    .grid_0{
        width: 100px;
        height: 40px;
        float: left;
        color: rgba(41,36,45,0.66);
        text-align: center;
        cursor: pointer;
    }
    .grid1{
        width: 100px;
        height: 40px;
        float: left;
        text-align: center;
        color: rgba(41,36,45,0.66);
        cursor: pointer;
    }
    .grid1:hover{
        color: rgba(43,151,239,0.88);
    }
    .grid_1{
        width: 100px;
        height: 23px;
        float: left;
        text-align: center;
        background-color: #51a4d7;
        color: white;
        border-radius: 5px;
        cursor: pointer;
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
    .movie_name{
        height: 25px;
        width: 80%;
        text-align: center;
        font-size: 13px;
        color: #1590d1;
        overflow: hidden;
        white-space: nowrap;      /*禁止换行*/
        text-overflow: ellipsis;  /*省略号*/
    }
    .more{
        width: 55%;
        height: 40px;
        background-color: rgba(93,93,93,0.07);
        color: #47a4fc;
        float: left;
        text-align: center;
        border-radius: 5px;
        line-height: 40px;
        cursor: pointer;
    }
    .bottom{
        width: 90%;
        margin-left: 5%;
    }
</style>