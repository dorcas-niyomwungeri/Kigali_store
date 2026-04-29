<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')

const auth = useAuthStore()
const router = useRouter()

const login = () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'All fields are required'
    return
  }

  try {
    auth.login(email.value, password.value)

    // ✅ correct property from your store
    if (auth.isLoggedIn) {
      const redirect = router.currentRoute.value.query.redirect || '/checkout'
      router.push(redirect)
    }
  } catch (err) {
    error.value = err.message || 'Login failed'
  }
}
</script>

<template>
  <div class="container">
    <div class="box">
      <h1>Login</h1>

      <p v-if="error" class="error">{{ error }}</p>

      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" @keyup.enter="login" />

      <button @click="login">Login</button>

      <p>No account? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.container { display: flex; justify-content: center; align-items: center; height: 80vh; }
.box { width: 300px; padding: 20px; border: 1px solid #ddd; text-align: center; border-radius: 10px; }
input { width: 100%; margin: 10px 0; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; font-size: 15px; }
button { width: 100%; padding: 10px; background: #1e90ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 15px; }
.error { color: red; font-size: 14px; }
</style>