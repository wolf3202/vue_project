import * as types from '../mutation-types'
import ArticlesAPI from '@/services/articles'

const state = {
  list: []
}

const getters = {
  getAllArticles: state => state.list
}

const actions = {
  fetchArticles ({ commit }) {
    ArticlesAPI.all()
      .then(({ data }) => {
        commit(types.SET_ARTICLES, data)
      })
      .catch(error => console.warn('Error fetchArticles.', error))
  },
  createArticle ({ dispatch }, form) {
    return new Promise((resolve, reject) => {
      ArticlesAPI.store(form)
        .then(() => {
          dispatch('fetchArticles');
          resolve()
        })
        .catch(error => {
          console.warn('Error createArticles.', error);
          reject()
        })
    })
  }
}

const mutations = {
  [types.SET_ARTICLES] (state, articles) {
    state.list = articles
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
