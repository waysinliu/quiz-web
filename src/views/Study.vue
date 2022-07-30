<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getStudyList, updateCardProgress } from "../api/card";
import "../utils/arrayUtils";
import StudyButton from "../components/StudyButton.vue";
import Header from "../components/Header.vue";

const route = useRoute();
const router = useRouter();
const cards = reactive([
  { cardId: "0", front: "", back: "", totalProgress: 0, totalProgressRate: 1, todayProgress: 0 }
]);
onMounted(async () => {
  await getStudyList(route.params.setId).then((res) => {
    if (res && res.data.state) {
      for (const card of res.data.data) {
        cards.push({
          cardId: card.cardId,
          front: card.front,
          back: card.back,
          totalProgress: card.progress,
          totalProgressRate: 1,
          todayProgress: 0
        });
      }
    }
  });
  if (cards.length === 1) {
    alert("今日卡片已完成.");
    router.push(`/${route.params.setId}`);
  } else {
    cards.splice(0, 1);
    cards.shuffle();
  }
});

const index = ref(0);
const isAnswer = ref(false);
const answerHandler = (rate) => {
  if (rate === 0 || (cards[index.value].todayProgress += rate) < 0) {
    cards[index.value].todayProgress = 0;
  }
  if (cards[index.value].totalProgressRate >= 0 && rate <= 0) {
    cards[index.value].totalProgressRate = rate;
  }
  isAnswer.value = true;
};

const nextHandler = async () => {
  if (cards[index.value].todayProgress === 3) {
    let progress;
    if (cards[index.value].totalProgressRate < 0 && !cards[index.value].totalProgress) {
      progress = 0;
    } else {
      progress = cards[index.value].totalProgress + cards[index.value].totalProgressRate;
    }
    await updateCardProgress({
      cardId: cards[index.value].cardId,
      progress: progress
    }).then((res) => {
      if (res && res.data.state) {
        if (cards.length === 1) {
          alert("今日卡片已完成.");
          router.push(`/${route.params.setId}`);
          return;
        } else {
          if (index.value === cards.length - 1) {
            index.value = 0;
            cards.splice(cards.length - 1, 1);
          } else {
            cards.splice(index.value++, 1);
          }
        }
      }
    });
  } else {
    if (++index.value >= cards.length) {
      index.value = 0;
    }
  }
  isAnswer.value = false;
};
</script>

<template>
  <main>
    <Header :backToPath="`/${route.params.setId}`" />
    <div class="card">
      <h1 v-show="!isAnswer">{{ cards[index].front }}</h1>
      <h1 v-show="isAnswer">{{ cards[index].back }}</h1>
    </div>
    <StudyButton :isAnswer="isAnswer" :answerHandler="answerHandler" :nextHandler="nextHandler" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
