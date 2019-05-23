import fetch from '@/utils/fetch'

export default {
  getFilterList (params) {
    return fetch({
      url: '/conditionList',
      method: 'GET',
      params
    })
  },
  getJobList (params) {
    return fetch({
      url: '/jobsList',
      method: 'GET',
      params
    })
  },
  getResumeList (params) {
    return fetch({
      url: '/resumeList',
      method: 'GET',
      params
    })
  },
  getAgreement (params) {
    return fetch({
      url: '/agreement',
      method: 'GET',
      params
    })
  },
  getVldCode (data) {
    return fetch({
      url: '/vldCode',
      method: 'POST',
      data
    })
  },
  submitResumeForm (data) {
    return fetch({
      url: '/resumeForm',
      method: 'POST',
      data
    })
  }
}
