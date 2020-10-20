import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import History from '@/views/History'

import Home from '@/views/Home'
Vue.use(VueRouter)


const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/history',
    name: 'history',
    component: History
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router