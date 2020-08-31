import Vue from "vue";
import App from "./App.vue";
// 1.引入Composition API模块
import VueCompositionApi from '@vue/composition-api'
import router from "./router";
import "./router/premit";
import store from "./store";
// 引入自定义全局组件icons
import '@/icons';


// 引入自定义全局组件global
// import global from '@/utils/global.js'
// vue2.0全局组件注册 global
// Vue.use(global)


// 引入 Element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册 Element
Vue.use(ElementUI);
// 注册 VueCompositionApi
Vue.use(VueCompositionApi)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
