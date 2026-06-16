<script setup lang="ts">
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const phone = ref("");
const name = ref("");
const surname = ref("");
const errorMsg = ref("");

const handleRegister = async () => {
  try {
    const register = {
      name: "",
      surname: "",
      phone: "",
      email: email.value,
      password: password.value,
    };

    const res = await createUserWithEmailAndPassword(
      auth,
      register.email,
      register.password,
    );
  } catch (error) {
    console.error("Client Exception:", error);
  }
  console.log("Register clicked");
};
</script>

<template>
  <form class="w-full flex flex-col gap-3.5" @submit.prevent="handleRegister">
    <div class="flex gap-2">
      <div>
        <label for="name" class="w-20">Name:</label>
        <input
          id="name"
          type="text"
          v-model="name"
          class="flex-1 border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div>
        <label for="surname" class="w-20">Surname:</label>
        <input
          id="surname"
          type="text"
          v-model="surname"
          class="flex-1 border border-gray-300 rounded px-2 py-1"
        />
      </div>
    </div>
    <div>
      <label for="phone" class="w-20">PhoneNumber:</label>
      <input
        id="phone"
        type="tel"
        v-model="phone"
        class="flex-1 border border-gray-300 rounded px-2 py-1"
      />
    </div>
    <div>
      <label for="email" class="w-20">Email:</label>
      <input
        id="email"
        type="email"
        v-model="email"
        class="flex-1 border border-gray-300 rounded px-2 py-1"
      />
    </div>
    <div>
      <label for="password" class="w-20">Password:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        class="flex-1 border border-gray-300 rounded px-2 py-1"
      />
    </div>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <div>
      <Button>Register</Button>
    </div>
  </form>
</template>

<style scoped></style>
