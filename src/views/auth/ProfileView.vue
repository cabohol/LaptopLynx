<script setup>
import { ref, onMounted } from 'vue';
import { formActionDefault, supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const router = useRouter(); // Use the router for navigation

// Admin data for displaying logged-in user information
const admin = ref({
  fullname: '',
  email: '',
  phone_number: '',
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
    admin.value.phone_number = metadata?.phone_number || 'Not Provided'; // Retrieve phone number from metadata
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
    formAction.value.formProcess = false; // Ensure form process is reset even if there is an error
    return;
  }

  formAction.value.formProcess = false;
  router.replace('/LoginView');
};

// Dummy notifications for display
const notifications = ref([
  { title: 'New Comment', message: 'You have a new comment on your post.' },
  { title: 'Reminder', message: 'Your session starts in 30 minutes.' },
  { title: 'Update Available', message: 'A new version is available.' },
]);

const clearNotifications = () => {
  notifications.value = [];
};
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
          <v-icon color="#66FCF1;">mdi-bell</v-icon>
        </v-btn>
      </template>
      <v-card style="background-color: #1F2833;">
        <v-card-text>
          <div class="mx-auto text-center">
            <h3 class="text-h6">Notifications</h3>
            <v-divider class="my-3"></v-divider>
            <!-- List of Notifications -->
            <v-list>
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
            <v-divider class="my-3"></v-divider>
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


    
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app permanent elevation="3">
      <v-list>
        <br />
        <v-list-item
        :prepend-avatar="admin.avatar"
        :subtitle="admin.email"
        :title="admin.fullname"
      ></v-list-item>
          </v-list>
      <v-divider style="color: bisque;"></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{ name: 'dashboard' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'profile' }"></v-list-item>
        <v-list-item @click="onLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>
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
      <v-row justify="center">
    <!-- Profile Picture and Basic Info Section -->
    <v-main>
  <v-row style="background-color: #0B0C10; min-height: 100vh;">
    <v-col cols="12" md="5" class="mx-auto">
      <div class="mx-auto" style="background-color: #1F2833; padding: 20px; border-radius: 8px;">
        <div class="text-center">
          <v-avatar class="mx-auto mb-4" size="200">
            <img :src="admin.avatar" alt="Profile Picture" width="100%" />
          </v-avatar>
          <v-card-title class="text-h4" style="color: #66FCF1;">{{ admin.fullname }}</v-card-title>
          <v-card-subtitle class="text-body-2 text-center" style="color: white;">{{ admin.email }}</v-card-subtitle>
          <v-card-subtitle class="text-body-2 text-center" style="color: white;">Contact Number: {{ admin.phone_number }}</v-card-subtitle>
          <v-btn color="cyan-accent-2" block class="mt-4" @click="openImagePicker">Edit Profile</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</v-main>



    <!-- File Input Dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>
          <span class="text-h5">Select a new profile picture</span>
        </v-card-title>
        <v-card-text>
          <input type="file" @change="onImageChange" accept="image/*" />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

      
    </v-container>
  </v-app>
</template>


<script>
export default {
  methods: {
    toggleNotifications() {
      this.isNotificationOpen = !this.isNotificationOpen;
    },
    openImagePicker() {
      this.dialog = true; // Open the dialog for image selection
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicture = e.target.result; // Update the profile picture with the selected image
          localStorage.setItem('profilePicture', e.target.result); // Save the new image to localStorage
        };
        reader.readAsDataURL(file); // Convert image to base64 string
      }
    },
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