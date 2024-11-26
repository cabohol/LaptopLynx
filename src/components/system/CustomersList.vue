<script setup>
import { ref, onMounted } from 'vue';
import { formActionDefault, supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const router = useRouter();

const renter = ref({
  fullname: '',
  email: '',
  created_at: '', // Replaced phone_number with created_at
  avatar: localStorage.getItem('user-avatar') || '/src/images/Default_pfp.svg.png', // Default profile picture or stored avatar
});

const formAction = ref({
  ...formActionDefault,
});

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
    renter.value.created_at = new Date(user.created_at).toLocaleDateString(); // Fetching and formatting the created_at timestamp
  }
};

onMounted(() => {
  getRenterData();
});

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

const dialog = ref(false);
const selectedFile = ref(null);

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
  }
};

const uploadProfilePicture = async () => {
  if (!selectedFile.value) {
    alert('Please select a file!');
    return;
  }

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    alert('No user is logged in.');
    return;
  }

  const fileName = `avatars/${user.id}/${selectedFile.value.name}`;
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, selectedFile.value, {
      upsert: true,
    });

  if (error) {
    console.error('Error uploading file:', error);
    alert('Failed to upload profile picture. Try again.');
    return;
  }

  const { data: publicUrlData, error: urlError } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  if (urlError) {
    console.error('Error getting public URL:', urlError);
    alert('Failed to retrieve uploaded image URL.');
    return;
  }

  const { error: updateError } = await supabase.auth.updateUser({
    user_metadata: { avatar: publicUrlData.publicUrl },
  });

  if (updateError) {
    console.error('Error updating user data:', updateError);
    alert('Failed to update profile picture.');
    return;
  }

  renter.value.avatar = publicUrlData.publicUrl;
  alert('Profile picture updated successfully!');
  dialog.value = false;
};
</script>




<template>
    <v-app>
      <!-- App Bar -->
      <v-app-bar elevation="3">
        <v-app-bar-nav-icon style="color:#66FCF1;" @click="drawer = !drawer"></v-app-bar-nav-icon>
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
          <br />
          <v-list-item
            :prepend-avatar="renter.avatar"
            :subtitle="renter.email"
            :title="renter.fullname"
          ></v-list-item>
        </v-list>
        <v-divider style="color: bisque;"></v-divider>
  
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{ name: 'dashboard' }"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Customer's List" :to="{ name: 'customerslist' }"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'profile' }"></v-list-item>
          <v-list-item @click="onLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <!-- Main Container -->
      <v-main>
        <v-container fluid>
          <v-row class="mt-12" justify="center">
            <!-- Table Column -->
            <v-col cols="12" md="12" class="fixed-profile">
              <v-table fixed-header style="background-color: #1F2833; color: white; border: 1px solid cyan;">
                <thead>
                  <tr>
                    <th class="text-center" style="background-color: #1F2833; color: #66FCF1;">
                      <b><h3>Fullname</h3></b>
                    </th>
                    <th class="text-center" style="background-color: #1F2833; color: #66FCF1;">
                      <b><h3>Email</h3></b>
                    </th>
                    <th class="text-center" style="background-color: #1F2833; color: #66FCF1;">
                      <b><h3>Date Registered</h3></b>
                    </th>
                    <th class="text-center" style="background-color: #1F2833; color: #66FCF1;">
                      <b><h3>Actions</h3></b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">{{ renter.fullname }}</td>
                    <td class="text-center">{{ renter.email }}</td>
                    <td class="text-center">{{ renter.created_at }}</td>
                    <td class="text-center">
                      <v-btn class="mx-2" color="red" @click="deleteUser">Delete</v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  




<style scoped>
/* Code para di mu lihok ang main container */
.fixed-profile {
    position: fixed;
    left: 50%; 
    transform: translate(-50%, -50%); 
    z-index: 1000; 
}


.v-main {
  background-color: #1F2833;
  transition: none;
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


.v-app-bar {
  background-color: #1F2833;
}

.v-navigation-drawer {
  background: linear-gradient(135deg, #1F2833, #2C3E50); 
  color: #66FCF1; 
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
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