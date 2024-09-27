<template>
  <div class="pet-card">
    <img :src="pet.image" alt="Slika ljubimca" />
    <h2>{{ pet.name }}</h2>
    <p>Vrsta: {{ pet.species }}</p>
    <p>Dob: {{ pet.age }}</p>
    <p>Veličina: {{ pet.size }}</p>
    <button @click="showDetails">Više o ljubimcu</button>
    <button @click="toggleInterested">
      {{ pet.interested ? 'Nije više u interesu' : 'Zainteresiran/a sam' }}
    </button>
    <p>{{ pet.likes }} zainteresirano</p>    
    <div v-for="comment in pet.comments" :key="comment" class="comment">{{ comment }}</div>
    <input type="text" v-model="newComment" placeholder="Dodajte komentar...">
    <button @click="submitComment">Komentiraj</button>
  </div>
</template>

<script>
export default {
  name: "PetCard",
  props: {
    pet: {
      type: Object,
      required: true
    }
  },
  computed: {
    petImage() {
      return require(`@/assets/${this.pet.image}`);
    }
  },
  data() {
    return {
      newComment: ''
    };
  },
  methods: {
    showDetails() {
      this.$router.push({ path: `/pet/${this.pet.id}`, query: { petData: JSON.stringify(this.pet) } });
    },
    toggleInterested() {
      this.$emit('mark-as-interested', this.pet);
    },
    submitComment() {
      if (this.newComment) {
        this.$emit('add-comment', this.pet.id, this.newComment);
        this.newComment = '';
      }
    }
  }
};
</script>


<style scoped>
.pet-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
}
.pet-card img {
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
}

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
.comment {
  background-color: #f0f0f0;
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

input[type="text"] {
  width: calc(100% - 22px);
  margin: 10px 0;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.pet-card img:hover {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
.pet-card button {
  margin-right: 5px;
}


</style>
