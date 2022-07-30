<script setup>
import { useStore } from "../stores/user";

const user = useStore();
</script>

<template>
  <div class="info">
    <img id="avatar" src="../assets/avatar.png" alt="avatar" />
    <div class="wrapper">
      <h1>{{ user.name }}</h1>
      <p>
        <small>{{ user.email }}</small>
      </p>
    </div>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  align-items: center;
  height: 150px;
  margin: 0 auto;
  padding: 0 30px;
}

#avatar {
  flex-grow: 0;
  width: 75px;
  height: 75px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
}

.wrapper {
  flex-grow: 1;
  width: calc(100% - 90px);
  margin-left: 15px;
}

h1 {
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

small {
  color: var(--font-dim-color);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
