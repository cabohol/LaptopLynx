<script setup>
import { formActionDefault, supabase } from '@/utils/supabase';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const router = useRouter();

// Admin data for displaying logged-in user information
const admin = ref({
  fullname: '',
  email: '',
  avatar: 'https://randomuser.me/api/portraits/men/85.jpg', // Default avatar if none provided
});

const formAction = ref({
  ...formActionDefault
});

// Function to retrieve admin data
const getAdminData = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user data:', error);
    return;
  }

  const user = data?.user;
  if (user) {
    admin.value.email = user.email;
    const metadata = user.user_metadata;
    admin.value.fullname = `${metadata?.firstname || ''} ${metadata?.lastname || ''}`.trim();
    admin.value.avatar = metadata?.avatar || admin.value.avatar; // Use avatar from metadata if available
  }
};

// Fetch admin data when the component is mounted
onMounted(() => {
  getAdminData();
});

// Logout functionality
const onLogout = async () => {
  formAction.value = { ...formActionDefault };
  formAction.value.formProcess = true;

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error);
    formAction.value.formProcess = false;
    return;
  }
  formAction.value.formProcess = false;
  router.replace('/LoginView');
};

const notifications = ref([
  { title: 'New Comment', message: 'You have a new comment on your post.' },
  { title: 'Reminder', message: 'Your session starts in 30 minutes.' },
  { title: 'Update Available', message: 'A new version is available.' },
])

const clearNotifications = () => {
  notifications.value = []
}



</script>

<template>
  <v-app id="inspire">
    <!-- App Bar -->
    <v-app-bar elevation="3">
    <v-app-bar-nav-icon style="color: #66FCF1;" @click="drawer = !drawer"></v-app-bar-nav-icon>

    <div class="d-flex align-center">
      <img src="/src/images/logo1.png" width="50" alt="Logo" class="logo" />
      <v-toolbar-title class="ml-2">
        <h3 style="color: #66FCF1;">LaptopLynx</h3>
      </v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <!-- Notification Bell -->
    <v-menu
      offset-y
      min-width="300px"
      rounded
    >
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-icon style="color: aqua;">mdi-bell</v-icon>
        </v-btn>
      </template>
      <v-card style="background-color: #1F2833;">
        <v-card-text>
          <div class="mx-auto text-center">
            <h3 class="text-h6" style="color: aqua;">Notifications</h3>
            <v-divider class="my-3" style="color: aliceblue;"></v-divider>
            <!-- List of Notifications -->
            <v-list style="background-color: #1F2833;">
              <v-list-item
                v-for="(notification, index) in notifications"
                :key="index"
                class="py-2"
              >
                <v-list-item-avatar color="brown">
                  <v-icon>mdi-bell-alert</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ notification.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider class="my-3" style="color: aliceblue;"></v-divider>
            <v-btn
              variant="text"
              rounded
              @click="clearNotifications"
            >
              Clear All
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
    <!-- End of Notification Bell -->

    <!-- Profile Dropdown can be added here if needed -->
  </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      permanent
      elevation="3"
    >
    <v-list>
      <br>
      <v-list-item
        :prepend-avatar="admin.avatar"
        :subtitle="admin.email"
        :title="admin.fullname"
      ></v-list-item>
    </v-list>
      <v-divider style="color: bisque;"></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'profile' }"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Log out" value="logout"
           @click = "onLogout"
          :loading = "formAction.formProcess"
          :disabled = "formAction.formProcess"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
<v-main class="main-content" style="background-color: #0B0C10;">
  <v-container fluid>
    <v-row class="mt-12" justify="center">
      
      <!-- Table Column -->
      <v-col cols="12" md="8">
        <v-table fixed-header style="background-color: #1F2833; color: white;">
          <thead>
            <tr>
              <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Fullname</h3></b></th>
              <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Rate per Day</h3></b></th>
              <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Model of Laptop</h3></b></th>
              <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Confirmation</h3></b></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in laptops" :key="item.model">
              <td class="text-center"></td>
              <td class="text-center"></td>
              <td class="text-center"></td>
              <td class="text-center">
                <v-btn class="mx-2" color="green" @click="accept(item)">Accept</v-btn>
                <v-btn class="mx-2" color="red" @click="reject(item)">Reject</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>

      <!-- Appointments Column -->
      <v-col cols="12" md="4">
        <v-card fixed-header class="mx-auto" style="background-color: #1F2833; color: white;">
          <v-card-text>
            <div class="text-center">
              <h2 style="color: #66FCF1;">Appointments</h2>
            </div>

            <v-timeline align="start" density="compact">
              <v-timeline-item
                v-for="appointment in appointments"
                :key="appointment.time"
                dot-color="cyan-accent-2"
                color="black"
                size="x-small"
              >
                <div>
                  <strong>Time:</strong> <!-- Time displayed here -->
                </div>
                <div class="mb-4">
                  <div><strong>Renter: </strong></div>
                  <div><strong>Date: </strong></div>
                  <div><strong>Laptop Model: </strong></div>
                  <div><strong>Meet-up: </strong></div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
    <br><br>
  </v-container>
</v-main>

  </v-app>
</template>





<style scoped>
.v-list-item {
  transition: transform 0.3s ease, color 0.3s ease;
}

.v-list-item:hover {
  transform: scale(1.05);
  color: #66FCF1; 
}

.v-list-item:active {
  transform: scale(0.95);
  opacity: 0.7;
  transition: transform 0.1s ease, opacity 0.1s ease;
}


.v-app-bar {
  background-color: #1F2833;
}

.v-navigation-drawer {
  background-color: #1F2833;
}

/* Main Content Background Color */
.main-content {
  background-color: #0B0C10;
  min-height: 100vh; /* Ensures the background color spans the whole height */
  padding: 16px;
}

/* Button and Text Color */
.v-btn {
  color: white;
}

.v-avatar img {
  object-fit: cover;
}

.v-data-table-header {
  background-color: #2b2d42;
}

.v-data-table th {
  color: #8ecae6;
}

.v-data-table td {
  color: white;
}

.v-icon {
  color: #66FCF1;
}

.v-list-item {
  color: #66FCF1;
}

/* If you want to keep the margin but color the space above the drawer */
.v-navigation-drawer {
  background: linear-gradient(135deg, #1F2833, #2C3E50); 
  color: #66FCF1; 
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}


.main-content-shift {
  margin-left: 250px; /* Adjust this value according to the width of your drawer */
  transition: margin-left 0.3s ease; /* Smooth transition effect */
}
</style>
