import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
