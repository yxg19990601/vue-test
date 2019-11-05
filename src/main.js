// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import { Button, Select,Input,Card, Option, Message, Container,Aside,Main,Form, FormItem,Col,Row,DatePicker,Calendar, ButtonGroup,Icon,OptionGroup, Tooltip,Tree  } from 'element-ui';

Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Card)
Vue.use(Option)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(DatePicker)
Vue.use(Calendar)
Vue.use(ButtonGroup)
Vue.use(Icon)
Vue.use(OptionGroup)
Vue.use(Tree)
Vue.use(Tooltip)
Vue.prototype.$message = Message
Vue.prototype.$axios=Axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
