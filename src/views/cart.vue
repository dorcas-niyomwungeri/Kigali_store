<script setup>
import { useCartStore } from '../store/cart'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const cart = useCartStore()
const router = useRouter()

const total = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)
)

const checkout = () => {
  if (!cart.items.length) return alert('Cart is empty')
  router.push('/checkout')
}
</script>

<template>
  <div class="cart">
    <h1>🛒 Your Cart</h1>

    <div v-if="!cart.items.length" class="empty">
      Your cart is empty
    </div>

    <div v-for="item in cart.items" :key="item.id" class="card">
      <div class="info">
        <h3>{{ item.title }}</h3>
        <p>$ {{ item.price }}</p>
      </div>

      <div class="controls">
        <button @click="cart.decreaseQty(item.id)">-</button>
        <span>{{ item.qty }}</span>
        <button @click="cart.increaseQty(item.id)">+</button>
      </div>

      <button class="remove" @click="cart.remove(item.id)">✕</button>
    </div>

    <div class="footer">
      <h2>Total: ${{ total.toFixed(2) }}</h2>
      <button class="checkout" @click="checkout">
        Checkout →
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

button {
  padding: 6px 10px;
  cursor: pointer;
}

.remove {
  background: red;
  color: white;
  border: none;
  border-radius: 6px;
}

.footer {
  margin-top: 20px;
}

.checkout {
  width: 100%;
  padding: 12px;
  background: black;
  color: white;
  border: none;
  margin-top: 10px;
  border-radius: 8px;
}

.empty {
  text-align: center;
  margin-top: 40px;
}
</style>