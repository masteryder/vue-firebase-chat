import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/05-pages/Home.vue";
import ChatRoom from "@/components/04-templates/ChatRoom.vue";
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
  {
    path: "/chat/:id",
    name: "Chat",
    component: ChatRoom
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;