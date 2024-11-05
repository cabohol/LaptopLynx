<script setup>
import { getAvatarText } from '@/utils/helpers';
import { formActionDefault, supabase } from '@/utils/supabase';
import { ref, computed, onMounted } from 'vue'; // Import onMounted here
import { useRouter } from 'vue-router';

const router = useRouter(); // Use the router for navigation
const drawer = ref(true);
const selectedOption = ref('*'); // Set default selected option to "All"


// New ref for search query
const searchQuery = ref('');


// List of laptops for rental
const laptops = ref([
  { 
    id: 1, 
    name: 'Dell XPS 13', 
    specs: '• Processor: Intel Core i7-1185G7 (up to 4.8 GHz)\n• RAM: 16GB LPDDR4x\n• Storage: 512GB PCIe NVMe SSD\n• Display: 13.4" FHD+ (1920 x 1200)\n• Graphics: Intel Iris Xe Graphics', 
    price: '₱180/day', 
    bestFor: 'Coding', 
    image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/media-gallery/notebook-xps-9315-nt-blue-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=575&qlt=100,1&resMode=sharp2&size=575,402&chrss=full' 
  },
  { 
    id: 2, 
    name: 'Asus ROG Zephyrus G14', 
    specs: '• Processor: AMD Ryzen 9 5900HS (up to 4.6 GHz)\n• RAM: 32GB DDR4\n• Storage: 1TB PCIe NVMe SSD\n• Display: 14" QHD (2560 x 1440) 120Hz\n• Graphics: NVIDIA GeForce RTX 3060', 
    price: '₱200/day', 
    bestFor: 'Gaming', 
    image: 'https://dlcdnwebimgs.asus.com/gain/8D12A135-FBA7-4C6F-BB9D-A654F4398FFD/w1000/h732' 
  },
  { 
    id: 3, 
    name: 'MacBook Pro 16', 
    specs: '• Processor: Apple M1 Pro (up to 3.2 GHz)\n• RAM: 16GB Unified Memory\n• Storage: 512GB SSD\n• Display: 16.2" Liquid Retina XDR (3456 x 2234)\n• Graphics: 16-core GPU', 
    price: '₱200/day', 
    bestFor: 'Projects', 
    image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111883_macbookair.png' 
  },
  { 
    id: 4, 
    name: 'HP Spectre x360', 
    specs: '• Processor: Intel Core i7-1165G7 (up to 4.7 GHz)\n• RAM: 16GB LPDDR4x\n• Storage: 1TB PCIe NVMe SSD\n• Display: 13.3" FHD (1920 x 1080) OLED\n• Graphics: Intel Iris Xe Graphics', 
    price: '₱190/day', 
    bestFor: 'Coding', 
    image: 'https://images.acer.com/is/image/acer/Aspire-Vero-AV15-51R-fingerprint-backlit-on-wallpaper-win11-01?$Series-Component-XL$' 
  },
  { 
    id: 5, 
    name: 'Lenovo ThinkPad X1', 
    specs: '• Processor: Intel Core i7-1160G7 (up to 4.4 GHz)\n• RAM: 16GB LPDDR4x\n• Storage: 1TB PCIe NVMe SSD\n• Display: 14" FHD (1920 x 1080) IPS\n• Graphics: Intel Iris Xe Graphics', 
    price: '₱170/day', 
    bestFor: 'Coding', 
    image: 'https://p1-ofp.static.pub//fes/cms/2024/08/27/sa9ozzagxvov6y59tywitpce6ix4hf666876.png' 
  },
  { 
    id: 6, 
    name: 'MSI GS66 Stealth', 
    specs: '• Processor: Intel Core i7-10870H (up to 5.0 GHz)\n• RAM: 32GB DDR4\n• Storage: 1TB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) 240Hz\n• Graphics: NVIDIA GeForce RTX 3070', 
    price: '₱200/day', 
    bestFor: 'Gaming', 
    image: 'https://asset.msi.com/resize/image/global/product/product_3_20200311103035_5e684d4b13299.png62405b38c58fe0f07fcef2367d8a9ba1/380.png' 
  },
  { 
    id: 7, 
    name: 'Razer Blade 15', 
    specs: '• Processor: Intel Core i7-10750H (up to 5.0 GHz)\n• RAM: 16GB DDR4\n• Storage: 512GB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) 144Hz\n• Graphics: NVIDIA GeForce GTX 1660 Ti', 
    price: '₱190/day', 
    bestFor: 'Gaming', 
    image: 'https://assets.razerzone.com/eeimages/support/products/1517/1517_blade15_mid2019.png' 
  },
  { 
    id: 8, 
    name: 'Huawei MateBook D15', 
    specs: '• Processor: Intel Core i5-1135G7 (up to 4.2 GHz)\n• RAM: 8GB DDR4\n• Storage: 512GB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080)\n• Graphics: Intel Iris Xe Graphics', 
    price: '₱150/day', 
    bestFor: 'Projects', 
    image: 'https://img01.huaweifile.com/sg/ms/ph/pms/uomcdn/PH_HW_B2B2C/pms/202307/gbom/6942103100611/group/800_800_39AA5EF24B88FF3396C55FA5E9FE9B93.png' 
  },
  { 
    id: 9, 
    name: 'Acer Aspire 5', 
    specs: '• Processor: AMD Ryzen 5 5500U (up to 4.0 GHz)\n• RAM: 8GB DDR4\n• Storage: 256GB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080)\n• Graphics: AMD Radeon Graphics', 
    price: '₱160/day', 
    bestFor: 'Projects', 
    image: 'https://images.acer.com/is/image/acer/Aspire-Vero-16?$Series-Component-XL$' 
  },
  { 
    id: 10, 
    name: 'Acer Nitro 5', 
    specs: '• Processor: Intel Core i7-11800H (up to 4.6 GHz)\n• RAM: 16GB DDR4\n• Storage: 1TB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) 144Hz\n• Graphics: NVIDIA GeForce RTX 3060', 
    price: '₱200/day', 
    bestFor: 'Gaming', 
    image: 'https://images.acer.com/is/image/acer/acer-nitro-v-15-anv15-41-non-fingerprint-with-backlit-on-wp-black-01-1?$Series-Component-XL$' 
  },
  { 
    id: 11, 
    name: 'Lenovo V15 Gen 5', 
    specs: '• Processor: Intel Core i7-1165G7 (up to 4.7 GHz)\n• RAM: 16GB DDR4\n• Storage: 512GB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) IPS\n• Graphics: Intel Iris Xe Graphics', 
    price: '₱170/day', 
    bestFor: 'Projects', 
    image: 'https://p3-ofp.static.pub//fes/cms/2024/05/17/t7s0iw77gpx1asifnfouhk4y23pvh0503560.png' 
  },
  { 
    id: 12, 
    name: 'Acer Predator Helios', 
    specs: '• Processor: Intel Core i7-11800H (up to 4.6 GHz)\n• RAM: 32GB DDR4\n• Storage: 1TB PCIe NVMe SSD\n• Display: 15.6" FHD (1920 x 1080) 144Hz\n• Graphics: NVIDIA GeForce RTX 3060', 
    price: '₱200/day', 
    bestFor: 'Gaming', 
    image: 'https://images.acer.com/is/image/acer/predator-helios-3d-15-spatiallabs-edition-ph3d15-71-non-fingerprint-with-perkey-backlit-on-wallpaper-black-01?$Series-Component-XL$' 
  }
]);




