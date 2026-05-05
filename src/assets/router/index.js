import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/products',
    component: () => import('@/views/ProductsLayout.vue'),
    children: [
      { path: '', component: () => import('@/views/productsList.vue') },
      { path: ':id', name: 'ProductsDetail', component: () => import('@/views/ProductsDetail.vue'), props: true }
    ]
  },
  {
    path: '/cart',
    component: () => import('@/views/cart.vue')
  },
  {
    path: '/wishlist',
    component: () => import('@/views/Wishlist.vue')
  },
  {
    path: '/checkout',
    component: () => import('@/views/Checkout.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (!auth.isLoggedIn) next('/login?redirect=/checkout')
      else next()
    }
  },
  {
    path: '/order-success',
    component: () => import('@/views/OrderSuccess.vue')
  },
  {
    path: '/profile',
    component: () => import('@/views/ProfileLayout.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (!auth.isLoggedIn) next('/login?redirect=/profile')
      else next()
    },
    children: [
      { path: '', redirect: '/profile/orders' },
      { path: 'orders', component: () => import('@/views/ProfileOrders.vue') },
      { path: 'wishlist', component: () => import('@/views/Wishlist.vue') },
      { path: 'settings', component: () => import('@/views/ProfileSettings.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

export default router