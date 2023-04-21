import { createRouter, createWebHistory } from 'vue-router'
import PageTransition from '@/views/PageTransition.vue'
import MainPage from '@/views/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/api/v1/movies/:id',
      component: PageTransition,
      children: [
        {
          path: '',
          name: 'moviePage',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/MoviePage.vue')
        }
      ]
    }
  ]
})

export default router
