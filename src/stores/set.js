import { defineStore } from "pinia";

export const useStore = defineStore("set", {
  state: () => {
    return {
      setId: "",
      title: "",
      description: "",
      cards: []
    };
  }
});
