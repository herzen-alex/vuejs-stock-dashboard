<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card from './Card.vue'
import companiesData from '../companies.json'
import { getRevenue, getOrder } from '../services/sheetdb'

interface Company {
  name: string
  logo?: string
  ticker: string
  description: string
}

const companies = ref<Company[]>(companiesData)
const revenue = ref<Record<string,string>>({})
const latestQuarter = ref<Record<string,string>>({})

onMounted(async () => {
  const promises = companies.value.map(async (company) => {
    try {
      const row = await getRevenue(company.ticker)
      const quarters = await getOrder(company.ticker)
      const lastIndex = row.length - 1
      revenue.value[company.ticker] = row[lastIndex] || 'N/A'
      latestQuarter.value[company.ticker] = quarters[lastIndex] || ''
    } catch (err) {
      console.error(`Error fetching ${company.ticker}:`, err)
      revenue.value[company.ticker] = 'N/A'
      latestQuarter.value[company.ticker] = ''
    }
  })

  await Promise.all(promises)
})
</script>

<template>
  <div class="card_main">
    <Card v-for="company in companies" :key="company.ticker">
      <template #default>
        <div class="container">
          <img v-if="company.logo" :src="company.logo" :alt="company.name" />
          <h2>{{ company.name }}</h2>
        </div>
        <p>
          Revenue: {{ latestQuarter[company.ticker] }}
        </p>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.card_main {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
}
.card_main img {
  width: 24px;
  height: auto;
}
.container {
  display: flex;
  gap: 8px;
  align-items: center;
}
h2 {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
