import * as types from '../mutation-types'
import InterestsAPI from '@/services/interests'

const state = {
  main: {
    id: '',
    name: '',
  },
  editForm: {
    visible: false
  },
  deleteForm: {
    visible: false
  },
  errorText: ''
}

const getters = {

}

const actions = {
  openEditInterestForm ({ commit, getters }, interestId) {
    commit(types.CLEAR_EDIT_INTEREST)
    if (interestId) {
      const interest = getters.getInterestById(interestId)
      commit(types.SET_EDIT_INTEREST, interest)
    }
    commit(types.SHOW_EDIT_INTEREST_FORM)
  },
  openDeleteInterestForm ({ commit, getters }, interestId) {
    commit(types.CLEAR_EDIT_INTEREST)
    const interest = getters.getInterestById(interestId)
    commit(types.SET_EDIT_INTEREST, interest)
    commit(types.SHOW_DELETE_INTEREST_FORM)
  },
  closeEditInterestForm ({ commit }) {
    commit(types.CLEAR_EDIT_INTEREST)
  },
  closeDeleteInterestForm ({ commit }) {
    commit(types.CLEAR_EDIT_INTEREST)
  },
  saveEditInterest ({ state, commit, dispatch}) {
    const interest = state.main
    if (interest.id) {
      return InterestsAPI.update(interest.id, interest)
        .then(() => {
          dispatch('fetchInterests')
          commit(types.CLEAR_EDIT_INTEREST)
        })
        .catch(error => {
          commit(types.SET_EDIT_INTEREST_ERROR_TEXT, error.message)
        })
    }
    return InterestsAPI.store(interest)
      .then(() => {
        dispatch('fetchInterests')
        commit(types.CLEAR_EDIT_INTEREST)
      })
      .catch(error => {
        commit(types.SET_EDIT_INTEREST_ERROR_TEXT, error.message)
      })
  },
  deleteInterest ({ state, commit, dispatch }) {
    const interestId = state.main.id
    if (interestId) {
      return InterestsAPI.destroy(interestId)
        .then(() => {
          dispatch('fetchInterests')
          commit(types.CLEAR_EDIT_INTEREST)
        })
        .catch(error => {
          commit(types.SET_EDIT_INTEREST_ERROR_TEXT, error.message)
        })
    }
  }
}

const mutations = {
  [types.SET_EDIT_INTEREST] (state, interest) {
    state.main.id = interest.id
    state.main.name = interest.name
  },
  [types.UPDATE_EDIT_INTEREST_NAME] ( state, value) {
    state.main.name = value
  },
  [types.SHOW_EDIT_INTEREST_FORM] (state) {
    state.editForm.visible = true
  },
  [types.SHOW_DELETE_INTEREST_FORM] (state) {
    state.deleteForm.visible = true
  },
  [types.SET_EDIT_INTEREST_ERROR_TEXT] ( state, text) {
    state.main.errorText = text
  },
  [types.CLEAR_EDIT_INTEREST] (state) {
    state.main.id = ''
    state.main.name = ''
    state.editForm.visible = false
    state.deleteForm.visible = false
    state.errorText = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
