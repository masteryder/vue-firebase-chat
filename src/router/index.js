import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/05-pages/Home.vue";
import About from "@/components/05-pages/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;