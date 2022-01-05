import Vue from 'vue'
import {buildQueryParams} from '../common/utils'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
//import 方式
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import {getConfig} from '@/network'
// import {getToken} from '@/common/utils'
// 新增filter
Vue.filter('timeFilter', function (value, formatString) {
  if (!value) {
    return '--'
  }
  formatString = formatString || 'YYYY-MM-DD HH:mm'
  return moment(value).format(formatString)
})

function goLogin () {
  window.location.href = getConfig().primalUrl + '/login/user/login.html?link=' + encodeURIComponent(`${getConfig().primalUrl}/kgdp`)
}

const init = function (config) {
  Vue.use(VueAxios, axios)
  Vue.config.productionTip = false
  axios.defaults.baseURL = config.baseUrl
  axios.defaults.headers['Content-Type'] = 'application/json'
  axios.interceptors.request.use(function (settings) {
    if (getConfig().token) {
      settings.headers['Kg-Authorization'] = getConfig().token
    }
    if (settings.data && !(settings.headers && settings.headers['Content-Type'] === 'application/json') && !(settings.headers && settings.headers['Content-Type'] === 'multipart/form-data')) {
      let data = settings.data
      settings.data = buildQueryParams(data)
    }
    return settings
  }, function (error) {
    return Promise.reject(error)
  })
  axios.interceptors.response.use(function (response) {
    const data = response.data
    if (data.errCode === 200) {
      return data.data
    } else if (data.errCode === 500) {
      const error = new Error('服务端内部错误', response.status)
      return Promise.reject(error)
    }
  }, function (httpError) {
    const response = httpError.response
    if (response) {
      if (response.status === 401) {
        const error = new Error('登录失效，请重新登录', response.status)
        goLogin()
        return Promise.reject(error)
      } else if (response.status === 403) {
        const error = new Error('暂无权限，无法操作', response.status)
        return Promise.reject(error)
      } else {
        goLogin()
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

export {init}
