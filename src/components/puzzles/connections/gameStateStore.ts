import { defineStore } from 'pinia';
import { ref } from 'vue';

export type WordGroup = {
  title: string;
  words: string[];
  solved: boolean;
};

export const useGameState = defineStore('connectionsGameState', () => {
  const answers = ref<WordGroup[]>([]);

  const remainingGuesses = ref(0);
  const maxGuesses = ref(0);
  const guesses = ref<{ [k: string]: boolean }>({});

  function initialize(groups: Omit<WordGroup, 'solved'>[], allowedGuesses = 4) {
    answers.value = groups.map((group: WordGroup) => {
      group.solved = false;
      return group;
    });

    maxGuesses.value = allowedGuesses;
    remainingGuesses.value = allowedGuesses;
  }

  function hasGuessed(guess: string[]) {
    return guesses.value[guess.sort().join('')] || false;
  }

  function submitGuess(guess: string[]) {
    if (hasGuessed(guess)) {
      return;
    }

    const guessString = guess.sort().join('');
    let solved = false;
    for (const answer of answers.value) {
      if (guessString === answer.words.sort().join('')) {
        answer.solved = true;
        solved = true;
      }
    }

    if (!solved) {
      remainingGuesses.value--;
    }
    guesses.value[guessString] = true;
  }

  return {
    answers,
    guesses,
    maxGuesses,
    remainingGuesses,
    initialize,
    hasGuessed,
    submitGuess,
  };
});
