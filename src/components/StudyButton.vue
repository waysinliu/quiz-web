<script setup>
import { toRef } from "vue";

const props = defineProps({
  isAnswer: Boolean,
  answerHandler: Function,
  nextHandler: Function
});

const isAnswer = toRef(props, "isAnswer");
</script>

<template>
  <div>
    <button v-show="!isAnswer" id="remember" @click="props.answerHandler(1)">记得</button>
    <button v-show="!isAnswer" id="vague" @click="props.answerHandler(-1)">模糊</button>
    <button v-show="!isAnswer" id="forget" @click="props.answerHandler(0)">忘记</button>
    <button v-show="isAnswer" id="next" @click="props.nextHandler">下一张</button>
  </div>
</template>

<style scoped>
div {
  flex-grow: 0;
  display: flex;
  width: 100%;
}

button {
  flex-grow: 1;
  height: 150px;
  color: var(--font-dark-color);
}

button:active {
  filter: brightness(90%);
}

#remember {
  background-color: var(--remember-button);
  border-radius: 50px 0 0 0;
}

#vague {
  background-color: var(--vague-button);
}

#forget {
  background-color: var(--forget-button);
  border-radius: 0 50px 0 0;
}

#next {
  background-color: var(--primary-color);
  border-radius: 50px 50px 0 0;
}
</style>
