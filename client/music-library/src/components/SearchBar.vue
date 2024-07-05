<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
    const inputElement = document.getElementById('input-search-bar');
    inputElement.addEventListener('input', () => {
        console.log(inputElement.value);
    });
});
</script>

<template>
    <main class="search-wrapper">
        <div class="input-wrapper">
            <button id="close-button">
                <img id="close-icon" src="./icons/close.png">
            </button>
            <input id="input-search-bar" type="text">
            <button id="search-button">
                <img id="search-icon" src="./icons/search.png">
            </button>
        </div>
        <ul class="suggestions-list">
            <li class="icon">item1</li>
            <li class="icon">item2</li>
            <li class="icon">item3</li>
        </ul>
    </main>
</template>

<style scoped>
#search-button, #close-button {
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
}

li {
    list-style-type: none;
    height: 8%;
}

li:hover {
    background-color: #6C63FF;
}

.search-wrapper {
    display: flex;
    flex-direction: column;
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
</style>
