import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Film from '@/components/Film'
import Classify from '@/components/Classify'
import MovieInfo from '@/components/MovieInfo'

Vue.use(Router)

export default new Router({
    mode:'history',
    base: '/potato/',
    routes: [
        {
            path: '/',
            redirect: '/Login',//设置默认指向的路径
            name: '主页'
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login,
            meta:{
                title: 'home', //主页
            }
        },
        {
            path: '/Film',
            name: 'Film',
            component: Film,
            meta:{
                title: 'film',
                needLogin: true,
            }
        },
        {
            path: '/Classify',
            name: 'Classify',
            component: Classify,
            meta:{
                title: 'film',
                needLogin: true,
            }
        },
        {
            path: '/MovieInfo',
            name: 'MovieInfo',
            component: MovieInfo,
            meta:{
                title: 'film',
                needLogin: true,
            }
        }
    ]
})