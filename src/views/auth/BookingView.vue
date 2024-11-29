<script setup>
import { ref, onMounted } from 'vue';
import { formActionDefault, supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';
import AlertNotification from '@/components/common/AlertNotification.vue';


const router = useRouter();

// Define renter data and initial values
const renter = ref({
  firstname: '',
  lastname: '',
  email: '',
  avatar: localStorage.getItem('customer-avatar') || '/src/images/Default_pfp.svg.png',
});

const formAction = ref({
  ...formActionDefault,
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



// Drawer state for UI
const drawer = ref(false);

// Form fields and default values
const laptop = ref(null);
const selectedDate = ref(null);
const selectedTime = ref(null);
const rentalDays = ref('');
const meetupPlace = ref('CSU (Hiraya Hall)');
const today = new Date().toISOString().substr(0, 10); // Get today's date in 'YYYY-MM-DD' format

const handleDateChange = () => {
  console.log("Selected date:", selectedDate.value);
};

// Time options for the form
const timeOptions = [
  '08:00 A.M', '09:00 A.M', '10:00 A.M', '11:00 A.M', '12:00 NN',
  '1:00 P.M', '2:00 P.M', '3:00 P.M', '4:00 P.M', '5:00 P.M',
];

// Laptop model options for the form
const laptopModels = [
  'Dell XPS 13', 'Asus ROG Zephyrus G14', 'MacBook Pro 16', 'HP Spectre x360',
  'Lenovo ThinkPad X1', 'MSI GS66 Stealth', 'Razer Blade 15', 'Huawei MateBook D15',
  'Acer Aspire 5', 'Acer Nitro 5', 'Lenovo V15 Gen 5', 'Acer Predator Helios',
];

// Function to fetch renter data from Supabase
const getRenterData = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user data:', error);
    return;
  }

  const user = data?.user;
  if (user) {
    // Populate renter details from Supabase user metadata
    renter.value.email = user.email;
    const metadata = user.user_metadata;
    renter.value.firstname = metadata?.firstname || '';
    renter.value.lastname = metadata?.lastname || '';
    renter.value.avatar = metadata?.avatar || renter.value.avatar;
  }
};

// Fetch renter data on component mount
onMounted(() => {
  getRenterData();
});

// Function to clear form fields after submission
const clearForm = () => {
  laptop.value = null;
  selectedDate.value = null;
  selectedTime.value = null;
  rentalDays.value = '';
};

// Function to submit the form and book an appointment
const submitForm = async () => {
  // Validate required fields
  if (!laptop.value || !selectedDate.value || !selectedTime.value || !rentalDays.value) {
    //alert('Please fill in all the required fields.');
    formAction.value.formErrorMessage = 'Please fill in all the required fields.';

    return;
  }

  try {
    // Get user data from Supabase
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error('Error fetching user:', userError);
      //alert('You must be logged in to book an appointment.');
      formAction.value.formErrorMessage = 'You must be logged in to book an appointment.';
      
      return;
    }

    const userId = user.user.id;

    // Parse and format the selected time
    const timeParts = selectedTime.value.split(/[.: ]/); // Split time into components
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const period = timeParts[2];

    // Convert to 24-hour format
    if (period === 'P' && hours !== 12) {
      hours += 12;
    } else if (period === 'A' && hours === 12) {
      hours = 0;
    }

    // Create a valid Date object
    const localDateTime = new Date(selectedDate.value);
    localDateTime.setHours(hours, minutes, 0, 0);

    // Convert to UTC for storage
    const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();

    // Insert appointment into the Supabase database
    const { error } = await supabase.from('appointments').insert([
      {
        laptop_name: laptop.value,
        date_and_time: utcDateTime,
        rental_days: parseInt(rentalDays.value, 10),
        user_id: userId,
        created_at: new Date().toISOString(),
        firstname: renter.value.firstname,
        lastname: renter.value.lastname,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      //alert('Error booking appointment. Please try again.');
      formAction.value.formErrorMessage = 'Error booking appointment. Please try again.';

      return;
    }

    // Display success message and clear the form
    //alert('Your appointment has been successfully booked with LaptopLynx! Thank you for choosing us.');
    formAction.value.formSuccessMessage = 'Your appointment has been successfully booked with LaptopLynx! Thank you for choosing us.';

    clearForm();
  } catch (error) {
    // Handle unexpected errors
    //console.error('Unexpected error:', error);
    //alert('Something went wrong. Please try again.');
    formAction.value.formErrorMessage = 'Something went wrong. Please try again.';

  }
};
</script>




<template>
  <v-app>
    <v-app-bar elevation="3">
      <v-app-bar-nav-icon style="color: #66FCF1;" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <img src="/src/images/logo1.png" width="50" alt="Logo" class="logo" />
        <v-toolbar-title class="ml-2">
          <h3 style="color: #66FCF1;">LaptopLynx</h3>
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app permanent elevation="3">
      <v-list>
        <br>
        <v-list-item :prepend-avatar="renter.avatar" :subtitle="renter.email" :title="renter.firstname + ' ' + renter.lastname"></v-list-item> </v-list>
      <v-divider style="color: bisque;"></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Homepage" :to="{ name: 'homepage' }"></v-list-item>
        <v-list-item prepend-icon="mdi-calendar-check" title="Booking" :to="{ name: 'booking' }"></v-list-item>
        <v-list-item prepend-icon="mdi-bell" title="Notifications" :to="{ name: 'notifications' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'customerprofile' }"></v-list-item>
        <v-list-item @click="onLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid="booking" style="margin-top: 50px; background-color: #1F2833; padding: 20px; border-radius: 10px;" class="animated-background">
        <v-card-title class="text-center" style="padding-bottom: 30px;">
              <v-img class="mx-auto responsive-image floating-img" src="/src/images/logolynx.png" style="max-width: 350px; margin-bottom: 20px;"></v-img>
                  <h2 class="white--text responsive-heading" style="font-family: 'Roboto', sans-serif; font-weight: bold; color: #66FCF1;">
                    Make your Laptop Appointment
                  </h2>
                  <h4 class="white--text" style="color: #C5C6C7; text-align: center; font-family: 'Roboto', sans-serif; font-size: 1.2rem;">
                    <span style="display: flex; align-items: center; justify-content: center; color: cyan;">
                      <hr style="flex-grow: 1; margin-right: 10px; border: 2px solid transparent; border-image: linear-gradient(90deg,  #1F2833, #66FCF1) 1;">
                      Book Now!
                      <hr style="flex-grow: 1; margin-left: 10px; border: 2px solid transparent; border-image: linear-gradient(90deg, #66FCF1, #1F2833) 1;">
                    </span>
                  </h4>
          </v-card-title>

        <!-- Booking Form -->
        <v-card class="mx-auto custom-card" max-width="1000px" style="background-color: #1F2833; border: 1px solid #66FCF1; border-radius: 10px; padding: 20px;">
                            <br>
                            <AlertNotification
                           :form-success-message="formAction.formSuccessMessage" 
                           :form-error-message="formAction.formErrorMessage"
                            >
                          </AlertNotification>
                          <br>
        
          <v-form>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="renter.firstname"
            label="First Name"
            outlined
            readonly
            color="#C5C6C7"
            style="color: white;"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="renter.lastname"
            label="Last Name"
            outlined
            readonly
            color="#C5C6C7"
            style="color: white;"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Contact and Location Section -->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="renter.email"
            label="Email"
            outlined
            readonly
            color="#C5C6C7"
            style="color: white;"
          ></v-text-field>
        </v-col>
<v-col cols="12" sm="6">
          <v-select
            v-model="selectedTime"
            :items="timeOptions"
            label="Select Time"
            outlined
            color="#C5C6C7"
            style="color: white;"
          ></v-select>
        </v-col>
        
      </v-row>

      <!-- Rental and Laptop Details -->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="rentalDays"
            label="Rental Days"
            outlined
            color="#C5C6C7"
            type="number"
            style="color: white;"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="laptop"
            :items="laptopModels"
            label="Laptop Model"
            outlined
            color="#C5C6C7"
            style="color: white;"
          ></v-select>
        </v-col>
      </v-row>

      <!-- Date and Time Selection -->
      <v-row>

        
        <v-col cols="12" sm="6" class="d-flex justify-center">
          <v-date-picker
            v-model="selectedDate"
            :min="today" 
            label="Select Date"
            outlined
            color="cyan"
            @change="handleDateChange"
            style="background-color: #1F2833; border-radius: 10px; color: cyan; border: 1px solid #66FCF1;"
          ></v-date-picker>
        </v-col>

        <v-col cols="12" sm="6">
        <v-text-field
          v-model="meetupPlace"
          label="Meet-up Place"
          outlined
          readonly
          color="#C5C6C7"
          style="color: white;"
        ></v-text-field>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014.0913711541785!2d125.59720176000253!3d8.955168374883792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301eb718c34871d%3A0x6e2100629a1a0a27!2sCSU%20Main%20College%20of%20Computing%20and%20Information%20Sciences!5e1!3m2!1sen!2sph!4v1732915131845!5m2!1sen!2sph"
          width="600"
          height="450"
          style="border:0; width: 100%; height: 300px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </v-col>
        <!-- Embedded Google Map -->
       
        
      </v-row>
    </v-card-text>

      <!-- Submit Button -->
      <v-card-actions>
        <v-btn block @click="submitForm" style="font-size: 18px; font-weight: bold; 
          padding: 10px 0; border-radius: 5px; background: linear-gradient(45deg, #1F2833, #66FCF1); 
          color: white; border: none;"> Submit Appointment
        </v-btn>
      </v-card-actions>
    </v-form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>





<style scoped>
.floating-img {
  animation: floatUpDown 3s ease-in-out infinite;
}

@keyframes floatUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0); 
  }
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