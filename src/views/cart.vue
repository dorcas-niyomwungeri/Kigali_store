<script setup>
import { useCartStore } from '../store/cart'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const total = computed(() => cart.items.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
))

const goCheckout = () => {
  if (cart.items.length === 0) {
    alert('Cart is empty')
    return
  }
  router.push('/checkout')
}
</script>

<template>
  <div class="container">
    <h1>🛒 My Cart</h1>

    <div v-if="cart.items.length === 0">
      <p>Your cart is empty</p>
    </div>

    <div v-for="item in cart.items" :key="item.id" class="item">
      <h3>{{ item.title }}</h3>
      <p>$ {{ item.price }}</p>

      <div class="actions">
        <button @click="cart.decreaseQty(item.id)">-</button>
        <span>{{ item.qty }}</span>
        <button @click="cart.increaseQty(item.id)">+</button>
      </div>

      <button class="remove" @click="cart.remove(item.id)">
        Remove
      </button>
    </div>

    <hr />

    <h2>Total: ${{ total }}</h2>

    <button class="checkout" @click="goCheckout">
      Proceed to Checkout
    </button>
  </div>
</template>

<style>
.container {
  padding: 20px;
}

.item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

button {
  padding: 5px 10px;
}

.remove {
  background: red;
  color: white;
  margin-top: 5px;
}

.checkout {
  margin-top: 20px;
  padding: 10px;
  background: black;
  color: white;
}
</style>