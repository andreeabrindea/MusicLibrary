<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const artist = ref("");
const album = ref({
    title: '',
    description: '',
    songs: []
})

async function loadAlbums() {
    album.value = await getAlbumSongs(route.params.title);
    artist.value = await getArtistName();
}

onMounted(async () => {
    await loadAlbums();
    await getArtistName();
});

async function getAlbumSongs(title) {
    const songs = await fetch(`http://127.0.0.1:3000/songs/${route.params._id}/${title}`);
    if (songs.status != 200) {
        {
            return null;
        }
    }
    return await songs.json();
}
async function getArtistName() {
    const artistName = await fetch(`http://127.0.0.1:3000/artists/${route.params._id}`);
    if (artistName.status != 200) {
        {
            return null;
        }
    }
    return await artistName.json();
}
function goToArtistPage(elem) {
    router.push({ name: 'artist', params: { name: encodeURIComponent(elem._id) } })
}

async function deleteAlbum() {
    const alerta = confirm('Are you sure you want to delete this album?');
    if (alerta) {
        try {
            const response = await fetch(`http://localhost:3000/artists/${route.params._id}/${route.params.title}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting album');
            }

            alert('Album deleted successfully!');
            router.push({ name: 'artist', params: { _id: route.params._id } });

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add album');
        }
    }
}
</script>
<template>
    <div class="layout">
        <section>
            <img id="album-icon" src="../assets/album.png">
            <p class="album-description">{{ album.description }}</p>
        </section>
        <main class="album-content">
            <h1 class="album-title">{{ album.title }}</h1>
            <h2 class="album-title" @click="goToArtistPage(artist._id)">{{ artist.name }}</h2>
            <h2 style="margin-left: 4vw;">{{ album.album }}</h2>
            <ul>
                <li v-for="(song, index) in album.songs" :key="song._id">
                    <p class="song-title"><b>{{ index + 1 }}. {{ song.title }}</b></p>
                    <p class="song-length">{{ song.length }}</p>
                </li>
            </ul>
        </main>
        <button @click="deleteAlbum" id="delete-button">Delete</button>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

#delete-button {
    margin: 8px;
    padding: 8px;
    background-color: #EFF1F3;
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
}

#delete-button:hover {
    background-color: red;
}

.layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

li {
    list-style-type: none;
    margin-left: 4vw;
}

.song-title {
    font-size: 1.2rem;
}

.album-title {
    text-align: center;
    font-family: "Josefin Sans", sans-serif;
}

.album-description {
    font-size: 1.3rem;
    padding: 0.75em;
    text-align: center;
}

#album-icon {
    height: 40vh;
}

@media only screen and (max-width: 767px) {
    .layout {
        display: flex;
        flex-direction: column;
    }

    #album-icon {
        height: 30vh;
    }
}
</style>