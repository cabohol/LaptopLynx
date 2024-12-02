<script setup>
import { ref, onMounted } from 'vue';
import { formActionDefault, supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';
import AlertNotification from '@/components/common/AlertNotification.vue';

const router = useRouter();

const renter = ref({
  firstname: '',
  lastname: '',
  email: '',
  avatar: localStorage.getItem('customer-avatar') || '/src/images/Default_pfp.svg.png',
});

const formAction = ref({
  ...formActionDefault,
});

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

const drawer = ref(false);

const laptop = ref(null);
const selectedDate = ref(null);
const selectedTime = ref(null);
const rentalDays = ref('');
const meetupPlace = ref('CSU (Hiraya Hall)');
const today = new Date().toISOString().substr(0, 10);

const handleDateChange = () => {
  console.log('Selected date:', selectedDate.value);
};

const timeOptions = [
  '08:00 A.M', '09:00 A.M', '10:00 A.M', '11:00 A.M', '12:00 NN',
  '1:00 P.M', '2:00 P.M', '3:00 P.M', '4:00 P.M', '5:00 P.M',
];

// Laptops list
const laptops = ref([
{ id: 1, name: 'Dell XPS 13', price: '₱180/day', booked: false, category: 'Gaming' },
  { id: 2, name: 'Asus ROG Zephyrus G14', price: '₱200/day', booked: false,  category: 'Gaming' },
  { id: 3, name: 'MacBook Pro 16', price: '₱200/day', booked: false,  category: 'Projects'},
  { id: 4, name: 'HP Spectre x360', price: '₱190/day', booked: false,  category: 'Coding' },
  { id: 5, name: 'Lenovo ThinkPad X1', price: '₱170/day', booked: false,  category: 'Coding' },
  { id: 6, name: 'MSI GS66 Stealth', price: '₱200/day', booked: false,  category: 'Gaming'},
  { id: 7, name: 'Razer Blade 15', price: '₱190/day', booked: false,  category: 'Gaming'},
  { id: 8, name: 'Huawei MateBook D15', price: '₱150/day', booked: false,  category: 'Projects'},
  { id: 9, name: 'Acer Aspire 5', price: '₱160/day', booked: false,  category: 'Projects'},
  { id: 10, name: 'Acer Nitro 5', price: '₱200/day', booked: false,  category: 'Gaming'},
  { id: 11, name: 'Lenovo V15 Gen 5', price: '₱170/day', booked: false,  category: 'Projects'},
  { id: 12, name: 'Acer Predator Helios', price: '₱230/day', booked: false,  category: 'Gaming' },
]);

const availableLaptops = ref([]);

// Fetch available laptops considering the booking state stored in localStorage
const fetchAvailableLaptops = () => {
  const bookedLaptopIds = JSON.parse(localStorage.getItem('bookedLaptops')) || [];
  availableLaptops.value = laptops.value
    .filter((laptop) => !bookedLaptopIds.includes(laptop.id))
    .map((laptop) => {
      // If laptop has a category (e.g., Gaming), include it in the displayed name
      return laptop.category ? `${laptop.name} (${laptop.price}) - ${laptop.category}` : `${laptop.name} (${laptop.price})`;
    });
};

// Retrieve renter data
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
    renter.value.firstname = metadata?.firstname || '';
    renter.value.lastname = metadata?.lastname || '';
    renter.value.avatar = metadata?.avatar || renter.value.avatar;
  }
};

onMounted(() => {
  getRenterData();
  fetchAvailableLaptops();
});

// Clear form inputs
const clearForm = () => {
  laptop.value = null;
  selectedDate.value = null;
  selectedTime.value = null;
  rentalDays.value = '';
};

// Submit the form and update booking state
const submitForm = async () => {
  if (!laptop.value || !selectedDate.value || !selectedTime.value || !rentalDays.value) {
    formAction.value.formErrorMessage = 'Please fill in all the required fields.';
    return;
  }

  try {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      formAction.value.formErrorMessage = 'You must be logged in to book an appointment.';
      return;
    }

    const userId = user.user.id;
    const timeParts = selectedTime.value.split(/[.: ]/);
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const period = timeParts[2];

    if (period === 'P' && hours !== 12) hours += 12;
    else if (period === 'A' && hours === 12) hours = 0;

    const localDateTime = new Date(selectedDate.value);
    localDateTime.setHours(hours, minutes, 0, 0);
    const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();

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
      formAction.value.formErrorMessage = 'Error booking appointment. Please try again.';
      return;
    }

    // Update booked laptops in localStorage
    const bookedLaptop = laptops.value.find((item) => `${item.name} (${item.price})` === laptop.value);
    if (bookedLaptop) {
      const bookedLaptopIds = JSON.parse(localStorage.getItem('bookedLaptops')) || [];
      bookedLaptopIds.push(bookedLaptop.id);
      localStorage.setItem('bookedLaptops', JSON.stringify(bookedLaptopIds));
    }

    fetchAvailableLaptops();

    formAction.value.formSuccessMessage = 'Your appointment has been successfully booked with LaptopLynx! Thank you for choosing us.';
    clearForm();
  } catch (error) {
    formAction.value.formErrorMessage = 'Something went wrong. Please try again.';
  }
};
</script>

