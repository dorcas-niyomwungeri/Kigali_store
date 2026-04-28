<template>
  <div class="detail-page">
    <div class="container">
      <RouterLink to="/products" class="back-link">
        ← Back to Products
      </RouterLink>

      <div v-if="loading" class="loading-wrap"><div class="spinner"></div></div>
      <div v-else-if="error" class="error-msg">{{ error }}</div>

      <div v-else-if="product" class="detail-grid">
        <!-- Image -->
        <div class="img-wrap">
          <img :src="product.image" :alt="product.title" />
        </div>

        <!-- Info -->
        <div class="info">
          <span class="category-tag">{{ product.category }}</span>
          <h1 class="product-title">{{ product.title }}</h1>

          <div class="rating-row">
            <span class="stars">{{ starString(product.rating?.rate) }}</span>
            <span class="rating-num">{{ product.rating?.rate }}/5</span>
            <span class="review-count">({{ product.rating?.count }} reviews)</span>
          </div>

          <div class="price-row">
            <span class="price">${{ product.price?.toFixed(2) }}</span>
            <span class="price-rwf">≈ RWF {{ (product.price * 1250).toLocaleString() }}</span>
          </div>

          <p class="description">{{ product.description }}</p>

          <div class="qty-row">
            <label>Quantity</label>
            <div class="qty-control">
              <button @click="qty > 1 && qty--" aria-label="Decrease quantity">−</button>
              <span>{{ qty }}</span>
              <button @click="qty++" aria-label="Increase quantity">+</button>
            </div>
          </div>

          <div class="action-row">
            <button class="btn btn-primary add-cart" @click="addToCart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Add to Cart
            </button>
            <button
              class="btn wish-toggle"
              :class="isWished ? 'btn-outline' : 'btn-ghost'"
              @click="toggleWish"
              :aria-pressed="isWished"
              :aria-label="isWished ? 'Remove from wishlist' : 'Add to wishlist'"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" :fill="isWished ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {{ isWished ? 'Wishlisted' : 'Wishlist' }}
            </button>
          </div>

          <div class="checkout-now">
            <RouterLink to="/cart" class="btn btn-ghost" style="width:100%;justify-content:center">View Cart & Checkout</RouterLink>
          </div>

          <!-- Features -->
          <div class="features">
            <div class="feature"><span>🚚</span> Free delivery over $100</div>
            <div class="feature"><span>🔄</span> 30-day easy returns</div>
            <div class="feature"><span>🔒</span> Secure Stripe payment</div>
            <div class="feature"><span>📦</span> Ships within Kigali in 24h</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'
import { useWishlistStore } from '../store/wishlist'
import { useToast } from '../composables/useToast'

const props = defineProps({ id: { type: String, required: true } })
const productsStore = useProductsStore()
const cart = useCartStore()
const wishlist = useWishlistStore()
const { show } = useToast()

const product = ref(null)
const loading = ref(true)
const error = ref(null)
const qty = ref(1)

const isWished = computed(() => product.value && wishlist.isWished(product.value.id))

function addToCart() {
  cart.add(product.value, qty.value)
  show(`Added ${qty.value}x to cart!`)
}

function toggleWish() {
  wishlist.toggle(product.value)
  show(isWished.value ? 'Added to wishlist!' : 'Removed from wishlist')
}

function starString(rate) {
  const full = Math.round(rate || 0)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

onMounted(async () => {
  try {
    product.value = await productsStore.fetchProduct(props.id)
  } catch {
    error.value = 'Product not found.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.detail-page { padding: 2rem 0 4rem; }
.back-link {
  display: inline-flex; align-items: center; gap: 0.4rem;
  color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;
  transition: color 0.2s;
}
.back-link:hover { color: var(--accent); }
.loading-wrap { display: flex; justify-content: center; padding: 4rem; }
.error-msg { color: var(--rw-red); text-align: center; padding: 2rem; }
.detail-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 4rem; align-items: start;
}
.img-wrap {
  background: #fff; border-radius: var(--radius);
  border: 1px solid var(--border); padding: 2rem;
  display: flex; align-items: center; justify-content: center;
  min-height: 420px; position: sticky; top: 90px;
}
.img-wrap img { max-height: 360px; object-fit: contain; }
.category-tag {
  font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--accent); font-family: var(--font-display);
}
.product-title {
  font-family: var(--font-display); font-size: 1.7rem; font-weight: 800;
  line-height: 1.25; margin: 0.75rem 0 1rem;
}
.rating-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; }
.stars { color: var(--accent-yellow); }
.rating-num { font-weight: 600; }
.review-count { color: var(--text-muted); font-size: 0.9rem; }
.price-row { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.5rem; }
.price { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--accent); }
.price-rwf { color: var(--text-muted); font-size: 0.9rem; }
.description { color: var(--text-muted); line-height: 1.8; margin-bottom: 1.75rem; }
.qty-row { margin-bottom: 1.5rem; }
.qty-row label { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 0.5rem; }
.qty-control {
  display: inline-flex; align-items: center;
  background: var(--bg-3); border: 1px solid var(--border-light);
  border-radius: var(--radius-sm); overflow: hidden;
}
.qty-control button {
  background: none; border: none; color: var(--text);
  width: 38px; height: 38px; font-size: 1.1rem; font-weight: 600;
  transition: background 0.2s;
}
.qty-control button:hover { background: var(--bg-2); }
.qty-control span { padding: 0 1rem; font-family: var(--font-display); font-weight: 700; }
.action-row { display: flex; gap: 1rem; margin-bottom: 1rem; }
.add-cart { flex: 1; justify-content: center; }
.wish-toggle { color: #e74c3c; border-color: #e74c3c; }
.wish-toggle:hover { background: rgba(231,76,60,0.1); }
.checkout-now { margin-bottom: 1.75rem; }
.features {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 0.65rem; padding: 1.25rem;
  background: var(--bg-3); border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}
.feature { font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; }
@media (max-width: 900px) {
  .detail-grid { grid-template-columns: 1fr; }
  .img-wrap { position: static; }
}
</style>