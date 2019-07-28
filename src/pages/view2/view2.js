import Vue from 'vue'
import App from './view2.vue'

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#view2');