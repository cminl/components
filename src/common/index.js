import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import 方式
import qs from 'qs'

// import {getToken} from '@/common/utils'

export function buildQueryParams (data) {
  let str = ''
  if (data) {
    buildAjaxParams(data)
    str = qs.stringify(data)
  }
  return str
}

export function buildAjaxParams (data) {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, 'key') && data[key] instanceof Object) {
      data[key] = JSON.stringify(data[key])
    }
  }
  return data
}

const init = function (config) {
  Vue.use(VueAxios, axios)

  Vue.config.productionTip = false

  axios.defaults.baseURL = config.baseUrl

  axios.defaults.headers['Content-Type'] = 'application/json'

  axios.interceptors.request.use(function (settings) {
    if (settings.data && !(settings.headers && settings.headers['Content-Type'] === 'application/json') && !(settings.headers && settings.headers['Content-Type'] === 'multipart/form-data')) {
      const data = settings.data
      settings.data = buildQueryParams(data)
    }
    return settings
  }, function (error) {
    return Promise.reject(error)
  })
  axios.interceptors.response.use(function (response) {
    const data = response.data
    if (data.errCode === 200 || data.ActionStatus === 'OK') {
      return data.data
    } else if (data.errCode === 500 || data.ActionStatus !== 'OK') {
      const error = new Error('服务端内部错误', response.status)
      return Promise.reject(error)
    }
  }, function (httpError) {
    const response = httpError.response
    if (response) {
      if (response.status === 401) {
        const error = new Error('登录失效，请重新登录', response.status)
        return Promise.reject(error)
      } else if (response.status === 403) {
        const error = new Error('暂无权限，无法操作', response.status)
        return Promise.reject(error)
      }
      let msg = ''
      if (response.data && response.data.ErrorInfo) {
        msg = response.data.ErrorInfo
      } else {
        msg = response.statusText || response.status
      }
      const error = new Error(msg, response.status)
      return Promise.reject(error)
    } else {
      const error = new Error('未知错误', '-1')
      return Promise.reject(error)
    }
  })
}

export { init }
