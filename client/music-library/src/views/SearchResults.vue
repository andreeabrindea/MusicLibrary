<script setup>
import SearchBar from '../components/SearchBar.vue';
import { useRoute } from 'vue-router'
import { watch, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
let results = ref([]);
let message = ref("");

onMounted(loadResults);

watch(() => route.params.searched, async (newName, oldName) => {
    if (newName !== oldName) {
        await loadResults();
    }
});

async function loadResults() {
    results.value = [];

    const data = await getSearchResults(route.params.searched);
    if (data.length > 0) {
        message.value = "ALL RESULTS";
        results.value = data.flatMap((item) => {
            const results = [];
            if (item.name.toLowerCase().includes(decodeURI(route.params.searched).toLowerCase())) {
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
        });
    } else {
        message.value = "NO RESULTS FOUND"
    }
}
async function getSearchResults(elem) {
    const suggestions = await fetch(`http://127.0.0.1:3000/suggest/${elem}`);
    return await suggestions.json();
}

function goToPage(result) {
    try {
        if (result.album) {
            router.push({ name: 'album', params: { name: result.artist, title: result.album } })
        }
        else {
            router.push({ name: 'artist', params: { name: encodeURIComponent(result.artist) } })
        }
    }
    catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <header class="header-wrapper">
        <SearchBar></SearchBar>
    </header>
    <main class="page-wrapper">
        <h1 class="centered-term">"{{ decodeURI(route.params.searched) }}"</h1>
        <p class="centered-term">{{ message }}</p>
        <ul>
            <li v-if="results.length" v-for="result in results" class="list-of-results centered-term"
                @click="goToPage(result)">
                <p>{{ result.artist }}</p>
                <p>{{ result.album }}</p>
                <p>{{ result.song }}</p>
            </li>
        </ul>
    </main>
</template>
<style scoped>
.list-of-results {
    display: flex;
    flex-direction: row;
    gap: 3px;
}

.list-of-results:hover {
    background-color: #EFF1F3;
    border-radius: 4px;
    border: 4px solid #EFF1F3;
    cursor: pointer;
}

.centered-term {
    text-align: center;
}

.header-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.page-wrapper {
    z-index: 1;
    position: absolute;
    top: 10%;
    right: 48vw;
    width: 30VW;

}
</style>