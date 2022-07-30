<script setup>
import { onUpdated, ref } from "vue";
import { useStore } from "../stores/set";
import { createCard, updateCard, deleteCard } from "../api/card";

const set = useStore();

const inputText = (event) => {
  const textarea = event.target;
  textarea.style.height = "26px";
  textarea.style.height = textarea.scrollHeight + "px";
};

const editCard = (index) => {
  for (const card of set.cards) {
    if (card.isEdit) {
      alert("还有卡片未保存.");
      document.getElementById("front" + card.cardId).focus();
      return;
    }
  }
  set.cards[index].isEdit = true;
  setTimeout(() => {
    document.getElementById("front" + set.cards[index].cardId).focus();
  }, 0);
};

const isAdd = ref(false);
const isRoll = ref(false);
const addCard = () => {
  for (const card of set.cards) {
    if (card.isEdit) {
      alert("还有卡片未保存.");
      document.getElementById("front" + card.cardId).focus();
      return;
    }
  }
  set.cards.push({
    cardId: "0",
    front: "",
    back: "",
    isEdit: true
  });
  isAdd.value = true;
  isRoll.value = true;
};

const removeCard = async (index) => {
  if (confirm("确认删除?")) {
    if (isAdd.value) {
      set.cards.splice(index, 1);
    } else {
      await deleteCard(set.cards[index].cardId).then((res) => {
        if (res && res.data.state) {
          set.cards.splice(index, 1);
        }
      });
    }
  }
};

const saveCard = async (index) => {
  if (!set.cards[index].front || !set.cards[index].back) {
    alert("卡片正面或反面不能为空.");
    return;
  }
  if (isAdd.value) {
    await createCard({
      front: set.cards[index].front,
      back: set.cards[index].back,
      setId: set.setId
    }).then((res) => {
      if (res && res.data.state) {
        set.cards[index] = res.data.data;
        set.cards[index].isEdit = false;
        isAdd.value = false;
      }
    });
  } else {
    await updateCard({
      cardId: set.cards[index].cardId,
      front: set.cards[index].front,
      back: set.cards[index].back
    }).then((res) => {
      if (res && res.data.state) {
        set.cards[index].isEdit = false;
      }
    });
  }
};

onUpdated(() => {
  if (isRoll.value) {
    scrollTo(0, document.documentElement.scrollHeight);
    setTimeout(() => {
      document.getElementById("front" + set.cards[set.cards.length - 1].cardId).focus();
    }, 0);
    isRoll.value = false;
  }
});
</script>

<template>
  <ul class="list">
    <li v-for="(card, index) in set.cards" :key="card.cardId" :style="index === 0 ? { borderTop: 'none' } : {}">
      <div class="card">
        <p>
          <strong>Card {{ index + 1 }}</strong>
          <i>Progress: {{ card.progress }}</i>
        </p>
        <label :for="'front' + card.cardId">
          <small>正面</small>
        </label>
        <textarea
          :id="'front' + card.cardId"
          class="input"
          :disabled="!card.isEdit"
          v-model.trim="card.front"
          @input="inputText"
        ></textarea>
        <label :for="'back' + card.cardId">
          <small>反面</small>
        </label>
        <textarea
          :id="'back' + card.cardId"
          class="input"
          :disabled="!card.isEdit"
          v-model.trim="card.back"
          @input="inputText"
        ></textarea>
      </div>
      <div class="edit">
        <img v-if="card.isEdit" src="../assets/icons/save.svg" alt="save" @click="saveCard(index)" />
        <img v-else src="../assets/icons/edit.svg" alt="edit" @click="editCard(index)" />
        <img class="delete" src="../assets/icons/delete.svg" alt="delete" @click="removeCard(index)" />
      </div>
    </li>
  </ul>
  <img id="add" src="../assets/icons/add.svg" alt="add" @click="addCard" />
</template>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: var(--background-dim-color);
  border-top: 1px solid var(--border-color);
  list-style: none;
}

.card {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

strong {
  color: var(--font-dim-color);
}

p {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

i,
small {
  color: var(--font-dim-color);
}

label {
  margin-top: 15px;
}

textarea {
  flex-grow: 1;
  height: 26px;
  padding: 0 0 2px 0;
  margin-right: 15px;
  overflow-y: hidden;
  resize: none;
}

textarea:focus {
  border-bottom-color: var(--primary-color);
  outline: none;
}

.edit {
  flex-grow: 0;
  width: 32px;
}

.edit img {
  width: 100%;
}

.delete {
  margin-top: 15px;
}

#add {
  flex-grow: 0;
  position: fixed;
  left: calc((100% - 48px) / 2);
  bottom: 30px;
  width: 48px;
  height: 48px;
}
</style>
