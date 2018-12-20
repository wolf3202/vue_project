import * as types from '../mutation-types'
import AuthorsAPI from '@/services/authors'

const state = {
  main: {
    id: '',
    name: '',
    age: '',
    sex: '',
    interestIds: []
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
  getThisState: state => state.main
}

const actions = {
  openEditAuthorForm ({ commit, getters}, authorId) {
    commit(types.CLEAR_EDIT_AUTHOR)
    if (authorId) {
      const author = getters.getAuthorById(authorId)
      commit(types.SET_EDIT_AUTHOR, author)
    }
    commit(types.SHOW_EDIT_AUTHOR_FORM)
  },
  openDeleteAuthorForm ({ commit, getters}, authorId) {
    commit(types.CLEAR_EDIT_AUTHOR)
    const author = getters.getAuthorById(authorId)
    commit(types.SET_EDIT_AUTHOR, author)
    commit(types.SHOW_DELETE_AUTHOR_FORM)
  },
  closeEditAuthorForm ({ commit }) {
    commit(types.CLEAR_EDIT_AUTHOR)
  },
  closeDeleteAuthorForm({ commit }) {
    commit(types.CLEAR_EDIT_AUTHOR)
  },
  saveEditAuthor ({ state, commit, dispatch }) {
    const author = state.main
    if (author.id) {
      return AuthorsAPI.update(author.id, author)
        .then(() => {
          dispatch('fetchAuthors')
          commit(types.CLEAR_EDIT_AUTHOR)
        })
        .catch(error => {
          commit(types.SET_EDIT_AUTHOR_ERROR_TEXT, error.message)
        })
    }
    return AuthorsAPI.store(author)
      .then(() => {
        dispatch('fetchAuthors')
        commit(types.CLEAR_EDIT_AUTHOR)
      })
      .catch(error => {
        commit(types.SET_EDIT_AUTHOR_ERROR_TEXT, error.message)
      })
  },
  deleteAuthor ({ state, commit, dispatch }){
    const authorId = state.main.id
    if (authorId) {
      return AuthorsAPI.destroy(authorId)
        .then(() => {
          dispatch('fetchAuthors')
          commit(types.CLEAR_EDIT_AUTHOR)
        })
        .catch( error => {
          commit(types.SET_EDIT_AUTHOR_ERROR_TEXT, error.message)
        })
    }
  }
}

const mutations = {
  [types.SET_EDIT_AUTHOR] (state, author) {
    state.main.id = author.id
    state.main.name = author.name
    state.main.age = author.age
    state.main.sex = author.sex
    state.main.interestIds = author.interestIds
  },
  [types.UPDATE_EDIT_AUTHOR_NAME] (state, value) {
    state.main.name = value
  },
  [types.UPDATE_EDIT_AUTHOR_AGE] (state, value) {
    state.main.age = value
  },
  [types.UPDATE_EDIT_AUTHOR_SEX] (state, value) {
    state.main.sex = value
  },
  [types.UPDATE_EDIT_AUTHOR_INTERESTS] (state, value) {
    state.main.interestIds = value
  },
  [types.SHOW_EDIT_AUTHOR_FORM] (state) {
    state.editForm.visible = true
  },
  [types.SHOW_DELETE_AUTHOR_FORM] (state) {
    state.deleteForm.visible = true
  },
  [types.SET_EDIT_AUTHOR_ERROR_TEXT] (state, text) {
    state.errorText = text
  },
  [types.CLEAR_EDIT_AUTHOR] (state) {
    state.main.id = ''
    state.main.name = ''
    state.main.age = null
    state.main.sex = ''
    state.main.interestIds = []
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
