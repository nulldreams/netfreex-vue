import Vue from 'vue'
import Router from 'vue-router'
import Principal from '@/components/Principal'
import Series from '@/components/series/index'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Principal',
      component: Principal
    },
    {
      path: '/series',
      name: 'Series',
      component: Series
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
    // {
    //   path: '/animes',
    //   name: 'Animes',
    //   component: Animes
    // },
    // {
    //   path: '/filmes',
    //   name: 'Filmes',
    //   component: Filmes
    // }
  ]
})
