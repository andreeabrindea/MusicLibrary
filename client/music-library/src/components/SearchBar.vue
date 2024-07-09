<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const suggestions = ref([]);
let artistName = ref("");
let albumName = ref("");
let songName = ref("");
const router = useRouter();

onMounted(async () => {
    const inputElement = document.getElementById('input-search-bar');
    inputElement.addEventListener('input', async () => {
        try {
            if (inputElement.value === "") {
                suggestions.value = [];
                return;
            }

            const data = await getSuggestions(inputElement.value);
            if (data != null) {
                suggestions.value = data.flatMap((item) => {
                    const results = [];
                    if (item.name.toLowerCase().includes(inputElement.value)) {
                        results.push({ artist: item.name });
                    }
                    if (item.albums.length > 0) {
                        item.albums.forEach(album => {
                            if (album.songs.length === 0) {
                                results.push({ artist: item.name, album: album.title });
                            }
                            album.songs.forEach(song => {
                                results.push({ artist: item.name, album: album.title, song: song.title });
                            });
                        });
                    }
                    return results;
                }).slice(0, 10);
            }
        } catch (error) {
            console.log(error.message);
        }

        const closeButton = document.getElementById('close-button');
        closeButton.addEventListener('click', () => {
            inputElement.value = "";
            suggestions.value = [];
        });


        const searchButton = document.getElementById('search-button');
        searchButton.addEventListener('click', () => {

            if (inputElement.value.trim() === "") {
                return;
            }

            if (typeof (albumName) === 'string' && albumName !== "") {
                router.push({ name: 'album', params: { name: encodeURI(artistName), title: encodeURI(albumName) } })
                inputElement.value = "";
                return;
            }

            router.push({ name: 'artist', params: { name: encodeURI(artistName) } })
            inputElement.value = "";
        });
    });

    const ul = document.getElementById("suggestions-list");
    let liSelected;
    let index = -1;

    document.addEventListener('keydown', function (event) {
        const len = ul.getElementsByTagName('li').length - 1;
        let next;

        if (event.code === "ArrowDown") {
            index++;
            if (liSelected) {
                removeClass(liSelected, 'selected');
                next = ul.getElementsByTagName('li')[index];
                if (next && index <= len) {
                    liSelected = next;
                } else {
                    index = 0;
                    liSelected = ul.getElementsByTagName('li')[0];
                }
                addClass(liSelected, 'selected');
            } else {
                index = 0;
                liSelected = ul.getElementsByTagName('li')[0];
                addClass(liSelected, 'selected');
            }
        } else if (event.code === "ArrowUp") {
            if (liSelected) {
                removeClass(liSelected, 'selected');
                index--;
                next = ul.getElementsByTagName('li')[index];
                if (next && index >= 0) {
                    liSelected = next;
                } else {
                    index = len;
                    liSelected = ul.getElementsByTagName('li')[len];
                }
                addClass(liSelected, 'selected');
            } else {
                index = 0;
                liSelected = ul.getElementsByTagName('li')[len];
                addClass(liSelected, 'selected');
            }
        }
    });

    function removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    }
});

async function getSuggestions(elem) {
    const validKeyword = /^[a-zA-Z\d\_]{1,}$/g;
    if (validKeyword.test(elem)) {
        const encodedKeyword = encodeURIComponent(elem);
        const suggestions = await fetch(`http://127.0.0.1:3000/suggest/${encodedKeyword}`);
        return await suggestions.json();
    }
    return null;
}

function selectSuggestion(suggestion) {
    const inputElement = document.getElementById('input-search-bar');
    artistName = suggestion.artist;
    if (suggestion.song) {
        inputElement.value = suggestion.artist + ' ' + suggestion.album + ' ' + suggestion.song;
        albumName = suggestion.album;
        songName = suggestion.song;
        suggestions.value = [];
        return
    }

    if (suggestion.album) {
        inputElement.value = suggestion.artist + ' ' + suggestion.album;
        albumName = suggestion.album;
        suggestions.value = [];
        return
    }

    inputElement.value = suggestion.artist;
    suggestions.value = [];
}
</script>

<template>
    <main class="search-wrapper">
        <form id="search-form" class="input-wrapper" autocomplete="off" @submit.prevent="myFunction">
            <button type="button" id="close-button">
                <img id="close-icon" src="./icons/close.png">
            </button>
            <input id="input-search-bar" type="text" placeholder="Search artists or albums">
            <button id="search-button" type="submit">
                <img id="search-icon" src="./icons/search.png">
            </button>
        </form>
        <ul class="suggestions-list" id="suggestions-list">
            <li v-for="(suggestion, index) in suggestions" :key="suggestion.id" class="icon suggestions-list-element"
                @click="selectSuggestion(suggestion)"> {{
            suggestion.artist }}
                <p>{{ suggestion.album }}</p>
                <p>{{ suggestion.song }}</p>
            </li>
        </ul>
    </main>
</template>

<style scoped>
.suggestions-list-element {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    flex-wrap: nowrap;
    margin-top: 8px;
    margin-bottom: 8px;
    height: 25px;
}

#search-button,
#close-button {
    height: 4vh;
    border: 0;
    background-color: transparent;
    margin-right: 10px;
    margin-left: 10px;
}

#close-button {
    flex-grow: 1;
}

#search-icon {
    max-width: 100%;
    max-height: 100%;
    filter: opacity(30%);
}

#close-icon {
    max-width: 80%;
    max-height: 80%;
}

#search-icon:hover {
    filter: opacity(100%);
}

.input-wrapper {
    display: flex;
    flex-direction: row;
    background-color: #EFF1F2;
    border: 2px solid gray;
    border-radius: 40px;
    align-items: center;
}

.suggestions-list {
    margin: 0;
    padding: 0;
    border-radius: 20px;
    background-color: #EFF1F3;
    z-index: 99;
    margin-top: 10px;
}

li {
    list-style-type: none;
    height: 8%;
    z-index: 99;
}

li:hover {
    background-color: #6C63FF;
}

li.selected {
    background-color: #6C63FF;
}

.search-wrapper {
    display: flex;
    flex-direction: column;
    z-index: 99;
}

#input-search-bar {
    height: 4vh;
    width: 50vw;
    margin-bottom: 2px;
    background-color: #EFF1F3;
    border: 0;
}

#input-search-bar:focus {
    outline: none;
}

.icon {
    padding-left: 28px;
    background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat left;
    background-size: 20px;
    margin-left: 2px;
}

.icon:hover {
    cursor: pointer;
}
</style>
