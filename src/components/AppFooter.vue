<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="logo">⚡ Kigali<span class="accent">Tech</span></div>
        <p>Rwanda's premier online store for<br>gadgets & electronics.</p>
        <div class="flag-bar">
          <span style="background:#00A550"></span>
          <span style="background:#FAD201"></span>
          <span style="background:#20603D"></span>
        </div>
      </div>
      <div class="footer-links">
        <h4>Shop</h4>
        <RouterLink to="/products?category=electronics">Electronics</RouterLink>
        <RouterLink to="/products?category=jewelery">Accessories</RouterLink>
        <RouterLink to="/products">All Products</RouterLink>
      </div>
      <div class="footer-links">
        <h4>Account</h4>
        <RouterLink to="/profile/orders">My Orders</RouterLink>
        <RouterLink to="/wishlist">Wishlist</RouterLink>
        <RouterLink to="/cart">Cart</RouterLink>
      </div>
      <div class="footer-links">
        <h4>Help</h4>
        <a href="#">FAQ</a>
        <a href="#">Shipping Info</a>
        <a href="#">Returns</a>
        <a href="#">Contact Us</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ year }} Kigali Tech Store. Built with Vue 3 + Pinia.</p>
      <p>Kigali, Rwanda 🇷🇼</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--bg-2);
  border-top: 1px solid var(--border);
  margin-top: 4rem;
}
.footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding: 3rem 1.5rem;
}
.logo {
  font-family: var(--font-display); font-size: 1.4rem; font-weight: 800;
  margin-bottom: 0.75rem;
}
.accent { color: var(--accent); }
.footer-brand p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; }
.flag-bar {
  display: flex; gap: 4px; margin-top: 1rem;
}
.flag-bar span { width: 24px; height: 6px; border-radius: 3px; }
.footer-links { display: flex; flex-direction: column; gap: 0.6rem; }
.footer-links h4 {
  font-family: var(--font-display); font-weight: 700; font-size: 0.85rem;
  text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted);
  margin-bottom: 0.25rem;
}
.footer-links a { color: var(--text-muted); font-size: 0.9rem; transition: color 0.2s; }
.footer-links a:hover { color: var(--accent); }
.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 1.25rem 1.5rem;
  display: flex; justify-content: space-between; align-items: center;
  color: var(--text-dim); font-size: 0.85rem;
  max-width: 1280px; margin: 0 auto;
}
@media (max-width: 768px) {
  .footer-inner { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .footer-brand { grid-column: 1/-1; }
  .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
}
</style>