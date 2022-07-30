<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "../stores/user";
import { getUserInfo } from "../api/user";
import { getSetList } from "../api/set";
import UserInfo from "../components/UserInfo.vue";
import SetList from "../components/SetList.vue";

const user = useStore();
onMounted(async () => {
  await getUserInfo().then((res) => {
    if (res && res.data.state) {
      user.$patch({
        name: res.data.data.name,
        email: res.data.data.email
      });
    }
  });
  await getSetList().then((res) => {
    if (res && res.data.state) {
      user.$patch({ sets: res.data.data });
    }
  });
});
</script>

<template>
  <main>
    <UserInfo />
    <SetList />
  </main>
</template>

<style scoped></style>
