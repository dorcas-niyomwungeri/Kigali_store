import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref(JSON.parse(localStorage.getItem('kts_wishlist') || '[]'))

  function toggle(product) {
    const idx = items.value.findIndex(i => i.id === product.id)
    if (idx >= 0) items.value.splice(idx, 1)
    else items.value.push(product)
  }

  function isWished(id) {
    return items.value.some(i => i.id === id)
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  watch(items, val => {
    localStorage.setItem('kts_wishlist', JSON.stringify(val))
  }, { deep: true })

  return { items, toggle, isWished, remove }
})