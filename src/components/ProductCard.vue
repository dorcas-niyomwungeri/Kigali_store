<template>
  <article class="card" :aria-label="product.title">
    <RouterLink :to="`/products/${product.id}`" class="card-img-wrap">
      <img :src="product.image" :alt="product.title" loading="lazy" />
      <div class="card-overlay">
        <span>View Details</span>
      </div>
    </RouterLink>

    <button
      class="wish-btn"
      :class="{ active: isWished }"
      @click.stop="toggleWish"
      :aria-label="isWished ? 'Remove from wishlist' : 'Add to wishlist'"
      :aria-pressed="isWished"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" :fill="isWished ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>

    <div class="card-body">
      <span class="category-tag">{{ product.category }}</span>
      <RouterLink :to="`/products/${product.id}`">
        <h3 class="card-title">{{ truncate(product.title, 45) }}</h3>
      </RouterLink>
      <div class="card-meta">
        <div class="stars" :aria-label="`Rating: ${product.rating?.rate} out of 5`">
          {{ starString(product.rating?.rate) }}
          <span class="rating-num">{{ product.rating?.rate }}</span>
        </div>
        <span class="review-count">({{ product.rating?.count }})</span>
      </div>
      <div class="card-footer">
        <span class="price">${{ product.price?.toFixed(2) }}</span>
        <button class="btn btn-primary add-btn" @click="addToCart" aria-label="Add to cart">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../store/cart'
import { useWishlistStore } from '../store/wishlist'
import { useToast } from '../composables/useToast'

const props = defineProps({ product: { type: Object, required: true } })
const cart = useCartStore()
const wishlist = useWishlistStore()
const { show } = useToast()

const isWished = computed(() => wishlist.isWished(props.product.id))

function addToCart() {
  cart.add(props.product)
  show(`"${truncate(props.product.title, 30)}" added to cart!`)
}

function toggleWish() {
  wishlist.toggle(props.product)
  show(isWished.value ? 'Removed from wishlist' : 'Added to wishlist!',
    isWished.value ? 'error' : 'success')
}

function truncate(str, len) {
  return str?.length > len ? str.slice(0, len) + '…' : str
}

function starString(rate) {
  const full = Math.round(rate || 0)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}
</script>

<style scoped>
.card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s;
  position: relative;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,165,80,0.12);
  border-color: var(--accent);
}
.card-img-wrap {
  display: block; height: 200px; overflow: hidden;
  background: #fff; position: relative;
}
.card-img-wrap img {
  width: 100%; height: 100%; object-fit: contain;
  padding: 1rem; transition: transform 0.4s ease;
}
.card:hover .card-img-wrap img { transform: scale(1.06); }
.card-overlay {
  position: absolute; inset: 0; background: rgba(0,165,80,0.85);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-family: var(--font-display); font-weight: 700;
  opacity: 0; transition: opacity 0.25s;
}
.card:hover .card-overlay { opacity: 1; }
.wish-btn {
  position: absolute; top: 0.75rem; right: 0.75rem;
  background: rgba(10,10,10,0.8); border: 1px solid var(--border);
  color: var(--text-muted); width: 32px; height: 32px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; z-index: 2;
}
.wish-btn.active { color: #e74c3c; border-color: #e74c3c; }
.wish-btn:hover { background: var(--bg-3); }
.card-body { padding: 1rem; }
.category-tag {
  font-size: 0.7rem; font-weight: 600; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--accent); font-family: var(--font-display);
}
.card-title {
  font-family: var(--font-display); font-size: 0.92rem; font-weight: 600;
  margin: 0.35rem 0 0.5rem; line-height: 1.4;
  color: var(--text); transition: color 0.2s;
}
.card-title:hover { color: var(--accent); }
.card-meta { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.85rem; }
.stars { color: var(--accent-yellow); font-size: 0.78rem; }
.rating-num { color: var(--text-muted); font-size: 0.8rem; margin-left: 2px; }
.review-count { color: var(--text-dim); font-size: 0.78rem; }
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.price { font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--accent); }
.add-btn { padding: 0.5rem 0.9rem; font-size: 0.82rem; }
</style>