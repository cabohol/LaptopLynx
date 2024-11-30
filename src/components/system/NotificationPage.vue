<script setup>
// Import necessary utilities and libraries
import { formActionDefault, supabase } from '@/utils/supabase';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Router instance
const router = useRouter();

// Drawer state for navigation
const drawer = ref(false);

// User data reference
const renter = ref({
  fullname: '',
  email: '',
  avatar: localStorage.getItem('user-avatar') || '/src/images/Default_pfp.svg.png', // Default avatar
});

// Form action state
const formAction = ref({
  ...formActionDefault,
});

// Function to retrieve logged-in renter's data
const getRenterData = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user data:', error);
    return;
  }

  const user = data?.user;
  if (user) {
    renter.value.email = user.email;
    const metadata = user.user_metadata;
    renter.value.fullname = `${metadata?.firstname || ''} ${metadata?.lastname || ''}`.trim();
    renter.value.avatar = metadata?.avatar || renter.value.avatar; // Use metadata avatar if available
  }
};

// Fetch renter data on component mount
onMounted(() => {
  getRenterData();
});

// Logout functionality
const onLogout = async () => {
  formAction.value = { ...formActionDefault };
  formAction.value.formProcess = true;

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error);
    return;
  }

  formAction.value.formProcess = false;
  router.replace('/LoginView'); // Redirect to login page
};

/* NOTIFICATION FUNCTIONALITY */

// Notifications and error states
const notifications = ref([]);
const notificationsError = ref(null);

// Fetch notifications for the logged-in renter
const fetchNotifications = async () => {
  try {
    // Get the logged-in user
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError) {
      notificationsError.value = 'Error fetching user data. Please log in again.';
      console.error(userError);
      return;
    }

    const userId = user?.user?.id; // Get user ID
    if (!userId) {
      notificationsError.value = 'No renter information found.';
      return;
    }

    // Query notifications joined with appointments, filtered by user_id
    const { data, error: notificationsFetchError } = await supabase
      .from('notifications')
      .select(`
          id, 
          type, 
          message, 
          created_at, 
          appointment_id, 
          appointments (
          laptop_name, 
          date_and_time, 
          rental_days, 
          status, 
          user_id
        )
      `)
      .eq('appointments.user_id', userId) // Filter by renter's appointments
      .order('created_at', { ascending: false });

    if (notificationsFetchError) {
      notificationsError.value = 'Error fetching notifications.';
      console.error(notificationsFetchError);
      return;
    }

    const handleAppointmentChange = (appointment) => {
  const notification = appointmentNotification(appointment);
  if (notification) {
    // Check if the notification already exists
    const existingIndex = notifications.value.findIndex(n => n.appointment_id === appointment.id);
    if (existingIndex !== -1) {
      notifications.value[existingIndex] = notification; // Update existing notification
    } else {
      notifications.value.push(notification); // Add new notification
    }
  }
};


    // Format notifications for display
    notifications.value = data
      .filter((notif) => notif.appointments?.user_id === userId) // Ensure notifications belong to the user
      .map((notif) => ({
        ...notif,
        laptopName: notif.appointments?.laptop_name || 'N/A',
        appointmentDate: notif.appointments?.date_and_time || 'N/A',
        status: notif.appointments?.status || 'N/A',
      }));
  } catch (err) {
    notificationsError.value = 'An unexpected error occurred.';
    console.error(err);
  }
};

// Fetch notifications on component mount
onMounted(() => {
  fetchNotifications();
});
</script>







