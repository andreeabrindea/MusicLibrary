<script setup>
import { ref, onMounted } from 'vue';
import RecentlyAddedArtists from '../components/RecentlyAddedArtists.vue';
import RecentlyAddedAlbums from '../components/RecentlyAddedAlbums.vue';

var artists = ref([]);
var albums = ref([]);

async function getArtists() {
  try {
    const response = await fetch(`http://127.0.0.1:3000/artists`);
    if (response.status != 200) {
      return null;
    }
    return await response.json();
  }
  catch (error) {
    console.log(error.message);
  }
}

async function getAlbums() {
  try {
    const response = await fetch(`http://127.0.0.1:3000/albums`);
    if (response.status != 200) {
      return null;
    }
    return await response.json();
  }
  catch (error) {
    console.log(error.message);
  }
}
onMounted(async () => {
  artists.value = await getArtists();
  albums.value = await getAlbums();
})
</script>

<template>
  <main>
    <section class="artists-albums-list">
      <RecentlyAddedArtists :artists="artists"></RecentlyAddedArtists>
      <RecentlyAddedAlbums :albums="albums"></RecentlyAddedAlbums>
    </section>
  </main>
</template>
<style scoped>
header {
  margin-top: 10vh;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10vh;
  align-items: center;
  justify-content: center;
  height: 70vh;
}

.artists-albums-list {
  position: absolute;
  flex-wrap: wrap;
  width: 60vw;
}
</style>