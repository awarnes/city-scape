import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useContextStore = defineStore('context', () => {
  const puzzles = ref({});

  return { puzzles };
});
