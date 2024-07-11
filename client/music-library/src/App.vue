<script setup>
import SearchBar from './components/SearchBar.vue';
import MusicWaves from './components/MusicWaves.vue';
import { RouterView } from 'vue-router'
</script>

<template>

  <header>
    <nav>
      <a href="/"><img src="./assets/back.png" id="back-button"></a>
    </nav>
    <MusicWaves>
    </MusicWaves>
  </header>
  <section class="page-wrapper">
    <SearchBar></SearchBar>
  </section>
  <RouterView />
</template>
<style>
#back-button {
  border: none;
  background-color: white;
  filter: grayscale(100%);
  margin-left: 4vw;
}

#back-button:hover {
  filter: grayscale(0%);
}
</style>