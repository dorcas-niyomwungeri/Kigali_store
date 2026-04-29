import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('kts_cart') || '[]'))

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )

  function save() {
    localStorage.setItem('kts_cart', JSON.stringify(items.value))
  }

  function add(product) {
    const existing = items.value.find(i => i.id === product.id)

    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }

    save()
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
    save()
  }

  function increaseQty(id) {
    const item = items.value.find(i => i.id === id)
    if (item) item.qty++
    save()
  }

  function decreaseQty(id) {
    const item = items.value.find(i => i.id === id)
    if (item && item.qty > 1) item.qty--
    save()
  }

  function clear() {
    items.value = []
    save()
  }

  return {
    items,
    total,
    add,
    remove,
    increaseQty,
    decreaseQty,
    clear
  }
})