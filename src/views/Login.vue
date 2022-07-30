<script setup>
import LoginForm from "../components/LoginForm.vue";
</script>

<template>
  <main>
    <div class="logo">
      <h1>Quiz</h1>
    </div>
    <LoginForm />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
