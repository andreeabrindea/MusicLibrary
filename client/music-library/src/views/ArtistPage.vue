<script setup>
import { ref, onMounted } from 'vue';
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
    <div class="layout">
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
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: space-evenly;
}

.page {
    height: 100vh;
}

ul {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
}

li {
    list-style-type: none;
    padding: 3em 2.5em;
    display: flex;
    justify-content: center;
    align-items: center;
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
    height: 40vh;
}

.artist-content {
    text-align: center;
    font-family: "Josefin Sans", sans-serif;
}

@media only screen and (max-width: 767px) {
    .layout {
        flex-direction: column;
    }
}
</style>