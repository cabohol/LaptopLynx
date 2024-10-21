<template>
  <v-app id="inspire">
    <!-- App Bar -->
    <v-app-bar
      elevation="3"
    >
      <v-app-bar-nav-icon style="color: #66FCF1;" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <img src="/src/images/logo1.png" width="50" alt="Logo" class="logo" />
        <v-toolbar-title class="ml-2">
          <h3 style="color: #66FCF1;">LaptopLynx</h3>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon style="color: #66FCF1;">mdi-bell</v-icon>
      </v-btn>

      <!-- Profile Dropdown -->
       
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
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="myfiles"></v-list-item>
        <v-list-item
  prepend-icon="mdi-account"
  title="Profile"
  :to="{ name: 'profile' }" 
></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Log out" value="starred"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main :class="{ 'main-content-shift': drawer }" class="main-content" style="background-color: #0B0C10;">
      <v-container>
        <br>
        <br>
        <br>
        <br>

        <!-- Use v-row and v-col for layout -->
        <v-row>
         <!-- Table Column -->
         <v-col cols="12" md="8">
  <v-table fixed-header style="background-color: #1F2833; color: white;">
    <thead>
      <tr>
        <th class="text-center" style="background-color: #1F2833; color:#66FCF1;"><b><h3>Fullname</h3></b></th>
        <th class="text-center" style="background-color: #1F2833; color:#66FCF1;"><b><h3>Rate per Day</h3></b></th>
        <th class="text-center" style="background-color: #1F2833; color:#66FCF1;"><b><h3>Model of Laptop</h3></b> </th>
        <th class="text-center" style="background-color: #1F2833; color:#66FCF1;"><b><h3>Confirmation</h3></b></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in laptops" :key="item.model">
        <td class="text-center">{{ item.fullname }}</td>
        <td class="text-center">{{ item.ratePerDay }}</td>
        <td class="text-center">{{ item.model }}</td>
        <td class="text-center">
          <v-btn class="mx-2" color="green" @click="accept(item)">Accept</v-btn>
          <v-btn class="mx-2" color="red" @click="reject(item)">Reject</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</v-col>


      <v-col cols="12" md="4">
          <v-card fixed-header class="mx-auto" style="background-color: #1F2833; color: white;">
            <v-card-text>
              <div class="text-center"><h2 style="color: #66FCF1 ;">Appointments</h2> </div>

              <v-timeline align="start" density="compact">
                <v-timeline-item
                  v-for="appointment in appointments"
                  :key="appointment.time"
                  dot-color="cyan-accent-2" 
                  color="black"     

                  size="x-small"
                >
                <div>
              <strong>Time:{{ appointment.time }}</strong> <!-- Time displayed here -->
            </div>

                  <!-- Appointment details on the right -->
                  <div class="mb-4">
                    <div>
                      <strong>Renter: </strong>{{ appointment.renter }}
                    </div>
                    <div>
                      <strong>Date: </strong>{{ appointment.date }}
                    </div>
                    <div>
                      <strong>Laptop Model: </strong>{{ appointment.laptopModel }}
                    </div>
                    <div>
                      <strong>Meet-up: </strong>{{ appointment.meetUp }}
                    </div>
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

<script>
export default {
  data() {
    return {
      admin: {
        fullname: 'Melvin Jipos',
        email: 'melvinjipos@gmail.com',
        avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
      },
      laptops: [
        {
          fullname: 'John Doe',
          ratePerDay: 500,
          model: 'Dell XPS 13',
        },
      ],
      appointments: [
        {
          time: '09:00 AM',
          renter: 'Mark Oldman',
          date: '2024-10-16',
          laptopModel: 'MacBook Pro',
          meetUp: 'CSU (Hiraya Hall)',
        },
        // ... other appointments
      ],
    };
  },
  methods: {
    logout() {
      console.log("User logged out");
    },
    accept(item) {
      console.log(`Accepted ${item.fullname}'s laptop rental: ${item.model}`);
    },
    reject(item) {
      console.log(`Rejected ${item.fullname}'s laptop rental: ${item.model}`);
    },
  },
};
</script>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<style scoped>
/* App Bar and Drawer Background Color */
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
  background-color: #1F2833; /* Ensure this matches the drawer color */
}


.main-content-shift {
  margin-left: 250px; /* Adjust this value according to the width of your drawer */
  transition: margin-left 0.3s ease; /* Smooth transition effect */
}
</style>
