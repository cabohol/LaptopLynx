<script setup>
import { getAvatarText } from '@/utils/helpers';
import { formActionDefault, supabase } from '@/utils/supabase';
import { ref, computed, onMounted } from 'vue'; // Import onMounted here
import { useRouter } from 'vue-router';

const router = useRouter(); // Use the router for navigation
const drawer = ref(true);
const selectedOption = ref('*'); // Set default selected option to "All"

// List of laptops for rental
const laptops = ref([
  { id: 1, name: 'Dell XPS 13', specs: 'Intel i7, 16GB RAM, 512GB SSD', price: '₱180/day', bestFor: 'Coding', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/media-gallery/notebook-xps-9315-nt-blue-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=575&qlt=100,1&resMode=sharp2&size=575,402&chrss=full' },
  { id: 2, name: 'Asus ROG Zephyrus G14', specs: 'AMD Ryzen 9, 32GB RAM, 1TB SSD', price: '₱200/day', bestFor: 'Gaming', image: 'https://dlcdnwebimgs.asus.com/gain/8D12A135-FBA7-4C6F-BB9D-A654F4398FFD/w1000/h732' },
  { id: 3, name: 'MacBook Pro 16', specs: 'M1 Pro, 16GB RAM, 512GB SSD', price: '₱200/day', bestFor: 'Projects', image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111883_macbookair.png' },
  { id: 4, name: 'HP Spectre x360', specs: 'Intel i7, 16GB RAM, 1TB SSD', price: '₱190/day', bestFor: 'Coding', image: 'https://images.acer.com/is/image/acer/Aspire-Vero-AV15-51R-fingerprint-backlit-on-wallpaper-win11-01?$Series-Component-XL$' },
  { id: 5, name: 'Lenovo ThinkPad X1', specs: 'Intel i7, 16GB RAM, 1TB SSD', price: '₱170/day', bestFor: 'Coding', image: 'https://p1-ofp.static.pub//fes/cms/2024/08/27/sa9ozzagxvov6y59tywitpce6ix4hf666876.png' },
  { id: 6, name: 'MSI GS66 Stealth', specs: 'Intel i7, 32GB RAM, 1TB SSD', price: '₱200/day', bestFor: 'Gaming', image: 'https://asset.msi.com/resize/image/global/product/product_3_20200311103035_5e684d4b13299.png62405b38c58fe0f07fcef2367d8a9ba1/380.png' },
  { id: 7, name: 'Razer Blade 15', specs: 'Intel i7, 16GB RAM, 512GB SSD', price: '₱190/day', bestFor: 'Gaming', image: 'https://assets.razerzone.com/eeimages/support/products/1517/1517_blade15_mid2019.png' },
  { id: 8, name: 'Huawei MateBook D15', specs: 'Intel i5, 8GB RAM, 512GB SSD', price: '₱150/day', bestFor: 'Projects', image: 'https://img01.huaweifile.com/sg/ms/ph/pms/uomcdn/PH_HW_B2B2C/pms/202307/gbom/6942103100611/group/800_800_39AA5EF24B88FF3396C55FA5E9FE9B93.png' },
  { id: 9, name: 'Acer Aspire 5', specs: 'AMD Ryzen 5, 8GB RAM, 256GB SSD', price: '₱160/day', bestFor: 'Projects', image: 'https://images.acer.com/is/image/acer/Aspire-Vero-16?$Series-Component-XL$' },
  { id: 10, name: 'Acer Nitro 5', specs: 'Intel i7, 16GB RAM, 1TB SSD', price: '₱200/day', bestFor: 'Gaming', image: 'https://images.acer.com/is/image/acer/acer-nitro-v-15-anv15-41-non-fingerprint-with-backlit-on-wp-black-01-1?$Series-Component-XL$' },
  { id: 11, name: 'Lenovo V15 Gen 5', specs: 'Intel i7, 16GB RAM, 512GB SSD', price: '₱170/day', bestFor: 'Projects', image: 'https://p3-ofp.static.pub//fes/cms/2024/05/17/t7s0iw77gpx1asifnfouhk4y23pvh0503560.png' },
  { id: 12, name: 'Acer Predator Helios', specs: 'Intel i7, 32GB RAM, 1TB SSD', price: '₱200/day', bestFor: 'Gaming', image: 'https://images.acer.com/is/image/acer/predator-helios-neo-16-phn16-72-4zone-backlit-on-wallpaper-black-01-1?$Series-Component-XL$' }
]);

// Computed property to filter laptops based on selected option
const filteredLaptops = computed(() => {
  return selectedOption.value === '*' 
    ? laptops.value 
    : laptops.value.filter(laptop => laptop.bestFor === selectedOption.value);
});

// Method to handle laptop rental
const rentLaptop = (id) => {
  alert(`You have selected Laptop ID: ${id}`);
};

//USER FUNCTIONALITY

const userData = ref({
  initials: '',
  email: '',
  fullname: ''
});

const formAction = ref({
  ...formActionDefault
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
  router.replace('/');
};

// Fetch user data
const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user data:', error);
    return;
  }

  const metadata = data?.user?.user_metadata;
  if (metadata) {
    userData.value.email = metadata.email;
    userData.value.fullname = `${metadata.firstname} ${metadata.lastname}`;
    userData.value.initials = getAvatarText(userData.value.fullname);
  } else {
    console.warn('User metadata is missing');
  }
};

// Call getUser on component mount
onMounted(() => {
  getUser();
});

</script>




<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      permanent
      width="250"
      class="custom-drawer"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 title" style="color: #66FCF1;">
              LaptopLynx
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="divider"></v-divider>

        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="navigate(item.link)"
          class="list-item"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="list-title">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="custom-app-bar">
      <v-app-bar-nav-icon class="custom-toggle-icon" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- Logo Display -->
      <v-img
        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462337933_1972891169798050_3639474823550317272_n.png?_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFVBlqPGHmug7ujjk4_fdqnYIloCJoykQNgiWgImjKRA9kUvPCCSSCffjVmYPh6dm4GCPi5WbpMzQjdBUYeZYXj&_nc_ohc=InvYsm1Jg6AQ7kNvgHqTPJx&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&_nc_gid=AhloFMOoT7j1p3H2VsVvNiI&oh=03_Q7cD1QFraTmpOIlK2PoEhtd7FW9Pt8gZpWULYhNt8_o76IO5Iw&oe=6737E408"
        alt="Logo"
        max-width="300"
        max-height="300"
        contain
        class="laptoplynxlogo"
      ></v-img>

      <v-spacer></v-spacer>

      <v-container class="d-flex align-center justify-center" fluid>
        <v-card class="search-card pa-3" width="500">
          <v-row>
            <v-col>
              <v-text-field
                v-model="searchQuery"
                label="Search"
                append-icon="mdi-magnify"
                clearable
                class="search-field"
                solo
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <v-spacer></v-spacer>

      <v-menu offset-y :close-on-content-click="false" v-model="isMenuOpen">
      </v-menu>

      <v-row justify="center" style="margin-right: 20px;">
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar
          style="margin-top: -12px;"
          color="brown"
          size="large"
        >
          <span class="text-h5">{{ userData.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <span class="text-h5">{{ userData.initials }}</span>
          </v-avatar>
          <h3>{{ userData.fullname }}</h3>
          <p class="text-caption mt-1">
            {{ userData.email }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text" rounded class="edit-account-btn">
            <v-icon left>mdi-account-edit</v-icon> <!-- Icon for Edit Account -->
            Edit Account
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text"
          @click = "onLogout"
          :loading = "formAction.formProcess"
          :disabled = "formAction.formProcess"
           rounded class="logout-btn"
          >
            <v-icon left>mdi-logout</v-icon> <!-- Icon for Logout -->
            Logout
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</v-row>

    </v-app-bar>

    <v-main>
      <v-carousel hide-delimiter-background height="600" cycle dark show-arrows="hover" interval="3000">
        <v-carousel-item>
          <video
            width="100%"
            height="100%"
            src="https://consumer.huawei.com/dam/content/dam/huawei-cbg-site/ecommerce/ph/new-launch/july/pc/offer%E9%A1%B5/kv/Banner_web_3840-1336_MP4-3.mp4"
            autoplay
            muted
            loop
            playsinline
            style="object-fit: cover"
          ></video>
        </v-carousel-item>

        <v-carousel-item>
          <video
            width="100%"
            height="100%"
            src="https://www.apple.com/105/media/ww/macbook-air/2024/abecf8fa-b944-4698-94ce-14616e166bff/anim/performance/hero/large_2x.mp4"
            autoplay
            muted
            loop
            playsinline
            style="object-fit: cover"
          ></video>
        </v-carousel-item>

        <v-carousel-item>
          <video
            width="100%"
            height="100%"
            src="https://www.apple.com/105/media/us/macbook-pro/2023/232a2dbf-5898-4fd1-a350-6a7c5c2e31c9/anim/welcome-hero/large.mp4"
            autoplay
            muted
            loop
            playsinline
            style="object-fit: cover"
          ></video>
          
        </v-carousel-item>
       
        
      
      </v-carousel>

      <v-container id="portfolio" class="portfolio section" fluid>
        <!-- Section Title -->
        <v-row justify="center" data-aos="fade-up" class="section-title">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="laptop-rent-title">LAPTOPLYNX - READY, SET, RENT!</h2>
            <p class="laptop-rent-description">Choose the best laptop for your needs</p>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <!-- Portfolio Filters -->
            <v-btn-toggle class="portfolio-filters isotope-filters" mandatory data-aos="fade-up" data-aos-delay="100" v-model="selectedOption" @change="onFilterChange">
              <v-btn value="*" class="filter-active" style="font-size: 13px;">All</v-btn>
              <v-btn value="Coding" style="font-size: 13px;">Coding</v-btn>
              <v-btn value="Gaming" style="font-size: 13px;">Gaming</v-btn>
              <v-btn value="Projects" style="font-size: 13px;">Projects</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>

        <!-- Portfolio Items -->
        <v-row class="gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
          <!-- Portfolio Item -->
          <v-col v-for="laptop in filteredLaptops" :key="laptop.id" cols="12" md="6" lg="4" :class="`portfolio-item isotope-item ${laptop.bestFor}`">
            <v-card class="laptop-card">
              <v-img :src="laptop.image" alt="Laptop Image" class="laptop-image"></v-img>
              <v-card-text class="laptop-info">
                <h4>
                  <v-icon small class="mr-1" style="color: #66FCF1;">mdi-laptop</v-icon>
                  {{ laptop.name }}
                </h4>
                <p>
                  <v-icon small class="mr-1" style="color: #66FCF1;">mdi-cog</v-icon>
                  {{ laptop.specs }}
                </p>
                <p class="laptop-price">
                  Price: {{ laptop.price }}
                </p>
                <v-btn icon small class="rent-btn" @click="rentLaptop(laptop.id)" title="Rent Laptop">
                  <v-icon class="rent-icon">mdi-cart</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- End Portfolio Item -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>




<style scoped>

/* Sidebar styles */
.custom-drawer {
  background: linear-gradient(135deg, #1F1F1F, #0B0C10, #000000);
  background-size: 300% 300%; /* Expand the gradient size for animation */
  animation: gradientAnimation 10s ease infinite; /* Apply the animation */
  color: #C5C6C7;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.5); /* Subtle shadow for depth */
}

/* Gradient Animation */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%; /* Start position */
  }
  50% {
    background-position: 100% 50%; /* Midway position */
  }
  100% {
    background-position: 0% 50%; /* End position */
  }
}



.divider {
  background-color: #66FCF1;
}

/* List item hover and animation */
.list-item {
  transition: all 0.3s ease;
}

.list-item:hover {
  background-color: #0B0C10;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.list-item-icon v-icon {
  color: #66FCF1;
}

.list-title {
  color: #C5C6C7;
}

.list-title:hover {
  color: #66FCF1;
}

/* App Bar Background */
.custom-app-bar {
  background-color: #0B0C10; /* Deep Blackish-Gray */
  padding: 15px;
  border-bottom: 1px solid #45A29E; /* Muted Teal Accent Line */
}

/* Toggle (Hamburger Menu) Icon */
.custom-toggle-icon {
  position: relative;
  width: 50px; /* Size of the toggle */
  height: 50px; /* Size of the toggle */
  border-radius: 50%; /* Circular button */
  background-color: #0B0C10; /* Deep Charcoal Background */
  border: 2px solid #66FCF1; /* Bright Aqua Border for a striking look */
  display: flex;
  color: #C5C6C7;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* Lines (Hamburger Bars) */
.custom-toggle-icon div {
  width: 30px;
  height: 3px;
  background-color: #C5C6C7; /* Light Gray for contrast */
  border-radius: 2px;
  position: absolute;
  transition: all 0.3s ease; /* Smooth transition for open/close */
}

.custom-toggle-icon div:nth-child(1) {
  top: 12px;
}

.custom-toggle-icon div:nth-child(2) {
  top: 22px;
}

.custom-toggle-icon div:nth-child(3) {
  top: 32px;
}

/* Toggle Active (Animation to X icon on click) */
.custom-toggle-icon.active div:nth-child(1) {
  top: 22px;
  transform: rotate(45deg); /* Rotate top bar */
}

.custom-toggle-icon.active div:nth-child(2) {
  opacity: 0; /* Hide middle bar */
}

.custom-toggle-icon.active div:nth-child(3) {
  top: 22px;
  transform: rotate(-45deg); /* Rotate bottom bar */
}

/* Hover Effect (Slight color change) */
.custom-toggle-icon:hover {
  background-color: #45A29E; /* Muted Teal on hover */
  transform: scale(1.05); /* Slight enlarge on hover for a tactile feel */
}

/* Active State (When toggled) */
.custom-toggle-icon:active {
  background-color: #66FCF1; /* Bright Aqua when active */
  transform: scale(0.98); /* Subtle shrink on click */
}


h1, h2, h3, h4, h5, h6, p {
  color: #C5C6C7; /* Unified color for headers and text */
}

/* Button Reset (Optional) */
button {
  font-size: 16px;
  font-weight: 600;
  border: none;
  background-color: #66FCF1;
  color: #0B0C10;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
}


/* Prevent content shift when drawer is toggled */
.v-navigation-drawer {
  z-index: 1000;
  position: fixed; /* Keep the drawer fixed to the left */
  z-index: 1000; /* Ensure it's above other content */
  height: 100%; /* Full height of the viewport */
}

/* Ensure the app bar stays in position */
.v-app-bar {
  position: relative; /* Keep the app bar fixed at the top */
  z-index: 1001; /* Above the drawer */
}

/* Main content settings */
.v-main {
  transition: margin-left 0.3s ease; /* Smooth transition for main content */
  margin-left: 0; /* Default margin */
  padding: 16px; /* Optional: add padding to main content */
  background-color: #0B0C10;
}

/* Adjust the main content to create space for the drawer */
.v-navigation-drawer--is-mobile .v-main {
  margin-left: 250px; /* Adjust this based on drawer width */
}

/* Media queries for responsiveness */
@media (max-width: 600px) {
  .v-navigation-drawer {
    width: 250px; /* Mobile drawer width */
  }

  .v-navigation-drawer--is-mobile .v-main {
    margin-left: 250px; /* Same as drawer width */
  }
}

@media (min-width: 601px) {
  .v-navigation-drawer {
    width: 250px; /* Desktop drawer width */
  }

  .v-navigation-drawer--is-mobile .v-main {
    margin-left: 250px; /* Same as drawer width */
  }
}

/* To prevent movement of content */
.v-navigation-drawer.v-navigation-drawer--permanent {
  width: 250px; /* Fixed width */
}

.v-navigation-drawer.v-navigation-drawer--permanent + .v-main {
  margin-left: 250px; /* Adjust the main content */
}




/* Container Styling */
.search-card {
  background-color: #0B0C10; /* Dark background for the card */
  border-radius: 8px; /* Rounded corners */
  padding: 15px; /* Padding for spacing */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  transition: box-shadow 0.3s ease; /* Smooth shadow transition */
}

/* Hover Effect */
.search-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); /* Deeper shadow on hover */
}

/* Search Field Styling */
.search-field {
  margin-top: 20px;
  background-color: #1F2833; /* Background for the input */
  color: #C5C6C7; /* Text color */
  padding: 10px 15px; /* Padding for usability */
  font-size: 1em; /* Base font size */
  transition: border-color 0.3s ease; /* Smooth border color transition */
}

/* Hover and Focus Effects */
.search-field:hover,
.search-field:focus {
  border-color: #66FCF1; /* Change border color on hover and focus */
}

/* Label Styling */
.search-field .v-input__control .v-input__label {
  color: #C5C6C7; /* Light label color */
  transition: color 0.3s ease; /* Smooth transition for label color */
}

.search-field:focus .v-input__control .v-input__label {
  color: #66FCF1; /* Change label color on focus */
}

/* Icon Styling */
.v-input__icon {
  color: #C5C6C7; /* Default icon color */
  transition: color 0.3s ease; /* Smooth transition for icon color */
}

.v-input__icon:hover {
  color: #66FCF1; /* Change icon color on hover */
}

/* Clearable Icon Styling */
.v-input__append-inner .v-input__icon {
  color: #C5C6C7; /* Clearable icon color */
}

.v-input__append-inner .v-input__icon:hover {
  color: #66FCF1; /* Change clearable icon color on hover */
}

/* Focus Border */
.search-field:focus {
  box-shadow: 0 0 5px rgba(102, 252, 241, 0.5); /* Soft glow effect on focus */
}





/* Portfolio Section Styling */
.isotope-container {
  background-color: #0B0C10;
}

/* Updated Card Styling */
.laptop-card {
  border-radius: 12px;
  overflow: hidden;
  background-color: #1F2833; /* Dark background */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.laptop-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transform: scale(1.02);
}

/* Image Styling */
.laptop-image {
  height: 200px;
  margin-top: 20px;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.laptop-card:hover .laptop-image {
  transform: scale(1.1);
  filter: brightness(0.95);
  border-bottom: 3px solid #66FCF1; /* Accent color for border */
}

/* Card Text Styling */
.laptop-info {
  padding: 20px;
  text-align: center;
}

.laptop-info h4 {
  font-size: 1.25em;
  color: #C5C6C7; /* Light text color */
  margin-bottom: 8px;
  font-weight: bold;
}

.laptop-info p {
  color: #C5C6C7; /* Light text color */
  font-size: 0.95em;
  margin: 0;
}

.laptop-info .laptop-price {
  font-weight: bold;
  color: #66FCF1; /* Accent color for price */
  margin-top: 10px;
}

/* Rent Button Styling */
.rent-btn {
  color: #1F2833; /* Accent color for button */
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 15px;
}

.rent-btn:hover {
  background-color: #45A29E; /* Darker hover effect */
  transform: scale(1.1);
}

.rent-icon {
  font-size: 1.2em;
}


/* Title Styling */
.laptop-rent-title {
  font-size: 2.5em; /* Larger font size */
  color: #66FCF1; /* Accent color */
  text-transform: uppercase; /* Uppercase text */
  letter-spacing: 1.5px; /* Space between letters */
  margin-bottom: 15px; /* Space below the title */
  position: relative; /* Position for the pseudo-element */
}

/* Add an underline effect with a pseudo-element */
.laptop-rent-title::after {
  content: '';
  display: block;
  width: 50%; /* Adjust the width as needed */
  height: 4px; /* Underline height */
  background-color: #45A29E; /* Accent color */
  margin: 10px auto 0; /* Center the underline */
  border-radius: 5px; /* Rounded corners for the underline */
}

/* Description Styling */
.laptop-rent-description {
  font-size: 1.2em; /* Slightly larger font size */
  color: #C5C6C7; /* Light color for the text */
  margin: 0 auto; /* Center the paragraph */
  max-width: 600px; /* Limit the width */
  line-height: 1.6; /* Improve readability */
  padding: 0 20px; /* Add some padding */
  position: relative; /* Position for the pseudo-element */
}

/* Add a subtle glow effect */
.laptop-rent-description::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(102, 252, 241, 0.3); /* Soft glow color */
  filter: blur(10px); /* Blur effect for glow */
  z-index: -1; /* Place behind the text */
  transform: translateX(-50%); /* Center the glow */
}



/* Make drawer responsive */
@media (max-width: 600px) {
  .custom-drawer {
    width: 100%;
  }
}

/* Make search card responsive */
.search-card {
  width: 100%; /* Adjust width for small screens */
}

/* Adjust title font size */
@media (max-width: 600px) {
  .title {
    font-size: 1.5rem; /* Smaller font size for mobile */
  }
}

/* Center align logo for small screens */
@media (max-width: 600px) {
  .laptoplynxlogo {
    max-width: 80%;
    height: auto;
  }
}

/* Responsive filter buttons */
.portfolio-filters .v-btn {
  flex: 1; /* Make filter buttons expand evenly */
}

/* Responsive laptop card */
.laptop-card {
  height: 100%;
}

.laptop-image {
  height: 200px; /* Fixed height for images */
  object-fit: cover; /* Cover to maintain aspect ratio */
}

.laptop-info {
  text-align: center; /* Center align laptop info */
}

/* Adjust font size for laptops */
@media (max-width: 600px) {
  .laptop-info h4 {
    font-size: 1.2rem; /* Smaller font size for mobile */
  }
  .laptop-price {
    font-size: 1rem; /* Adjust price font size */
  }
}

/* Adjust margin and padding */
@media (max-width: 600px) {
  .rent-btn {
    margin: 0 auto; /* Center align rent button */
  }
}

.section-title {
  margin: 20px 0;
}





.edit-account-btn {
  background-color: #1F2833; /* Dark background */
  color: #E2DAD6; /* Text color */
  border-radius: 8px; /* Rounded corners */
  padding: 10px 15px; /* Padding */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.edit-account-btn:hover {
  background-color: #7FA1C3; /* Lighten on hover */
  color: #fff; /* Change text color on hover */
}

.logout-btn {
  background-color: #1F2833; /* Dark background */
  color: #E2DAD6; /* Text color */
  border-radius: 8px; /* Rounded corners */
  padding: 10px 15px; /* Padding */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.logout-btn:hover {
  background-color: #E2DAD6; /* Lighten on hover */
  color: #1F2833; /* Change text color on hover */
}



</style>