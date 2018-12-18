import * as types from '../mutation-types'
import InterestsAPI from '@/services/interests'

const state = {
  list: []
}

const getters = {
  getAllInterests: state => state.list
}

const actions = {
  fetchInterests ({ commit }) {
    InterestsAPI.all()
      .then( data  => {
        commit(types.SET_INTERESTS, data)
      })
      // eslint-disable-next-line
      .catch(error => console.warn('fetchInterests', error))
  },
  createInterest ({ dispatch }, form) {
    return new Promise((resolve, reject) => {
      InterestsAPI.store(form)
        .then(() => {
          dispatch('fetchInterests');
          resolve()
        })
        .catch(error => {
          // eslint-disable-next-line
          console.warn('Error createInterest.', error);
          reject()
        })
    })
  }
}

const mutations = {
  [types.SET_INTERESTS] (state, interests) {
    state.list = interests
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
