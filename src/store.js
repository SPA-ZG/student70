import { defineStore, createPinia } from 'pinia';

export const useMyStore = defineStore('myStore', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    },
  },
});

const pinia = createPinia();
export { pinia };