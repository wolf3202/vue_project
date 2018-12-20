import * as types from '../mutation-types'
import AuthorsAPI from '@/services/authors'
import _ from 'lodash'

const state = {
  list: []
}

const getters = {
  getAllAuthors: state => state.list,
  getAuthorById: state => id => _.cloneDeep(state.list.find(author => author.id === parseInt(id)))
}

const actions = {
  fetchAuthors({commit}) {
    return new Promise((resolve, reject) => {
      AuthorsAPI.all()
        .then(data => {
          commit(types.SET_AUTHORS, data)
          resolve()
        })
        .catch(error => {
          // eslint-disable-next-line
          console.warn('fetchAuthors', error)
          reject(error)
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
