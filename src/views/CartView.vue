<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
    <p class="text-right mb-6 text-xl font-bold text-gray-900">
      Total Price: ${{ cartStore.totalPrice.toFixed(2) }}
    </p>
    <ul class="divide-y divide-gray-200 border-t border-b border-gray-200 mb-6">
      <li
        v-for="item in cartStore.items"
        :key="item.id"
        class="flex justify-between items-center py-4"
      >
        <h4 class="text-gray-700 font-medium">
          {{ item.name }} -
          <span class="font-semibold text-gray-900"
            >${{ item.price.toFixed(2) }}</span
          >
          x {{ item.quantity }}
        </h4>
      </li>
    </ul>
    <div class="flex justify-end gap-4">
      <button
        @click="cartStore.clearCart()"
        class="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded"
      >
        ล้างตะกร้า
      </button>
      <button
        @click="cartStore.confirmOrder()"
        class="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded shadow"
      >
        ยืนยันสั่งซื้อ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../store/cart";

const cartStore = useCartStore();
</script>

<style></style>
