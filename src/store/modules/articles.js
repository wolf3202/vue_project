import * as types from '../mutation-types'
import ArticlesAPI from '@/services/articles'
import _ from 'lodash'

const state = {
  list: []
}

const getters = {
  getAllArticles: state => state.list,
  getArticleById: state => id => _.cloneDeep(state.list.find(article => article.id === parseInt(id)))
}

const actions = {
  fetchArticles ({ commit }) {
    ArticlesAPI.all()
      .then( data => {
        commit(types.SET_ARTICLES, data)
      })
      // eslint-disable-next-line
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
          // eslint-disable-next-line
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
