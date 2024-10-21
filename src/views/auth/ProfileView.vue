<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar elevation="3" >
    
      <v-app-bar-nav-icon style="color:#66FCF1;" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <img src="/src/images/logo1.png" width="50" alt="Logo" class="logo" />
        <v-toolbar-title class="ml-2">
          <h3 style="color: #66FCF1;">LaptopLynx</h3>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleNotifications">
      <v-icon style="color: #66FCF1;">mdi-bell</v-icon>
    </v-btn>

    <!-- Notification Dropdown / Modal -->
    <v-menu
      v-model="isNotificationOpen"
      offset-y
      left  
      min-width="250px" 
      >
      <v-list>
        <v-list-item v-for="(message, index) in messages" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ message.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ message.body }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>


    
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app permanent elevation="3">
      <v-list>
        <br />
        <v-list-item :prepend-avatar="admin.avatar" :subtitle="admin.email" :title="admin.fullname"></v-list-item>
      </v-list>
      <v-divider style="color: bisque;"></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{ name: 'dashboard' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'profile' }"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Log out" value="starred"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Container -->
    <v-container
  fluid
  class="pa-6"
  :class="{'container-content-shift': drawer}" 
  style="background-color: #0B0C10; height: 100vh;"
>      <br>
      <br>
      <br>
      <br>
      <v-row justify="center"  >
        <!-- Profile Picture and Basic Info Section -->
        <v-col cols="12" md="5">
          <v-card class="pa-8 text-center" elevation="2" style="height: auto;background-color: #1F2833;">
            <v-avatar class="mx-auto mb-4" size="200">
              <img src="https://randomuser.me/api/portraits/women/85.jpg" alt="Profile Picture" width="100%" />
            </v-avatar>
            <v-card-title class="text-h4" style="color: #66FCF1;">Melvin Jipos</v-card-title>
            <v-card-subtitle class="text-body-2 text-center" style="color: white;">System Analyst</v-card-subtitle>
            <v-card-subtitle class="text-body-2 text-center" style="color: white;">Contact Number: 0912389934</v-card-subtitle>
            <v-btn color="cyan-accent-2" block class="mt-4">Edit Profile</v-btn>
          </v-card>
        </v-col>

      
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: "UserProfile",
  data() {
    return {
      drawer: false,
      admin: {
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        email: "melvinjipos@gmail.com",
        fullname: "Melvin Jipos",
      },
      isNotificationOpen: false, // Moved this inside the main object
      messages: [
        { title: 'Message 1', body: 'This is the first notification.' },
        { title: 'Message 2', body: 'This is the second notification.' },
        { title: 'Message 3', body: 'This is the third notification.' }
      ]
    };
  },
  methods: {
    toggleNotifications() {
      this.isNotificationOpen = !this.isNotificationOpen;
    }
  }
};
</script>


<style scoped>
/* App Bar and Drawer Background Color */
.v-app-bar {
  background-color: #1F2833;
}

.v-navigation-drawer {
  background-color: #1F2833;
}



/* Button and Text Color */


.v-avatar img {
  object-fit: cover;
}


.container {
  margin-left: 250px; /* Adjust this value according to the width of your drawer */
  transition: margin-left 0.3s ease; /* Smooth transition effect */
}

.v-icon {
  color: #66FCF1;
}

.v-list-item {
  color: #66FCF1;
}

/* If you want to keep the margin but color the space above the drawer */
.v-navigation-drawer {
  background-color: #1F2833; /* Ensure this matches the drawer color */
}

.container {
  background-color: #0B0C10;
  min-height: 100vh; /* Ensures the background color spans the whole height */
  padding: 16px;
}

.container-content-shift {
  margin-left: 100px; /* Adjust this value according to the width of your drawer */
  transition: margin-left 0.3s ease; /* Smooth transition effect */

}


</style>