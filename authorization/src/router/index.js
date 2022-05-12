import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/feed',
    name: 'fedd',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/DisStreamView.vue')
    }
  },
  {
    path: '/blog',
    name: 'blogview',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/blogViewer.vue')
    }
  },
  {
    path: '/personalpage',
    name: 'personalpage',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/personalView.vue')
    }
  },
  {
    path: '/PhoneValidation',
    name: 'phone',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/PhoneValidation.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
