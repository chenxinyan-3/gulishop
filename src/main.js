import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/mock/mockServer'
// import "@/api"  //这里直接引用api文件,那么api文件就会运行

import 'swiper/css/swiper.css';


Vue.config.productionTip = false

//全局注册的组件
import TypeNav from "@/components/TypeNav"
import SliderLoop from "@/components/SliderLoop"
import Pagination from "@/components/Pagination"
Vue.component('TypeNav',TypeNav)
Vue.component('SliderLoop',SliderLoop)
Vue.component('Pagination',Pagination)

new Vue({
  beforeCreate() {
    Vue.prototype.$bus=this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
