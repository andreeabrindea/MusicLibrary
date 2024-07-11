<script setup>
import { ref, defineModel } from 'vue';
import { useRouter } from 'vue-router';

const suggestions = ref([]);
const router = useRouter();
const selectedIndex = ref(-1);
const inputElement = defineModel('');
const writtenInput = ref('');

async function suggestData() {
    const data = await getSuggestions(inputElement.value);
    manipulateListOfResultSuggestions(data, suggestions, inputElement.value, 10);
}

function clearData() {
    selectedIndex.value = -1;
    inputElement.value = "";
    suggestions.value = [];
    writtenInput.value = '';
}

function search(data) {
    router.push({ name: 'search', params: { searched: encodeURI(data) } })
    clearData();
}

function manipulateListOfResultSuggestions(data, results, input, maximumNoOfElements) {
    if (input === '' || input === undefined || input === null) {
        suggestions.value = [];
        return;
    }

    if (data != null) {
        results.value = data.flatMap((item) => {
            const results = [];
            if (item.name.toLowerCase().includes(input)) {
                results.push({ artist: item.name, artistId: item.id });
            }
            if (item.albums.length > 0) {
                item.albums.forEach(album => {
                    if (album.title.includes(input)) { results.push({ artist: item.name, artistId: item.id, album: album.title }); }
                    album.songs.forEach(song => {
                        results.push({ artist: item.name, artistId: item.id, album: album.title, song: song.title });
                    });
                });
            }
            return results;
        }).slice(0, maximumNoOfElements);
    }
}

async function getSuggestions(elem) {
    const validKeyword = /^[a-zA-Z\d\_]{1,}$/g;
    if (validKeyword.test(elem)) {
        const encodedKeyword = encodeURIComponent(elem);
        const suggestions = await fetch(`http://127.0.0.1:3000/suggest/${encodedKeyword}`);
        return await suggestions.json();
    }
    return null;
}

function normalizeSuggestion(suggestion) {
    let searchInput = suggestion.artist;
    if (suggestion.album) {
        searchInput += ` ${suggestion.album}`;
    }
    if (suggestion.song) {
        searchInput += ` ${suggestion.song}`;
    }

    return searchInput;
}

function selectSuggestion(suggestion) {
    const searchInput = normalizeSuggestion(suggestion);
    search(searchInput);
}

function moveCursor(step) {
    if (selectedIndex.value + step <= -1 || selectedIndex.value + step >= suggestions.value.length) {
        inputElement.value = writtenInput.value;
        return;
    }

    if (writtenInput.value === '') {
        writtenInput.value = inputElement.value;
    }
    selectedIndex.value += step;
    inputElement.value = normalizeSuggestion(suggestions.value[selectedIndex.value]);
}
</script>

<template>
    <main class="search-wrapper">
        <form id="search-form" class="input-wrapper" autocomplete="off" @submit.prevent="myFunction">
            <button type="button" id="close-button" @click="clearData">
                <img id="close-icon" src="./icons/close.png">
            </button>
            <input id="input-search-bar" type="text" placeholder="Search artists or albums" v-model="inputElement"
                @input="suggestData" @click="suggestData" @keypress.enter="search(inputElement)"
                @keyup.down="moveCursor(1)" @keyup.up="moveCursor(-1)">
            <button id="search-button" type="submit" @click="search(inputElement)">
                <img id="search-icon" src="./icons/search.png">
            </button>
        </form>
        <ul class="suggestions-list">
            <li v-for="(suggestion, index) in suggestions" :key="suggestion.id" class="icon suggestions-list-element"
                @click="selectSuggestion(suggestion)" :class="index === selectedIndex ? 'selected' : ''">
                <p>{{ suggestion.artist }}</p>
                <p>{{ suggestion.album }}</p>
                <p>{{ suggestion.song }}</p>
            </li>
        </ul>
    </main>
</template>

<style scoped>
.icon {
    padding-left: 28px;
    background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat left;
    background-size: 20px;
    margin-left: 2px;
}

.icon:hover {
    cursor: pointer;
}

.suggestions-list-element {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.75em;
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
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    width: 54%;
    border-radius: 0 0 20px 20px;
    background-color: #EFF1F3;
    position: absolute;
    top: 9em;
    z-index: 99;
}

li {
    list-style-type: none;
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
    align-items: center;
}

#input-search-bar {
    height: 4vh;
    width: 50vw;
    margin-bottom: 2px;
    background-color: #EFF1F3;
    border: 0;
    z-index: 99;
}

#input-search-bar:focus {
    outline: none;
}
</style>
