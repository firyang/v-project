import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Bus from "./bus";
import { Table, TableColumn, Loading, Scrollbar, Button } from "element-ui";
import "./theme";

const components = [Table, TableColumn, Scrollbar, Button];

components.forEach((component) => Vue.component(component.name, component));

Vue.use(Loading);

// 引入 css 文件
// import './assets/css/bootstrap.css'
import "./assets/fonts/iconfont.css";

Vue.config.productionTip = false;

Bus(Vue);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