<template>
  <v-app>
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

      <!-- Notifications Icon -->
      <v-btn icon color="#66FCF1" @click="showNotifications = !showNotifications">
        <v-icon>mdi-bell</v-icon>
        <!-- <v-badge color="cyan" overlap bordered dot></v-badge> -->
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app permanent elevation="3">
      <v-list>
        <br />
        <v-list-item
          :prepend-avatar="renter.avatar"
          :subtitle="renter.email"
          :title="renter.fullname"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Homepage" :to="{ name: 'homepage' }"></v-list-item>
        <v-list-item prepend-icon="mdi-calendar-check" title="Booking" :to="{ name: 'booking' }"></v-list-item>
        <v-list-item prepend-icon="mdi-bell" title="Notifications" :to="{ name: 'notifications' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'customerprofile' }"></v-list-item>
        <v-list-item @click="onLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="notification-page">
        <h1 class="page-title" style="margin-top: 40px; font-size: 45px;">Latest Notifications 
          <span style="display: flex; align-items: center; justify-content: center; color: cyan; font-size: 25px; margin-top: 15px;">
              <hr style="flex-grow: 1; margin-right: 10px; border: 2px solid transparent; border-image: linear-gradient(90deg,  #1F2833, #66FCF1) 1;">
              Stay Notified!
              <hr style="flex-grow: 1; margin-left: 10px; border: 2px solid transparent; border-image: linear-gradient(90deg, #66FCF1, #1F2833) 1;">
            </span>
        </h1>
        <v-container>
          <v-row justify="center" class="notification-grid">
            <template v-if="notificationsError">
              <v-alert type="error" class="mx-auto" max-width="400">
                {{ notificationsError }}
              </v-alert>
            </template>
            <template v-else>
              <v-col cols="12" sm="6" md="4" lg="5" v-for="notification in notifications" :key="notification.id">
                <v-card class="notification-card" outlined>
                      <v-card-title>
                        <v-icon left :color="notification.type === 'Accepted' ? '#66FCF1' : notification.type === 'Rejected' ? '#66FCF1' : '#66FCF1'">
                          {{ notification.type === 'Accepted' 
                              ? 'mdi-check-circle' 
                              : notification.type === 'Rejected' 
                                ? 'mdi-close-circle' 
                                : 'mdi-alert-circle' }}
                        </v-icon>
                        <span class="notification-title">
                          {{ notification.type === 'Accepted'
                              ? ' Your Request Has Been Approved'
                              : notification.type === 'Rejected'
                                ? ' Your Booking Has Been Rejected'
                                : ' Your Booking Has Been Canceled' }}
                        </span>
                      </v-card-title>
                      <v-card-text style="padding: 15px; color: #1F2833;">
                        <p style="font-size: 18px; line-height: 1.6; margin-bottom: 10px; color: #66FCF1;">
                          {{ notification.message }}
                        </p>
                        <p style="margin: 5px 0; font-size: 17px;">
                          <strong style="color: #66FCF1;">Laptop: </strong> 
                          <span style="color: #C5C6C7;">{{ notification.laptopName }}</span>
                        </p>
                        <p style="margin: 5px 0; font-size: 17px;">
                          <strong style="color: #66FCF1;">Date: </strong> 
                          <span style="color: #C5C6C7;">{{ notification.appointmentDate }}</span>
                        </p>
                        <p style="margin: 5px 0; font-size: 17px;">
                          <strong style="color: #66FCF1;">Status: </strong> 
                          <span style="color:#C5C6C7;">{{ notification.status }}</span>
                        </p>
                      </v-card-text>
                    </v-card>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>




<style scoped>
.notification-page {
  background-color: #1F2833;
  color: #C5C6C7;
  min-height: 100vh;
  margin-top: 50px;
  padding: 20px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #66FCF1;
  margin-bottom: 30px;
}


.notification-grid {
  margin-top: 30px;
  row-gap: 20px;
  column-gap: 20px;
}

.notification-card {
  background-color: #1F2833;
  border: 1px solid #66FCF1;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.notification-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 15px rgba(102, 252, 241, 0.3);
}

.notification-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #66FCF1;
}

.notification-subtitle {
  font-size: 1rem;
  color: #C5C6C7;
}




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

.v-navigation-drawer {
  z-index: 1000;
  position: fixed;
  height: 100%;
}

.v-app-bar {
  position: relative;
  z-index: 1001;
}

.v-main {
  transition: margin-left 0.3s ease;
  margin-left: 0;
  padding: 16px;
  background-color: #1F2833;
}

.v-navigation-drawer--is-mobile .v-main {
  margin-left: 250px;
}

@media (max-width: 600px) {
  .v-navigation-drawer {
    width: 250px;
  }

  .v-navigation-drawer--is-mobile .v-main {
    margin-left: 250px;
  }
}

@media (min-width: 601px) {
  .v-navigation-drawer {
    width: 250px;
  }

  .v-navigation-drawer--is-mobile .v-main {
    margin-left: 250px;
  }
}

.v-navigation-drawer.v-navigation-drawer--permanent {
  width: 250px;
}

.v-navigation-drawer.v-navigation-drawer--permanent + .v-main {
  margin-left: 250px;
}

.v-app-bar {
  background-color: #1F2833;
}

.v-navigation-drawer {
  background: linear-gradient(135deg, #1F2833, #2C3E50); 
  color: #66FCF1; 
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.v-avatar img {
  object-fit: cover;
}

.container {
  background-color: #0B0C10;
  min-height: 100vh;
  padding: 16px;
}

.container-content-shift {
  margin-left: 100px;
  transition: margin-left 0.3s ease;
}

.v-icon, .v-list-item {
  color: #66FCF1;
}
</style>