<script setup>
</script>
<template>
    <section class="loader">
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
        <span class="stroke"></span>
    </section>
</template>
<style scoped>
section {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

}

.loader {
    height: 70px;
    display: flex;
    align-items: center;
}

.loader .stroke {
    display: block;
    position: relative;
    background: black;
    height: 100%;
    width: 10px;
    border-radius: 50px;
    margin: 0 5px;
    animation: animate 1.2s linear infinite;
}

@keyframes animate {
    50% {
        height: 20%;
    }

    100% {
        height: 100%;
    }
}

.stroke:nth-child(1) {
    animation-delay: 0s;
}

.stroke:nth-child(2) {
    animation-delay: 0.3s;
}

.stroke:nth-child(3) {
    animation-delay: 0.6s;
}

.stroke:nth-child(4) {
    animation-delay: 0.9s;
}

.stroke:nth-child(5) {
    animation-delay: 0.6s;
}

.stroke:nth-child(6) {
    animation-delay: 0.3s;
}

.stroke:nth-child(7) {
    animation-delay: 0.6s;
}
</style>