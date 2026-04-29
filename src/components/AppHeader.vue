<template>
  <header class="header" :class="{ scrolled }">
    <div class="container header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo" aria-label="Kigali Tech Store Home">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">Kigali<span class="accent">Tech</span></span>
      </RouterLink>

      <!-- Search -->
      <div class="search-wrap" role="search">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search gadgets..."
          aria-label="Search products"
          @keyup.enter="doSearch"
        />
        <button @click="doSearch" aria-label="Submit search" class="search-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
      </div>

      <!-- Nav -->
      <nav class="nav" aria-label="Main navigation">
        <RouterLink to="/products">Shop</RouterLink>
        <RouterLink to="/wishlist" class="nav-icon" aria-label="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span v-if="wishlist.items.length" class="badge">{{ wishlist.items.length }}</span>
        </RouterLink>
        <RouterLink to="/cart" class="nav-icon" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span v-if="cart.count" class="badge">{{ cart.count }}</span>
        </RouterLink>
        <template v-if="auth.isLoggedIn">
          <RouterLink to="/profile" class="user-btn">
            <img :src="auth.user?.avatar" :alt="auth.user?.name" class="avatar" />
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn btn-outline" style="padding:0.5rem 1rem;font-size:0.85rem">Login</RouterLink>
        </template>

        <!-- Mobile menu toggle -->
        <button class="menu-btn" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </nav>
    </div>

    <!-- Mobile nav -->
    <div v-if="menuOpen" class="mobile-menu">
      <RouterLink to="/products" @click="menuOpen=false">Shop All</RouterLink>
      <RouterLink to="/wishlist" @click="menuOpen=false">Wishlist ({{ wishlist.items.length }})</RouterLink>
      <RouterLink to="/cart" @click="menuOpen=false">Cart ({{ cart.count }})</RouterLink>
      <RouterLink v-if="auth.isLoggedIn" to="/profile" @click="menuOpen=false">My Profile</RouterLink>
      <RouterLink v-if="!auth.isLoggedIn" to="/login" @click="menuOpen=false">Login</RouterLink>
      <RouterLink v-if="!auth.isLoggedIn" to="/register" @click="menuOpen=false">Register</RouterLink>
      <a v-if="auth.isLoggedIn" href="#" @click.prevent="doLogout">Logout</a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'
import { useWishlistStore } from '../store/wishlist'
import { useAuthStore } from '../store/auth'


const cart = useCartStore()
const wishlist = useWishlistStore()
const auth = useAuthStore()
const router = useRouter()
const searchQuery = ref('')
const scrolled = ref(false)
const menuOpen = ref(false)

function doSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value.trim() } })
    searchQuery.value = ''
    menuOpen.value = false
  }
}

function doLogout() {
  auth.logout()
  router.push('/')
  menuOpen.value = false
}

function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
  height: 100px;
}
.header.scrolled { border-bottom-color: var(--border); }
.header-inner {
  display: flex; align-items: center; gap: 1.5rem;
  padding-top: 0.85rem; padding-bottom: 0.85rem;
}
.logo {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-display); font-size: 1.3rem; font-weight: 800;
  flex-shrink: 0;
  
}
.logo-icon { font-size: 1.4rem; }
.accent { color: var(--accent); }

.search-wrap {
  flex: 1; max-width: 400px; display: flex;
  background: var(--bg-3); border: 1px solid var(--border-light);
  border-radius: 8px; overflow: hidden;
}
.search-wrap input {
  border: none; background: transparent; padding: 0.55rem 1rem;
  font-size: 0.9rem; flex: 1;
}
.search-btn {
  background: var(--accent); border: none; padding: 0 1rem;
  color: #fff; display: flex; align-items: center;
  transition: background 0.2s;
}
.search-btn:hover { background: var(--accent-dark); }

.nav {
  display: flex;gap: 1.25rem; margin-left: auto;
}
.nav a { font-size: 0.9rem; color: var(--text-muted); transition: color 0.2s; }
.nav a:hover, .nav a.router-link-active { color: var(--text); }
.nav-icon { position: relative; display: flex; align-items: center; }
.avatar { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--accent); }
.user-btn { display: flex; align-items: center; }

.menu-btn {
  display: none; flex-direction: column; gap: 4px;
  background: none; border: none; padding: 4px;
}
.menu-btn span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; }

.mobile-menu {
  display: flex; flex-direction: column;
  background: var(--bg-2); border-top: 1px solid var(--border);
  padding: 1rem 1.5rem;
}
.mobile-menu a {
  padding: 0.75rem 0; border-bottom: 1px solid var(--border);
  color: var(--text-muted); font-size: 1rem;
}
.mobile-menu a:last-child { border-bottom: none; }
.mobile-menu a:hover { color: var(--accent); }

@media (max-width: 768px) {
  .search-wrap { display: none; }
  .nav > a:not(.nav-icon):not(.user-btn):not(.btn) { display: none; }
  .menu-btn { display: flex; }
}
</style>