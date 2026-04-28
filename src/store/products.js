import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const BASE = 'https://fakestoreapi.com'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchProducts(category = null) {
    loading.value = true
    error.value = null
    try {
      const url = category
        ? `${BASE}/products/category/${category}`
        : `${BASE}/products`
      const { data } = await axios.get(url)
      products.value = data
    } catch (e) {
      error.value = 'Failed to load products.'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${BASE}/products/categories`)
      categories.value = data
    } catch (e) {
      console.error(e)
    }
  }

  async function fetchProduct(id) {
    const { data } = await axios.get(`${BASE}/products/${id}`)
    return data
  }

  return { products, categories, loading, error, fetchProducts, fetchCategories, fetchProduct }
})