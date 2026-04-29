<script setup>
import { useCartStore } from '../store/cart'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const cart = useCartStore()
const router = useRouter()
const loading = ref(false)

const total = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)
)

const payNow = async () => {
  if (loading.value) return  // prevent double-clicks
  loading.value = true

  try {
    const res = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.items })
    })

    const data = await res.json()
    console.log('Stripe response:', data)

    if (!data.url) {
      alert('Stripe session failed — no URL returned')
      return
    }

    window.location.href = data.url

  } catch (err) {
    console.error(err)
    alert('Error connecting to server')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="checkout">
    <h1>Checkout</h1>

    <div class="summary">
      <div class="row" v-for="item in cart.items" :key="item.id">
        <span>{{ item.title }} × {{ item.qty }}</span>
        <span>${{ (item.price * item.qty).toFixed(2) }}</span>
      </div>
    </div>

    <h2>Total: ${{ total }}</h2>

    <button class="pay" @click="payNow" :disabled="loading">
      {{ loading ? 'Redirecting...' : 'Pay with Stripe' }}
    </button>

    <button class="back" @click="router.back()">← Go Back</button>
  </div>
</template>

<style scoped>
.checkout {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

.summary {
  background: #f7f7f7;
  padding: 15px;
  border-radius: 12px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}

.pay {
  width: 100%;
  padding: 12px;
  background: black;
  color: white;
  border: none;
  margin-top: 15px;
  border-radius: 8px;
  cursor: pointer;
}

.pay:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}
</style>