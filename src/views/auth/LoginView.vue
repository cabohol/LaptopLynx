<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Initialize form fields
const name = ref(''); 
const phone_number = ref(''); 
const email = ref(''); 
const password = ref(''); 
const confirm_password = ref(''); 
const passwordVisible = ref(false); 
const confirmPasswordVisible = ref(false); 

// Step for toggling between login and signup
const step = ref(1); 
const router = useRouter();

// Validation rules
const rules = {
  required: (value) => !!value || 'This field is required',
  phone: (value) => {
    const phonePattern = /^[0-9]*$/; // Allow only numbers
    return phonePattern.test(value) || 'Phone number must be numeric.';
  },
  email: (value) => {
    return /.+@.+\..+/.test(value) || 'Email must contain @.';
  },
};

// Function to toggle password visibility
function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

// Function to toggle confirm password visibility
function toggleConfirmPasswordVisibility() {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
}

// Sign Up function
function onSignUp() {
  alert(`Signing up with Email: ${email.value}, Password: ${password.value}`);
}

// Navigate to register
function goToRegister() {
  router.push({ name: 'register' }); // Use the router to navigate
}
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
                      <br>
                      <br>
                      <br>
                      <v-card-text class="text-center">
                        <h4 class="form-title">Log in to LaptopLynx</h4>
                        <p class="form-description">Access your account and continue exploring our services.</p>

                        <v-text-field
                          :rules="[rules.required, rules.email]"
                          hide-details="auto"
                          label="Email"
                          clearable
                          outlined
                          dense
                          v-model="email"
                          class="custom-input mt-4"
                          append-inner-icon="mdi-email"
                        />
                        <v-text-field
                          :rules="[rules.required]"
                          hint="Enter your password to access this website"
                          hide-details="auto"
                          label="Password"
                          clearable
                          outlined
                          dense
                          v-model="password"
                          :type="passwordVisible ? 'text' : 'password'" 
                          class="custom-input"
                          append-inner-icon="mdi-lock"
                          :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'" 
                          @click:append="togglePasswordVisibility" 
                          append-icon-class="white--text" 
                        />
                        <v-btn class="login-btn" block @click="onLogin">
                         <a href=""> <v-icon left>mdi-login</v-icon>
                        Log In</a>
                        </v-btn>

                      </v-card-text>
                    </v-col>

                    <v-col cols="12" md="6" class="right-panel"  style="margin-top: -70px;">
                      <img src="https://scontent.fmnl14-1.fna.fbcdn.net/v/t1.15752-9/462337933_1972891169798050_3639474823550317272_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFVBlqPGHmug7ujjk4_fdqnYIloCJoykQNgiWgImjKRA9kUvPCCSSCffjVmYPh6dm4GCPi5WbpMzQjdBUYeZYXj&_nc_ohc=EJdiNvxjwKQQ7kNvgGzvkmY&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=AuC2fffehralh-F2OQq5hL-&oh=03_Q7cD1QH4dYZXqLvzBF4yctp5OMzlM0yFWlJAxmtlkh_5P70wrg&oe=67314C88" alt="Your Logo" class="logo" />
                      <v-btn @click="step++" class="signup-btn">New Here? <span>Create an Account</span></v-btn>
                    </v-col>
                  </v-row>
                </v-window-item>

                <!-- Sign Up Window -->
                <v-window-item :value="2">
                  <v-row>
                    <v-col cols="12" md="6" class="right-panel">
                      <img src="https://scontent.fmnl14-1.fna.fbcdn.net/v/t1.15752-9/462337933_1972891169798050_3639474823550317272_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFVBlqPGHmug7ujjk4_fdqnYIloCJoykQNgiWgImjKRA9kUvPCCSSCffjVmYPh6dm4GCPi5WbpMzQjdBUYeZYXj&_nc_ohc=EJdiNvxjwKQQ7kNvgGzvkmY&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=AuC2fffehralh-F2OQq5hL-&oh=03_Q7cD1QH4dYZXqLvzBF4yctp5OMzlM0yFWlJAxmtlkh_5P70wrg&oe=67314C88" alt="Your Logo" class="logo mb-4" />
                      <v-btn outlined @click="step--" class="back-to-login">Log In to your Account</v-btn>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card-text class="text-center">
                        <h4 class="form-title">Create an Account</h4>
                        <p class="form-description">Join our community today and enjoy our services.</p>

                        <v-text-field
                          label="Name"
                          outlined
                          dense
                          v-model="name"
                          class="custom-input mt-4"
                          append-inner-icon="mdi-account"
                          :rules="[rules.required]"
                        />
                        <v-text-field
                          label="Phone Number"
                          outlined
                          dense
                          v-model="phone_number"
                          class="custom-input"
                          append-inner-icon="mdi-phone"
                          :rules="[rules.required, rules.phone]" 
                         />
                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          v-model="email"
                          class="custom-input"
                          append-inner-icon="mdi-email"
                          :rules="[rules.required, rules.email]"
                        />
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          v-model="password"
                          :type="passwordVisible ? 'text' : 'password'" 
                          class="custom-input"
                          append-inner-icon="mdi-lock"
                          :append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'" 
                          @click:append="togglePasswordVisibility" 
                          append-icon-class="white--text" 
                        />
                        <v-text-field
                          label="Confirm Password"
                          outlined
                          dense
                          v-model="confirm_password"
                          :type="confirmPasswordVisible ? 'text' : 'password'" 
                          class="custom-input"
                          append-inner-icon="mdi-lock"
                          :append-icon="confirmPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"  
                          @click:append="toggleConfirmPasswordVisibility" 
                          append-icon-class="white--text"
                        />

