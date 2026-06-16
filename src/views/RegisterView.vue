<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errorMsg = ref("");

const handleRegister = () => {
  console.log("Register clicked");
};
</script>

<template>
  <form @submit.prevent="handleRegister">
    <div>
      <label for="email">Email address</label>
      <input type="email" id="email" v-model="email" />
    </div>

    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
    </div>

    <div>
      <Button>Register</Button>
    </div>
  </form>
</template>

<style scoped></style>
