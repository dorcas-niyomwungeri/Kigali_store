import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('kts_cart') || '[]'))

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )
  const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.qty, 0)
  )
  const tax = computed(() => total.value * 0.18)
  const shipping = computed(() => (total.value > 100 ? 0 : 9.99))
  const grandTotal = computed(() => total.value + tax.value + shipping.value)

  function add(product, qty = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ ...product, qty })
    }
  }

  function remove(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQty(id, qty) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      if (qty <= 0) remove(id)
      else item.qty = qty
    }
  }

  function clear() {
    items.value = []
  }

  watch(items, val => {
    localStorage.setItem('kts_cart', JSON.stringify(val))
  }, { deep: true })

  return { items, total, count, tax, shipping, grandTotal, add, remove, updateQty, clear }
})