import { defineStore } from '@baicie/pinia'
import { reactive } from 'vue'

export const useDemoStore = defineStore('demo', () => {
  const state = reactive({
    a: 1,
  })

  const add = () => {
    state.a++
  }

  return {
    state,
    add,
  }
})

export const useDemoStore2 = defineStore('demo2', () => {
  const state = reactive({
    a: 1,
  })

  const add = () => {
    state.a++
  }

  return {
    state,
    add,
  }
})
