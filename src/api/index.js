import axios from 'axios'
import store from '../store'
import router from '../router'
const APIUrl = process.env.VUE_APP_URL

const axiosBase = axios.create({
  baseURL: APIUrl,
  headers: {
    contentType: 'application/json'
  }
})
const getAPI = axios.create({
  baseURL: APIUrl
})
const getCategory = axios.create({
  baseURL: APIUrl
})
const getImage = axios.create({
  baseURL: APIUrl
})
const getAPIRole = axios.create({
  baseURL: APIUrl
})
const getEditAPI = axios.create({
  baseURL: APIUrl
})
const postAPI = axios.create({
  baseURL: APIUrl
})
const putAPI = axios.create({
  baseURL: APIUrl
})
const deleteAPI = axios.create({
  baseURL: APIUrl
})
getAPI.interceptors.response.use(undefined, function (err) {
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken')
      .then(access => {
        axios.request({
          baseURL: APIUrl,
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          },
          url: store.state.APIUrl
        }).then(response => {
          store.state.APIData = response.data.data
        }).catch(err => {
          return Promise.reject(err)
        })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else {
    console.log("Error! Koneksi ke server bermasalah");
  }
})

getCategory.interceptors.response.use(undefined, function (err) {
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken')
      .then(access => {
        axios.request({
          baseURL: APIUrl,
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          },
          url: store.state.APIUrlCategory
        }).then(response => {
          store.state.APIDataCategory = response.data.data
        }).catch(err => {
          return Promise.reject(err)
        })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else {
    console.log("Error! Koneksi ke server bermasalah");
  }
})

getEditAPI.interceptors.response.use(undefined, function (err) {
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken')
      .then(access => {
        axios.request({
          baseURL: APIUrl,
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          },
          url: store.state.APIUrl
        }).then(response => {
          store.state.APIShow = response.data.data
        }).catch(err => {
          return Promise.reject(err)
        })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else {
    console.log("Error! Koneksi ke server bermasalah");
  }
})

getImage.interceptors.response.use(undefined, function (err) {
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken')
      .then(access => {
        axios.request({
          baseURL: APIUrl,
          method: 'get',
          headers: {
            Authorization: `Bearer ${access}`
          },
          url: store.state.APIUrl
        }).then(response => {
          store.state.APIImage = response.data;
        }).catch(err => {
          return Promise.reject(err)
        })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else {
    console.log("Error! Koneksi ke server bermasalah");
  }
})

postAPI.interceptors.response.use(undefined, function (err) {
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken')
      .then(access => {
        axios.request({
            baseURL: APIUrl,
            method: 'post',
            data: store.state.formData,
            headers: {
              Authorization: `Bearer ${access}`
            },
            url: store.state.APIUrl
          })
          .then(response => {
            if (response.status == 201) {
              store.dispatch("success", response.status).then(() => {
                router.push({
                  name: store.state.IndexUrl
                })
              });
            } else {
              console.log("Error! Koneksi ke server bermasalah");
            }
          }).catch(err => {
            return Promise.reject(err)
          })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else {
    console.log("Error! Koneksi ke server bermasalah");
  }
})

putAPI.interceptors.response.use(undefined, function (err) {
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken')
      .then(access => {
        axios.request({
            baseURL: APIUrl,
            method: 'put',
            data: store.state.formData,
            headers: {
              Authorization: `Bearer ${access}`
            },
            url: store.state.APIUrl
          })
          .then(response => {
            if (response.status == 200) {
              store.dispatch("success", response.status).then(() => {
                router.push({
                  name: store.state.IndexUrl
                })
              });
            } else {
              console.log("Error! Koneksi ke server bermasalah");
            }
          }).catch(err => {
            return Promise.reject(err)
          })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else {
    console.log("Error! Koneksi ke server bermasalah");
  }
})

deleteAPI.interceptors.response.use(undefined, function (err) {
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken')
      .then(access => {
        axios.request({
          baseURL: APIUrl,
          method: 'delete',
          headers: {
            Authorization: `Bearer ${access}`
          },
          url: store.state.APIUrlDelete
        }).then(response => {
          console.log(response)
        }).catch(err => {
          return Promise.reject(err)
        })
      })
      .catch(err => {
        return Promise.reject(err)
      })
  } else {
    console.log("Error! Koneksi ke server bermasalah");
  }
})

export {
  axiosBase,
  getAPI,
  getCategory,
  getAPIRole,
  getImage,
  getEditAPI,
  postAPI,
  putAPI,
  deleteAPI
}