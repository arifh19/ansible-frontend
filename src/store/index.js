import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import {
  axiosBase
} from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    products: [],
    histories: [],
    APIData: [],
    APIShow: [],
    APIImage: null,
    APIDataCategory: [],
    APIDataRole: [],
    APIUrl: '',
    APIUrlCategory: '',
    APIUrlDelete: '',
    column: 'id',
    sort: 'desc',
    formData: new FormData(),
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null
    },
    APIData(state) {
      return state.APIData
    },
    APIShow(state) {
      return state.APIShow
    },
    APIImage(state) {
      return state.APIImage
    },
    APIDataCategory(state) {
      return state.APIDataCategory
    },
    APIUrl(state) {
      return state.APIUrl;
    },
    APIUrlCategory(state) {
      return state.APIUrlCategory;
    },
    APIUrlDelete(state) {
      return state.APIUrlDelete;
    },
    dataProducts(state) {
      return state.products;
    },
    dataHistories(state) {
      return state.histories;
    },
    getColumn(state) {
      return state.column;
    },
    getSort(state) {
      return state.sort;
    },
  },

  mutations: {
    updateLocalStorage(state, {
      access,
      refresh
    }) {
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      state.accessToken = access
      state.refreshToken = refresh
    },
    updateAccess(state, access) {
      localStorage.setItem('access_token', access)
      state.accessToken = access
    },
    destroyToken(state) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      state.accessToken = null
      state.refreshToken = null
    },
  },
  actions: {
    refreshToken(context) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/auth/refresh', {
            refresh_token: context.state.refreshToken
          })
          .then(response => {
            context.commit('updateAccess', response.data.data.access_token)
            resolve(response.data.data.access_token)
          })
          .catch(err => {
            context.commit('destroyToken')
            router.push({
              name: 'login'
            })
            reject(err)
          })
      })
    },

    registerUser(context, data) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/api/register/', {
            name: data.name,
            email: data.email,
            username: data.username,
            password: data.password,
            confirm: data.confirm
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logoutUser(context) {
      if (context.getters.loggedIn) {
        context.commit('destroyToken')
      }
    },

    loginUser(context, credentials) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/auth/login', {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            context.commit('updateLocalStorage', {
              access: response.data.data.access_token,
              refresh: response.data.data.refresh_token
            })
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})