<script setup lang="ts">
import { useDemoStore, useDemoStore2 } from './store'
import HelloWorld from './components/HelloWorld.vue'

const store = useDemoStore()
const store2 = useDemoStore2()
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

  <button @click="() => store2.add()">
    add2
  </button>
  <div>
    {{ store2.state.a }}
  </div>
</template>
