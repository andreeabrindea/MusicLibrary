<script setup>
import SearchBar from '../components/SearchBar.vue';
import MusicWaves from '../components/MusicWaves.vue';
</script>

<template>
  <header>
    <MusicWaves></MusicWaves>
  </header>
  <main class="page-wrapper">
    <SearchBar class="search-bar"></SearchBar>
  </main>
</template>
<style scoped>
header {
  margin-top: 10vh;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10vh;
  align-items: center;
  justify-content: center;
  height: 70vh;
}
</style>