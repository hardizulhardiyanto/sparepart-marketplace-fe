import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import VueCookie from 'vue-cookie'
import  vuetify from './plugins/vuetify';

import '@/assets/css/font.css'
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import './globalComponents'
import  './plugins';

Vue.config.productionTip = false
Vue.use(VueCookie);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
