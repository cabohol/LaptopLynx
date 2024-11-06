<script setup>
import { ref, onMounted } from 'vue';
import { formActionDefault, supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const router = useRouter(); // Use the router for navigation

//USER FUNCTIONALITY


// Renter data for displaying logged-in user information
const renter = ref({
  fullname: '',
  email: '',
  phone_number: '',
  avatar: 'https://randomuser.me/api/portraits/men/85.jpg', // Default avatar if none provided
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
    renter.value.phone_number = metadata?.phone_number || 'Not Provided'; // Retrieve phone number from metadata

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


const notifications = ref([
  { title: 'New Comment', message: 'You have a new comment on your post.' },
  { title: 'Reminder', message: 'Your session starts in 30 minutes.' },
  { title: 'Update Available', message: 'A new version is available.' },
])

const clearNotifications = () => {
  notifications.value = []
}
</script>

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
      isNotificationOpen: false,
      messages: [
        { title: 'Message 1', body: 'This is the first notification.' },
        { title: 'Message 2', body: 'This is the second notification.' },
        { title: 'Message 3', body: 'This is the third notification.' }
      ],
      dialog: false, // Controls the visibility of the image picker dialog
      profilePicture: localStorage.getItem('profilePicture') || "https://randomuser.me/api/portraits/men/32.jpg", // Load the profile picture from localStorage
    };
  },
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

    <!-- Profile Dropdown can be added here if needed -->
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
      <v-divider style="color: bisque;"></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Homepage" :to="{ name: 'homepage' }"></v-list-item>
        <v-list-item prepend-icon="mdi-book" title="Booking" :to="{ name: 'booking' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'customerprofile' }"></v-list-item>
        <v-list-item @click="onLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-container
        fluid
        class="pa-6"
        :class="{'container-content-shift': drawer}"
        style="background-color: #1F2833; height: 100vh;">

        <br><br><br><br>

        <v-row justify="center">
          <v-col cols="12" md="7" class="d-flex flex-column align-items-center" style="margin-top: 40px;">
            <v-avatar
              class="profile-avatar mx-auto"
              size="180"
            >
              <img :src="profilePicture" alt="Profile Picture" width="100%" />
            </v-avatar>

            <!-- Profile Card -->
            <v-card class="pa-8 text-center profile-card" elevation="2">
              <v-card-title
                    class="text-h5 text-md-h4 text-lg-h3 mt-5"
                    style="color: #66FCF1; font-weight: 600;"
                  >
                    {{ renter.fullname }}
                  </v-card-title>
                  <v-card-subtitle
                    class="text-body-2 text-md-body-1 text-lg-subtitle-1 text-center"
                    style="color: white;"
                  >
                    Email: {{ renter.email }}
                  </v-card-subtitle>
                  <v-card-subtitle
                    class="text-body-2 text-md-body-1 text-lg-subtitle-1 text-center"
                    style="color: white;"
                  >
                    Contact Number: {{ renter.phone_number }}
                  </v-card-subtitle>
                  <v-btn block class="mt-10 profile-edit-btn" @click="openImagePicker"> Edit Profile </v-btn>
            </v-card>
          </v-col>
        </v-row>

  <!-- File Input Dialog -->
  <!-- <v-dialog v-model="dialog" max-width="400">
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
  </v-dialog> -->
</v-container>

  </v-app>
</template>


<style scoped>
.profile-edit-btn {
  background: linear-gradient(45deg, #66FCF1, #1F2833);
  color: #0B0C10;
  font-weight: bold;
  padding: 10px 20px;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.profile-edit-btn:hover {
  background: linear-gradient(45deg, #1F2833, #66FCF1);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.profile-avatar {
  position: relative;
  z-index: 1;
  margin-bottom: -80px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  border: 5px solid #1F2833;
}

.profile-card {
  background: linear-gradient(45deg, #1F2833, #394A59);
  background-size: 400% 400%;
  animation: gradientAnimation 6s ease infinite;
  padding: 80px 20px 40px;
  border-radius: 15px;
  margin-top: 30px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 0;
  border: 4px solid #1F2833;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.v-app-bar {
  background-color: #1F2833;
}

.v-navigation-drawer {
  background-color: #1F2833;
}

.v-avatar img {
  object-fit: cover;
}

.container {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.v-icon {
  color: #66FCF1;
}

.v-list-item {
  color: #66FCF1;
}

.v-navigation-drawer {
  background-color: #1F2833;
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
</style>
