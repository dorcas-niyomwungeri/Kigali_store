<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2>👤 My Profile</h2>

      <nav>
        <router-link to="/profile/orders">📦 Orders</router-link>
        <router-link to="/profile/settings">⚙️ Settings</router-link>
        <router-link to="/wishlist">❤️ Wishlist</router-link>
      </nav>

      <button class="logout" @click="logout">
        Logout
      </button>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
.layout {
  display: flex;
  min-height: 80vh;
}

/* SIDEBAR */
.sidebar {
  width: 220px;
  background: #111;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  margin-bottom: 20px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 5px;
}

nav a.router-link-active {
  background: #1e90ff;
}

/* LOGOUT BUTTON */
.logout {
  margin-top: auto;
  padding: 10px;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
}

/* CONTENT */
.content {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
}
</style>