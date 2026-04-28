<template>
  <div class="container">
    <h1>My Orders</h1>

    <div v-if="orders.length === 0">
      <p>No orders yet</p>
    </div>

    <div v-for="order in orders" :key="order.id" class="order">
      <h3>Order #{{ order.id }}</h3>
      <p>Status: {{ order.status }}</p>
      <p>Total: ${{ order.total }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: 1,
    status: 'Delivered',
    total: 120
  },
  {
    id: 2,
    status: 'Processing',
    total: 80
  }
])
</script>

<style>
.container {
  padding: 20px;
}

.order {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
</style>