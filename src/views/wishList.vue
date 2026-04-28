<script setup>
import { useWishlistStore } from '../store/wishlist'
import { useCartStore } from '../store/cart'

const wishlist = useWishlistStore()
const cart = useCartStore()

const moveToCart = (item) => {
  cart.add(item)
  wishlist.remove(item.id)
}
</script>

<template>
  <div class="container">
    <h1>❤️ Wishlist</h1>

    <div v-if="wishlist.items.length === 0">
      <p>No items in wishlist</p>
    </div>

    <div v-for="item in wishlist.items" :key="item.id" class="item">
      <h3>{{ item.title }}</h3>
      <p>$ {{ item.price }}</p>

      <button @click="moveToCart(item)">
        Move to Cart
      </button>

      <button class="remove" @click="wishlist.remove(item.id)">
        Remove
      </button>
    </div>
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
  margin-right: 10px;
  padding: 5px 10px;
}

.remove {
  background: red;
  color: white;
}
</style>