<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../stores/user";

const user = useStore();

const router = useRouter();
const toSet = (setId) => {
  router.push(`/${setId}`);
};
</script>

<template>
  <ul class="list">
    <li
      v-for="(set, index) in user.sets"
      :key="set.setId"
      :style="index === 0 ? { borderTop: 'none' } : {}"
      @click="toSet(set.setId)"
    >
      <p>
        <span>{{ set.title }}</span>
        <small>{{ set.count }}</small>
      </p>
    </li>
  </ul>
</template>

<style scoped>
li {
  background-color: var(--background-dim-color);
  list-style: none;
}

li:active {
  filter: brightness(120%);
}

p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
  padding: 15px 30px 15px 0;
  border-top: 1px solid var(--border-color);
}

span {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

small {
  flex-grow: 0;
  color: var(--font-dim-color);
}
</style>
