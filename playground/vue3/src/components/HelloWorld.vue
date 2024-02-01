<script setup lang="ts">
import { ref } from 'vue'
import { useDemoStore } from '../store'

defineProps<{ msg: string }>()
const store = useDemoStore()
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  {{ store.state.a }}
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
