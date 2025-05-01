<script setup lang="ts">
import { ref } from 'vue';
import { useGameState } from './gameStateStore';

const gameState = useGameState();

const { wordChunks } = defineProps<{ wordChunks: string[] }>();

const guess = ref([]);

const emit = defineEmits(['shuffle']);

function handleSubmit() {
  gameState.submitGuess(guess.value);
  guess.value = [];
  emit('shuffle');
}
</script>

<template>
  <VBtnToggle v-model="guess" :max="4" multiple rounded class="fill-height" id="grid">
    <VRow v-for="(group, index) in wordChunks" :key="index">
      <VCol v-for="word in group" :key="word">
        <VBtn :value="word" height="75" width="100">
          {{ word }}
        </VBtn>
      </VCol>
    </VRow>
  </VBtnToggle>

  <VItemGroup>
    <VBtn :disabled="guess.length < 4" @click="handleSubmit">Submit</VBtn>
    <VBtn @click="guess = []">Clear</VBtn>
    <VBtn @click="emit('shuffle')">Shuffle</VBtn>
  </VItemGroup>

  {{ gameState.remainingGuesses }}
  <VStepper :model-value="gameState.remainingGuesses">
    <VStepperHeader>
      <VStepperItem
        v-for="index in gameState.maxGuesses"
        :key="index"
        color="green"
        :error="index > gameState.remainingGuesses"
        :value="index"
        error-icon="x"
        edit-icon="heart"
      ></VStepperItem>
    </VStepperHeader>
  </VStepper>
</template>

<style>
#grid {
  height: 1000px;
}
</style>
