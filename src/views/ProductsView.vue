<script setup lang="ts">
import { onMounted, ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Product } from "../types/product";

const products = ref<Product[]>([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  products.value = querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Product,
  );
  console.log(products.value);
});
</script>

<template>
  <div>
    <h1>Products</h1>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
    >
      <li
        v-for="product in products"
        :key="product.id"
        class="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
      >
        <div class="p-4">
          <h4 class="text-sm text-gray-500">{{ product.id }}</h4>
          <h5 class="text-lg font-bold text-gray-900">{{ product.name }}</h5>
          <p class="text-xl font-bold text-green-600">
            ${{ product.price.toFixed(2) }}
          </p>
          <p class="text-sm text-gray-500">{{ product.category }}</p>
        </div>
        <img
          :src="product.imageUrl"
          alt="Products Image"
          class="w-full h-48 object-cover"
        />
      </li>
    </ul>
  </div>
</template>

<style></style>