// Computed property to filter laptops based on the search query and selected option
const filteredLaptops = computed(() => {
  return laptops.value.filter(laptop => {
    const matchesSearchQuery = searchQuery.value
      ? laptop.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true; // If there's no search query, match all

    const matchesSelectedOption = selectedOption.value === '*'
      ? true // If '*' is selected, match all
      : laptop.bestFor === selectedOption.value;

    return matchesSearchQuery && matchesSelectedOption;
  });
});


// Method to handle laptop rental
// const rentLaptop = (id) => {
//   alert(`You have selected Laptop ID: ${id}`);
// };

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

const notifications = ref([
  { title: 'New Comment', message: 'You have a new comment on your post.' },
  { title: 'Reminder', message: 'Your session starts in 30 minutes.' },
  { title: 'Update Available', message: 'A new version is available.' },
])

const clearNotifications = () => {
  notifications.value = []
}


const imagePopup = ref(false);
const selectedImage = ref('');

const openImagePopup = (imageSrc) => {
  selectedImage.value = imageSrc;
  imagePopup.value = true;
};

const closeImagePopup = () => {
  imagePopup.value = false;
};
</script>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      drawer: false,
      admin: {
        avatar: "",
        email: "melvinjipos@gmail.com",
        fullname: "Melvin Jipos",
      },
    };
  },
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


    <v-menu
      offset-y
      min-width="300px"
      rounded
    >
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-icon color="#66FCF1;">mdi-bell</v-icon>
        </v-btn>
      </template>
      <v-card style="background-color: #1F2833;">
        <v-card-text>
          <div class="mx-auto text-center">
            <h3 class="text-h6">Notifications</h3>
            <v-divider class="my-3"></v-divider>
            <!-- List of Notifications -->
            <v-list>
              <v-list-item
                v-for="(notification, index) in notifications"
                :key="index"
                class="py-2"
              >
                <v-list-item-avatar color="brown">
                  <v-icon>mdi-bell-alert</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ notification.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider class="my-3"></v-divider>
            <v-btn
              variant="text"
              rounded
              @click="clearNotifications"
            >
              Clear All
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
    <!-- End of Notification Bell -->

    <!-- Profile Dropdown can be added here if needed -->
  </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app permanent elevation="3">
      <v-list>
        <br />
        <v-list-item :prepend-avatar="admin.avatar" :subtitle="admin.email" :title="admin.fullname"></v-list-item>
      </v-list>
      <v-divider style="color: bisque;"></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Homepage" :to="{ name: 'homepage' }"></v-list-item>
        <v-list-item prepend-icon="mdi-book" title="Booking" :to="{ name: 'booking' }"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Profile" :to="{ name: 'profile' }"></v-list-item>
        <v-list-item @click="onLogout" title="Logout" prepend-icon="mdi-logout"></v-list-item>

      </v-list>
    </v-navigation-drawer>

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
<v-row justify="center" data-aos="fade-up" class="section-title">
  <v-col cols="12" md="8" class="text-center">
    <h2 class="laptop-rent-title">LAPTOPLYNX - READY, SET, RENT!</h2>
    <p class="laptop-rent-description">Choose the best laptop for your needs</p>
  </v-col>
