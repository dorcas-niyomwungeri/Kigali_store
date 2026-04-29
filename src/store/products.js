import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const BASE = 'https://fakestoreapi.com/'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchProducts(category = null) {
    loading.value = true
    error.value = null

    try {
      const res = await axios.get(`${BASE}/products`)
      let data = res.data

      if (category) {
        data = data.filter(p => p.category === category)
      }

      products.value = data
    } catch (e) {
      console.error(e)
      error.value = 'Failed to load products'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const res = await axios.get(`${BASE}/products`)
      categories.value = [...new Set(res.data.map(p => p.category))]
    } catch (e) {
      console.error(e)
    }
  }

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories
  }
})