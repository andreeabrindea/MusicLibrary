<script setup>
import MusicWaves from '../components/MusicWaves.vue';
import { onMounted, ref } from 'vue';

const listOfSuggestedArtists = ref([]);
onMounted(async () => {
    listOfSuggestedArtists.value = await getArtists();
});

const artist = ref({
    _id: '',
    name: '',
    albums: [
        {
            title: '',
            description: '',
            songs: [
                { title: '', length: '' }
            ]
        }
    ]
});

function addAlbum() {
    artist.value.albums.push({
        title: '',
        description: '',
        songs: [{ title: '', length: '' }]
    });
}

function addSong(albumIndex) {
    artist.value.albums[albumIndex].songs.push({ title: '', length: '' });
}


async function updateArtist() {
    try {
        const response = await fetch(`http://localhost:3000/artists/${artist.value._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artist.value)
        });

        if (!response.ok) {
            throw new Error('Failed to update artist');
        }

        alert('Artist updated successfully!');
    } catch (error) {
        console.error(error);
        alert('Failed to update artist');
    }
}

async function deleteArtist() {
    try {
        const response = await fetch(`http://localhost:3000/artists/${artist_id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete artist');
        }

        alert('Artist deleted successfully!');
        router.push({ name: 'home' })

    } catch (error) {
        console.error(error);
        alert('Failed to delete artist');
    }
}

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
</script>

<template>
    <nav>
        <a href="/"><img src="../assets/back.png" id="back-button"></a>
    </nav>
    <MusicWaves></MusicWaves>
    <div class="edit-artist-page-wrapper">
        <h2 class="page-title">Edit Artist</h2>
        <form @submit.prevent="createArtist">
            <label for="name"><i>Artist Name:</i></label>
            <br>
            <select name="artist-name" id="artists" v-model="artist.name" @change="handleChange">
                <option v-for="artist in listOfSuggestedArtists" v-bind:value="artist.name" :key="artist.name">{{
            artist.name }}
                </option>
            </select>

            <h3><i>Albums</i></h3>
            <div v-for="(album, index) in artist.albums" :key="index" class="album">
                <h4>Album {{ index + 1 }}</h4>
                <label for="album-title">Album Title:</label>
                <br>
                <input type="text" class="small-margin-top-bottom" v-model="album.title" required>
                <br>
                <label for="album-description" class="small-margin-top-bottom">Album Description:</label>
                <br>
                <textarea class="small-margin-top-bottom" v-model="album.description" rows="4"></textarea>

                <h5>Songs</h5>
                <div v-for="(song, sIndex) in album.songs" :key="sIndex" class="song-list">
                    <label for="song-title">Song Title:</label>
                    <input type="text" class="song-title-input" v-model="song.title" required>
                    <br>
                    <label for="song-length" class="song-label">Length:</label>
                    <input type="text" class="song-length-input" v-model="song.length" required>
                </div>

                <button type="button" @click="addSong(index)">Add Song</button>
                <button type="button" @click="addAlbum">Add Album</button>

            </div>
            <button type="submit" @click="updateArtist">Update Artist</button>
            <button type="button" @click="deleteArtist">Delete Artist</button>

        </form>
    </div>
</template>
<style scoped>
#back-button {
    border: none;
    background-color: white;
    filter: grayscale(100%);
    margin-left: 4vw;
}

#back-button:hover {
    filter: grayscale(0%);
}

.small-margin-top-bottom {
    margin-top: 10px;
    margin-bottom: 8px;
}

button {
    margin: 8px;
    padding: 8px;
    background-color: #EFF1F3;
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
}

button:hover {
    background-color: gray;
}


.song-title-input {
    margin-top: 8px;
    margin-bottom: 8px;
}

.song-label {
    margin-left: 4px;
    margin-right: 4px
}

.edit-artist-page-wrapper {
    width: 100vw;
    text-align: center;
}

.page-title {
    font-family: "Josefin Sans", sans-serif;
}
</style>