</v-row>

<!-- Search Bar Row -->
<v-row justify="center" class="my-3">
  <v-col cols="12" md="5">
    <v-text-field
      v-model="searchQuery"
      color="#66FCF1"
      placeholder="Search for laptops..."
      class="custom-search-bar"
      solo
      hide-details
      dense
      style="color: white;"
    >
    <template v-slot:append>
  <v-icon class="custom-search-icon">mdi-magnify</v-icon>
</template>

  </v-text-field>
  </v-col>
</v-row>

<v-row justify="center">
  <v-col cols="12" class="d-flex justify-center">
    <!-- Portfolio Filters -->
    <v-btn-toggle class="portfolio-filters isotope-filters" mandatory data-aos="fade-up" data-aos-delay="100" v-model="selectedOption" @change="onFilterChange">
      <v-btn value="*" class="filter-active" style="font-size: 13px; background-color: #66FCF1; color: #000;">All</v-btn>
      <v-btn value="Coding" style="font-size: 13px; background-color: #66FCF1; color: #000;">Coding</v-btn>
      <v-btn value="Gaming" style="font-size: 13px; background-color: #66FCF1; color: #000;">Gaming</v-btn>
      <v-btn value="Projects" style="font-size: 13px; background-color: #66FCF1; color: #000;">Projects</v-btn>
    </v-btn-toggle>
  </v-col>
</v-row>


          <!-- Portfolio Items -->
    <v-row class="gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
      <v-col v-for="laptop in filteredLaptops" :key="laptop.id" cols="12" md="6" lg="4" :class="`portfolio-item isotope-item ${laptop.bestFor}`">
        <v-card class="laptop-card" @click="openImagePopup(laptop.image)">
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
            <v-btn icon small class="rent-btn" :to="{ name: 'booking' }" title="Book Laptop">
              <v-icon class="rent-icon">mdi-cart</v-icon>
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div>
    <!-- Image Popup Modal -->
    <v-dialog v-model="imagePopup" max-width="90%">
      <v-card style="background-color: #1F2833;">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline"></span>
          <v-btn icon @click="closeImagePopup">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img :src="selectedImage" @click.stop></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
      </v-container>
    </v-main>
  </v-app>
