<script setup>
import SearchBar from '../components/SearchBar.vue'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'

let artistName = ref("");
const route = useRoute();
let name = ref("");
let albums = ref([]);

onMounted(async () => {
    artistName = route.params.name;
    const artistDetails = await getArtist(artistName);
    if (artistDetails.name[artistDetails.name.length - 1] === 's') {
        name.value = artistDetails.name + `' albums`;
    }
    else {
        name.value = artistDetails.name + `'s albums`;
    }

    albums.value = artistDetails.albums;
})

async function getArtist(name) {
    const artistDetails = await fetch(`http://127.0.0.1:3000/artists/${name}`);
    return await artistDetails.json();
}

</script>

<template>
    <div class="page">
        <header>
            <a href="/"><img src="../assets/back.png" id="back-button"></a>
            <div class="page-wrapper">
                <SearchBar class="search-bar"></SearchBar>
            </div>
        </header>
        <img id="artist-icon" src="../assets/artist.png">
        <main class="artist-content">
            <h1>{{ name }}</h1>
            <ul>
                <li v-for="album in albums"> {{ album.title }}</li>
            </ul>
        </main>
    </div>
</template>
<style scoped>
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
    height: 18vh;
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
    z-index: 0;
    height: 400px;
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
</style>