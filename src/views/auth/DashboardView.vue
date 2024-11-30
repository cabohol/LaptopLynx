<script setup>
import { supabase } from '@/utils/supabase';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AlertNotification from '@/components/common/AlertNotification.vue';


// State management
const drawer = ref(false); // Drawer toggle
const router = useRouter();
const admin = ref({
  fullname: '',
  email: '',
  avatar: localStorage.getItem('admin-avatar') || '/src/images/Default_pfp.svg.png',
});
const formAction = ref({});
const appointments = ref([]);
const notifications = ref([]);

// Fetch admin data
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
    admin.value.avatar = metadata?.avatar || admin.value.avatar;
  }
};

// Fetch appointments
const getAppointments = async () => {
  const { data, error } = await supabase
    .from('appointments')
    .select('id, laptop_name, date_and_time, rental_days, firstname, lastname, status')
    .order('date_and_time', { ascending: true });

  if (error) {
    console.error('Error fetching appointments:', error);
    return;
  }

  appointments.value = data;
  getNotifications(); // Fetch notifications
};

// Fetch notifications
const getNotifications = async () => {
  const { data, error } = await supabase
    .from('notifications')
    .select('id, type, message, appointment_id')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching notifications:', error.message);
    return;
  }

  notifications.value = data;
};

// Add a notification
const addNotification = async (type, message, appointmentId) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{ type, message, appointment_id: appointmentId }]);

    if (error) {
      console.error('Error adding notification:', error.message);
      return;
    }

    console.log('Notification added:', data);
    getNotifications();
  } catch (err) {
    console.error('Unexpected error adding notification:', err);
  }
};

// Get notification for an appointment
const appointmentNotification = (appointment) => {
  const notification = notifications.value.find(n => n.appointment_id === appointment.id);

  if (!notification) {
    if (appointment.status === 'Accepted') {
      return { type: 'Accepted', message: `Successfully accepted appointment for ${appointment.laptop_name}.` };
    }
    if (appointment.status === 'Rejected') {
      return { type: 'Rejected', message: `Your appointment for ${appointment.laptop_name} has been rejected.` };
    }
    return null;
  }

  if (notification.type === 'Accepted') {
    notification.message = `Successfully accepted appointment for ${appointment.laptop_name}.`;
  } else if (notification.type === 'Rejected') {
    notification.message = `Your appointment for ${appointment.laptop_name} has been rejected.`;
  }

  return notification;
};

// Delete an appointment and its notifications
const deleteAppointment = async (appointment) => {
  try {
    const { error: notificationsError } = await supabase
      .from('notifications')
      .delete()
      .eq('appointment_id', appointment.id);

    if (notificationsError) {
      console.error('Error deleting notifications:', notificationsError);
      //alert(`Failed to delete related notifications: ${notificationsError.message}`);
      formAction.value.formErrorMessage = 'Failed to delete related notifications: ${notificationsError.message';

      return;
    }

    const { error: appointmentError } = await supabase
      .from('appointments')
      .delete()
      .eq('id', appointment.id);

    if (appointmentError) {
      console.error('Error deleting appointment:', appointmentError);
      //alert(`Failed to delete appointment: ${appointmentError.message}`);
      formAction.value.formErrorMessage = `Failed to delete appointment: ${appointmentError.message}`;
      return;
    }

    appointments.value = appointments.value.filter(a => a.id !== appointment.id);
    //alert('Appointment and related notifications successfully deleted.');
    formAction.value.formSuccessMessage = 'Appointment and related notifications successfully deleted.'
  } catch (err) {
    console.error('Unexpected error deleting appointment:', err);
    //alert('An unexpected error occurred while deleting the appointment.');

    formAction.value.formErrorMessage = 'An unexpected error occurred while deleting the appointment.';
  }
};

// Accept an appointment
const acceptAppointment = async (appointment) => {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'Accepted' })
      .eq('id', appointment.id);

    if (error) {
      console.error('Error accepting appointment:', error);
      //alert('Failed to accept the appointment.');
      formAction.value.formErrorMessage = 'Failed to accept the appointment.';
      return;
    }

    appointment.status = 'Accepted';
    const successMessage = `Successfully accepted the appointment for ${appointment.laptop_name}.`;
    await addNotification('Accepted', successMessage, appointment.id);
    //alert('Appointment accepted successfully.');
    formAction.value.formSuccessMessage = 'Appointment accepted successfully.';
  } catch (err) {
    console.error('Unexpected error accepting appointment:', err);
    //alert('An unexpected error occurred while accepting the appointment.');
    formAction.value.formErrorMessage = 'An unexpected error occurred while accepting the appointment.';
  }
};

// Reject an appointment
const rejectAppointment = async (appointment) => {
  try {
    // Update the appointment status to 'Rejected'
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'Rejected' }) // Change status instead of deleting
      .eq('id', appointment.id);

    if (error) {
      console.error('Error rejecting appointment:', error);
      formAction.value.formErrorMessage = 'Failed to reject the appointment.';
      return;
    }

    // Update the local state for the appointment
    const updatedAppointment = appointments.value.find(a => a.id === appointment.id);
    if (updatedAppointment) {
      updatedAppointment.status = 'Rejected';
    }

    // Add a rejection notification
    const successMessage = `Your booking for ${appointment.laptop_name} has been rejected.`;
    await addNotification('Rejected', successMessage, appointment.id);

    formAction.value.formSuccessMessage = 'Appointment rejected successfully.';
  } catch (err) {
    console.error('Unexpected error rejecting appointment:', err);
    formAction.value.formErrorMessage = 'An unexpected error occurred while rejecting the appointment.';
  }
};


// Logout function
const onLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error);
    return;
  }

  router.replace('/LoginView');
};

