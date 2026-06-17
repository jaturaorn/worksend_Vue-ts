<script setup lang="ts">
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const phone = ref("");
const name = ref("");
const surname = ref("");
const errorMsg = ref("");

const isVisible = ref(false);
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const handleRegister = async () => {
  if (!name.value) {
    errorMsg.value = "กรุณากรอกชื่อ";
    return;
  }

  if (!surname.value) {
    errorMsg.value = "กรุณากรอกนามสกุล";
    return;
  }

  if (!phone.value) {
    errorMsg.value = "กรุณากรอกเบอร์โทรศัพท์";
    return;
  }

  if (!email.value) {
    errorMsg.value = "กรุณากรอกอีเมลให้ถูกต้อง";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errorMsg.value = "รูปแบบอีเมลไม่ถูกต้อง";
    return;
  }

  if (!password.value) {
    errorMsg.value = "กรุณากรอกรหัสผ่าน";
    return;
  }

  try {
    const register = {
      name: name.value,
      surname: surname.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    };

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      register.email,
      register.password,
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: register.name,
      surname: register.surname,
      phone: register.phone,
      email: register.email,
      password: password.value,
    });

    alert("Registration successful!");
    router.push({ name: "products" });
  } catch (error: any) {
    console.error("Client Exception:", error);
    errorMsg.value = error.message;
  }
  console.log("Register clicked");
};
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-slate-200"
  >
    <!-- Navbar Link -->
    <RouterLink
      :to="{ name: 'home' }"
      class="absolute top-8 left-8 text-xl font-bold tracking-widest uppercase text-slate-900 hover:opacity-70 transition-opacity duration-300"
    >
      Lumina
    </RouterLink>

    <div
      :class="[
        'w-full max-w-lg bg-white p-10 md:p-12 rounded-sm shadow-sm transition-all duration-1000 ease-out transform',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      ]"
    >
      <div class="text-center mb-10">
        <h1 class="text-3xl font-medium text-slate-900 mb-2">Create Account</h1>
        <p class="text-slate-500 font-light">
          Join us to explore premium essentials.
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="space-y-2 text-left flex-1">
            <label for="name" class="block text-sm font-medium text-slate-700"
              >First Name</label
            >
            <input
              type="text"
              id="name"
              v-model="name"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all duration-300 ease-in-out"
              placeholder="John"
            />
          </div>

          <div class="space-y-2 text-left flex-1">
            <label
              for="surname"
              class="block text-sm font-medium text-slate-700"
              >Last Name</label
            >
            <input
              type="text"
              id="surname"
              v-model="surname"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all duration-300 ease-in-out"
              placeholder="Doe"
            />
          </div>
        </div>

        <div class="space-y-2 text-left">
          <label for="phone" class="block text-sm font-medium text-slate-700"
            >Phone Number</label
          >
          <input
            type="tel"
            id="phone"
            v-model="phone"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all duration-300 ease-in-out"
            placeholder="+1 234 567 890"
          />
        </div>

        <div class="space-y-2 text-left">
          <label for="email" class="block text-sm font-medium text-slate-700"
            >Email address</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all duration-300 ease-in-out"
            placeholder="you@example.com"
          />
        </div>

        <div class="space-y-2 text-left">
          <label for="password" class="block text-sm font-medium text-slate-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all duration-300 ease-in-out"
            placeholder="••••••••"
          />
        </div>

        <div
          v-if="errorMsg"
          class="p-3 bg-red-50 text-red-500 text-sm rounded-sm transition-all duration-300 ease-in-out text-left"
        >
          {{ errorMsg }}
        </div>

        <button
          type="submit"
          class="w-full bg-slate-900 text-white py-4 rounded-sm tracking-wide text-sm font-medium hover:bg-opacity-90 hover:scale-[1.02] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out mt-2"
        >
          Create Account
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-slate-500">
          Already have an account?
          <RouterLink
            :to="{ name: 'login' }"
            class="font-medium text-slate-900 border-b border-transparent hover:border-slate-900 transition-all duration-300 ease-in-out pb-0.5"
          >
            Log in
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
