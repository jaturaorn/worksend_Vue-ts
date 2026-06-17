<script setup lang="ts">
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const isVisible = ref(false);
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const handleLogin = async () => {
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

  try {
    // Clear any previous error message
    errorMsg.value = "";
    const res = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value,
    );

    alert("Login successful!");
    router.push({ name: 'products' });
  } catch (error: any) {
    console.error("Error clearing error message:", error);
    errorMsg.value = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
  }

  console.log("Login clicked");
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-slate-200">
    <!-- Navbar Link (Optional, for easy navigation back) -->
    <RouterLink :to="{ name: 'home' }" class="absolute top-8 left-8 text-xl font-bold tracking-widest uppercase text-slate-900 hover:opacity-70 transition-opacity duration-300">
      Lumina
    </RouterLink>

    <div :class="['w-full max-w-md bg-white p-10 md:p-12 rounded-sm shadow-sm transition-all duration-1000 ease-out transform', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
      
      <div class="text-center mb-10">
        <h1 class="text-3xl font-medium text-slate-900 mb-2">Welcome Back</h1>
        <p class="text-slate-500 font-light">Please enter your details to sign in.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2 text-left">
          <label for="email" class="block text-sm font-medium text-slate-700">Email address</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all duration-300 ease-in-out"
            placeholder="you@example.com"
          />
        </div>

        <div class="space-y-2 text-left">
          <label for="password" class="block text-sm font-medium text-slate-700">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all duration-300 ease-in-out"
            placeholder="••••••••"
          />
        </div>

        <div v-if="errorMsg" class="p-3 bg-red-50 text-red-500 text-sm rounded-sm transition-all duration-300 ease-in-out text-left">
          {{ errorMsg }}
        </div>

        <button 
          type="submit" 
          class="w-full bg-slate-900 text-white py-4 rounded-sm tracking-wide text-sm font-medium hover:bg-opacity-90 hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out mt-2"
        >
          Sign In
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-slate-500">
          Don't have an account? 
          <RouterLink :to="{ name: 'register' }" class="font-medium text-slate-900 border-b border-transparent hover:border-slate-900 transition-all duration-300 ease-in-out pb-0.5">
            Register
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
