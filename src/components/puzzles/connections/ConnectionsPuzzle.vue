<script setup lang="ts">
import AnswerDisplay from './AnswerDisplay.vue';
import WordGrid from './WordGrid.vue';
import { useGameState, WordGroup } from './gameStateStore';
import { onBeforeMount, ref } from 'vue';

const gameState = useGameState();

const { initialConfig } = defineProps<{
  initialConfig: Omit<WordGroup, 'solved'>[];
}>();

const wordChunks = ref([]);

function shuffle(words: string[]): string[] {
  const newWords = words.slice();

  for (let i = newWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newWords[i], newWords[j]] = [newWords[j], newWords[i]];
  }

  const chunks = [];
  let index = 0;
  while (index < newWords.length) {
    chunks.push(newWords.slice(index, (index += 4)));
  }

  return chunks;
}

function handleShuffle() {
  const flatWords = gameState.answers
    .filter((answer) => !answer.solved)
    .flatMap((answer) => answer.words);

  wordChunks.value = shuffle(flatWords);
}

onBeforeMount(() => {
  gameState.initialize(initialConfig);

  const flatWords = gameState.answers
    .filter((answer) => !answer.solved)
    .flatMap((answer) => answer.words);

  wordChunks.value = shuffle(flatWords);
});
</script>

<template>
  <div>
    <AnswerDisplay :answers="gameState.answers" />
    <WordGrid
      v-if="gameState.remainingGuesses && wordChunks.length"
      :word-chunks="wordChunks"
      @shuffle="handleShuffle"
    />
    <VCard v-else-if="gameState.remainingGuesses">
      <VCardTitle>Congratulations!</VCardTitle>
      <VCardText>You completed the puzzle!</VCardText>
      <VCardActions>
        <VBtn @click="gameState.initialize(initialConfig)">Again</VBtn>
      </VCardActions>
    </VCard>
    <VCard v-else>
      <VCardTitle>Whoops!</VCardTitle>
      <VCardText>All out of guesses. Try again?</VCardText>
      <VCardActions>
        <VBtn @click="gameState.initialize(initialConfig)">Restart</VBtn>
      </VCardActions>
    </VCard>
  </div>
</template>
