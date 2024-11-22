<script setup>
import { formActionDefault, supabase } from '@/utils/supabase';
import { ref, computed, onMounted } from 'vue'; 
import { useRouter } from 'vue-router';

const router = useRouter();
const drawer = ref(false);



// Method to handle laptop rental
// const rentLaptop = (id) => {
//   alert(`You have selected Laptop ID: ${id}`);
// };

//USER FUNCTIONALITY


// Renter data for displaying logged-in user information
const renter = ref({
  fullname: '',
  email: '',
  avatar: '/src/images/Default_pfp.svg.png', // Default avatar if none provided
});

const formAction = ref({
  ...formActionDefault
});

// Function to retrieve admin data
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
    renter.value.avatar = metadata?.avatar || renter.value.avatar; // Use avatar from metadata if available
  }
};

// Fetch admin data when the component is mounted
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
  router.replace('/LoginView');
};


const imagePopup = ref(false);
const selectedImage = ref('');

const openImagePopup = (imageSrc) => {
  selectedImage.value = imageSrc;
  imagePopup.value = true;
};

const closeImagePopup = () => {
  imagePopup.value = false;
};

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
        <v-badge color="cyan" overlap bordered dot>
        </v-badge>
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
        <h1 class="page-title">Latest Notifications</h1>
        <h4 class="white--text" style="color: #66FCF1; text-align: center;">
          <span style="display: flex; align-items: center; justify-content: center;">
            <hr style="flex-grow: 1; margin-right: 10px; border: 2px solid transparent; border-image: linear-gradient(90deg,  #1F2833, #66FCF1) 1;">
            Don't Miss Out on Important Alerts!
            <hr style="flex-grow: 1; margin-left: 10px; border: 2px solid transparent; border-image: linear-gradient(90deg, #66FCF1, #1F2833) 1;">
          </span>
        </h4>
        <v-container>
        <!-- Notification Grid -->
        <v-row justify="center" class="notification-grid">
          <!-- System Update Notification -->
          <v-col cols="12" sm="6" md="4" lg="5">
            <v-card class="notification-card" outlined>
              <v-card-title>
                <v-icon left color="#66FCF1">mdi-bell-ring</v-icon>
                <span class="notification-title"> System Update: Scheduled Downtime</span>
              </v-card-title>
              <v-card-text class="notification-subtitle">
                Our system will undergo scheduled maintenance on November 30, 2024, from 2 AM to 4 AM. Please plan your rental orders accordingly.
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Booking Confirmed Notification -->
          <v-col cols="12" sm="6" md="4" lg="5">
            <v-card class="notification-card" outlined>
              <v-card-title>
                <v-icon left color="#66FCF1">mdi-check-circle</v-icon>
                <span class="notification-title"> Booking Confirmed: Laptop Ready for Pickup</span>
              </v-card-title>
              <v-card-text class="notification-subtitle">
                Your booking for the Dell XPS 13 has been confirmed. Your laptop will be ready for pickup on November 25, 2024, at our main office.
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Payment Reminder Notification -->
          <v-col cols="12" sm="6" md="4" lg="5">
            <v-card class="notification-card" outlined>
              <v-card-title>
                <v-icon left color="#66FCF1">mdi-alert-circle</v-icon>
                <span class="notification-title"> Payment Reminder: Due for Your Rental</span>
              </v-card-title>
              <v-card-text class="notification-subtitle">
                Your payment for the MacBook Pro rental is due by November 25, 2024. Please complete the payment to avoid delays in your pickup.
              </v-card-text>
            </v-card>
          </v-col>

          <!-- New Feature Alert Notification -->
          <v-col cols="12" sm="6" md="4" lg="5">
            <v-card class="notification-card" outlined>
              <v-card-title>
                <v-icon left color="#66FCF1">mdi-information-outline</v-icon>
                <span class="notification-title"> New Feature Alert: Laptop Rental Extension</span>
              </v-card-title>
              <v-card-text class="notification-subtitle">
                We’ve added a new feature allowing you to extend your laptop rental period directly from your account dashboard. Check it out today!
              </v-card-text>
            </v-card>
          </v-col>
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