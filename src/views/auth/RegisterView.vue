<script setup>
import { 
  requiredValidator, 
  emailValidator, 
  passwordValidator, 
  confirmedValidator 
} 
from '@/utils/validators';
import { ref, watch } from 'vue';
import AlertNotification from '@/components/common/AlertNotification.vue';
import { supabase, formActionDefault } from '@/utils/supabase';
import { useRouter } from 'vue-router';

const router = useRouter();

const isPasswordVisible = ref(false);
const isPasswordConfirmVisible = ref(false);

const formDataDefault = {
  firstname: '',
  lastname: '',
  phone_number: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '' // Ensure this is bound correctly in v-btn-toggle
};

const formData = ref({ ...formDataDefault });

const refVForm = ref();
const formAction = ref({ ...formActionDefault });

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid && formData.value.role) {
      onSubmit();
    } else if (!formData.value.role) {
      alert("Please select a role before signing up.");
    }
  });
};

const onSubmit = async () => {
  formAction.value = { ...formActionDefault };
  formAction.value.formProcess = true;

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        phone_number: formData.value.phone_number,
        role: formData.value.role,
        is_admin: false//formData.value.role === 'admin' // Set admin status based on role
      }
    }
  });

  if (error) {
    console.error(error);
    formAction.value.formErrorMessage = error.message;
    formAction.value.formStatus = error.status;
  } else if (data) {
    console.log(data);
    formAction.value.formSuccessMessage = 'Successfully Registered Account!';
    router.replace('/LoginView');
  }

  refVForm.value?.reset();
  formAction.value.formProcess = false;
};

watch(() => formData.value.role, (newRole) => {
  console.log("Role updated:", newRole); // Log role updates for debugging
});


// IF HUMANA NAKA REG AND ADMIN

// const onSubmit = async () => {
//   formAction.value = { ...formActionDefault };
//   formAction.value.formProcess = true;

//   // Allow only non-admin roles to register
//   if (formData.value.role === 'admin') {
//     alert("Unauthorized role selection. Only authorized personnel can register as admin.");
//     formAction.value.formProcess = false;
//     return;
//   }

//   const { data, error } = await supabase.auth.signUp({
//     email: formData.value.email,
//     password: formData.value.password,
//     options: {
//       data: {
//         firstname: formData.value.firstname,
//         lastname: formData.value.lastname,
//         phone_number: formData.value.phone_number,
//         role: formData.value.role,
//         is_admin: false // Always set is_admin to false in the registration flow
//       }
//     }
//   });

//   if (error) {
//     console.error(error);
//     formAction.value.formErrorMessage = error.message;
//     formAction.value.formStatus = error.status;
//   } else if (data) {
//     console.log(data);
//     formAction.value.formSuccessMessage = 'Successfully Registered Account!';
//     router.replace('/LoginView');
//   }

//   refVForm.value?.reset();
//   formAction.value.formProcess = false;
// };


</script>






<template>
  <v-app>
    <v-main class="main-container">
      <v-container class="form-container">
        <v-row justify="center">
          <v-col cols="12" sm="10">
            <v-card class="custom-card elevation-5">
              <v-window v-model="step">
                <!-- Sign Up Window -->
                <v-window-item :value="2">
                  <v-row>
                    <v-col cols="12" md="6" class="right-panel">
                      <img src="/src/images/logolynx.png" alt="Your Logo" class="logo" style="margin: 10px 0; max-width: 100%;" />
                      <br>
                      <br>
                      <br>

                  
                      <v-btn class="signup-btn" to="/LoginView">New Here? <span class="no-underline">Create an Account</span></v-btn>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card-text class="text-center">
                        <h4 class="form-title">Create an Account</h4>
                        <p class="form-description">Join our community today and enjoy our services.</p>

                        <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                          <!-- Role Selection Toggle -->
                           <br>
                          <AlertNotification
                           :form-success-message="formAction.formSuccessMessage" 
                           :form-error-message="formAction.formErrorMessage"
                            >
                          </AlertNotification>
                           <br>
                          <v-btn-toggle v-model="formData.role" mandatory>
                            <v-btn :value="'renter'" :class="formData.role === 'renter' ? 'active-btn' : 'toggle-btn'">
                              RENTER
                            </v-btn>
                            <v-btn :value="'admin'" :class="formData.role === 'admin' ? 'active-btn' : 'toggle-btn'">
                              ADMIN
                            </v-btn>
                          </v-btn-toggle>
                          <br>
                          <v-row class="mt-4">
                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="formData.firstname"
                                label="Firstname"
                                outlined
                                dense
                                class="custom-input"
                                prepend-inner-icon="mdi-account"
                                :rules="[requiredValidator]"
                              />
                            </v-col>

                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="formData.lastname"
                                label="Lastname"
                                outlined
                                dense
                                class="custom-input"
                                prepend-inner-icon="mdi-account"
                                :rules="[requiredValidator]"
                              />
                            </v-col>
                          </v-row>
                          
                          <v-text-field

  v-model="formData.phone_number"
  label="Phone Number"
  outlined
  dense
  class="custom-input"
  prepend-inner-icon="mdi-phone"
  :rules="[requiredValidator]"
  @input="formData.phone_number = formData.phone_number.replace(/\D/g, '')"
  />

                            

                          <v-text-field
                            v-model="formData.email"
                            label="Email"
                            outlined
                            dense
                            class="custom-input"
                            prepend-inner-icon="mdi-email"
                            :rules="[requiredValidator, emailValidator]"
                          />

                          <v-text-field
                            v-model="formData.password"
                            label="Password"
                            outlined
                            dense
                            :type="isPasswordVisible ? 'text' : 'password'"
                            class="custom-input"
                            prepend-inner-icon="mdi-lock"
                            :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'" 
                            @click:append="isPasswordVisible = !isPasswordVisible" 
                            :rules="[requiredValidator, passwordValidator]"
                            append-icon-class="white--text"
                          />

                          <v-text-field
                            v-model="formData.password_confirmation"
                            label="Confirm Password"
                            outlined
                            dense
                            :type="isPasswordConfirmVisible ? 'text' : 'password'"
                            class="custom-input"
                            prepend-inner-icon="mdi-lock"
                            :append-icon="isPasswordConfirmVisible ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="isPasswordConfirmVisible = !isPasswordConfirmVisible"
                            :rules="[requiredValidator, confirmedValidator(formData.password_confirmation, formData.password)]"
                            append-icon-class="white--text"
                          />

                          <v-btn class="signup-btn" type="submit" 
                          block
                          :disabled="formAction.formProcess"
                          :loading="formAction.formProcess"
                          >
                          <v-icon left>mdi-account-plus</v-icon>
                            Sign Up
                          </v-btn>
                        </v-form>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          © 2024 LaptopLynx Inc. All Rights Reserved. Developed by LaptopLynx Team
        </div>
      </footer>
    </v-main>
  </v-app>
