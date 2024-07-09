import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistPage from '../views/ArtistPage.vue'
import AlbumPage from '@/views/AlbumPage.vue'
import SearchResults from '@/views/SearchResults.vue'

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
      path: '/:name/:title',
      name: 'album',
      component: AlbumPage
    },
    {
      path: '/results/:searched',
      name: 'search',
      component: SearchResults
    }
  ]
})

export default router
