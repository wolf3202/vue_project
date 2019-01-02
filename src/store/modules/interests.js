import * as types from '../mutation-types'
import InterestsAPI from '@/services/interests'
import _ from 'lodash'

const state = {
  list: []
}

const getters = {
  getAllInterests: state => state.list,
  getInterestById: state => id => _.cloneDeep(state.list.find(interest => interest.id === parseInt(id)))
}

const actions = {
  fetchInterests ({ commit }) {
    return new Promise((resolve, reject) => {
      InterestsAPI.all()
        .then( data  => {
          commit(types.SET_INTERESTS, data)
          resolve()
        })
        .catch(error => {
          // eslint-disable-next-line
          console.warn('fetchInterests', error)
          reject(error)
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
