<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();

const album = ref({
    title: '',
    description: '',
    songs: [
        { title: '', length: '' }
    ]
});

function addSong() {
    album.value.songs.push({ title: '', length: '' });
}

async function updateAlbum() {
    try {
        const response = await fetch(`http://localhost:3000/artists/${route.params._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(album.value)
        });

        if (!response.ok) {
            throw new Error('Error adding album');
        }

        alert('Album added successfully!');
        album.value = { title: '', description: '', songs: [{ title: '', length: '' }] };
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to add album');
    }
}
</script>
<template>
    <div class="add-artist-page-wrapper">
        <h2 class="page-title">Add Album</h2>
        <form @submit.prevent="updateAlbum">
            <label for="name"><i>Album Name:</i></label>
            <br>
            <input type="text" id="name" v-model="album.title" required>
            <br>
            <label for="album-description" class="small-margin-top-bottom">Album Description:</label>
            <br>
            <textarea class="small-margin-top-bottom" v-model="album.description" rows="4"></textarea>

            <h3><i>Albums</i></h3>
            <div class="album">
                <h5>Songs</h5>
                <div class="song-list" v-for="song in album.songs">
                    <label for="song-title">Song Title:</label>
                    <input type="text" class="song-title-input" v-model="song.title" required>
                    <br>
                    <label for="song-length" class="song-label">Length:</label>
                    <input type="text" class="song-length-input" v-model="song.length" required>
                </div>

                <button type="button" @click="addSong(index)">Add Song</button>
            </div>
            <button type="submit">Add Album</button>
        </form>
    </div>
</template>

<style scoped>
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

.add-artist-page-wrapper {
    width: 100vw;
    text-align: center;
}

.page-title {
    font-family: "Josefin Sans", sans-serif;
}
</style>