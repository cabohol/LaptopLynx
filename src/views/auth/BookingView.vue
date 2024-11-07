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

    const submitForm = async () => {
      const { data, error } = await supabase
        .from('appointments') 
        .insert([
          {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            phone: phone.value,
            meetup_place: meetupPlace.value,
            laptop_model: laptop.value,
            appointment_date: selectedDate.value,
            appointment_time: selectedTime.value,
          },
        ]);

        if (error) {
        console.error('Error inserting data:', error);
        alert('Error booking appointment. Please try again.');
      } else {
        alert('Appointment booked successfully!');
        // Clear form fields
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        phone.value = '';
        meetupPlace.value = '';
        laptop.value = '';
        selectedDate.value = null;
        selectedTime.value = '';
      }
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

      // firstName,
      // lastName,
      // email,
      // phone,
      // meetupPlace,
      // laptop,
      // selectedDate,
      // selectedTime,
      // laptopModels,
      // timeOptions,
      // submitForm,
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
        <v-list-item prepend-icon="mdi-calendar-check" title="Booking" :to="{ name: 'booking' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'customerprofile' }"></v-list-item>
        <v-list-item @click="onLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    
    <v-main>
  <v-container fluid="booking" style="margin-top: 50px;" class="animated-background">
    <v-card-title class="text-center">
      <v-img class="mx-auto responsive-image" src="/src/images/logolynx.png"></v-img>
      <h2 class="white--text responsive-heading">Make your Laptop Appointment</h2>
      <h4 class="white--text" style="color: #C5C6C7; text-align: center;">
        <span style="display: flex; align-items: center; justify-content: center;">
          <hr style="flex-grow: 1; margin-right: 10px; border-color: #C5C6C7;" />
          Book Now!
          <hr style="flex-grow: 1; margin-left: 10px; border-color: #C5C6C7;" />
        </span>
      </h4>
    </v-card-title>

    <v-card class="mx-auto custom-card" max-width="1000px" style="background-color: #1F2833;  border: 1px solid #66FCF1; ">
  <v-form>
    <v-card-text>
      <!-- First Name and Last Name Row -->
      <v-row class="custom-row">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="firstName"
            label="First Name"
            required
            outlined
            color="#C5C6C7"
            prepend-inner-icon="mdi-account"
            class="custom-text-field"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="lastName"
            label="Last Name"
            required
            outlined
            color="#C5C6C7"
            prepend-inner-icon="mdi-account"
            class="custom-text-field"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Email and Phone Number Row -->
      <v-row class="custom-row">
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="email"
            label="Email"
            required
            outlined
            color="#C5C6C7"
            prepend-inner-icon="mdi-email"
            class="custom-text-field"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="phone"
            label="Phone Number"
            required
            outlined
            color="#C5C6C7"
            prepend-inner-icon="mdi-phone"
            class="custom-text-field"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Meet-up Place and Laptop Model Row -->
      <v-row class="custom-row">
        <v-col cols="12" sm="6">
          <v-text-field
              v-model="meetupPlace"
              label="Meet-up Place:"
              outlined
              color="#C5C6C7"
              prepend-inner-icon="mdi-pin"
              class="custom-text-field"
              readonly
              disabled
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="laptop"
            :items="laptopModels"
            label="Select Laptop Model"
            required
            outlined
            color="#C5C6C7"
            prepend-inner-icon="mdi-laptop"
            class="custom-select"
          ></v-select>
        </v-col>
      </v-row>

      <!-- Date and Time Row -->
      <v-row class="custom-row">
        <v-col cols="12" sm="6">
          <v-container>
              <v-row justify="space-around">
                  <v-date-picker
                    class="custom-date-picker"
                    color="cyan"
                  ></v-date-picker>
                </v-row>
            </v-container>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="selectedTime"
            :items="timeOptions"
            label="Select Time"
            required
            outlined
            color="#C5C6C7"
            prepend-inner-icon="mdi-clock"
            class="custom-select"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- Submit Button -->
    <v-card-actions class="custom-actions">
      <v-btn  @click="submitForm" class="custom-btn">Book Appointment</v-btn>
    </v-card-actions>
  </v-form>
</v-card>
<br>
<br>

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


/* @keyframes colorPulse {
    0% {
        background-color: #1F2833; 
    }
    50% {
        background-color: #2B3A42; 
    }
    100% {
        background-color: #1F2833; 
    }
}

.animated-background {
    animation: colorPulse 3s ease-in-out infinite;
    transition: background-color 0.5s; 
} */

.custom-btn {
  background-color: #66FCF1;
  color: #1F2833;
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 24px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.custom-btn:hover {
  background-color: #66FCF1;
  color: #1F2833;
  transform: translateY(-2px);
}

.custom-actions {
  display: flex;
  justify-content: center;
  padding: 16px 24px;
  background-color: #1F2833;
  border-top: 1px solid #66FCF1;
}

.custom-text-field {
  background-color: #1F2833;
  border-radius: 8px;
  color: #EDF2F4;
  transition: all 0.3s ease;
}

.custom-text-field input {
  color: #EDF2F4;
}

.custom-select {
  background-color: #1F2833;
  border-radius: 8px;
  color: #EDF2F4;
}


/* Responsiveness for img */
.responsive-image {
  width: 80%;
  max-width: 300px;
}

@media (min-width: 600px) {
  .responsive-image {
    width: 50%;
    max-width: 400px;
  }
}

@media (min-width: 960px) {
  .responsive-image {
    width: 35%;
    max-width: 500px;
  }
}

@media (min-width: 1280px) {
  .responsive-image {
    width: 30%;
    max-width: 600px;
  }
}



/* Responsiveness for heading */
h2.responsive-heading {
  font-size: 1.3rem;
  color: #C5C6C7;
  text-align: center;
}


@media (min-width: 600px) {
  h2.responsive-heading {
    font-size: 2rem;
  }
}

@media (min-width: 960px) {
  h2.responsive-heading {
    font-size: 2.5rem;
  }
}

@media (min-width: 1280px) {
  h2.responsive-heading {
    font-size: 2.5rem;
  }
}



/* CSS aron di ma stay still ang nakadisplay
bisag e open an nav drawer */
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