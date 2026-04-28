<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  if (!name.value || !email.value || !password.value) {
    alert('Fill all fields')
    return
  }

  // fake register (store in localStorage)
  const user = {
    name: name.value,
    email: email.value
  }

  localStorage.setItem('registeredUser', JSON.stringify(user))

  alert('Registered successfully')
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <div class="box">
      <h1>Register</h1>

      <input v-model="name" placeholder="Name" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="register">Register</button>

      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.box {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 10px;
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background: green;
  color: white;
  border: none;
}
</style>