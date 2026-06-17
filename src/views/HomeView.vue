<script setup lang="ts">
import { onMounted, ref } from 'vue';

const products = [
  { id: 1, name: 'Minimalist Silver Watch', price: '$249', image: '/watch.png', category: 'Accessories' },
  { id: 2, name: 'Premium Leather Tote', price: '$399', image: '/bag.png', category: 'Bags' },
  { id: 3, name: 'Sleek Over-Ear Headphones', price: '$299', image: '/headphones.png', category: 'Electronics' },
];

const isVisible = ref(false);

onMounted(() => {
  // Trigger fade-in effect on mount
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200">
    <!-- Navbar -->
    <nav class="w-full flex justify-between items-center py-6 px-8 md:px-16 lg:px-24 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 transition-all duration-300 ease-in-out">
      <div class="text-xl font-bold tracking-widest uppercase">Lumina</div>
      <div class="hidden md:flex space-x-8 text-sm font-medium text-slate-500">
        <a href="#" class="hover:text-slate-900 transition-colors duration-300 ease-in-out">Shop</a>
        <a href="#" class="hover:text-slate-900 transition-colors duration-300 ease-in-out">Collections</a>
        <a href="#" class="hover:text-slate-900 transition-colors duration-300 ease-in-out">Our Story</a>
      </div>
      <div class="flex items-center space-x-6">
        <RouterLink :to="{ name: 'login' }" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300 ease-in-out">Log In</RouterLink>
        <button class="text-slate-900 hover:opacity-70 hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </button>
      </div>
    </nav>

    <div :class="['transition-all duration-1000 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
      <!-- Hero Section -->
      <section class="px-8 md:px-16 lg:px-24 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-16">
        <div class="flex-1 space-y-8">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
            Elevate your <br /><span class="font-semibold">Everyday.</span>
          </h1>
          <p class="text-lg text-slate-500 max-w-md font-light leading-relaxed">
            Discover our curated collection of premium essentials designed with purpose and crafted for timeless elegance.
          </p>
          <button class="bg-slate-900 text-white px-8 py-4 rounded-sm tracking-wide text-sm font-medium hover:bg-opacity-90 hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
            Explore Collection
          </button>
        </div>
        <div class="flex-1 w-full relative group cursor-pointer">
          <div class="aspect-[4/5] md:aspect-square overflow-hidden rounded-sm shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-md">
            <img src="/hero.png" alt="Minimalist living space" class="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-all duration-500 ease-in-out" />
          </div>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="px-8 md:px-16 lg:px-24 py-16 md:py-24 bg-white">
        <div class="flex justify-between items-end mb-12">
          <h2 class="text-3xl font-medium tracking-tight">Featured Essentials</h2>
          <a href="#" class="text-sm font-medium text-slate-500 hover:text-slate-900 border-b border-transparent hover:border-slate-900 transition-all duration-300 ease-in-out pb-1">View All</a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <article v-for="product in products" :key="product.id" class="group cursor-pointer">
            <div class="aspect-square mb-6 overflow-hidden bg-slate-50 rounded-sm shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-md">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-500 ease-in-out" />
            </div>
            <div class="space-y-2">
              <p class="text-xs font-medium tracking-wider text-slate-400 uppercase">{{ product.category }}</p>
              <h3 class="text-lg font-medium text-slate-900 group-hover:text-slate-600 transition-colors duration-300 ease-in-out">{{ product.name }}</h3>
              <p class="text-slate-500">{{ product.price }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>

    <!-- Minimal Footer -->
    <footer class="px-8 md:px-16 lg:px-24 py-12 border-t border-slate-200 text-center text-slate-500 text-sm bg-white">
      <p>&copy; 2026 Lumina. Minimalist Essentials.</p>
    </footer>
  </div>
</template>
