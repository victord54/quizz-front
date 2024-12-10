import { createWebHistory, createRouter } from "vue-router";

import HelloWorld from "../pages/HelloWorld.vue";

const routes = [{ path: "/", component: HelloWorld }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
