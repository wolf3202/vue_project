import * as types from '../mutation-types'
import ArticlesAPI from '@/services/articles'

const state = {
  main: {
    id: '',
    title: '',
    body: '',
    authorId: null
  },
  loading: false,
  editForm: {
    visible: false
  },
  deleteForm: {
    visible: false
  },
  errorText : ''
}
const getters = {

}

const actions = {
  openEditArticleForm ({commit, getters}, articleId) {
    commit(types.CLEAR_EDIT_ARTICLE)
    if (articleId) {
      const article = getters.getArticleById(articleId)
      commit(types.SET_EDIT_ARTICLE, article)
    }
    commit(types.SHOW_EDIT_ARTICLE_FORM)
  },
  openDeleteArticleForm({ commit, getters }, articleId) {
    commit(types.CLEAR_EDIT_ARTICLE)
    const article = getters.getArticleById(articleId)
    commit(types.SET_EDIT_ARTICLE, article)
    commit(types.SHOW_DELETE_ARTICLE_FORM)
  },
  closeEditArticleForm({ commit }) {
    commit(types.CLEAR_EDIT_ARTICLE)
  },
  closeDeleteArticleForm({ commit }) {
    commit(types.CLEAR_EDIT_ARTICLE)
  },
  saveEditArticle ({ state, commit, dispatch }) {
    commit(types.START_EDIT_ARTICLE_LOADING)
    const article = state.main
    if (article.id) {
      return ArticlesAPI.update(article.id, article)
        .then(() => {
          dispatch('fetchArticles')
          commit(types.CLEAR_EDIT_ARTICLE)
        })
        .catch(error => {
          commit(types.STOP_EDIT_ARTICLE_LOADING)
          commit(types.SET_EDIT_ARTICLE_ERROR_TEXT, error.message)
        })
    }
    return ArticlesAPI.store(article)
      .then(() => {
        dispatch('fetchArticles')
        commit(types.CLEAR_EDIT_ARTICLE)
      })
      .catch(error => {
        commit(types.STOP_EDIT_ARTICLE_LOADING)
        commit(types.SET_EDIT_ARTICLE_ERROR_TEXT, error.message)
      })
  },
  deleteArticle ({ state, commit, dispatch }){
    const articleId = state.main.id
    if (articleId) {
      commit(types.START_EDIT_ARTICLE_LOADING)
      return ArticlesAPI.destroy(articleId)
        .then(() => {
          dispatch('fetchArticles')
          commit(types.CLEAR_EDIT_ARTICLE)
        })
        .catch( error => {
          commit(types.STOP_EDIT_ARTICLE_LOADING)
          commit(types.SET_EDIT_ARTICLE_ERROR_TEXT, error.message)
        })
    }
  }
}

const mutations = {
  [types.SET_EDIT_ARTICLE] (state, article) {
    state.main.id = article.id
    state.main.title = article.title
    state.main.body = article.body
    state.main.authorId = article.authorId
  },
  [types.UPDATE_EDIT_ARTICLE_TITLE] (state, value) {
    state.main.title = value
  },
  [types.UPDATE_EDIT_ARTICLE_BODY] (state, value) {
    state.main.body = value
  },
  [types.UPDATE_EDIT_ARTICLE_AUTHOR_ID] (state, value) {
    state.main.authorId = value
  },
  [types.START_EDIT_ARTICLE_LOADING] (state) {
    state.loading = true
  },
  [types.STOP_EDIT_ARTICLE_LOADING] (state) {
    state.loading = false
  },
  [types.SHOW_EDIT_ARTICLE_FORM] (state) {
    state.editForm.visible = true
  },
  [types.SHOW_DELETE_ARTICLE_FORM] (state) {
    state.deleteForm.visible = true
  },
  [types.SET_EDIT_ARTICLE_ERROR_TEXT] (state, text) {
    state.errorText = text
  },
  [types.CLEAR_EDIT_ARTICLE] (state) {
    state.main.id = ''
    state.main.title = ''
    state.main.body = ''
    state.main.authorId = null
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
