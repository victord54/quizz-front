<script setup>
import { ref } from "vue";

const questions = [
  {
    question: "Quelle est la capitale de la France ?",
    options: ["Paris", "Londres", "Madrid", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Quelle est la capitale de l'Espagne ?",
    options: ["Paris", "Londres", "Madrid", "Berlin"],
    answer: "Madrid",
  },
  {
    question: "Quelle est la capitale de l'Allemagne ?",
    options: ["Paris", "Londres", "Madrid", "Berlin"],
    answer: "Berlin",
  },
];

const getQuestions = (async) => {
  // const response = await fetch("10.0.100.99:1234/quizz/get");
  // const data = await response.json();
  // questions.value = data;
};

const currentQuestion = ref(0);
const score = ref(0);
const finished = ref(false);

const handleClick = (answer, option) => {
  if (answer === option) {
    score.value++;
  }
  currentQuestion.value++;
  if (currentQuestion.value >= questions.length) {
    finished.value = true;
  }
};

const reset = () => {
  currentQuestion.value = 0;
  score.value = 0;
  finished.value = false;
};

const maxWidth = () => {
  const options = questions[currentQuestion.value].options;
  const longestOption = options.reduce((a, b) => (a.length > b.length ? a : b));
  return longestOption.length * 20;
};
</script>

<template>
  <h1 class="text-red-100 text-9xl">Quizz</h1>
  <div v-if="finished">
    <h2>Bravo, vous avez terminé le quizz !</h2>
    <p>Votre score est de {{ score }} / {{ questions.length }}</p>
    <button @click="reset()">Recommencer</button>
  </div>
  <div v-else>
    Score : {{ score }} / {{ questions.length }}
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-center text-xl">
        {{ questions[currentQuestion].question }}
      </h2>
      <ul class="grid grid-cols-2 gap-4 mt-10">
        <li
          v-for="(option, index) in questions[currentQuestion].options"
          :key="index"
          class="flex justify-center"
        >
          <button
            @click="handleClick(questions[currentQuestion].answer, option)"
            class="px-4 py-2 bg-blue-200 text-white rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            :style="{ width: `${maxWidth()}px` }"
          >
            {{ option }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
