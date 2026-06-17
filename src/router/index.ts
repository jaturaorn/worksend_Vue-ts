import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import CartView from "@/views/CartView.vue";
import ProductsView from "@/views/ProductsView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/products/:id",
    name: "product-detail",
    component: ProductDetailView,
    meta: { requiresAuth: true },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Helper function to wait for Firebase auth state initialization
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  
  if (requiresAuth) {
    const user = await getCurrentUser();
    if (!user) {
      // If user is not logged in, redirect to not-found page
      next({ name: "not-found" });
    } else {
      next();
    }
  } else {
    next();
  }
});
