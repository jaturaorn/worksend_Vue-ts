<script setup lang="ts">
import { useCartStore } from "../store/cart";
import { ref, onMounted } from "vue";

const cartStore = useCartStore();
const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
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
        <RouterLink :to="{ name: 'products' }" class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors duration-300 ease-in-out">Shop Collection</RouterLink>
      </div>
    </nav>

    <div :class="['max-w-4xl mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
      
      <div class="mb-12">
        <h1 class="text-4xl font-light tracking-tight mb-2">Your Cart</h1>
        <p class="text-slate-500 font-light">Review your items before checkout.</p>
      </div>

      <div class="bg-white rounded-sm shadow-sm p-8 md:p-12 transition-all duration-300 ease-in-out hover:shadow-md">
        
        <!-- Empty Cart State -->
        <div v-if="cartStore.items.length === 0" class="text-center py-16">
          <p class="text-slate-500 font-light mb-8">Your cart is currently empty.</p>
          <RouterLink :to="{ name: 'products' }" class="inline-block bg-slate-900 text-white px-8 py-4 rounded-sm tracking-wide text-sm font-medium hover:bg-opacity-90 hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
            Continue Shopping
          </RouterLink>
        </div>

        <!-- Cart Items -->
        <div v-else>
          <ul class="divide-y divide-slate-100 border-t border-b border-slate-100 mb-10">
            <li
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex justify-between items-center py-6 group"
            >
              <div class="flex flex-col">
                <h4 class="text-lg font-medium text-slate-900 group-hover:text-slate-600 transition-colors duration-300 ease-in-out">
                  {{ item.name }}
                </h4>
                <p class="text-sm text-slate-500 mt-1">Quantity: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <span class="text-lg text-slate-900">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </li>
          </ul>

          <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div class="w-full md:w-auto">
              <p class="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Estimated Total</p>
              <p class="text-4xl font-light text-slate-900">
                ${{ cartStore.totalPrice.toFixed(2) }}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button
                @click="cartStore.clearCart()"
                class="px-8 py-4 border border-slate-200 text-slate-500 rounded-sm text-sm font-medium hover:text-red-500 hover:border-red-200 transition-all duration-300 ease-in-out"
              >
                Clear Cart
              </button>
              <button
                @click="cartStore.confirmOrder()"
                class="bg-slate-900 text-white px-8 py-4 rounded-sm tracking-wide text-sm font-medium hover:bg-opacity-90 hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped></style>
