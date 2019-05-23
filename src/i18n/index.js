import Vue from 'vue'
import VueI18n from 'vue-i18n'
import localStore from 'storejs'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en'
import zhLocale from './zh'
import publicFun from '@/utils/vendor'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
const lang = publicFun.getUrlParams('language') ? publicFun.getUrlParams('language') : localStore.get(`${process.env.VUE_APP_LOCAL_NAME}language`) || (navigator.language || navigator.userLanguage).substr(0, 2)

const i18n = new VueI18n({
  locale: lang,
  messages: messages
})

export default i18n
