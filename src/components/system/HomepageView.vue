<script setup>
import { formActionDefault, supabase } from '@/utils/supabase';
import { ref, computed, onMounted } from 'vue'; // Import onMounted here
import { useRouter } from 'vue-router';

const router = useRouter(); // Use the router for navigation
const drawer = ref(false);
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


// Renter data for displaying logged-in user information
const renter = ref({
  fullname: '',
  email: '',
  avatar: '/src/images/Default_pfp.svg.png', // Default avatar if none provided
});

const formAction = ref({
  ...formActionDefault
});

// Function to retrieve admin data
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
    renter.value.avatar = metadata?.avatar || renter.value.avatar; // Use avatar from metadata if available
  }
};

// Fetch admin data when the component is mounted
onMounted(() => {
  getRenterData();
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
  router.replace('/LoginView');
};


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
import { ref } from 'vue';

export default {
  data() {
    return {
      // For dialog
      dialog: false,
      dialogTitle: '',
      dialogContent: '',

      // For images
      currentImage: 'https://images.acer.com/is/image/acer/acer-aspire-vero-av14-52p-fingerprint-backlit-on-wallpaper-start-screen-cobblestone-gray-01-1?$Visual-Filter-XL$',
      images: [
        {
          src: 'https://images.acer.com/is/image/acer/acer-aspire-vero-av14-52p-fingerprint-backlit-on-wallpaper-start-screen-cobblestone-gray-01-1?$Visual-Filter-XL$',
          thumbnail: 'https://images.acer.com/is/image/acer/acer-aspire-vero-av14-52p-fingerprint-backlit-on-wallpaper-start-screen-cobblestone-gray-01-1?$Visual-Filter-XL$',
          caption: 'Aspire Vero 14/15 - Iron',
        },
        {
          src: 'https://img01.huaweifile.com/sg/ms/ph/pms/uomcdn/PH_HW_B2B2C/pms/202312/gbom/6942103112805/group/800_800_402EF8CEF7223855788A78F172AA81EB.png',
          thumbnail: 'https://img01.huaweifile.com/sg/ms/ph/pms/uomcdn/PH_HW_B2B2C/pms/202312/gbom/6942103112805/group/800_800_402EF8CEF7223855788A78F172AA81EB.png',
          caption: 'HUAWEI MateBook D 16 - Mystic Silver',
        },
        {
          src: 'https://images.acer.com/is/image/acer/acer-chormebook-vero-514-cbv514-1h-backlit-on-wallpaper-chrome-ui-cobblestone-gray-01-1?$Visual-Filter-XL$',
          thumbnail: 'https://images.acer.com/is/image/acer/acer-chormebook-vero-514-cbv514-1h-backlit-on-wallpaper-chrome-ui-cobblestone-gray-01-1?$Visual-Filter-XL$',
          caption: 'Acer Chromebook Vero 514 - Iron',
        },
        {
          src: 'https://asset.msi.com/resize/image/global/product/product_164730247617039c3f1bd7445f8f53e96cd736bf7d.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
          thumbnail: 'https://asset.msi.com/resize/image/global/product/product_164730247617039c3f1bd7445f8f53e96cd736bf7d.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
          caption: 'MSI GS66 Stealth - Black',
        },
      ]
    };
  },
  methods: {
    openDialog(section) {
      switch(section) {
        case 'about':
          this.dialogTitle = 'About Us';
          this.dialogContent = `
            LaptopLynx is your trusted partner for hassle-free laptop rentals. We offer flexible rental options for businesses, students, and individuals. 
            Whether you need a laptop for a short-term project, studying, or business operations, we have a variety of high-performance laptops to choose from. 
            Our goal is to make renting a laptop as simple as possible, providing easy rental terms and reliable service. At LaptopLynx, we believe in offering flexible, convenient solutions to meet all your tech needs.
          `;
          break;
        case 'contact':
          this.dialogTitle = 'Contact Us';
          this.dialogContent = `
            We’re here to help! If you have any inquiries or need assistance, feel free to reach out to us through email or phone.
            For any rental questions, you can contact us at laptoplynx@gmail.com or call us at 09635858259.
            We also invite you to connect with us on our social media platforms, where we share updates and information about our services.
            Follow us on Twitter (LaptopLynx), Facebook (LaptopLynxRentals), and Instagram (LaptopLynx) for the latest news.          
          `;
          break;
        case 'terms':
          this.dialogTitle = 'Terms & Conditions';
          this.dialogContent = `
           By renting a laptop from LaptopLynx, you agree to the following terms and conditions. Laptops are available for rent on daily, weekly, or monthly terms, and the specific rental duration will be clearly outlined at the time of booking.
           Please be aware that late returns will incur additional charges based on the rental period. The renter is fully responsible for the laptop's condition during the rental period. In the case of damage or loss to the laptop, you will be required to pay a fee for repair or replacement.
           We accept cash on delivery (COD) as the only payment method, and payment is due upon delivery of the laptop. For students renting a laptop, please note that failure to return the laptop in good condition will result in us contacting your university’s registrar to block your clearance until the matter is resolved.
           Cancellations are allowed up to 24 hours before the rental period begins, but a cancellation fee may apply depending on the timing.
           LaptopLynx reserves the right to update or modify these terms at any time. It is important for all renters to review these terms before each rental.
          `;
          break;
        case 'privacy':
          this.dialogTitle = 'Privacy Policy';
          this.dialogContent = `
            At LaptopLynx, we take your privacy seriously. This privacy policy outlines how we collect, use, and protect your personal information. 
            We collect personal data such as your name, email address, phone number, and payment details solely for the purpose of processing your rental orders. 
            Your personal information is used exclusively for communication related to your rental and will never be shared with third parties without your consent, unless required by law. 
            We use secure systems and protocols to protect your data from unauthorized access, and we comply with all relevant privacy laws to ensure your information is safe. 
            Our website may use cookies to improve your browsing experience, but you can disable them through your browser settings. You have the right to access, update, or request the deletion of your personal data at any time. 
            If you have any concerns or questions about how your data is handled, please contact our support team.
          `;
          break;
      }
      this.dialog = true;
    },

    selectImage(image) {
      this.currentImage = image;
    }
  }
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


    <!-- <v-menu
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
    </v-menu> -->
    <!-- End of Notification Bell -->

    <!-- Profile Dropdown can be added here if needed -->
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
  <v-card style="margin-top: 70px; margin-bottom: 20px; background: linear-gradient(to bottom, #0B0C10, #1A1C23);">
    <v-card-text style="color: #E2DAD6;">
      <v-row>
        <v-col cols="12" sm="3" :class="mdAndDown ? 'd-flex justify-center align-center' : ''">
            <v-img
              src="/src/images/logo1.png"
              style="height: 250px; width: 250px; margin-left: 30px;"
            ></v-img>
          </v-col>


        <v-col cols="12" sm="9" style="margin-top: 60px;">
          <h2 class="mb-5">
            Welcome,
            <span class="font-weight-black">
              {{  renter.fullname  }}!
            </span>
            You're Now Part of LaptopLynx!
          </h2>

         <p class="text-justify">
            Welcome to Laptoplynx, your go-to platform for seamless laptop management and services!
            Whether you're a business, student, or individual, Laptoplynx helps you keep track of your laptops, 
            monitor their performance, and access top-notch repair and maintenance services—all in one place.
            Log in to manage your account, or register today to get started. With Laptoplynx, you can easily monitor device health, 
            request services, and ensure your laptops are running at their best. Thank you for choosing Laptoplynx—where your laptop 
            management needs are made simple, reliable, and efficient!
          </p>

        </v-col>
      </v-row>
    </v-card-text>
  </v-card>


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


      <v-container>
    <v-row class="hero-content">
      <v-col cols="12" md="7" class="hero-image">
        <v-img
          src="https://i.redd.it/msl53vqmf4xb1.jpg"
          aspect-ratio="16/9"
          class="laptop-image"
        ></v-img>
      </v-col>

      <v-col cols="12" md="5" class="hero-text">
        <h1 class="hero-title">PERFORMANCE REDEFINED</h1>
        <p class="hero-description">
          Discover the latest high-performance laptops for rent at LaptopLynx. Designed for both productivity and gaming, our rentals deliver cutting-edge technology at your fingertips.
        </p>
        <div class="cta-container">
          <v-icon>mdi-arrow-right</v-icon>
          <span class="cta-text">The best laptops for every purpose await you.</span>
        </div>
      </v-col>
    </v-row>
  </v-container>


  <v-container fluid style="background: linear-gradient(45deg, #1F2833, #3A4A5D); background-repeat: repeat; margin-top: 40px;" >
    <v-row>
      <v-col cols="12" md="5" class="d-flex flex-column align-center">
        <div class="buttons-container">
    <button
        v-for="(image, index) in images"
        :key="index"
        @click="selectImage(image.src)"
        class="grid-button"
    >
        <img :src="image.thumbnail" alt="Image thumbnail" class="thumbnail-image" />
        <div class="button-caption">{{ image.caption }}</div>
    </button>
       </div>
      </v-col>

      <v-col cols="12" md="7" class="d-flex justify-center align-center">
      <v-img
          :src="currentImage"
          alt="Zephyrus G14 Display Image"
          max-width="100%"
          max-height="400px"
          class="image-display"
        ></v-img>
      </v-col>
    </v-row>
    <br>
  </v-container>
  

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


      <v-container fluid class="cta-section">
  <v-row align="center" justify="space-between" class="cta-row">
  </v-row>
</v-container>

<v-container>
  <!-- First Section -->
  <v-row class="hero-content-section1">
    <v-col cols="12" md="5" class="section1-text">
      <h1 class="section1-title">POWER MEETS PRECISION</h1>
      <p class="section1-description">
          Experience top-tier laptops that combine power and portability at LaptopLynx. Perfect for work, play, and everything in between, our rentals put the latest technology right in your hands.
      </p>

    </v-col>
    <v-col cols="12" md="7" class="section1-image">
      <v-img
        src="https://images.acer.com/is/image/acer/predator-laptop-helios-3d-true-game-expanded?$responsive$"
        aspect-ratio="16/9"
        class="laptop-image-section1"
      ></v-img>
    </v-col>
  </v-row>

  <!-- Second Section -->
  <v-row class="hero-content-section2">
    <v-col cols="12" md="7" class="section2-image">
      <v-img
        src="https://images.acer.com/is/image/acer/predator-laptop-helios-3d-cooling-perfected?$responsive$"
        aspect-ratio="16/9"
        class="laptop-image-section2"
      ></v-img>
    </v-col>
    <v-col cols="12" md="5" class="section2-text">
      <h1 class="section2-title">EXPERIENCE THE FUTURE</h1>
      <p class="section2-description">
        Rent premium laptops designed for immersive experiences and unmatched performance, ideal for any task you face. LaptopLynx has you covered.
      </p>
    </v-col>
  </v-row>
</v-container>

<v-container fluid class="brandlogo">
    <v-row class="logo-grid" align="center" justify="center">
      <v-col cols="6" sm="4" md="2" lg="1" class="logo-container">
        <v-img
          src="https://1000logos.net/wp-content/uploads/2016/09/Acer-Logo.png"
          class="logo-image"
          aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="1" class="logo-container">
        <v-img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1008px-Huawei_Standard_logo.svg.png"
          class="logo-image"
          aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="1" class="logo-container">
        <v-img
          src="https://logos-world.net/wp-content/uploads/2022/07/Lenovo-Symbol.png"
          class="logo-image"
          aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="1" class="logo-container">
        <v-img
          src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/dell-icon.png"
          class="logo-image"
          aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="1" class="logo-container">
        <v-img
          src="https://cdn.freebiesupply.com/images/large/2x/hewlett-packard-logo-png-transparent.png"
          class="logo-image"
          aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="1" class="logo-container">
        <v-img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/TOSHIBA_Logo.png/1200px-TOSHIBA_Logo.png"
          class="logo-image"
          aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="1" class="logo-container">
        <v-img
          src="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-hcil-17.png"
          class="logo-image"
          aspect-ratio="1"
        ></v-img>
      </v-col>
      <v-col cols="6" sm="4" md="2" lg="1" class="logo-container">
        <v-img
          src="https://1000logos.net/wp-content/uploads/2016/10/Asus-Logo-1995.png"
          class="logo-image"
          aspect-ratio="1"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>


      <v-container class="laptoplynx-container">
  <v-row justify="center" align="center" class="my-3 text-center laptoplynx-logo-row">
    <v-col cols="12" md="4" class="text-center laptoplynx-logo-col">
      <v-row justify="center" align="center">
        <v-img
          src="/src/images/logo1.png"
          alt="LaptopLynx Logo"
          max-width="80"
          style="transition: transform 0.3s ease-in-out;"
          class="hover-zoom laptoplynx-logo-img"
        ></v-img>
        <div class="ml-2 laptoplynx-text">
          <h4 class="mb-0 laptoplynx-company-name" style="color: #66FCF1; font-family: 'Arial', sans-serif; font-size: 24px; font-weight: bold;">
            LaptopLynx
          </h4>
          <p class="laptoplynx-tagline" style="color: #E2DAD6; font-family: 'Arial', sans-serif; font-size: 14px; margin-top: 5px;">
            Rent laptops effortlessly, wherever you go!
          </p>
        </div>
      </v-row>
    </v-col>
  </v-row>

  <!-- Divider -->
  <v-row justify="center" class="laptoplynx-divider-row">
    <v-col cols="12" md="12" class="laptoplynx-divider-col">
      <v-divider color="#ffffff" class="laptoplynx-divider"></v-divider>
    </v-col>
  </v-row>

  <v-row justify="center" align="center" class="text-center laptoplynx-bottom-row">
  <v-col cols="12" md="10" class="text-center laptoplynx-bottom-col">
    <v-row class="custom-btn-row" justify="center">
      <v-col cols="12" sm="4" md="auto">
        <span class="custom-btn-link" @click="openDialog('about')">About Us</span>
      </v-col>
      <v-col cols="12" sm="4" md="auto">
        <span class="custom-btn-link" @click="openDialog('contact')">Contact</span>
      </v-col>
      <v-col cols="12" sm="4" md="auto">
        <span class="custom-btn-link" @click="openDialog('terms')">Terms & Conditions</span>
      </v-col>
      <v-col cols="12" sm="4" md="auto">
        <span class="custom-btn-link" @click="openDialog('privacy')">Privacy Policy</span>
      </v-col>
    </v-row>




      <div class="laptoplynx-social-icons">
        <a href="https://twitter.com/LaptopLynx" target="_blank" class="social-icon" title="Twitter">
          <img src="https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png" alt="X">
        </a>
        <a href="https://www.facebook.com/LaptopLynx" target="_blank" class="social-icon" title="Facebook">
          <img src="https://cdn.freebiesupply.com/logos/large/2x/facebook-logo-2019.png" alt="Facebook">
        </a>
        <a href="https://www.instagram.com/LaptopLynx" target="_blank" class="social-icon" title="Instagram">
          <img src="https://static.vecteezy.com/system/resources/previews/023/741/058/non_2x/instagram-logo-icon-social-media-icon-free-png.png" alt="Instagram">
        </a>
      </div>
    </v-col>
  </v-row>

  <!-- Dialogs -->
<v-dialog v-model="dialog" max-width="600px" class="laptoplynx-dialog">
  <v-card>
    <v-card-title class="headline">{{ dialogTitle }}</v-card-title>
    <v-card-text>{{ dialogContent }}</v-card-text>
    <v-card-actions>
      <v-btn  text @click="dialog = false">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>


</v-container>


    </v-main>
  </v-app>
</template>






<style scoped>
/* Image Display */
.image-display {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.image-display:hover {
    transform: scale(1.08);
}

/* Buttons Container */
.buttons-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 30px;
    padding: 15px;
    width: 100%;
    justify-items: center;
}

/* Grid Button */
.grid-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(11, 12, 16, 0.75);
    border: 2px solid rgba(102, 252, 241, 0.85);
    border-radius: 12px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    max-width: 320px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.grid-button:hover {
    background-color: rgba(16, 20, 23, 0.65);
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(102, 252, 241, 0.6);
}

/* Thumbnail Image */
.thumbnail-image {
    border-radius: 12px;
    max-height: 120px;
    transition: transform 0.3s ease-in-out;
    width: 80%;
    object-fit: cover;
}

.thumbnail-image:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(102, 252, 241, 0.4);
}

/* Button Caption */
.button-caption {
    font-size: 13px;
    padding: 0.6rem;
    color: rgba(102, 252, 241, 1);
    font-weight: 400;
    background-color: rgba(26, 35, 43, 0.85);
    border-radius: 0 0 12px 12px;
    text-align: center;
    width: 100%;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
}

/* Additional effects for grid button */
.grid-button:active {
    transform: translateY(2px);
    background-color: rgba(16, 20, 23, 0.55);
}


@media (max-width: 768px) {
    .buttons-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .buttons-container {
        grid-template-columns: repeat(2, 1fr);
    }
    .grid-button {
        max-width: 100%;
    }
}

@media (max-width: 768px) {
  .image-display {
    max-height: 250px;
  }

  .image-button {
    width: 100%;
    margin-bottom: 10px;
  }
}



.brandlogo {
  background: linear-gradient(45deg, #1F2833, #3A4A5D);
  background-size: 300% 300%;
  animation: gradientEffect 5s ease infinite;
}

@keyframes gradientEffect {
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


.logo-grid {
  padding: 20px;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.logo-image {
  width: 100%;
  height: auto;
  max-width: 80px; 
  padding: 10px;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.1); 
}


.hero-content-section1, .hero-content-section2 {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 50px;
  opacity: 0; 
  animation: fadeIn 2s forwards; 
}

.hero-content-section1 {
  animation-delay: 0.5s; 
}

.hero-content-section2 {
  animation-delay: 0.10s; 
}

.laptop-image-section1, .laptop-image-section2 {
  opacity: 0;
  animation: fadeInImage 2s forwards;
}

.laptop-image-section1 {
  animation-delay: 0.5s;
}

.laptop-image-section2 {
  animation-delay: 0.8s;
}

.section1-text, .section2-text {
  opacity: 0;
  animation: fadeInText 1s forwards;
}

.section1-text {
  animation-delay: 0.7s;
}

.section2-text {
  animation-delay: 1s;
}

.section1-title, .section2-title {
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #66FCF1;
}

.section1-description, .section2-description {
  font-size: 1.1em;
  color: #C5C6C7;
  margin-bottom: 20px;
}

.cta-text-section1, .cta-text-section2 {
  margin-left: 8px;
}

/* Fade-In Animations */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInImage {
  0% { opacity: 0; transform: translateX(30px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInText {
  0% { opacity: 0; transform: translateX(-30px); }
  100% { opacity: 1; transform: translateX(0); }
}

/* Responsive Design */
@media (max-width: 992px) {
  /* Tablet View */
  .hero-content-section1, .hero-content-section2 {
    flex-direction: column-reverse;
    text-align: center;
    animation: fadeIn 1s forwards;
  }

  .section1-title, .section2-title {
    font-size: 1.8em;
  }

  .section1-description, .section2-description {
    font-size: 1em;
  }

  .cta-container-section1, .cta-container-section2 {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  /* Mobile View */
  .hero-content-section1, .hero-content-section2 {
    flex-direction: column;
    text-align: center;
    animation: fadeIn 1s forwards;
  }

  .section1-title, .section2-title {
    font-size: 1.6em;
  }

  .section1-description, .section2-description {
    font-size: 0.9em;
  }

  .cta-container-section1, .cta-container-section2 {
    justify-content: center;
  }
}


.cta-section {
  background-image: url('https://images.acer.com/is/image/acer/predator-laptop-helios-3d-spatiallabs-experience-center?$responsive$');
  background-size: cover;
  background-position: center;
  margin-top: 40px;
  padding: 50px;
  color: #ffffff;
  min-height: 450px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (min-width: 768px) {
  .cta-section {
    min-height: 450px;
  }
}

@media (min-width: 1200px) {
  .cta-section {
    min-height: 450px;
  }
}

.cta-container .v-icon {
  font-size: 30px; 
  color: #66fcf1; 
  transition: transform 0.3s ease, color 0.3s ease;
}

.cta-container .v-icon:hover {
  color: #45A29E;
  transform: translateX(5px);
}


.hero-content {
  display: flex;
  padding-top: 60px;
  margin-top: -70px;
  flex-direction: row;
}

.hero-image .laptop-image {
  margin-top: 60px;
  width: 100%;
  height: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-image .laptop-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.hero-text {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  text-align: justify;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #66fcf1;
  margin-bottom: 15px;
}

.hero-description {
  font-size: 1.1rem;
  color: #e2dad6;
  margin-bottom: 20px;
  line-height: 1.4;
}

.cta-container {
  display: flex;
  align-items: center;
  margin-top: -15px;
  justify-content: center; 
}

.cta-text {
  font-size: 0.9rem;
  color: #66FCF1;
  margin-left: 10px;
}

@media (min-width: 768px) {
  .hero-content {
    flex-direction: row;
    padding-top: 80px;
  }

  .hero-text {
    padding: 40px;
    align-items: flex-start;
    text-align: left;
  }

  .hero-title {
    font-size: 3.5rem;
  }

  .hero-description {
    font-size: 1.25rem;
    margin-bottom: 30px;
  }

  .cta-text {
    font-size: 1rem;
    margin-left: 15px;
  }
}

@media (min-width: 1024px) {
  .hero-content {
    padding-top: 100px;
  }

  .hero-title {
    font-size: 4rem;
  }

  .hero-description {
    font-size: 1.35rem;
    max-width: 500px;
  }
}



.laptoplynx-dialog .v-card {
  background-color: #0B0C10; 
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); 
}

.laptoplynx-dialog .v-card-title {
  color: #66fcf1; 
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 0.9px;
}

.laptoplynx-dialog .v-card-text {
  color: #e2dad6; 
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  margin-bottom: 20px;
}

.laptoplynx-dialog .v-card-actions {
  justify-content: flex-end;
}

.laptoplynx-dialog .v-btn {
  background-color: #66fcf1; 
  color: #0B0C10;
  border-radius: 8px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 8px 20px;
  transition: background-color 0.3s ease;
}

.laptoplynx-dialog .v-btn:hover {
  color: #45A29E; 
}

.laptoplynx-bottom-row {
  padding: 16px 0;
  margin-top: -20px;
}

.custom-btn-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.custom-btn-link {
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  color: #66fcf1;
  cursor: pointer;
  transition: color 0.3s ease;
}

.custom-btn-link:hover {
  color: #45A29E; 
}

.custom-btn-link {
    font-weight: 100;
    color: #66FCF1;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0 15px;
}

.custom-btn-link:active {
    background-color: #45a3b8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}


.laptoplynx-social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
}

.social-icon img {
    width: 45px;
    height: 45px;
    padding: 8px;
    border-radius: 50%;
    background-color: #333;
    transition: transform 0.4s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.social-icon img:hover {
    transform: scale(1.3) rotate(15deg);
    background-color: #66FCF1;
    box-shadow: 0px 6px 12px rgba(102, 252, 241, 0.5);
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
  background: linear-gradient(110deg, #1F2833, #66FCF1, #1F2833); 
  border-radius: 8px; 
  transition: box-shadow 0.3s ease, transform 0.2s ease; 
}

.custom-search-bar:hover {
  box-shadow: 0px 6px 10px rgba(102, 252, 241, 0.2); 
  transform: translateY(-2px); 
}

.custom-search-bar .v-input__control {
  border: none; 
  background-color: transparent; 
  color: #FFFFFF; 
  font-size: 1rem; 
  padding: 12px 16px; 
}

.custom-search-bar .v-input__slot {
  padding: 0; 
}

.custom-search-bar ::placeholder {
  color: #C5C6C7;
  opacity: 0.9;
}

.custom-search-bar ::placeholder-shown {
  padding: 12px 16px; 
}

.custom-search-bar .v-input__control:focus {
  outline: none;
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
  background: linear-gradient(135deg, #1F2833, #2C3E50); 
  color: #66FCF1; 
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
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