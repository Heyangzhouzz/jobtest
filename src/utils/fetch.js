import axios from 'axios'
import router from '@/router/index'
import i18n from '@/i18n'

import {
  Message
} from 'element-ui'

let lang = 'zh'

const fetch = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  data: {
    lang: lang
  }
})
fetch.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

fetch.interceptors.response.use(
  response => {
    const res = response.data
    if (res.rsCode !== 200) {
      // 401: 登录过期  403: 权限不足  500: 系统内部错误
      switch (res.rsCode) {
        case 405:
          Message({
            message: res.rsMsg,
            type: 'warning',
            duration: 5 * 1000
          })
          break
        default:
          Message({
            message: res.rsMsg,
            type: 'warning',
            duration: 5 * 1000
          })
          break
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log(error.response)
    switch (error.response.status) {
      case 404:
        router.replace('404')
        break
      case 500:
        Message({
          message: i18n.t('remind.error'),
          type: 'warning',
          duration: 5 * 1000
        })
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default fetch
