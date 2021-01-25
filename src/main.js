import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
//import Login from "@/components/Login";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(router);

//设置路由跳转限制
// router.beforeEach((to, from, next)=> {
//
//   // 跳转到需要登录的页面
//   if (to.meta.needLogin) {
//     if (window.sessionStorage.user) { // 已登录
//       next();
//     } else { // 未登录
//       alert("请先登录！");
//       next('/');
//       window.location.reload();
//     }
//   }
//
//   // 用户已登录，但跳转到login页面
//   else if(to.meta.title=='home' && window.sessionStorage.user){
//     alert("已登录！");
//     next('/Film');
//     window.location.reload();
//   }
//
//   // 跳转到不匹配的路由
//   else if(to.matched.length===0){
//     //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
//     from.name ? next({ name:from.name }) : next('/');
//   }
//
//   // 正确匹配
//   else{
//     next();
//   }
// })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
