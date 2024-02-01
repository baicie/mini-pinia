<script setup lang="ts">
import { useDemoStore } from './store'
import HelloWorld from './components/HelloWorld.vue'

const store = useDemoStore()
console.log('store', store)
</script>

<template>
  <button @click="() => store.add()">
    add
  </button>
  <div>
    {{ store.state.a }}
  </div>
  <HelloWorld msg="msg" />
</template>
