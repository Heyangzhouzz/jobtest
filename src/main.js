import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import vueSmoothScroll from 'vue-smooth-scroll'
import i18n from './i18n'
import './style/index.scss'
import './icons'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(vueSmoothScroll)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
