<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCartStore } from '../store/cart';
import type { Product } from '../types/product';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const isLoading = ref(true);
const isVisible = ref(false);
const quantity = ref(1);

onMounted(async () => {
  const productId = route.params.id as string;
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      product.value = { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
      console.log('No such product!');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  } finally {
    isLoading.value = false;
    setTimeout(() => {
      isVisible.value = true;
    }, 100);
  }
});

const addToCart = () => {
  if (product.value) {
    // Cart store only adds 1 by default, so we loop for the selected quantity
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addItem({
        id: product.value.id,
        name: product.value.name,
        price: Number(product.value.price)
      });
    }
    alert('Added to cart successfully!');
    router.push({ name: 'cart' });
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-200">
    <!-- Navbar -->
    <nav class="w-full flex justify-between items-center py-6 px-8 md:px-16 lg:px-24 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 transition-all duration-300 ease-in-out">
      <RouterLink :to="{ name: 'home' }" class="text-xl font-bold tracking-widest uppercase text-slate-900 hover:opacity-70 transition-opacity duration-300">
        Lumina
      </RouterLink>
      <div class="flex items-center space-x-6">
        <RouterLink :to="{ name: 'products' }" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300 ease-in-out">Shop Collection</RouterLink>
        <RouterLink :to="{ name: 'cart' }" class="text-slate-900 hover:opacity-70 hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </RouterLink>
      </div>
    </nav>

    <div :class="['max-w-6xl mx-auto px-6 py-12 md:py-20 transition-all duration-1000 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
      
      <!-- Back Link -->
      <div class="mb-10">
        <RouterLink :to="{ name: 'products' }" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300 ease-in-out inline-flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Collection
        </RouterLink>
      </div>

      <div v-if="isLoading" class="text-center py-32 text-slate-500 font-light">
        <p>Loading product details...</p>
      </div>

      <div v-else-if="!product" class="text-center py-32 text-slate-500 font-light">
        <p>Product not found.</p>
        <RouterLink :to="{ name: 'products' }" class="inline-block mt-6 border-b border-slate-900 text-slate-900 pb-0.5">
          Return to Shop
        </RouterLink>
      </div>

      <div v-else class="flex flex-col md:flex-row gap-12 lg:gap-24 items-center md:items-stretch">
        <!-- Product Image -->
        <div class="w-full md:w-1/2">
          <div class="aspect-4/5 overflow-hidden bg-white rounded-sm shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
            <img
              :src="product.imageUrl || '/watch.png'"
              :alt="product.name"
              class="w-full h-full object-cover mix-blend-multiply"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="w-full md:w-1/2 flex flex-col justify-center py-8">
          <p class="text-xs font-medium tracking-widest text-slate-400 uppercase mb-4">{{ product.category || 'Essential' }}</p>
          <h1 class="text-4xl md:text-5xl font-light text-slate-900 mb-6 leading-tight">{{ product.name }}</h1>
          <p class="text-2xl font-light text-slate-900 mb-8">${{ product.price ? Number(product.price).toFixed(2) : '0.00' }}</p>
          
          <div class="prose prose-slate font-light text-slate-500 mb-12 leading-relaxed">
            <p>
              Experience the perfect blend of form and function. Designed with meticulous attention to detail, 
              this piece embodies our commitment to premium craftsmanship and minimalist aesthetics. Perfect for elevating your everyday style.
            </p>
          </div>

          <!-- Add to Cart Form -->
          <div class="flex flex-col sm:flex-row gap-6 mt-auto">
            <div class="flex items-center justify-between border border-slate-200 rounded-sm px-2 sm:w-1/3">
              <button @click="quantity > 1 && quantity--" class="px-4 py-4 text-slate-400 hover:text-slate-900 transition-colors duration-300 ease-in-out text-lg">-</button>
              <input type="number" v-model="quantity" min="1" class="w-12 text-center bg-transparent border-none focus:ring-0 text-slate-900 font-medium" />
              <button @click="quantity++" class="px-4 py-4 text-slate-400 hover:text-slate-900 transition-colors duration-300 ease-in-out text-lg">+</button>
            </div>

            <button 
              @click="addToCart"
              class="flex-1 bg-slate-900 text-white px-8 py-4 rounded-sm tracking-wide text-sm font-medium hover:bg-opacity-90 hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
