<script setup>
import { ref, onMounted } from 'vue';
import { formActionDefault, supabase } from '@/utils/supabase';
import { useRouter } from 'vue-router';

const drawer = ref(false);
const router = useRouter();

const renter = ref({
  fullname: '',
  email: '',
  phone_number: '',
  avatar: '',
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
    renter.value.phone_number = metadata?.phone_number || 'Not Provided';
    renter.value.avatar = metadata?.avatar || '';
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

const updateProfileImage = async (file, userId) => {
  try {
    // Define the path where the image will be stored
    const filePath = `avatars/${userId}_${Date.now()}.${file.name.split('.').pop()}`;

    // Upload the image to the Supabase storage bucket
    const { data, error } = await supabase.storage
      .from('laptoplynx')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    // Get the public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from('laptoplynx')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error updating profile image:', error);
    return null;
  }
};

const saveProfile = async () => {
  if (!selectedFile.value) {
    console.error('No file selected');
    return;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.error('Error fetching user:', error);
    return;
  }

  const userId = data.user.id;
  const publicUrl = await updateProfileImage(selectedFile.value, userId);

  if (publicUrl) {
    // Update user metadata in Supabase Auth
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        avatar: publicUrl,
      },
    });

    if (updateError) {
      console.error('Error updating user metadata:', updateError);
      return;
    }

    // Update the local renter object and UI
    renter.value.avatar = publicUrl;
    dialog.value = false;
    console.log('Profile updated successfully');
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
        <v-list-item prepend-icon="mdi-calendar-check" title="Booking" :to="{ name: 'booking' }"></v-list-item>
        <v-list-item prepend-icon="mdi-bell" title="Notifications":to="{ name: 'notifications' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'customerprofile' }"></v-list-item>
        <v-list-item @click="onLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>

      </v-list>
    </v-navigation-drawer>

   <v-main>
    <v-container fluid>

        <br><br><br><br>

        <v-row justify="center">
          <v-col cols="12" md="7" class="d-flex flex-column align-items-center" style="margin-top: 40px;">
            <v-avatar
              class="profile-avatar mx-auto"
              size="180"
            >
              <img :src="renter.avatar" alt="Profile Picture" width="100%" />
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
                  <strong>Email:</strong> {{ renter.email }}
                  </v-card-subtitle>
                  <v-card-subtitle
                    class="text-body-2 text-md-body-1 text-lg-subtitle-1 text-center"
                    style="color: white;"
                  >
                  <strong>Contact Number:</strong> {{ renter.phone_number }}
                  </v-card-subtitle>
                  <v-btn block class="mt-10 profile-edit-btn" @click="dialog = true">Edit Profile</v-btn>
                </v-card>
          </v-col>
        </v-row>

        <!-- File Input Dialog -->
        <v-dialog v-model="dialog" max-width="400" style="border-radius: 12px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); background-color: #1F2833;">
    <v-card style="border-radius: 12px; background-color: #1F2833;">
      <v-card-title style="background-color: #0B0C10; color: #66FCF1; padding: 16px; border-top-left-radius: 12px; border-top-right-radius: 12px;">
        <span class="text-h5" style="font-weight: 600;">Select a new profile picture</span>
      </v-card-title>
      <v-card-text style="padding: 24px; display: flex; flex-direction: column; align-items: center; color: #C5C6C7;">
        <input 
          type="file" 
          @change="onImageChange" 
          accept="image/*"
          style="border: 2px solid #66FCF1; border-radius: 8px; padding: 8px 12px; font-size: 16px; cursor: pointer; background-color: #1F2833; color: #0B0C10; transition: background-color 0.3s ease, border-color 0.3s ease;"
        />
      </v-card-text>
      <v-card-actions style="padding: 16px; display: flex; justify-content: flex-end; gap: 12px;">
        <v-btn text @click="dialog = false" style="color: #66FCF1; background-color: #0B0C10; border-radius: 8px; padding: 8px 16px; font-weight: 500;">Cancel</v-btn>
        <v-btn text @click="saveProfile" style="color: #66FCF1; background-color: #0B0C10; border-radius: 8px; padding: 8px 16px; font-weight: 500;">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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

.v-main {
  margin-left: 0 !important;
  padding: 16px;
  background-color: #1F2833;
  transition: none;
}

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
  background: linear-gradient(135deg, #1F2833, #2C3E50); 
  color: #66FCF1; 
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
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
