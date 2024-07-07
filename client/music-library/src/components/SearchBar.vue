<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const suggestions = ref([]);
let artistName = ref(null);
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
                const artistsNamesAndAlbums = [];
                data.map(artist => {
                    artist.albums.map(album => {
                        artistsNamesAndAlbums.push({ name: artist.name, title: album.title }
                        );
                    });
                });

                suggestions.value = artistsNamesAndAlbums.map((item) => {
                    return { artist: item.name, album: item.title };
                });
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
    inputElement.value = suggestion.artist + ' ' + suggestion.album;
    artistName = suggestion.artist;
    suggestions.value = [];
}

</script>

<template>
    <main class="search-wrapper">
        <form class="input-wrapper" autocomplete="off">
            <button type="button" id="close-button">
                <img id="close-icon" src="./icons/close.png">
            </button>
            <input id="input-search-bar" type="text" placeholder="Search">
            <button type="button" id="search-button">
                <img id="search-icon" src="./icons/search.png">
            </button>
        </form>
        <ul class="suggestions-list" id="suggestions-list">
            <li v-for="(suggestion, index) in suggestions" :key="suggestion.artist"
                class="icon suggestions-list-element" @click="selectSuggestion(suggestion)"> {{
                suggestion.artist }}
                <p>{{ suggestion.album }}</p>
            </li>
        </ul>
    </main>
</template>

<style scoped>
.suggestions-list-element {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

#search-button,
#close-button {
    height: 4vh;
    border: 0;
    background-color: #FFF8F3;
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
    background-color: #FFF8F3;
    border: 2px solid gray;
    border-radius: 4px;
    align-items: center;
}

.suggestions-list {
    margin: 0;
    padding: 0;
    border-radius: 10px;
    background-color: #FFF8F3;
    border: 2px solid #FFF8F3;
    z-index: 99;
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
    background-color: #FFF8F3;
    border: 0;
}

#input-search-bar:focus {
    outline: none;
}

.icon {
    padding-left: 28px;
    background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat left;
    background-size: 24px;
}

.icon:hover {
    cursor: pointer;
}

.suggestion-list-element {
    display: flex;
    flex-direction: row;
    gap: 1;
    box-sizing: content-box;
}
</style>
