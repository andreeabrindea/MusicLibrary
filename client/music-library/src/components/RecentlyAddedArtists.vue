<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps(['artists'])
function goToPage(artist) {
    router.push({ name: 'artist', params: { _id: artist._id } })
}
</script>

<template>
    <h3 class="artist-title">Artists:</h3>
    <ul class="recently-added-artist-list">
        <li id="recently-added-artist-list-element" @click="goToPage(artist)" v-for="artist in props.artists">{{
            artist.name }}</li>
    </ul>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

.artist-title {
    font-family: "Josefin Sans", sans-serif;
}

.recently-added-artist-list {
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
}

#recently-added-artist-list-element {
    list-style-type: none;
    border: 2px solid pink;
    background-color: pink;
    border-radius: 8px;
    padding: 10px;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>