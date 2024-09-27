<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Pretraži ljubimce..." />
    <PetCard v-for="pet in filteredPets" 
             :key="pet.id" 
             :pet="pet"
             @add-comment="addComment"
             @show-details="showDetails"
             @mark-as-interested="markAsInterested(pet)" />
  </div>
</template>

<script>
import { db } from '../../firebase.js'; 
import PetCard from "./PetCard.vue";
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';

export default {
  components: {
    PetCard
  },
  data() {
    return {
      searchQuery: '',
      pets: []
    };
  },
  created() {
    this.fetchPets();
  },
  methods: {
    async fetchPets() {
      var petsQuery = await getDocs(collection(db, 'pets'));
      this.pets = petsQuery.docs.map(doc => {
          let pet = doc.data();
          pet.id = doc.id; 
          return pet;
        });
    },
    async addComment(petId, comment) {
      try {
        const petRef = doc(db, 'pets', petId);

        await updateDoc(petRef, {
          comments: [...this.pets.find(p => p.id === petId).comments, comment]
        });

        const pet = this.pets.find(p => p.id === petId);
        if (pet) {
          pet.comments.push(comment);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
    async markAsInterested(pet) {
      try {
        const petRef = doc(db, 'pets', pet.id);

        const newLikes = pet.interested ? pet.likes - 1 : pet.likes + 1;

        await updateDoc(petRef, {
          interested: !pet.interested,
          likes: newLikes
        });

        pet.interested = !pet.interested;
        pet.likes = newLikes;
      } catch (error) {
        console.error('Error marking as interested:', error);
      }
    }
  },
  computed: {
    filteredPets() {
      if (this.searchQuery) {
        return this.pets.filter(pet => pet.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
      return this.pets;
    },
    totalComments() {
      return this.pets.reduce((total, pet) => total + pet.comments.length, 0);
    }
  }
};
</script>
  
<style>
input[type="text"] {
    padding: 10px;
    margin: 10px 0;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #ddd;
}
</style>