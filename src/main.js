import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bus from './bus'

// 引入 css 文件
// import './assets/css/bootstrap.css'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false

Bus(Vue)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
