import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'


// const BASE_URL = process.env.VUE_APP_FRONT_SET_URL;
// console.log(BASE_URL);


Vue.use(VueAxios, axios)

Vue.config.productionTip = false


export const  bus = new Vue();
new Vue({
  router,
  axios,
  render: h => h(App),
}).$mount('#app')

