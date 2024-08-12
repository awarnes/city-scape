<script setup lang="ts">
import {mdiCheckCircle, mdiLockRemoveOutline} from '@mdi/js'
import {ref, computed} from 'vue';
const {answer, maxGuesses} = defineProps({
  answer: {
    type: String,
    required: true,
  },
  maxGuesses: {
    type: Number,
    default: 3,
  }
});

const guess = ref('');
const guessNumber = ref(0);

const loading = ref(false);
const finished = ref(false);

const correct = computed(() => guess.value === answer)

const handleCheck = () => {
  loading.value = true;
  guessNumber.value += 1;
  setTimeout(() => {
    if (guess.value === answer || guessNumber.value === maxGuesses) {
      finished.value = true;
      return;
    }

    guess.value = '';
    loading.value = false;
  }, 1500);
}
</script>

<template>
  <VCard class="text-center" variant="outlined" color="indigo-darken-3">
    <VCardText class="cryptex-puzzle-text">
      <VOtpInput
        v-if="!finished"
        v-model="guess"
        type="input"
        :loading="loading"
        :disabled="finished"
        :length="answer.length"
      />
      <VIcon v-else size="75" :icon="correct ? mdiCheckCircle : mdiLockRemoveOutline" :color="correct ? 'success' : 'error'"/>
    </VCardText>
    <VCardActions>
      <VBtn :disabled="guess.length < answer.length || loading || finished" @click="handleCheck">Submit</VBtn>
    </VCardActions>
  </VCard>
</template>

<style>
  .cryptext-puzzle-text {
    display: absolute !important;
  }
</style>