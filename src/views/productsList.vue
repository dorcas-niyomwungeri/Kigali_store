<template>
  <div class="products-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          {{ activeCategory ? formatCat(activeCategory) : 'All Products' }}
          <span class="count" v-if="!productsStore.loading">({{ filtered.length }})</span>
        </h1>
      </div>

      <div class="layout">
        <!-- Sidebar Filters -->
        <aside class="sidebar" role="complementary" aria-label="Product filters">
          <div class="filter-section">
            <h3>Categories</h3>
            <button
              class="cat-btn"
              :class="{ active: !activeCategory }"
              @click="setCategory(null)"
            >All Products</button>
            <button
              v-for="cat in productsStore.categories"
              :key="cat"
              class="cat-btn"
              :class="{ active: activeCategory === cat }"
              @click="setCategory(cat)"
            >{{ formatCat(cat) }}</button>
          </div>

          <div class="filter-section">
            <h3>Price Range</h3>
            <div class="price-inputs">
              <input v-model.number="minPrice" type="number" placeholder="Min $" min="0" aria-label="Minimum price" />
              <span>—</span>
              <input v-model.number="maxPrice" type="number" placeholder="Max $" aria-label="Maximum price" />
            </div>
          </div>

          <div class="filter-section">
            <h3>Sort By</h3>
            <select v-model="sortBy" aria-label="Sort products">
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <button class="btn btn-ghost reset-btn" @click="resetFilters">Reset Filters</button>
        </aside>

        <!-- Products Grid -->
        <div class="main-content">
          <!-- Search info -->
          <div v-if="searchQuery" class="search-info">
            Results for "<strong>{{ searchQuery }}</strong>"
            <button @click="clearSearch" class="clear-search" aria-label="Clear search">✕</button>
          </div>

          <div v-if="productsStore.loading" class="loading-wrap">
            <div class="spinner"></div>
          </div>
          <div v-else-if="productsStore.error" class="error-msg">{{ productsStore.error }}</div>
          <div v-else-if="!filtered.length" class="empty-state">
            <p>No products found. Try adjusting your filters.</p>
            <button class="btn btn-outline" @click="resetFilters">Reset Filters</button>
          </div>
          <div v-else class="products-grid">
            <ProductCard
              v-for="product in paginated"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="pagination" role="navigation" aria-label="Pagination">
            <button
              v-for="p in totalPages"
              :key="p"
              :class="['page-btn', { active: page === p }]"
              @click="page = p"
              :aria-current="page === p ? 'page' : undefined"
            >{{ p }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../store/products'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const activeCategory = ref(route.query.category || null)
const searchQuery = ref(route.query.search || '')
const minPrice = ref(null)
const maxPrice = ref(null)
const sortBy = ref('')
const page = ref(1)
const perPage = 12

async function setCategory(cat) {
  activeCategory.value = cat
  page.value = 1
  router.replace({ query: { ...route.query, category: cat || undefined } })
  await productsStore.fetchProducts(cat)
}

function clearSearch() {
  searchQuery.value = ''
  router.replace({ query: { ...route.query, search: undefined } })
}

function resetFilters() {
  minPrice.value = null
  maxPrice.value = null
  sortBy.value = ''
  searchQuery.value = ''
  setCategory(null)
}

function formatCat(cat) {
  return cat?.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

const filtered = computed(() => {
  let list = [...productsStore.products]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }
  if (minPrice.value) list = list.filter(p => p.price >= minPrice.value)
  if (maxPrice.value) list = list.filter(p => p.price <= maxPrice.value)
  if (sortBy.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'rating') list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
  if (sortBy.value === 'popular') list.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0))
  return list
})

const totalPages = computed(() => Math.ceil(filtered.value.length / perPage))
const paginated = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

watch(() => route.query, q => {
  if (q.search) searchQuery.value = q.search
  if (q.category !== undefined) activeCategory.value = q.category || null
})

onMounted(async () => {
  if (!productsStore.categories.length) await productsStore.fetchCategories()
  await productsStore.fetchProducts(activeCategory.value)
})
</script>

<style scoped>
.products-page { padding: 2rem 0 4rem; }
.page-header { margin-bottom: 2rem; }
.page-title {
  font-family: var(--font-display); font-size: 2rem; font-weight: 800;
}
.count { color: var(--text-muted); font-size: 1.2rem; font-weight: 400; margin-left: 0.5rem; }

.layout { display: grid; grid-template-columns: 240px 1fr; gap: 2rem; align-items: start; }

.sidebar {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.5rem;
  position: sticky; top: 80px;
}
.filter-section { margin-bottom: 1.75rem; }
.filter-section h3 {
  font-family: var(--font-display); font-size: 0.8rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted);
  margin-bottom: 0.75rem;
}
.cat-btn {
  display: block; width: 100%; text-align: left;
  background: none; border: none; color: var(--text-muted);
  padding: 0.45rem 0.75rem; border-radius: 6px;
  font-size: 0.9rem; font-family: var(--font-body);
  transition: all 0.15s; margin-bottom: 2px;
}
.cat-btn:hover { background: var(--bg-3); color: var(--text); }
.cat-btn.active { background: rgba(0,165,80,0.12); color: var(--accent); font-weight: 600; }
.price-inputs { display: flex; align-items: center; gap: 0.5rem; }
.price-inputs input { padding: 0.5rem; font-size: 0.85rem; }
.price-inputs span { color: var(--text-muted); flex-shrink: 0; }
.reset-btn { width: 100%; justify-content: center; font-size: 0.85rem; }

.loading-wrap { display: flex; justify-content: center; padding: 4rem; }
.error-msg { color: var(--rw-red); text-align: center; padding: 2rem; }
.empty-state { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
.empty-state p { margin-bottom: 1.5rem; }

.search-info {
  background: var(--bg-3); border: 1px solid var(--border);
  padding: 0.75rem 1rem; border-radius: var(--radius-sm);
  margin-bottom: 1.5rem; font-size: 0.9rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.clear-search {
  background: none; border: none; color: var(--text-muted);
  font-size: 0.9rem; margin-left: auto;
}
.clear-search:hover { color: var(--rw-red); }

.pagination {
  display: flex; gap: 0.5rem; justify-content: center;
  margin-top: 2.5rem; flex-wrap: wrap;
}
.page-btn {
  width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-sm); font-family: var(--font-display); font-weight: 600;
  font-size: 0.9rem; color: var(--text-muted); transition: all 0.2s;
}
.page-btn:hover { border-color: var(--accent); color: var(--accent); }
.page-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; }
  .sidebar { position: static; }
}
</style>