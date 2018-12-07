import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL
