import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import snakeToCamelCase from 'camelcase-keys-deep'
import camelToSnakeCase from 'decamelize-keys-deep'

//Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

axios.interceptors.request.use(request => {
  if (request.data && typeof request.data.entries !== 'function') {
    request.data = camelToSnakeCase(request.data)
  }
  return request
}, error => Promise.reject(error))

axios.interceptors.response.use(response => {
  return snakeToCamelCase(response.data)
}, error => Promise.reject(error))
