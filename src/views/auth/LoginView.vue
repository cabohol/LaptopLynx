<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators';
import { ref } from 'vue'

const isPasswordVisible = ref(false)
const refVForm = ref()

const onFormSubmit = () =>{
  // Validate the form
  if (refVForm.value?.validate()) {
    onLogin()
  }
}

const onLogin = () =>{
  //alert(formData.value.email)
}

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault
})

</script>

<template>
  <v-app>
    <v-main class="main-container">
      <v-container class="form-container">
        <v-row justify="center">
          <v-col cols="12" sm="10">
            <v-card class="custom-card elevation-5">
              <v-window v-model="step">
                <!-- Login Window -->
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6" class="left-panel">
                      <br />
                      <br />
                      <br />
                      <v-card-text class="text-center">
                        <h4 class="form-title">Log in to LaptopLynx</h4>
                        <p class="form-description">Access your account and continue exploring our services.</p>
                        <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                          <v-text-field
                            v-model="formData.email"
                            hide-details="auto"
                            label="Email"
                            clearable
                            outlined
                            dense
                            class="custom-input mt-4"
                            append-inner-icon="mdi-email"
                            :rules="[requiredValidator, emailValidator]"
                          ></v-text-field>
                          <v-text-field
                            v-model="formData.password"
                            hint="Enter your password to access this website"
                            hide-details="auto"
                            label="Password"
                            clearable
                            outlined
                            dense
                            :type="isPasswordVisible ? 'text' : 'password'" 
                            class="custom-input"
                            append-inner-icon="mdi-lock"
                            :append-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'" 
                            @click:append="isPasswordVisible = !isPasswordVisible" 
                            :rules="[requiredValidator]"
                            append-icon-class="white--text" 
                          />
                        
                          <br>
                          <v-btn class="login-btn" type="submit" block>
                            <v-icon left>mdi-login</v-icon> Log In
                          </v-btn>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    
                    <v-col cols="12" md="6" class="right-panel">
                      <img src="https://scontent.fmnl14-1.fna.fbcdn.net/v/t1.15752-9/462337933_1972891169798050_3639474823550317272_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFVBlqPGHmug7ujjk4_fdqnYIloCJoykQNgiWgImjKRA9kUvPCCSSCffjVmYPh6dm4GCPi5WbpMzQjdBUYeZYXj&_nc_ohc=EJdiNvxjwKQQ7kNvgGzvkmY&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=AuC2fffehralh-F2OQq5hL-&oh=03_Q7cD1QH4dYZXqLvzBF4yctp5OMzlM0yFWlJAxmtlkh_5P70wrg&oe=67314C88" alt="Your Logo" class="logo" style="margin-top: -40px;" />
                      <v-btn class="signup-btn" to="/RegisterView">
                        New Here? <span class="no-underline">Create an Account</span>
                      </v-btn>
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
  background-size: 300% 300%; /* Enlarged for more noticeable movement */
  animation: oceanGradient 6s ease infinite; /* Faster animation for more dynamic effect */
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

.custom-card {
  border-radius: 16px;
  padding: 30px;
  background-color: #1F2833;
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

.form-title {
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: bold;
  color: #66FCF1;
}

.form-description {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #C5C6C7;
}

.custom-input {
  margin-top: 15px;
  color: #C5C6C7;
}
.login-btn, .signup-btn, .back-to-login {
  margin-top: 20px;
  background: linear-gradient(135deg, #66FCF1 0%, #45A29E 100%); /* Gradient background */
  color: #0B0C10;
  text-transform: none;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
}

.login-btn:hover, .signup-btn:hover, .back-to-login:hover {
  background: linear-gradient(135deg, #45A29E 0%, #66FCF1 100%); /* Reverse gradient on hover */
}



.footer {
  color: #0B0C10; /* Use your accent color or any color that contrasts */
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer-content {
  font-size: 14px; /* Adjust the font size as needed */
}




/* Icon styles for Log In and Sign Up buttons */
.v-btn .v-icon {
  margin-right: 8px; /* Space between icon and text */
  font-size: 20px; /* Adjust icon size */
  transition: transform 0.2s ease; /* Add transition for hover effect */
}

.login-btn .v-icon:hover,
.signup-btn .v-icon:hover {
  transform: scale(1.1); /* Slightly enlarge the icon on hover */
}



.logo {
  animation: floatLogo 3s ease-in-out infinite; /* Smooth float effect */
}

@keyframes floatLogo {
  0%, 100% {
    transform: translateY(0); /* Start and end at original position */
  }
  50% {
    transform: translateY(-10px); /* Float upwards */
  }
}


.login-btn a {
  text-decoration: none;
  color: inherit; /* Ensures the anchor text adopts the button's text color */
}

.no-underline {
  text-decoration: none;
}

.signup-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px; /* Adjust padding as needed */
  white-space: nowrap; /* Prevent text from overflowing */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflowed text */
  font-size: 1rem; /* Base font size */
}

@media (max-width: 768px) {
  .signup-btn {
    font-size: 0.7rem; /* Adjust for tablets */
  }
}

@media (max-width: 480px) {
  .signup-btn {
    font-size: 0.8rem; /* Adjust for mobile */
    padding: 8px 15px; /* Adjust padding for mobile */
  }
}

@media (max-width: 400px) {
  .signup-btn {
    font-size: 0.7rem; /* Adjust for mobile */
    padding: 8px 15px; /* Adjust padding for mobile */
  }
}



.back-to-login {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px; /* Adjust padding as needed */
  white-space: nowrap; /* Prevent text from overflowing */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflowed text */
  font-size: 1rem; /* Base font size */
}

@media (max-width: 768px) {
  .back-to-login {
    font-size: 0.7rem; /* Adjust for tablets */
  }
}

@media (max-width: 480px) {
  .back-to-login {
    font-size: 0.8rem; /* Adjust for mobile */
    padding: 8px 15px; /* Adjust padding for mobile */
  }
}

@media (max-width: 400px) {
  .back-to-login{
    font-size: 0.7rem; /* Adjust for mobile */
    padding: 8px 15px; /* Adjust padding for mobile */
  }
}


</style>









