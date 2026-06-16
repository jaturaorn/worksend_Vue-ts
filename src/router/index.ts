import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AppView from "../App.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  //   { path: "/", component: AppView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
