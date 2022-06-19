import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    size: 8,
    errors: 12,
    score: 0,

  }),
})
