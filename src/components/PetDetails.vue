<template>
  <div v-if="pet">
    <h1>{{ pet.name }}</h1>
    <img :src="pet.image" alt="Slika ljubimca" />
    <p>Vrsta: {{ pet.species }}</p>
    <p>Dob: {{ pet.age }}</p>
    <p>Veličina: {{ pet.size }}</p>
    <p>Priča: {{ pet.story }}</p> 
    <p>Broj pregleda: {{ petViews }}</p>  
    <button @click="navigateToPetList">Nazad</button>
  </div>
  <div v-else>
    <p>Ljubimac nije pronađen.</p>
  </div>
</template>

<script>
import { useViewsStore } from '@/views'; 
export default {
  name: "PetDetails",
  data() {
    return {
      pet: null,
      petViews: 0,
    };
  },
  created() {
    const petData = this.$route.query.petData;
    if (petData) {
      this.pet = JSON.parse(petData);
      this.incrementViews();
    }
  },
  methods: {
    navigateToPetList() {
      this.$router.push({ path: `/pets` });
    },
    incrementViews() {
      const viewsStore = useViewsStore(); 
      viewsStore.incrementPetViews(this.pet.id);
      this.petViews = viewsStore.getPetViews(this.pet.id); 
    }
  }
};
</script>

<style scoped>
button {
  padding: 8px 15px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #3e8e41;
}

button:disabled {
  background-color: #ccc;
  color: #666;
}

img {
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
}
</style>
