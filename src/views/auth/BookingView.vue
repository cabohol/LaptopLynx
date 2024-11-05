<script>
import { ref, onMounted } from 'vue';
import { formActionDefault, supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter(); // Use the router for navigation

    const drawer = ref(false);
    const name = ref('');
    const selectedTime = ref(null);
    const laptop = ref(null);
    const selectedDate = ref(null);
    const meetupPlace = ref('CSU (Hiraya Hall)'); // Pre-filled with CSU (Hiraya Hall)
    const notifications = ref([
      { title: 'Reminder', message: 'Your appointment is tomorrow at 10:00 AM.' },
      { title: 'Update', message: 'New laptop models available.' },
    ]);

    const timeOptions = [
      '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM',
      '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    const laptopModels = [
      'Acer Aspire 5', 'Dell XPS 13', 'HP Pavilion', 'Lenovo ThinkPad X1',
      'Asus ZenBook 14', 'MacBook Air', 'Razer Blade 15', 'Microsoft Surface Laptop',
      'Acer Swift 3', 'Dell Inspiron 15', 'HP Envy', 'Lenovo IdeaPad',
      'Asus VivoBook', 'LG Gram 17', 'Samsung Galaxy Book', 'Toshiba Tecra',
      'MSI Prestige 14', 'Huawei MateBook X Pro', 'Alienware m15',
      'Fujitsu Lifebook', 'Gigabyte AERO 15'
    ];

    const selectTime = (time) => {
      selectedTime.value = time;
    };

    const handleDateChange = (date) => {
      selectedDate.value = date;
    };

    const submitForm = () => {
      console.log('Form Submitted:', {
        name: name.value,
        laptop: laptop.value,
        selectedDate: selectedDate.value,
        selectedTime: selectedTime.value,
        meetupPlace: meetupPlace.value
      });
    };

    const clearNotifications = () => {
      notifications.value = [];
    };

    // Renter data for displaying logged-in user information
    const renter = ref({
      fullname: '',
      email: '',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg', // Default avatar if none provided
    });

    const formAction = ref({
      ...formActionDefault
    });

    // Function to retrieve renter data
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

    // Fetch renter data when the component is mounted
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
      router.replace('/LoginView'); // Redirect after logout
    };

    return {
      drawer,
      name,
      selectedTime,
      laptop,
      selectedDate,
      meetupPlace,
      timeOptions,
      laptopModels,
      notifications,
      selectTime,
      handleDateChange,
      submitForm,
      clearNotifications,
      renter,
      formAction,
      getRenterData,
      onLogout
    };
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
      <v-menu offset-y min-width="300px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon color="#66FCF1">mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-card style="background-color: #1F2833;">
          <v-card-text>
            <div class="mx-auto text-center">
              <h3 class="text-h6">Notifications</h3>
              <v-divider class="my-3"></v-divider>
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
              <v-btn variant="text" rounded @click="clearNotifications">
                Clear All
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app permanent elevation="3">
      <v-list>
        <br>

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

    <v-main>
      <v-row style="background-color: #0B0C10; min-height: 100vh;">
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto" style="background-color: #1F2833;">
            <v-card-title class="text-center">
              <v-img class="mx-auto" src="/src/images/logolynx.png" width="30%"></v-img>
              <h2 class="white--text" style="color: #C5C6C7;">Make your Laptop Appointment</h2>
              <h4 class="white--text" style="color: #C5C6C7; text-align: center;">
                <span style="display: flex; align-items: center; justify-content: center;">
                  <hr style="flex-grow: 1; margin-right: 10px; border-color: #C5C6C7;" />
                  Book Now!
                  <hr style="flex-grow: 1; margin-left: 10px; border-color: #C5C6C7;" />
                </span>
              </h4>
            </v-card-title>
            <v-card-text class="pt-4" style="background-color: #1F2833;">
              <v-form fast-fail @submit.prevent="submitForm">
                <v-text-field
                  label="Enter Name:"
                  v-model="name"
                  :rules="[() => !!name || 'This field is required']"
                  outlined
                  style="background-color:#1F2833; color: #fff;"
                  class="white--text"
                ></v-text-field>
                <v-autocomplete
                  v-model="laptop"
                  :items="laptopModels"
                  :rules="[() => !!laptop || 'This field is required']"
                  label="Select Laptop"
                  placeholder="Select..."
                  required
                  outlined
                  style="background-color: #1F2833; color: #fff;"
                  class="white--text"
                ></v-autocomplete>
                <v-text-field
                  label="Meetup Place:"
                  v-model="meetupPlace"
                  outlined
                  style="background-color:#1F2833; color: #fff;"
                  class="white--text"
                  readonly
                ></v-text-field>
                <v-container>
                  <v-row justify="space-around">
                    <v-col cols="6">
                      <v-date-picker
                        v-model="selectedDate"
                        color="cyan-accent-2"
                        label="Select Date"
                        :min="new Date().toISOString().substr(0, 10)"
                        @input="handleDateChange"
                        class="white--text"
                      ></v-date-picker>
                    </v-col>
                    <v-col cols="6" class="mt-4">
                      <span class="font-weight-black" style="padding-left: 50px; color: #fff;">Select Time:</span>
                      <v-row class="pt-2" style="padding-left: 50px;">
                        <v-col cols="5" v-for="time in timeOptions" :key="time">
                          <v-btn
                            :class="{'primary--text': selectedTime === time}"
                            color="cyan-accent-2"
                            block
                            @click="selectTime(time)"
                            class="my-2"
                          >
                            {{ time }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-alert v-if="selectedDate && selectedTime" type="info" class="mt-4" style="background-color: #0B0C10; color: #fff;">
                    Selected Time: {{ selectedTime }} on {{ selectedDate }}
                  </v-alert>
                </v-container>
                <v-btn class="mt-2" type="submit" block color="cyan-accent-2">
                  <RouterLink to="/dashboard">SUBMIT</RouterLink>
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>



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