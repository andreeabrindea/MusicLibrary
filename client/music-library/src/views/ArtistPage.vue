<script setup>
import SearchBar from '../components/SearchBar.vue'
import { watch, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const artist = ref({
    name: '',
    albums: []
})

onMounted(async () => {
    artist.value = await getArtist(route.params._id);
});

async function getArtist(id) {
    try {
        const artistsAlbums = await fetch(`http://127.0.0.1:3000/artists/${id}`);
        if (artistsAlbums.status != 200) {
            return null;
        }
        return await artistsAlbums.json();
    }
    catch (error) {
        console.log(error.message);
    }
}

function goToAlbumPage(album) {
    try {
        router.push({ name: 'album', params: { name: route.params._id, title: encodeURIComponent(album.title) } })
    }
    catch (error) {
        console.log(error.message);
    }
}
</script>

<template>
    <header>
        <a href="/"><img src="../assets/back.png" id="back-button"></a>
        <div class="page-wrapper">
            <SearchBar class="search-bar"></SearchBar>
        </div>
    </header>
    <img id="artist-icon" src="../assets/artist.png">
    <main class="artist-content">
        <h1>{{ artist.name }}</h1>
        <ul>
            <router-link :to="{ name: 'addAlbum', params: { artist: route.params.name } }">
                <li>Add new album</li>
            </router-link>
            <li v-for="album in artist.albums" @click="goToAlbumPage(album)"> {{ album.title }}</li>
        </ul>
    </main>
</template>
<style scoped>
.not-found-message {
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 25vw;
}

.page {
    height: 100vh;
}

ul {
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
    width: 80vw;
}

li {
    list-style-type: none;
    width: 18vw;
    height: 16vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1vh;
    background-color: #74BBB6;
    color: white;
    border-radius: 14px;
}

li:hover {
    cursor: pointer;
    background-color: #6C63FF;
}

#back-button {
    border: none;
    background-color: white;
    filter: grayscale(100%);
    margin-left: 4vw;
}

#back-button:hover {
    filter: grayscale(0%);
}

.page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#artist-icon {
    position: absolute;
    top: 80px;
    right: 40vw;
    z-index: 0;
    height: 40vh;
}

.artist-content {
    position: absolute;
    margin-top: 20vh;
    width: 100vw;
    z-index: 2;
    top: 380px;
    text-align: center;
    font-family: "Josefin Sans", sans-serif;
}
</style>