<script setup>
import SearchBar from '../components/SearchBar.vue'

</script>

<template>
    <header>
        <a href="/"><img src="../assets/back.png" id="back-button"></a>
        <div class="page-wrapper">
            <SearchBar class="search-bar"></SearchBar>
        </div>
    </header>
    <img id="artist-icon" src="../assets/album.png">
    <main class="artist-content">
        <h1>name</h1>
        <h2>songs</h2>
        <ul>
            <li></li>
        </ul>
    </main>
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

.page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

#artist-icon {
    position: fixed;
    top: 80px;
    z-index: 1;
    height: 40vh;
}

.search-bar {
    z-index: 99;
}

.artist-content {
    position: fixed;
    width: 100vw;
    z-index: 99;
    top: 360px;
    text-align: left;
    margin-left: 4vw;
}
</style>