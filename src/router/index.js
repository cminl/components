import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'searchResult' }
  },
  {
    path: '/container',
    name: 'container',
    component: () => import('@/views/TheContainer.vue'),
    children: [
      {
        path: '/searchResult/:page?',
        name: 'searchResult',
        component: () => import('@/views/TheSearchResult/index.vue')
      }, {
        path: '/searchDetail/:id',
        name: 'searchDetail',
        component: () => import('@/views/TheSearchResult/searchDetail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: 'template',
  routes
})

export default router
