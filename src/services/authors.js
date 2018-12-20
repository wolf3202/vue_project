import axios from 'axios'

const AUTHORS_URL = '/authors'

export default {
  all () {
    return axios.get(AUTHORS_URL)
  },
  store (params) {
    return axios.post(AUTHORS_URL, params)
  },
  update (id, params) {
    return axios.put(AUTHORS_URL + `/${id}`, params)
  },
  destroy (id) {
    return axios.delete(AUTHORS_URL + `/${id}`)
  },
  getAuthorInterest (authorId) {
    return axios.get(AUTHORS_URL + `/${parseInt(authorId)}/interest`)
  }
}
