<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errorMsg = ref("");

const handleLogin = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    errorMsg.value = "กรุณากรอกอีเมลให้ถูกต้อง";
    return;
  }

  if (!emailRegex.test(email.value)) {
    errorMsg.value = "รูปแบบอีเมลไม่ถูกต้อง";
    return;
  }

  if (!password.value) {
    errorMsg.value = "กรุณากรอกรหัสผ่าน";
    return;
  }

  if (password.value.length < 6) {
    errorMsg.value = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    return;
  }

  console.log("Login clicked");
};
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">Email address</label>
      <input type="email" id="email" v-model="email" />
    </div>

    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <div>
      <Button>Login</Button>
    </div>
  </form>
</template>

<style scoped></style>
