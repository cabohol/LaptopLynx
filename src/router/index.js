import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue' 
import RegisterView from '@/views/auth/RegisterView.vue' 
import BookingView from '@/views/auth/BookingView.vue' 
import ProfileView from '@/views/auth/ProfileView.vue' 
import DashboardView from '@/views/auth/DashboardView.vue' 
import ShowcasePageView from '@/views/auth/ShowcasePageView.vue'
import HomepageView from '@/components/system/HomepageView.vue'
import Advertise from '@/views/auth/Advertise.vue'
import ForbiddenView from '@/views/error/ForbiddenView.vue'
import NotFoundView from '@/views/error/NotFoundView.vue'
import { isAuthenticated} from '@/utils/supabase'
import CustomerProfile from '@/views/auth/CustomerProfile.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/advertise',
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
      path: '/customerprofile',
      name: 'customerprofile',
      component: CustomerProfile
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
    {
      path: '/:pathMatch(.*)*', // This will match any route that doesn't exist
      redirect: '/not-found'
    }
  ]
})

router.beforeEach(async (to) => {
  const { isAuthenticated: isLoggedIn, user } = await isAuthenticated(); // Get both auth status and user data

  //console.log("User logged in:", isLoggedIn);
 // console.log("User metadata:", user?.user_metadata);

  // Handle access to protected routes
  const protectedRoutes = ['dashboard', 'homepage', 'booking', 'profile', 'customerprofile'];

  // If the user is trying to access a protected route and is not logged in
  if (protectedRoutes.includes(to.name) && !isLoggedIn) {
    return { name: 'login' }; // Redirect to login if not logged in
  }

  // Check admin status only if the user is logged in
  const isAdmin = isLoggedIn ? user?.user_metadata?.is_admin === true : false;

  //console.log("Is admin:", isAdmin);

  // Redirect to forbidden if user is not admin and trying to access the dashboard
  if (to.name === 'dashboard' && !isAdmin) {
    return { name: 'forbidden' }; // Redirect to forbidden if user is not admin
  }

  if (to.name === 'profile' && !isAdmin) {
    return { name: 'forbidden' }; // Redirect to forbidden if user is not admin
  }

  // Prevent admins from accessing the customerdashboard
  if (to.name === 'homepage' && isAdmin) {
    return { name: 'dashboard' }; // Redirect admins to the admin dashboard
  }

   // Prevent admins from accessing the customerdashboard
   if (to.name === 'booking' && isAdmin) {
    return { name: 'forbidden' }; // Redirect admins to the admin dashboard
  }
  // Redirect logged-in users away from login/register pages, but allow access to customer dashboard
  if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    return { name: 'homepage' }; // Redirect logged-in users away from login/register
  }

  // Allow access to the customerdashboard if logged in and not admin
  if (isLoggedIn && to.name === 'homepage' && !isAdmin) {
    return true; // Allow access
  }

  // Allow access to other routes
  return true;
});

export default router;
