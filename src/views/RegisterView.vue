<script setup lang="ts">
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const phone = ref("");
const name = ref("");
const surname = ref("");
const errorMsg = ref("");

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
    });

    alert("Registration successful!");
  } catch (error: any) {
    console.error("Client Exception:", error);
    errorMsg.value = error.message;
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
