<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '../store/cart'

const cart = useCartStore()

onMounted(() => {
  cart.clear()
  localStorage.removeItem('kts_last_order')
})
</script>

<template>
  <div class="success">
    <h1>🎉 Payment Successful</h1>
    <p>Thank you for your order!</p>
  </div>
</template>

<style scoped>
.success {
  text-align: center;
  margin-top: 100px;
}
</style>