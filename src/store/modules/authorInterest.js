import * as types from '../mutation-types'
import AuthorsAPI from '@/services/authors'

const state = {
  list: []
}

const getters = {
  getCurrentAuthorInterests: state => state.list
}

const actions = {
  fetchAuthorInterest ({ commit }, authorId) {
    AuthorsAPI.getAuthorInterest(authorId)
      .then(({ data }) => {
        commit(types.SET_AUTHOR_INTEREST, data)
      })
      .catch(error => console.warn('fetchAuthorInterest', error))
  }
}

const mutations = {
  [types.SET_AUTHOR_INTEREST] (state, authorInterest) {
    state.list = authorInterest
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
