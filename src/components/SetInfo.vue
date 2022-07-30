<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../stores/set";
import { updateSet } from "../api/set";

const isEdit = ref(false);
const editStyle = computed(() => {
  return isEdit.value ? {} : { borderBottom: "none" };
});
const inputText = (event) => {
  const textarea = event.target;
  textarea.style.height = "26px";
  textarea.style.height = textarea.scrollHeight + "px";
};
const editSetInfo = () => {
  isEdit.value = true;
  setTimeout(() => {
    document.getElementById("title").focus();
  }, 0);
};

const set = useStore();
const saveSetInfo = async () => {
  if (set.title === "") {
    alert("标题不能为空.");
    document.getElementById("title").focus();
    return;
  }
  await updateSet({
    setId: set.setId,
    title: set.title,
    description: set.description || ""
  }).then((res) => {
    if (res && res.data.state) {
      isEdit.value = false;
    }
  });
};

const router = useRouter();
const toStudy = () => {
  router.push(`/${set.setId}/study`);
};
</script>

<template>
  <div class="info">
    <textarea
      id="title"
      class="input"
      :style="editStyle"
      :disabled="!isEdit"
      v-model.trim="set.title"
      @input="inputText"
    ></textarea>
    <textarea
      id="description"
      class="input"
      :style="editStyle"
      :disabled="!isEdit"
      v-model.trim="set.description"
      @input="inputText"
    ></textarea>
    <div class="edit">
      <img v-show="!isEdit" src="../assets/icons/edit.svg" alt="edit" @click="editSetInfo" />
      <img v-show="isEdit" src="../assets/icons/save.svg" alt="save" @click="saveSetInfo" />
    </div>
    <button @click="toStudy">开始学习</button>
  </div>
</template>

<style scoped>
.info {
  min-height: 150px;
  padding: 30px;
}

textarea {
  width: 100%;
  height: 0;
  padding: 0;
  overflow-y: hidden;
  resize: none;
}

#title {
  font-size: 1.5rem;
  font-weight: bold;
}

#description {
  color: var(--font-dim-color);
}

.edit {
  display: flex;
  justify-content: end;
}

img {
  width: 32px;
}

button {
  width: 120px;
  height: 45px;
  margin-top: 15px;
  background-color: var(--primary-color);
  border: none;
  border-radius: 45px;
  color: var(--font-dark-color);
}

button:active {
  filter: brightness(90%);
}
</style>
