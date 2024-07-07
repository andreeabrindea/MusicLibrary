import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistPage from '../views/ArtistPage.vue'
import AlbumPage from '@/views/AlbumPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: ArtistPage
    },
    {
      path: '/album/:id',
      name: 'album',
      component: AlbumPage
    }
  ]
})

export default router
