<script setup>
import SearchBar from '../components/SearchBar.vue'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute();

let title = ref("");
const songs = ref([]);
const description = ref("");

onMounted(async () => {
    const albumSongs = await getAlbumSongs(route.params.name, route.params.title);
    if (albumSongs != null) {
        songs.value = albumSongs.album.songs;
        description.value = albumSongs.album.description;
        title.value = decodeURIComponent(route.params.name);
    }
})

async function getAlbumSongs(name, album) {
    const songs = await fetch(`http://127.0.0.1:3000/songs/${name}/${album}`);
    if (songs.status != 200) {
        {
            return null;
        }
    }
    return await songs.json();
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
        <div v-if="songs.length == 0" class="not-found-message">
            <h1>Album not found</h1>
        </div>
        <img v-if="songs.length" id="artist-icon" src="../assets/album.png">
    </header>
    <main class="artist-content">
        <h1>{{ title }}</h1>
        <p class="album-description">{{ description }}</p>
        <section v-if="songs.length" class="table-of-songs">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Length</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="song in songs" :key="song._id">
                        <td>{{ song.title }}</td>
                        <td>{{ song.length }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
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

.table-of-songs {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
}

.album-description {
    width: 90vw;
    font-size: 1.3rem;
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

#artist-icon {
    position: absolute;
    top: 80px;
    z-index: 0;
    height: 400px;
}

.search-bar {
    z-index: 99;
}

.artist-content {
    position: absolute;
    margin-top: 20vh;
    width: 100vw;
    z-index: 2;
    top: 380px;
    text-align: left;
    margin-left: 4vw;
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

tr:hover {
    background-color: #6C63FF;
}
</style>