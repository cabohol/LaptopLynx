import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue' 
import RegisterView from '@/views/auth/RegisterView.vue' 
import BookingView from '@/views/auth/BookingView.vue' 
import ProfileView from '@/views/auth/ProfileView.vue' 
import DashboardView from '@/views/auth/DashboardView.vue' 
import ShowcasePageView from '@/views/auth/ShowcasePageView.vue'
import CustomerDashboard from '@/components/system/CustomerDashboard.vue'
import HomepageView from '@/components/system/HomepageView.vue'
import Advertise from '@/views/auth/Advertise.vue'
import ForbiddenView from '@/views/error/ForbiddenView.vue'
import NotFoundView from '@/views/error/NotFoundView.vue'



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
    //appointment
    {
      path: '/booking',
      name: 'booking',
      component: BookingView
    },
    //profile for customer
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    //this is for admin dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    //Homepage of customer
    {
      path: '/customerdashboard',
      name: 'customerdashboard',
      component: CustomerDashboard
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomepageView
    },
    //Intro
    {
      path: '/advertise',
      name: 'advertise',
      component: Advertise
    },

    //ERROR PAGES
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView
    },
    
  ]
})



// router.beforeEach (async (to) => {

//   const isLoggedIn = await isAuthenticated()

//   const isAdmin = userMetadata.is_Admin === true

//   if (to.name === 'showcasepage') {
//     return isLoggedIn ? {name: 'customerdashboard'} : {name: 'login'}
//   }

//   if(isLoggedIn && (to.name === 'login' || to.name === 'register')){
//     return {name : 'board'}
//   }

//   if (isLoggedIn && !isAdmin)
  
// })

export default router
