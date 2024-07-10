<script setup>
import SearchBar from '../components/SearchBar.vue'
import { watch, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const album = ref({
    title: '',
    description: '',
    songs: []
})

async function loadAlbums() {
    album.value = await getAlbumSongs(route.params.title);
    console.log(album.value);
}

onMounted(async () => await loadAlbums());

async function getAlbumSongs(title) {
    const songs = await fetch(`http://127.0.0.1:3000/songs/${route.params._id}/${title}`);
    if (songs.status != 200) {
        {
            return null;
        }
    }
    return await songs.json();
}

function goToArtistPage(elem) {
    router.push({ name: 'artist', params: { name: encodeURIComponent(elem) } })

}
</script>
<template>
    <nav>
        <a href="/"><img src="../assets/back.png" id="back-button"></a>
        <div class="page-wrapper">
            <SearchBar class="search-bar"></SearchBar>
        </div>
    </nav>
    <header>
        <img id="album-icon" src="../assets/album.png">
    </header>
    <main class="album-content">
        <h1 class="album-title">{{ title }}</h1>
        <h2 class="album-title" @click="goToArtistPage(artistName)">{{ artistName }}</h2>
        <p class="album-description">{{ album.description }}</p>
        <h2 style="margin-left: 4vw;">{{ album.title }} contains {{ album.songs?.length ?? 0 }} songs:</h2>
        <ul>
            <li v-for="(song, index) in album.songs" :key="song._id">
                <p class="song-title"><i>{{ index + 1 }}</i> <b> {{ song.title }}</b></p>
                <p class="song-length">{{ song.length }}</p>
            </li>
        </ul>
    </main>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

li {
    list-style-type: none;
    margin-left: 4vw;
}

.song-title {
    font-size: 1.2rem;
    margin-bottom: 1px;
}

.album-title {
    text-align: center;
    font-family: "Josefin Sans", sans-serif;
}

.song-length {
    margin-top: 1px;
}

.not-found-message {
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 25vw;
}

.table-of-songs {
    width: 100vw;
    height: 50vh;
    display: flex;
    justify-content: center;
}

.album-description {
    width: 90vw;
    font-size: 1.3rem;
    margin-left: 4vw;
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
    position: relative;
}

#album-icon {
    position: absolute;
    top: 80px;
    right: 40vw;
    z-index: 0;
    height: 40vh;
    margin-left: 2vw;
}

.search-bar {
    z-index: 99;
}

.album-content {
    position: absolute;
    margin-top: 20vh;
    width: 100vw;
    z-index: 2;
    top: 380px;
}

table {
    width: 50vw;
    text-align: center;
    margin-bottom: 20vh;
}

table,
th,
td {
    font-size: 1.5rem;
}

tr:nth-child(even) {
    background-color: gray;
}
</style>