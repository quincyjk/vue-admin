import Vue from "vue";
import App from "./App.vue";
// 1.引入Composition API模块
import VueCompositionApi from '@vue/composition-api'
import router from "./router";
import "@/utils/instructions";
import store from "./store";
// 引入按钮权限指令
import "./router/premit";
// 引入自定义全局组件icons
import '@/icons';
// 富文本
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

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
