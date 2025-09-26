<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card'
})
</script>

<style scoped>
.card {
 background: #023A6233;
  border-radius: 16px;
  padding: 16px;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}
</style>
