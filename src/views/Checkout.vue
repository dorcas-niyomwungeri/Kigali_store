<script setup>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const placeOrder = () => {
  if (cart.items.length === 0) {
    alert('Cart is empty')
    return
  }

  // fake payment success
  cart.items = []

  router.push('/order-success')
}
</script>

<template>
  <div class="container">
    <h1>Checkout</h1>

    <div v-for="item in cart.items" :key="item.id" class="item">
      <p>{{ item.title }}</p>
      <p>{{ item.qty }} x ${{ item.price }}</p>
    </div>

    <h2>Total: ${{ cart.total }}</h2>

    <button @click="placeOrder">Pay Now</button>
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

button {
  margin-top: 20px;
  padding: 10px;
  background: black;
  color: white;
}
</style>