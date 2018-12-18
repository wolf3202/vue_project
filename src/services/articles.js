import axios from 'axios'

const ARTICLES_URL = '/articles'

export default {
  all () {
    return axios.get(ARTICLES_URL)
  },
  store (params) {
    return axios.post(ARTICLES_URL, params)
  },
  update (id, params) {
    return axios.put(ARTICLES_URL + `/${id}`, params)
  },
  destroy (id) {
    return axios.delete(ARTICLES_URL + `/${id}`)
  }
}
