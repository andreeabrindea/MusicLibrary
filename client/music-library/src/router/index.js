import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistPage from '../views/ArtistPage.vue'
import AlbumPage from '@/views/AlbumPage.vue'
import AddAlbum from '@/views/AddAlbum.vue'
import SearchResults from '@/views/SearchResults.vue'
import AddArtist from '@/views/AddArtist.vue'
import EditArtist from '@/views/EditArtist.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:_id',
      name: 'artist',
      component: ArtistPage
    },
    {
      path: '/:_id/:title',
      name: 'album',
      component: AlbumPage
    },
    {
      path: '/:_id/add-album',
      name: 'addAlbum',
      component: AddAlbum
    },
    {
      path: '/results/:searched',
      name: 'search',
      component: SearchResults
    },
    {
      path: '/add-artist',
      name: 'addArtist',
      component: AddArtist
    },
    {
      path: '/:_id/edit',
      name: 'editArtist',
      component: EditArtist
    }
  ]
})

export default router
