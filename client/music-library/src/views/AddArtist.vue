<script>
export default {
    data() {
        return {
            artist: {
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
            }
        };
    },
    methods: {
        addAlbum() {
            this.artist.albums.push({
                title: '',
                description: '',
                songs: [{ title: '', length: '' }]
            });
        },
        addSong(albumIndex) {
            this.artist.albums[albumIndex].songs.push({ title: '', length: '' });
        },
        async createArtist() {
            try {
                const response = await fetch('http://localhost:3000/artists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.artist)
                });

                if (!response.ok) {
                    throw new Error('Error creating artist');
                }

                alert('Artist created successfully!');
                this.artist = { name: '', albums: [{ title: '', description: '', songs: [{ title: '', length: '' }] }] };
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to create artist');
            }
        }
    }
};
</script>
<template>
    <div class="add-artist-page-wrapper">
        <h2 class="page-title">Add Artist</h2>
        <form @submit.prevent="createArtist">
            <label for="name"><i>Artist Name:</i></label>
            <br>
            <input type="text" id="name" v-model="artist.name" required>

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
            </div>

            <button type="button" @click="addAlbum">Add Album</button>

            <button type="submit">Create Artist</button>
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

.add-artist-page-wrapper {
    width: 100vw;
    text-align: center;
}

.page-title {
    font-family: "Josefin Sans", sans-serif;
}
</style>