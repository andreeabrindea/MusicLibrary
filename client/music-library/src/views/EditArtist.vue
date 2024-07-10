<script setup>

</script>
<template>
    <nav>
        <a href="/"><img src="../assets/back.png" id="back-button"></a>
    </nav>
    <header>
        <div class="header-wrapper">
            <h1>Hello there!</h1>
            <h2>You can add, edit or delete here :D</h2>
        </div>
    </header>
    <section>
        <label>Artist</label><input type="text">
        <br>
        <Album>Albums</Album><input>
        <input>
        <input>
    </section>
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

header {
    width: 100vw;
}

.header-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>