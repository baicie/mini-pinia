import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useDemoStore = defineStore('demo', () => {
  const state2 = reactive({})

  return {
    state2,
  }
})
