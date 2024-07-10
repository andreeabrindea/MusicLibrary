<script setup>
import { defineProps } from 'vue';
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps(['albums'])

function goToPage(album) {
    router.push({ name: 'album', params: { name: encodeURI(album.artist), title: encodeURI(album.album) } })
}
</script>

<template>
    <h3 class="album-title">Albums:</h3>
    <ul class="recently-added-albums-list">
        <li id="recently-added-albums-list-element" @click="goToPage(album)" v-for="album in props.albums">{{
            album.album }}</li>
    </ul>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

.album-title {
    font-family: "Josefin Sans", sans-serif;
}

.recently-added-albums-list {
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
}

#recently-added-albums-list-element {
    list-style-type: none;
    border: 2px solid green;
    background-color: green;
    border-radius: 8px;
    padding: 10px;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>