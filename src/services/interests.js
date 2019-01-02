import axios from 'axios'

const INTERESTS_URL = '/interests'

export default {
  all () {
    return axios.get(INTERESTS_URL)
  },
  store (params) {
    return axios.post(INTERESTS_URL, params)
  },
  update (id, params) {
    return axios.put(INTERESTS_URL + `/${id}`, params)
  },
  destroy (id) {
    return axios.delete(INTERESTS_URL + `/${id}`)
  },
  getInterestAuthor (interestId) {
    return axios.get(INTERESTS_URL + `/${parseInt(interestId)}/author`)
  }
}
