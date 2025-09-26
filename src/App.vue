<script setup lang="ts">
import Card from './components/Card.vue';
</script>

<template>
    <div class="max-width">
        <Card>
            <h1>Übersicht</h1>
            <p>Beispieltext</p>
        </Card>
    </div>
</template>

<style scoped>
.max-width {
    max-width: 1440px;
    margin: auto;
    padding: 0 16px;
}
</style>