// On component mount
onMounted(() => {
  getAdminData();
  getAppointments();
});
</script>





<template>
  <v-app id="inspire">
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
        <v-list-item :prepend-avatar="admin.avatar" :subtitle="admin.email" :title="admin.fullname"></v-list-item>
      </v-list>
      <v-divider style="color: bisque;"></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'profile' }"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Log out"value="logout" @click="onLogout" :loading="formAction.formProcess" :disabled="formAction.formProcess"></v-list-item></v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="main-content" style="background-color: #1F2833;">
      <v-card style="margin-top: 70px; margin-bottom: 20px; background: linear-gradient(to bottom, #0B0C10, #1A1C23);">
        <v-card-text style="color: #E2DAD6;">
          <v-row>
            <v-col cols="12" sm="3" :class="mdAndDown ? 'd-flex justify-center align-center' : ''">
              <v-img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462568879_1068096351387700_3074067409424495304_n.png?_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFucn2vC8_y2RUX7gCXtbUthrz3YobBPg2GvPdihsE-DRdRBgxt66N5RXQFb3CJS2aydhLnPUDOpdiba360L2oK&_nc_ohc=pL_7bk9g6RYQ7kNvgHUsAMh&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QESkyuzEgfyGNOmHn20oNBngFZRzPFQnrNcsVOi_2ukiw&oe=67721CB2" style="height: 250px; width: 250px; margin-left: 30px;"></v-img>
            </v-col>
            <v-col cols="12" sm="9" style="margin-top: 60px;">
              <h2 class="mb-5">
                Greetings, <span class="font-weight-black">{{ admin.fullname }}</span>! Ready to Manage your LaptopLynx?
              </h2>
              <p class="text-justify">
                Welcome to LaptopLynx Admin! As an admin, you’ll manage laptops, track performance, and handle repair requests. 
                You have control over keeping the platform running smoothly and ensuring devices are in top condition. 
                Log in to start managing your admin account, or register to get started. Thanks for choosing LaptopLynx—making laptop management easy and efficient!
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

    
      <AlertNotification
       :form-success-message="formAction.formSuccessMessage" 
       :form-error-message="formAction.formErrorMessage">
      </AlertNotification>
                        

      <!-- Appointments Section -->
      <v-container fluid>
        <v-row class="mt-12" justify="center">
          <!-- Appointments Table -->
          <v-col cols="12" md="8">
            <v-table fixed-header style="background-color: #1F2833; color: white; border: 2px solid #66FCF1;">
              <thead>
                <tr>
                  <!-- Table Headers -->
                  <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Renter</h3></b></th>
                  <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Time</h3></b></th>
                  <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Laptop Model</h3></b></th>
                  <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Location</h3></b></th>
                  <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Actions</h3></b></th>
                  <th class="text-center" style="background-color: #1F2833; color: #66FCF1;"><b><h3>Status</h3></b></th>
                </tr>
              </thead>
              <tbody>
                <!-- Appointment Rows -->
                <tr v-for="appointment in appointments" :key="appointment.id">
                  <td class="text-center">{{ `${appointment.firstname} ${appointment.lastname}` }}</td>
                  <td class="text-center">{{ appointment.date_and_time }}</td>
                  <td class="text-center">{{ appointment.laptop_name }}</td>
                  <td class="text-center">Hiraya Hall - CSU</td>
                  <td class="text-center">
                    <div v-if="appointment.status !== 'Accepted'" class="d-flex align-center">
                        <v-btn :color="appointment.status === 'Accepted' ? 'green' : 'success'"  class="mx-2" @click="acceptAppointment(appointment)">
                          Accept
                        </v-btn>
                        <v-btn :color="appointment.status === 'Rejected' ? 'red' : 'error'" class="mx-2" @click="rejectAppointment(appointment)">
                          Delete
                        </v-btn>
                    </div>
                  </td>
                  <td class="text-center">{{ appointment.status || 'Pending' }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>

          <!-- Timeline (Additional Info) -->
          <v-col cols="12" md="4">
            <v-card fixed-header class="mx-auto" style="background-color: #1F2833; color: white; border: 2px solid #66FCF1;">
              <v-card-text>
                <!-- Timeline Header -->
                <div class="text-center">
                  <h2 style="color: #66FCF1;">Appointments</h2>
                </div>
                <v-timeline align="start" density="compact">
                  <v-timeline-item v-for="appointment in appointments" :key="appointment.date_and_time" dot-color="cyan-accent-2" color="black" size="x-small">
                    <div><strong style="color: #66FCF1; font-size: 15px;">Time:</strong> {{ appointment.date_and_time }}</div>
                    <div class="mb-4">
                      <div><strong style="color: #66FCF1; font-size: 15px;">Renter: </strong>{{ `${appointment.firstname} ${appointment.lastname}` }}</div>
                      <div><strong style="color: #66FCF1; font-size: 15px;">Laptop Model: </strong>{{ appointment.laptop_name }}</div>
                      <div><strong style="color: #66FCF1; font-size: 15px;">Rental days: </strong>{{ appointment.rental_days }}</div>
                      <div><strong style="color: #66FCF1; font-size: 15px;">Meet-up: </strong>Hiraya Hall - CSU</div>
                      <div v-if="appointmentNotification(appointment)">
                        <div><strong style="color: #66FCF1; font-size: 15px;">Notification Type: </strong>{{ appointmentNotification(appointment).type }}</div>
                        <div><strong style="color: #66FCF1; font-size: 15px;">Message: </strong>{{ appointmentNotification(appointment).message }}</div>
                      </div>
                      <v-btn color="error" class="mx-1 mt-1 " @click="deleteAppointment(appointment)">Delete</v-btn>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
