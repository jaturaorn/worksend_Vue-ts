<script setup lang="ts">
import { onMounted, ref } from "vue";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import type { Product } from "../types/product";

const products = ref<Product[]>([]);
const isVisible = ref(false);
const isLoggedIn = ref(false);

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

onMounted(async () => {
  // Listen to auth state changes
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products.value = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }) as Product)
      .slice(0, 3); // Featured products: show only the first 3
    console.log(products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    // Trigger fade-in effect after fetching
    setTimeout(() => {
      isVisible.value = true;
    }, 100);
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200"
  >
    <!-- Navbar -->
    <nav
      class="w-full flex justify-between items-center py-6 px-8 md:px-16 lg:px-24 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 transition-all duration-300 ease-in-out"
    >
      <div class="text-xl font-bold tracking-widest uppercase">Lumina</div>
      <div class="hidden md:flex space-x-8 text-sm font-medium text-slate-500">
        <RouterLink
          :to="isLoggedIn ? { name: 'products' } : { name: 'login' }"
          class="hover:text-slate-900 transition-colors duration-300 ease-in-out"
          >Shop</RouterLink
        >
      </div>
      <div class="flex items-center space-x-6">
        <template v-if="isLoggedIn">
          <!-- Profile Pic and Logout -->
          <button
            @click="handleLogout"
            class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300 ease-in-out"
          >
            Logout
          </button>
          <div
            class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300 shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <svg
              class="w-5 h-5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
        </template>
        <template v-else>
          <RouterLink
            :to="{ name: 'login' }"
            class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300 ease-in-out"
            >Log In</RouterLink
          >
        </template>

        <RouterLink
          :to="isLoggedIn ? { name: 'cart' } : { name: 'login' }"
          class="text-slate-900 hover:opacity-70 hover:scale-[1.02] transition-all duration-300 ease-in-out"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </RouterLink>
      </div>
    </nav>

    <div
      :class="[
        'transition-all duration-1000 ease-out transform',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      ]"
    >
      <!-- Hero Section -->
      <section
        class="px-8 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-16"
      >
        <div class="flex-1 space-y-8">
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight"
          >
            Elevate your <br /><span class="font-semibold">Everyday.</span>
          </h1>
          <p class="text-lg text-slate-500 max-w-md font-light leading-relaxed">
            Discover our curated collection of premium essentials designed with
            purpose and crafted for timeless elegance.
          </p>
          <RouterLink
            :to="isLoggedIn ? { name: 'products' } : { name: 'login' }"
            class="inline-block bg-slate-900 text-white px-8 py-4 rounded-sm tracking-wide text-sm font-medium hover:bg-opacity-90 hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
          >
            Explore Collection
          </RouterLink>
        </div>
        <div class="flex-1 w-full relative group cursor-pointer">
          <div
            class="aspect-4/5 md:aspect-square overflow-hidden rounded-sm shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-md"
          >
            <img
              src="/hero.png"
              alt="Minimalist living space"
              class="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-all duration-500 ease-in-out"
            />
          </div>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="px-8 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
        <div class="flex justify-between items-end mb-12">
          <h2 class="text-3xl font-medium tracking-tight">
            Featured Essentials
          </h2>
          <RouterLink
            :to="isLoggedIn ? { name: 'products' } : { name: 'login' }"
            class="text-sm font-medium text-slate-500 hover:text-slate-900 border-b border-transparent hover:border-slate-900 transition-all duration-300 ease-in-out pb-1"
            >View All</RouterLink
          >
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <article
            v-for="product in products"
            :key="product.id"
            class="group cursor-pointer"
          >
            <RouterLink
              :to="isLoggedIn ? { name: 'product-detail', params: { id: product.id } } : { name: 'login' }"
            >
              <div
                class="aspect-square mb-6 overflow-hidden bg-slate-50 rounded-sm shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-md"
              >
                <img
                  :src="product.imageUrl || '/watch.png'"
                  :alt="product.name"
                  class="w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-500 ease-in-out"
                />
              </div>
              <div class="space-y-2">
                <p
                  class="text-xs font-medium tracking-wider text-slate-400 uppercase"
                >
                  {{ product.category || "Essential" }}
                </p>
                <h3
                  class="text-lg font-medium text-slate-900 group-hover:text-slate-600 transition-colors duration-300 ease-in-out line-clamp-1"
                >
                  {{ product.name }}
                </h3>
                <p class="text-slate-500">
                  ${{
                    product.price ? Number(product.price).toFixed(2) : "0.00"
                  }}
                </p>
              </div>
            </RouterLink>
          </article>
        </div>
      </section>
    </div>

    <!-- Minimal Footer -->
    <footer
      class="px-8 md:px-16 lg:px-24 py-12 border-t border-slate-200 text-center text-slate-500 text-sm bg-white"
    >
      <p>&copy; 2026 Lumina. Minimalist Essentials.</p>
    </footer>
  </div>
</template>
