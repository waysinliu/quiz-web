<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../stores/set";
import { getSetInfo } from "../api/set";
import { getCardList } from "../api/card";
import SetInfo from "../components/SetInfo.vue";
import CardList from "../components/CardList.vue";
import Header from "../components/Header.vue";

const route = useRoute();
const set = useStore();
onMounted(async () => {
  set.setId = route.params.setId;
  await getSetInfo(set.setId).then((res) => {
    if (res && res.data.state) {
      set.$patch({
        title: res.data.data.title,
        description: res.data.data.description
      });
    }
  });
  await getCardList(set.setId).then((res) => {
    if (res && res.data.state) {
      set.$patch((state) => {
        state.cards.splice(0, state.cards.length);
        for (const card of res.data.data) {
          state.cards.push({
            cardId: card.cardId,
            front: card.front,
            back: card.back,
            progress: card.progress,
            isEdit: false
          });
        }
      });
    }
  });

  const textareas = document.getElementsByClassName("input");
  for (let i = 0; i < textareas.length; i++) {
    const textarea = textareas[i];
    textarea.style.height = textarea.scrollHeight + "px";
  }
});
</script>

<template>
  <main>
    <Header back-to-path="/" />
    <SetInfo />
    <CardList />
  </main>
</template>

<style scoped>
main {
  padding-bottom: 108px;
}
</style>
