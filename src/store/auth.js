import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('kts_user') || 'null'))
  const token = ref(localStorage.getItem('kts_token') || null)

  const isLoggedIn = computed(() => {
    if (!token.value) return false

    try {
      const data = JSON.parse(atob(token.value))
      if (Date.now() > data.exp) {
        logout()
        return false
      }
      return true
    } catch {
      return false
    }
  })

  const isAuthenticated = isLoggedIn

  function login(email, password) {
    if (!email || !password) throw new Error('Invalid credentials')

    const mockUser = {
      id: 1,
      name: email.split('@')[0],
      email
    }

    const mockToken = btoa(JSON.stringify({
      email,
      exp: Date.now() + 86400000
    }))

    user.value = mockUser
    token.value = mockToken

    localStorage.setItem('kts_user', JSON.stringify(mockUser))
    localStorage.setItem('kts_token', mockToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.clear()
  }

  return {
    user,
    token,
    isLoggedIn,
    isAuthenticated,
    login,
    logout
  }
})