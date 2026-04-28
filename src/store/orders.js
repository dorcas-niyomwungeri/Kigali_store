import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref(JSON.parse(localStorage.getItem('kts_orders') || '[]'))

  function addOrder(items, total, address) {
    const order = {
      id: `KTS-${Date.now()}`,
      date: new Date().toISOString(),
      items: JSON.parse(JSON.stringify(items)),
      total,
      address,
      status: 'Processing'
    }
    orders.value.unshift(order)
    return order
  }

  watch(orders, val => {
    localStorage.setItem('kts_orders', JSON.stringify(val))
  }, { deep: true })

  return { orders, addOrder }
})