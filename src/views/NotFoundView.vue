<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-2xl text-gray-600 mb-8">Page Not Found</p>
    <RouterLink :to="{ name: 'home' }" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      Go back Home
    </RouterLink>
  </div>
</template>
