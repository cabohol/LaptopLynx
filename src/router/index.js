import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue' 
import RegisterView from '@/views/auth/RegisterView.vue' 
import BookingView from '@/views/auth/BookingView.vue' 
import ProfileView from '@/views/auth/ProfileView.vue' 
import DashboardView from '@/views/auth/DashboardView.vue' 
import ShowcasePageView from '@/views/auth/ShowcasePageView.vue'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/ShowcasePage', // Redirect root path to ShowcasePage
    },
    {
      path: '/ShowcasePage',
      name: 'showcasepage',
      component: ShowcasePageView,
    },
    {
      path: '/LoginView',
      name: 'login',
      component: LoginView
    },
    {
      path: '/RegisterView',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    
  ]
})

export default router
