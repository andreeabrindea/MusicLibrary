<script setup>
import SearchBar from '../components/SearchBar.vue'
</script>

<template>
  <main class="page-wrapper">
    <SearchBar class="search-bar"></SearchBar>
  </main>
</template>
<style scoped>
.page-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.search-bar {
  position: fixed;
  top: 50%;
}
</style>