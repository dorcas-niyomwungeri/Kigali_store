<script setup>
import { useCartStore } from '../store/cart'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const cart = useCartStore()
const router = useRouter()
const loading = ref(false)
const error = ref('')

const API_URL = import.meta.env.DEV
  ? 'http://localhost:3000'
  : import.meta.env.VITE_API_URL

const total = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)
)

const payNow = async () => {
  if (loading.value) return
  error.value = ''
  loading.value = true

  try {
    const res = await fetch(`${API_URL}/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.items })
    })

    if (!res.ok) throw new Error('Server error')

    const data = await res.json()

    if (!data.url) {
      throw new Error('Stripe session failed')
    }

    window.location.href = data.url

  } catch (err) {
    console.error(err)
    error.value = 'Failed to connect to payment server'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="checkout">
    <div class="card">
      <h1>Checkout</h1>

      <div v-if="cart.items.length === 0" class="empty">
        Your cart is empty
      </div>

      <div v-else class="summary">
        <div class="row" v-for="item in cart.items" :key="item.id">
          <div class="left">
            <span class="title">{{ item.title }}</span>
            <span class="qty">× {{ item.qty }}</span>
          </div>
          <span class="price">
            ${{ (item.price * item.qty).toFixed(2) }}
          </span>
        </div>
      </div>

      <div class="total">
        <span>Total</span>
        <strong>${{ total.toFixed(2) }}</strong>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button
        class="pay"
        @click="payNow"
        :disabled="loading || cart.items.length === 0"
      >
        {{ loading ? 'Redirecting...' : 'Pay with Stripe' }}
      </button>

      <button class="back" @click="router.back()">
        ← Continue Shopping
      </button>
    </div>
  </div>
</template>

<style scoped>
.checkout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f5f7;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 480px;
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

h1 {
  font-size: 22px;
  margin-bottom: 18px;
}

.summary {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  margin-bottom: 15px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.left {
  display: flex;
  gap: 6px;
}

.title {
  font-weight: 500;
}

.qty {
  color: #777;
}

.price {
  font-weight: 500;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin: 15px 0;
}

.error {
  color: #d93025;
  font-size: 14px;
  margin-bottom: 10px;
}

.pay {
  width: 100%;
  padding: 12px;
  background: #111;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.pay:hover {
  background: #000;
}

.pay:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.back:hover {
  background: #f1f1f1;
}

.empty {
  text-align: center;
  padding: 20px;
  color: #777;
}
</style>