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
    return new Promise((resolve, reject) => {
      ArticlesAPI.all()
        .then( data => {
          commit(types.SET_ARTICLES, data)
          resolve()
        })
        .catch(error => {
          // eslint-disable-next-line
          console.warn('Error fetchArticles.', error)
          reject(error)
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
