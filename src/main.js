import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
//import Login from "@/components/Login";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(router);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app');
