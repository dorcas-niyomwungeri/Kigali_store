<script setup>
import { ref } from 'vue'

const name = ref('User Name')
const email = ref('user@email.com')

const updateProfile = () => {
  alert('Profile updated (fake)')
}
</script>

<template>
  <div class="container">
    <h1>Profile Settings</h1>

    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />

    <button @click="updateProfile">Save Changes</button>
  </div>
</template>

<style>
.container {
  padding: 20px;
  max-width: 400px;
}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}

button {
  padding: 10px;
  background: blue;
  color: white;
}
</style>