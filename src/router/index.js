import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Film from '@/components/Film'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
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
        }
    ]
})