</template>




<style scoped>
.main-container {
  background: linear-gradient(135deg, #0B0C10, #1F2833, #45A29E, #66FCF1, #C5C6C7);
  background-size: 300% 300%; 
  animation: oceanGradient 6s ease infinite; 
  min-height: 100vh;
  padding: 40px 0;
}

@keyframes oceanGradient {
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


.form-container {
  margin-top: 30px;
}

/* .custom-card {
  border-radius: 16px;
  padding: 30px;
  background-color: #1F2833;
} */

.custom-card {
  border-radius: 16px;
  padding: 30px;
  background: linear-gradient(145deg, #1F2833, #212d3a);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  transform: scale(0.98);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.5s ease;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  position: relative;
  overflow: hidden;
}


.custom-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top left, rgba(102, 252, 241, 0.1), transparent);
  pointer-events: none;
  transition: opacity 0.3s ease;
}


.custom-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 12px 24px rgba(102, 252, 241, 0.4);
  background: linear-gradient(145deg, #1a222d, #1F2833);
}

.custom-card:hover::before {
  opacity: 0.4;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}



.left-panel {
  padding: 40px;
}

.right-panel {
  background: linear-gradient(to bottom, #0B0C10, #1F2024);
  color: #C5C6C7;
  text-align: center;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* .form-title {
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: bold;
  color: #66FCF1;
}

.form-description {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #C5C6C7;
} */

.form-title {
  font-family: 'Poppins', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #66FCF1;
  letter-spacing: 1.2px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(102, 252, 241, 0.4);
}


.form-description {
  font-family: 'Poppins', sans-serif;
  font-size: 17px;
  color: #FFFFFF;
  margin-top: 10px;
  line-height: 1.8;
  padding-left: 10px;
  letter-spacing: 0.4px;
}


.custom-input {
  margin-top: 15px;
  color: #C5C6C7;
}
.login-btn, .signup-btn, .back-to-login {
  margin-top: 20px;
  background: linear-gradient(135deg, #66FCF1 0%, #45A29E 100%);
  color: #0B0C10;
  text-transform: none;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
}

.login-btn:hover, .signup-btn:hover, .back-to-login:hover {
  background: linear-gradient(135deg, #45A29E 0%, #66FCF1 100%); 
}



.footer {
  color: #0B0C10; 
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer-content {
  font-size: 14px; 
}


.v-btn .v-icon {
  margin-right: 8px; 
  font-size: 20px; 
  transition: transform 0.2s ease; 
}

.login-btn .v-icon:hover,
.signup-btn .v-icon:hover {
  transform: scale(1.1); 
}


.logo {
  animation: floatLogo 3s ease-in-out infinite; 
}

@keyframes floatLogo {
  0%, 100% {
    transform: translateY(0); 
  }
  50% {
    transform: translateY(-10px); 
  }
}

.login-btn a {
  text-decoration: none;
  color: inherit; 
}

.no-underline {
  text-decoration: none;
}

.signup-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  font-size: 1rem; 
}

@media (max-width: 768px) {
  .signup-btn {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .signup-btn {
    font-size: 0.8rem;
    padding: 8px 15px;
  }
}

@media (max-width: 400px) {
  .signup-btn {
    font-size: 0.7rem; 
    padding: 8px 15px; 
  }
}

.back-to-login {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  font-size: 1rem;
}

@media (max-width: 768px) {
  .back-to-login {
    font-size: 0.7rem; 
  }
}

@media (max-width: 480px) {
  .back-to-login {
    font-size: 0.8rem; 
    padding: 8px 15px;
  }
}

@media (max-width: 400px) {
  .back-to-login{
    font-size: 0.7rem; 
    padding: 8px 15px; 
  }
}

.toggle-btn {
  color: white;
  background-color: black;
  transition: background-color 0.3s;
}

.active-btn {
  background-color: #66FCF1 !important;
}

</style>









