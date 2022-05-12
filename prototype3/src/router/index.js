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
    path: '/blog/:id/:index',
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
    path: '/editer',
    name: 'editer',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/editer.vue')
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/signUp.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../components/login.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//导航守卫
router.beforeEach(function (to, from, next) {
  if(to.path != '/' && JSON.parse(sessionStorage.getItem('UserSession')) == null) {
    //没有登录auth，且跳转地址不是/，则跳转next(/)首页
    if(to.path == '/signup' || to.path == '/login'){
      next();//验证通过

    }else{
      if(from.path != '/' || from.path != '/signup' || from.path != '/login'){
        next('/');//验证失败

      }else{
        next(from.path);

      }

    }
  }else {
    next()
  }
});

export default router