</template>



<style scoped>
.custom-search-icon {
  margin-right: 15px;
  transition: color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.custom-search-icon:hover {
  color: #45A29E;
  transform: scale(1.1);
}

.custom-search-bar {
  background-color: #1F2833;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

.custom-search-bar .v-input__control {
  border: none;
}

.custom-search-bar .v-input__slot {
  padding: 0;
}

.custom-search-bar :placeholder-shown {
  color: #ffffff;
  padding: 10px 20px;
}

.v-dialog {
  background-color: #1F2833;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.v-card-title {
  background-color: #0B0C10;
  color: #66FCF1;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.v-btn {
  color: #C5C6C7;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.v-img {
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
}

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
  background-color: #0B0C10;
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
  background-color: #1F2833;
}

.v-avatar img {
  object-fit: cover;
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

.v-icon, .v-list-item {
  color: #66FCF1;
}

.isotope-container {
  background-color: #0B0C10;
}

.laptop-card {
  border-radius: 12px;
  overflow: hidden;
  background-color: #1F2833;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.laptop-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transform: scale(1.02);
}

.laptop-image {
  height: 200px;
  margin-top: 20px;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.laptop-card:hover .laptop-image {
  transform: scale(1.1);
  filter: brightness(0.95);
  border-bottom: 3px solid #66FCF1;
}

.laptop-info {
  padding: 20px;
  text-align: center;
}

.laptop-info h4 {
  font-size: 1.25em;
  color: #C5C6C7;
  margin-bottom: 8px;
  font-weight: bold;
}

.laptop-info p {
  color: #C5C6C7;
  font-size: 0.95em;
  margin: 0;
}

.laptop-info .laptop-price {
  font-weight: bold;
  color: #66FCF1;
  margin-top: 10px;
}

.rent-btn {
  background-color: #45A29E;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 15px;
}

.rent-btn:hover {
  background-color: #45A29E;
  transform: scale(1.1);
}

.rent-icon {
  font-size: 1.2em;
  color: #0B0C10;
}

.laptop-rent-title {
  font-size: 2.5em;
  color: #66FCF1;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
  position: relative;
}

.laptop-rent-title::after {
  content: '';
  display: block;
  width: 50%;
  height: 4px;
  background-color: #45A29E;
  margin: 10px auto 0;
  border-radius: 5px;
}

.laptop-rent-description {
  font-size: 1.2em;
  color: #C5C6C7;
  margin: 0 auto;
  max-width: 600px;
  line-height: 1.6;
  padding: 0 20px;
  position: relative;
}

.laptop-rent-description::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  background-color: rgba(102, 252, 241, 0.3);
  filter: blur(10px);
  z-index: -1;
  transform: translateX(-50%);
}

@media (max-width: 600px) {
  .custom-drawer {
    width: 100%;
  }
}

.search-card {
  width: 100%;
}

@media (max-width: 600px) {
  .title {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .laptoplynxlogo {
    max-width: 80%;
    height: auto;
  }
}

.portfolio-filters .v-btn {
  flex: 1;
}

.laptop-card {
  height: 100%;
}

.laptop-image {
  height: 200px;
  object-fit: cover;
}

.laptop-info {
  text-align: center;
}

@media (max-width: 600px) {
  .laptop-info h4 {
    font-size: 1.2rem;
  }
  .laptop-price {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .rent-btn {
    margin: 0 auto;
  }
}

.section-title {
  margin: 20px 0;
}

.edit-account-btn {
  background-color: #1F2833;
  color: #E2DAD6;
  border-radius: 8px;
  padding: 10px 15px;
  transition: background-color 0.3s ease;
}

.edit-account-btn:hover {
  background-color: #7FA1C3;
  color: #fff;
}

.logout-btn {
  background-color: #1F2833;
  color: #E2DAD6;
  border-radius: 8px;
  padding: 10px 15px;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background-color: #E2DAD6;
  color: #1F2833;
}


</style>