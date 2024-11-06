<script setup>
import { isAuthenticated } from '@/utils/supabase'
import { onMounted, ref } from 'vue'

// Load Variables
const isLoggedIn = ref(false)
const isAdmin = ref(false)

// Get Authentication status and user data from supabase
const getLoggedStatus = async () => {
  const { isAuthenticated: loggedIn, user } = await isAuthenticated();
  isLoggedIn.value = loggedIn;
  isAdmin.value = user?.user_metadata?.is_admin === true; // Check if user is admin
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus();
})
</script>

<template>
    <v-app style="background-color: black; min-height: 100vh;">
      <v-container>
        <v-row>
          <v-col class="mx-auto mt-16 text-center" cols="12" lg="4">
            <h1 class="text-h1 font-weight-black" style="color: aqua;">403</h1>
            <h2 class="text-h2 font-weight-black mb-2" style="color: aqua;">Forbidden</h2>
  
            <p class="text-subtitle-1 font-weight-bold mb-4" style="color: white;">
              You don’t have permission to access this page.
            </p>
  
            <v-btn class="mt-2" style="color: black;" prepend-icon="mdi-home" :to="isAdmin ? '/dashboard' : (isLoggedIn ? '/homepage' : '/Showcasepage')">
              Back to {{ isAdmin ? 'Admin Dashboard' : (isLoggedIn ? 'Homepage' : 'Showcase Page') }}
          </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>

