import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import MoviesView from '@/views/MoviesView'
import RandomView from '@/views/RandomView'
import DetailView from '@/views/DetailView'
import HomeView from '@/views/HomeView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },

  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },
  {
    path:'/movies',
    name:'MoviesView',
    component:MoviesView
  },
  {
    path:'/random',
    name:'RandomView',
    component:RandomView
  },
  {
    path: '/movies/:id',
    name: 'DetailView',
    component: DetailView,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
