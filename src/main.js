// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AtComponents from 'at-ui'
import Axios from 'axios'
import 'at-ui-style'    // 引入组件样式
import 'vue-beauty/package/style/vue-beauty.min.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueBeauty from 'vue-beauty'
Vue.use(ElementUI);
Vue.use(vueBeauty)
Vue.use(AtComponents)
Vue.prototype.$axios=Axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
