<script setup lang="ts">
import { computed } from 'vue';
import type { WordGroup } from './gameStateStore';

const { answers } = defineProps<{
  answers: WordGroup[];
}>();

const solvedAnswers = computed(() => answers.filter((answer) => answer.solved));
</script>

<template>
  <div>
    <VCard v-for="answer in solvedAnswers" :key="answer.title">
      <VCardItem>
        <VCardTitle>{{ answer.title }}</VCardTitle>
      </VCardItem>
      <VCardText>{{ answer.words.join(', ') }}</VCardText>
    </VCard>
  </div>
</template>
