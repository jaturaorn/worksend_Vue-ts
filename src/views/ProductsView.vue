<script setup lang="ts">
import { onMounted, ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Product } from "../types/product";

const products = ref<Product[]>([]);
const isVisible = ref(false);

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    products.value = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Product,
    );
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
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-200">
    <!-- Navbar -->
    <nav class="w-full flex justify-between items-center py-6 px-8 md:px-16 lg:px-24 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 transition-all duration-300 ease-in-out">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold tracking-widest uppercase text-slate-900 hover:opacity-70 transition-opacity duration-300">
        Lumina
      </RouterLink>
      <div class="flex items-center space-x-6">
        <RouterLink :to="{ name: 'cart' }" class="text-slate-900 hover:opacity-70 hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </RouterLink>
      </div>
    </nav>

    <div :class="['px-8 md:px-16 lg:px-24 py-16 md:py-24 transition-all duration-1000 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
      
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-light tracking-tight mb-4">Our Collection</h1>
        <p class="text-lg text-slate-500 font-light max-w-2xl">
          Explore our complete range of premium essentials, crafted with care and designed for modern living.
        </p>
      </div>

      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        <li
          v-for="product in products"
          :key="product.id"
          class="group cursor-pointer flex flex-col"
        >
          <!-- Make the image container click through to the detail view -->
          <RouterLink :to="{ name: 'product-detail', params: { id: product.id } }" class="aspect-[4/5] mb-6 overflow-hidden bg-white rounded-sm shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-md">
            <img
              :src="product.imageUrl || '/watch.png'"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-500 ease-in-out"
            />
          </RouterLink>
          <div class="space-y-2 flex-grow">
            <p class="text-xs font-medium tracking-wider text-slate-400 uppercase">{{ product.category || 'Essential' }}</p>
            <h3 class="text-lg font-medium text-slate-900 group-hover:text-slate-600 transition-colors duration-300 ease-in-out line-clamp-1">
              <RouterLink :to="{ name: 'product-detail', params: { id: product.id } }">
                {{ product.name }}
              </RouterLink>
            </h3>
            <p class="text-slate-500">${{ product.price ? Number(product.price).toFixed(2) : '0.00' }}</p>
          </div>
        </li>
      </ul>

      <!-- Empty state / Loading indicator -->
      <div v-if="products.length === 0" class="text-center py-20 text-slate-500 font-light">
        <p>Loading collection...</p>
      </div>

    </div>
  </div>
</template>

<style scoped></style>
