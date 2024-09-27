import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue'; 
import PetDetails from './components/PetDetails.vue';
import NotFound from './components/NotFound.vue';

const routes = [
    { path: '/pets', component: HomePage },
    { path: '/', component: HomePage },
    { path: '/pet/:id', component: PetDetails },
    { path: '/:catchAll(.*)', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
