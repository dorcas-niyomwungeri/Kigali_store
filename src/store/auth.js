import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('kts_user') || 'null'))
  const token = ref(localStorage.getItem('kts_token') || null)

  const isLoggedIn = computed(() => !!token.value)

  function login(email, password) {
    // Mock JWT auth
    if (!email || !password) throw new Error('Invalid credentials')
    const mockUser = {
      id: 1,
      name: email.split('@')[0].replace(/\./g, ' '),
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
    }
    const mockToken = btoa(JSON.stringify({ email, exp: Date.now() + 86400000 }))
    user.value = mockUser
    token.value = mockToken
    localStorage.setItem('kts_user', JSON.stringify(mockUser))
    localStorage.setItem('kts_token', mockToken)
    return mockUser
  }

  function register(name, email, password) {
    if (!name || !email || !password) throw new Error('All fields required')
    const mockUser = {
      id: Date.now(),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
    }
    const mockToken = btoa(JSON.stringify({ email, exp: Date.now() + 86400000 }))
    user.value = mockUser
    token.value = mockToken
    localStorage.setItem('kts_user', JSON.stringify(mockUser))
    localStorage.setItem('kts_token', mockToken)
    return mockUser
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('kts_user')
    localStorage.removeItem('kts_token')
  }

  return { user, token, isLoggedIn, login, register, logout }
})