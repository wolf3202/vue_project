import * as types from '../mutation-types'
import AuthorsAPI from '@/services/authors'

const state = {
  list: []
}

const getters = {
  getAllAuthors: state => state.list
}

const actions = {
  fetchAuthors ({ commit }) {
    AuthorsAPI.all()
      .then(({ data }) => {
        commit(types.SET_AUTHORS, data)
      })
      .catch(error => console.warn('fetchAuthors', error))
  },
  createAuthor ({ dispatch }, form) {
    return new Promise((resolve, reject) => {
      AuthorsAPI.store(form)
        .then(() => {
          dispatch('fetchAuthors');
          resolve()
        })
        .catch(error => {
          console.warn('Error createAuthor.', error);
          reject()
        })
    })
  }
}

const mutations = {
  [types.SET_AUTHORS] (state, authors) {
    state.list = authors
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
