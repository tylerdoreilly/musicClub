import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/albums',
      name: 'albums',
      component: () => import('../views/AlbumsView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/album/:id',
      name: 'album',
      component: () => import('../views/AlbumView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/songs',
      name: 'songs',
      component: () => import('../views/SongsView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: "/callback",
      name: "callback",
      redirect: to => {
        return 'albums'
      },
    },
  ]
})

export default router