<!-- <script setup>
import { ref, onMounted } from 'vue';
import { formActionDefault, supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';
import AlertNotification from '@/components/common/AlertNotification.vue';

const router = useRouter();

const renter = ref({
  firstname: '',
  lastname: '',
  email: '',
  avatar: localStorage.getItem('customer-avatar') || '/src/images/Default_pfp.svg.png',
});

const formAction = ref({
  ...formActionDefault,
});

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

const drawer = ref(false);

const laptop = ref(null);
const selectedDate = ref(null);
const selectedTime = ref(null);
const rentalDays = ref('');
const meetupPlace = ref('CSU (Hiraya Hall)');
const today = new Date().toISOString().substr(0, 10);

const handleDateChange = () => {
  console.log('Selected date:', selectedDate.value);
};

const timeOptions = [
  '08:00 A.M', '09:00 A.M', '10:00 A.M', '11:00 A.M', '12:00 NN',
  '1:00 P.M', '2:00 P.M', '3:00 P.M', '4:00 P.M', '5:00 P.M',
];

const laptops = ref([
  { id: 1, name: 'Dell XPS 13', price: '₱180/day', booked: false },
  { id: 2, name: 'Asus ROG Zephyrus G14', price: '₱200/day', booked: false },
  { id: 3, name: 'MacBook Pro 16', price: '₱200/day', booked: false },
  { id: 4, name: 'HP Spectre x360', price: '₱190/day', booked: false },
  { id: 5, name: 'Lenovo ThinkPad X1', price: '₱170/day', booked: false },
  { id: 6, name: 'MSI GS66 Stealth', price: '₱200/day', booked: false },
  { id: 7, name: 'Razer Blade 15', price: '₱190/day', booked: false },
  { id: 8, name: 'Huawei MateBook D15', price: '₱150/day', booked: false },
  { id: 9, name: 'Acer Aspire 5', price: '₱160/day', booked: false },
  { id: 10, name: 'Acer Nitro 5', price: '₱200/day', booked: false },
  { id: 11, name: 'Lenovo V15 Gen 5', price: '₱170/day', booked: false },
  { id: 12, name: 'Acer Predator Helios', price: '₱230/day', booked: false },
]);

const availableLaptops = ref([]);

const fetchAvailableLaptops = () => {
  availableLaptops.value = laptops.value.filter((laptop) => !laptop.booked).map(
    (laptop) => `${laptop.name} (${laptop.price})`
  );
};

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
    renter.value.firstname = metadata?.firstname || '';
    renter.value.lastname = metadata?.lastname || '';
    renter.value.avatar = metadata?.avatar || renter.value.avatar;
  }
};

onMounted(() => {
  getRenterData();
  fetchAvailableLaptops();
});

const clearForm = () => {
  laptop.value = null;
  selectedDate.value = null;
  selectedTime.value = null;
  rentalDays.value = '';
};

const submitForm = async () => {
  if (!laptop.value || !selectedDate.value || !selectedTime.value || !rentalDays.value) {
    formAction.value.formErrorMessage = 'Please fill in all the required fields.';
    return;
  }

  try {
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      formAction.value.formErrorMessage = 'You must be logged in to book an appointment.';
      return;
    }

    const userId = user.user.id;
    const timeParts = selectedTime.value.split(/[.: ]/);
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const period = timeParts[2];

    if (period === 'P' && hours !== 12) hours += 12;
    else if (period === 'A' && hours === 12) hours = 0;

    const localDateTime = new Date(selectedDate.value);
    localDateTime.setHours(hours, minutes, 0, 0);
    const utcDateTime = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();

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
      formAction.value.formErrorMessage = 'Error booking appointment. Please try again.';
      return;
    }

    const bookedLaptop = laptops.value.find((item) => `${item.name} (${item.price})` === laptop.value);
    if (bookedLaptop) {
      bookedLaptop.booked = true;
    }

    fetchAvailableLaptops();

    formAction.value.formSuccessMessage = 'Your appointment has been successfully booked with LaptopLynx! Thank you for choosing us.';
    clearForm();
  } catch (error) {
    formAction.value.formErrorMessage = 'Something went wrong. Please try again.';
  }
};
</script> -->




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
              <v-img class="mx-auto responsive-image floating-img" src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/462570242_934271424742614_8571727547548847619_n.png?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeH1u9_rN4jcrLeztslwfVjqZAEELCylFMtkAQQsLKUUy1QFK3TSl5AwXxCcyWyZ6SJMQhjjKMrvM_SSKpbb_19h&_nc_ohc=Q3u_OpXPqDoQ7kNvgGH6A3S&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&oh=03_Q7cD1QEeQoH3cN2NogbN0iTBrBfPFGjAxkGdRUFNv8-6XI8OtA&oe=6771F9C0" style="max-width: 350px; margin-bottom: 20px;"></v-img>
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
        <AlertNotification :form-success-message="formAction.formSuccessMessage" 
                           :form-error-message="formAction.formErrorMessage">
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
          :items="availableLaptops"
          label="Laptop Model (Price)"
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
     <div class="map-container">
         <!-- Start of Embedded Google Map -->  
         <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1014.0913711541785!2d125.59720176000253!3d8.955168374883792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301eb718c34871d%3A0x6e2100629a1a0a27!2sCSU%20Main%20College%20of%20Computing%20and%20Information%20Sciences!5e1!3m2!1sen!2sph!4v1732915131845!5m2!1sen!2sph"
          width="600"
          height="450"
          style="border:0; width: 100%; height: 300px;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
     </div>
      </v-col>
        <!-- End of Embedded Google Map -->  
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
.map-container {
  width: 100%;
  max-width: 800px; 
  margin: 5px auto; 
  background-color: cyan;
  border: 3px solid cyan; 
  overflow: hidden; 
}

.map-container iframe {
  width: 100%;
  height: 300px;
  border: none;
}

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