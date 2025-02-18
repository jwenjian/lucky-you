import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'
import './util'
import en from './locale/en_US.json'
import zh from './locale/zh_CN.json'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)

const messages = {
  "en": en,
  "zh": zh
}

const i18n = new VueI18n({
  locale: "en",
  messages
})

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
