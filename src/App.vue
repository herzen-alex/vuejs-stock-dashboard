<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from './components/Card.vue'
import { getRevenue } from './services/sheetdb'

const revenue = ref<string[]>([])

onMounted(async () => {
 revenue.value = await getRevenue('$AAPL')
  console.log(revenue.value) // массив значений в порядке order
})
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
