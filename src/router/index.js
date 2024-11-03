import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue' 
import RegisterView from '@/views/auth/RegisterView.vue' 
import BookingView from '@/views/auth/BookingView.vue' 
import ProfileView from '@/views/auth/ProfileView.vue' 
import DashboardView from '@/views/auth/DashboardView.vue' 
import ShowcasePageView from '@/views/auth/ShowcasePageView.vue'
import CustomerDashboard from '@/components/system/CustomerDashboard.vue'
import Advertise from '@/views/auth/Advertise.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Advertise',
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
    {
      path: '/customerdashboard',
      name: 'customerdashboard',
      component: CustomerDashboard
    },
    {
      path: '/advertise',
      name: 'advertise',
      component: Advertise
    },
    
  ]
})

export default router
