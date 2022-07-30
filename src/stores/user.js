import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => {
    return {
      name: "",
      email: "",
      sets: []
    };
  }
});
