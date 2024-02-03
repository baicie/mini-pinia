<script setup lang="ts">
import { useDemoStore } from '../store'

defineProps<{ msg: string }>()
const store = useDemoStore()
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
