<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-tag">🇷🇼 Made for Kigali</span>
          <h1 class="hero-title">
            Next-Gen Tech<br/>
            <span class="accent">Delivered Fast</span>
          </h1>
          <p class="hero-desc">
            Smartphones, laptops & accessories at Rwanda's best prices.
            Shop the future, delivered to your door in Kigali.
          </p>
          <div class="hero-actions">
            <RouterLink to="/products" class="btn btn-primary">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </RouterLink>
            <RouterLink to="/products" class="btn btn-ghost">Browse Deals</RouterLink>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>500+</strong><span>Products</span></div>
            <div class="stat"><strong>10K+</strong><span>Customers</span></div>
            <div class="stat"><strong>Free</strong><span>Delivery >$100</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-circle"></div>
          <img src="c:\Users\USER1\Downloads\ttt-removebg-preview.png" alt="Featured product" class="hero-img" />
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Browse <span class="accent">Categories</span></h2>
        <div class="categories-grid">
          <RouterLink
            v-for="cat in displayCategories"
            :key="cat.slug"
            :to="`/products?category=${cat.slug}`"
            class="cat-card"
          >
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-name">{{ cat.name }}</span>
            <span class="cat-arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured <span class="accent">Products</span></h2>
          <RouterLink to="/products" class="btn btn-ghost">View All</RouterLink>
        </div>
        <div v-if="productsStore.loading" class="loading-wrap">
          <div class="spinner"></div>
        </div>
        <div v-else-if="productsStore.error" class="error-msg">{{ productsStore.error }}</div>
        <div v-else class="products-grid">
          <ProductCard
            v-for="product in featured"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Promo Banner -->
    <section class="section">
      <div class="container">
        <div class="promo-banner">
          <div>
            <h3>Free Shipping on Orders Over <span class="accent">$100</span></h3>
            <p>Shop more, save more. All products shipped across Kigali within 24 hours.</p>
          </div>
          <RouterLink to="/products" class="btn btn-primary">Start Shopping</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProductsStore } from '../store/products'
import ProductCard from '../components/ProductCard.vue'

const productsStore = useProductsStore()

const displayCategories = [
  { slug: 'electronics', name: 'Electronics', icon: '💻' },
  { slug: "men's clothing", name: "Men's Fashion", icon: '👕' },
  { slug: "women's clothing", name: "Women's Fashion", icon: '👗' },
  { slug: 'jewelery', name: 'Accessories', icon: '💎' }
]

const featured = computed(() => productsStore.products.slice(0, 8))

onMounted(() => {
  if (!productsStore.products.length) productsStore.fetchProducts()
})
</script>

<style scoped>
.home { padding-bottom: 2rem; }

/* Hero */
.hero {
  position: relative; overflow: hidden;
  background: var(--bg-2); border-bottom: 1px solid var(--border);
  min-height: 85vh; display: flex; align-items: center;
}
.hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 70% 50%, rgba(0,165,80,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.hero-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: center;
  padding-top: 4rem; padding-bottom: 4rem;
}
.hero-tag {
  display: inline-block;
  background: rgba(0,165,80,0.15); color: var(--accent);
  border: 1px solid rgba(0,165,80,0.3);
  padding: 0.3rem 0.9rem; border-radius: 100px;
  font-size: 0.8rem; font-weight: 600; font-family: var(--font-display);
  margin-bottom: 1.5rem;
}
.hero-title {
  font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800; line-height: 1.1; margin-bottom: 1.25rem;
}
.accent { color: var(--accent); }
.hero-desc {
  color: var(--text-muted); font-size: 1.05rem; max-width: 440px;
  line-height: 1.7; margin-bottom: 2rem;
}
.hero-actions { display: flex; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
.hero-stats {
  display: flex; gap: 2rem;
  padding-top: 2rem; border-top: 1px solid var(--border);
}
.stat { display: flex; flex-direction: column; }
.stat strong { font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: var(--accent); }
.stat span { font-size: 0.8rem; color: var(--text-muted); }
.hero-visual {
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.hero-circle {
  width: 380px; height: 380px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,165,80,0.12), rgba(0,165,80,0.03));
  border: 1px solid rgba(0,165,80,0.15);
  position: absolute;
  animation: pulse 4s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
}
.hero-img {
  position: relative; z-index: 1; max-width: 280px;
  filter: drop-shadow(0 20px 40px rgba(0,165,80,0.2));
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Section */
.section { padding: 4rem 0; }
.section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
.section-title { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; margin-bottom: 2rem; }
.section-header .section-title { margin-bottom: 0; }

/* Categories */
.categories-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.cat-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.5rem;
  display: flex; align-items: center; gap: 1rem;
  transition: all 0.25s;
}
.cat-card:hover { border-color: var(--accent); transform: translateY(-3px); background: var(--bg-3); }
.cat-icon { font-size: 1.8rem; }
.cat-name { font-family: var(--font-display); font-weight: 700; flex: 1; font-size: 0.95rem; }
.cat-arrow { color: var(--accent); font-size: 1.1rem; }

/* Loading */
.loading-wrap { display: flex; justify-content: center; padding: 4rem; }
.error-msg { color: var(--rw-red); text-align: center; padding: 2rem; }

/* Promo */
.promo-banner {
  background: linear-gradient(135deg, rgba(0,165,80,0.1), rgba(32,96,61,0.15));
  border: 1px solid rgba(0,165,80,0.25);
  border-radius: var(--radius); padding: 2.5rem;
  display: flex; align-items: center; justify-content: space-between; gap: 2rem;
}
.promo-banner h3 { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem; }
.promo-banner p { color: var(--text-muted); }

@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
  .categories-grid { grid-template-columns: repeat(2, 1fr); }
  .promo-banner { flex-direction: column; text-align: center; }
  .hero { min-height: auto; }
}
</style>