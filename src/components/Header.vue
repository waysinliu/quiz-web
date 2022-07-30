<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  backToPath: String
});

const router = useRouter();
const toBack = () => {
  router.push(props.backToPath);
};
</script>

<template>
  <header>
    <img src="../assets/icons/back.svg" alt="back" @click="toBack" />
  </header>
</template>

<style scoped>
header {
  flex-grow: 0;
  padding-top: 30px;
  padding-left: 30px;
}
img {
  width: 32px;
}
</style>
