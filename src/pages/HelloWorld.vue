<script setup>
import { ref, onBeforeMount } from "vue";

const loading = ref(true);
const currentQuestion = ref(0);
const score = ref(0);
const finished = ref(false);
const questions = [];

onBeforeMount(() => {
  getQuestions();
});

const getQuestions = async () => {
  // const response = await fetch("10.0.100.99:1234/quizz/get");
  const response = await fetch("http://localhost:3000/quizz/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const formattedQuestions = data.payload.map((question) => ({
    ...question,
    qst_opt: question.qst_opt.split(" | ").sort(() => Math.random() - 0.5),
  }));
  questions.push(...formattedQuestions);
  //Remove the first 10 questions
  if (questions.length > 10) {
    questions.splice(0, 10);
  }
  loading.value = false;
};

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
  getQuestions();
};

const maxWidth = () => {
  const options = questions[currentQuestion.value].qst_opt;
  const longestOption = options.reduce((a, b) => (a.length > b.length ? a : b));
  return longestOption.length * 20;
};
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h1 class="text-red-100 text-9xl">Quizz</h1>
    <div v-if="finished">
      <h2>Bravo, vous avez terminé le quizz !</h2>
      <p>Votre score est de {{ score }} / {{ questions.length }}</p>
      <button @click="reset()">Recommencer</button>
    </div>
    <div v-else-if="questions.length > 0">
      Score : {{ score }} / {{ questions.length }}
      <div class="flex flex-col justify-center items-center">
        <h2 class="text-center text-xl">
          {{ questions[currentQuestion].qst_libqst }}
        </h2>
        <ul class="grid grid-cols-2 gap-4 mt-10">
          <li
            v-for="(option, index) in questions[currentQuestion].qst_opt"
            :key="index"
            class="flex justify-center"
          >
            <button
              @click="handleClick(questions[currentQuestion].qst_ans, option)"
              class="px-4 py-2 bg-blue-200 text-white rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              :style="{ width: `${maxWidth()}px` }"
            >
              {{ option }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
