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
      path: '/:name',
      name: 'artist',
      component: ArtistPage
    },
    {
      path: '/:name/album/:title',
      name: 'album',
      component: AlbumPage
    }
  ]
})

export default router
