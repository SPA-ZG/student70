import { defineStore } from 'pinia';

export const useViewsStore = defineStore('views', {
  state: () => ({
    petViews: {}
  }),
  getters: {
    getPetViews: (state) => (petId) => {
      return state.petViews[petId] || 0;
    }
  },
  actions: {
    incrementPetViews(petId) {
      if (!this.petViews[petId]) {
        this.petViews[petId] = 1;
      } else {
        this.petViews[petId]++;
      }
    }
  }
});