<!-- Social Media Sign Up Section -->
<div class="social-signup">
  <v-btn class="social-btn facebook-btn" @click="onFacebookSignUp">
    <v-icon left>
      mdi-facebook
    </v-icon>
    <span class="social-text">Sign in with Facebook</span>
  </v-btn>
  <v-btn class="social-btn google-btn" @click="onGoogleSignUp">
    <v-icon left>
      mdi-google
    </v-icon>
    <span class="social-text">Sign in with Gmail</span>
  </v-btn>
</div>

<v-btn class="signup-btn" block @click="onSignUp">
  <v-icon left>mdi-account-plus</v-icon>
  Sign Up
</v-btn>

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



/* Social Signup Container */
.social-signup {
  margin-top: 10px;
  display: flex;
  justify-content: center; /* Center buttons horizontally */
  gap: 10px; /* Space between the buttons */
}

/* Social Button Styles */
.social-btn {
  display: flex;
  align-items: center; /* Center icon and text vertically */
  padding: 8px 12px; /* Padding around the content */
  background-color: #f0f0f0; /* Button background color */
  color: #333; /* Text color */
  font-weight: bold; /* Bold text */
  border-radius: 50px; /* Fully rounded corners */
  transition: background-color 0.3s ease;
  border: none; /* Remove button border */
  white-space: nowrap; /* Prevent text from wrapping */
}

/* Button Hover Effect */
.social-btn:hover {
  background-color: #e0e0e0;
}

/* Facebook Button Styles */
.facebook-btn {
  background-color: #3b5998; /* Facebook color */
  color: white;
}

.facebook-btn:hover {
  background-color: #2d4373;
}

/* Google Button Styles */
.google-btn {
  background-color: #db4437; /* Google color */
  color: white;
}

.google-btn:hover {
  background-color: #c13527;
}

/* Social Text Styles */
.social-text {
  margin-left: 8px; /* Space between icon and text */
  font-size: 12px; /* Font size for the text */
}

/* Icon Styling */
v-icon {
  font-size: 20px; /* Icon size */
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
</style>









