<script>
import { ref } from 'vue';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

export default {
  data() {
  return {
    carouselItems: [
    {
        image: 'https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9.jpg',
        ariaLabel: 'ROG Zephyrus G14',
        title: 'ROG Zephyrus G14',
        description: "Experience the ultimate blend of power and portability. With a sleek design and high-performance specs, it’s perfect for gaming and content creation on the go."
      },
      {
        image: 'https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9.jpg',
        ariaLabel: 'Dell XPS 15',
        title: 'Dell XPS 15',
        description: "Crafted for creators, this laptop boasts a breathtaking 4K display and powerful performance, making it ideal for design, video editing, and more."
      },
      {
        image: 'https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9.jpg',
        ariaLabel: 'Lenovo Legion 5',
        title: 'Lenovo Legion 5',
        description: "Unleash your gaming potential with the Legion 5. High refresh rates, robust cooling, and immersive visuals create a gaming experience like no other."
      },
      {
        image: 'https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9.jpg',
        ariaLabel: 'ASUS ROG Strix Scar 15',
        title: 'ASUS ROG Strix Scar 15',
        description: "Elevate your gaming experience with customizable RGB lighting and cutting-edge hardware. Designed for gamers who demand excellence in every match."
      },
      {
        image: 'https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9.jpg',
        ariaLabel: 'HP Omen 15',
        title: 'HP Omen 15',
        description: "Combine style and performance with the HP Omen 15. Its sleek design, powerful graphics, and immersive audio bring your games to life."
      },
      {
        image: 'https://cdn.mos.cms.futurecdn.net/Ajc3ezCTN4FGz2vF4LpQn9.jpg',
        ariaLabel: 'Acer Predator Helios 300',
        title: 'Acer Predator Helios 300',
        description: "Get ready for serious gaming with the Helios 300. Its competitive pricing, stunning display, and powerful internals make it a top choice for gamers."
      }
      ]
    };
  },
  methods: {
    openLightbox(index) {
      const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        elements: this.carouselItems.map((item) => ({
          href: item.image,
          title: 'Click to close'
        })),
      });
      lightbox.openAt(index);
    }
  }
};
</script>



<template>
<v-responsive class="border rounded">
    <v-app>
        <v-app-bar app class="elegant-app-bar">
  <v-toolbar-title>
    <v-img
      src="https://scontent.fmnl14-1.fna.fbcdn.net/v/t1.15752-9/462337933_1972891169798050_3639474823550317272_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFVBlqPGHmug7ujjk4_fdqnYIloCJoykQNgiWgImjKRA9kUvPCCSSCffjVmYPh6dm4GCPi5WbpMzQjdBUYeZYXj&_nc_ohc=EJdiNvxjwKQQ7kNvgGzvkmY&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=AuC2fffehralh-F2OQq5hL-&oh=03_Q7cD1QH4dYZXqLvzBF4yctp5OMzlM0yFWlJAxmtlkh_5P70wrg&oe=67314C88"
      alt="Logo"
      class="lg"
      contain
    ></v-img>
  </v-toolbar-title>

  <!-- Spacer to push the login button to the right -->
  <v-spacer></v-spacer>

  <!-- Responsive Log In Button -->
<v-btn
  class="ml-3"
  large
  to="/LoginView"
>
  <v-icon left>mdi-account</v-icon> <!-- Person icon added here -->
  Log In
</v-btn>

</v-app-bar>

    <!-- Main content with Carousel -->
    <v-main>
      <v-parallax src="https://images.acer.com/is/image/acer/predator-laptop-helios-neo-18-code-design:KSP-with-Specs-XL" height="700" style="position: relative; overflow: hidden;" class="animated-parallax">
  <template v-slot:default>
    <div class="parallax-text">
      <h1>Welcome to LaptopLynx</h1>
      <p>Your premier destination for affordable laptop rentals.</p>
      <p>Choose from a wide range of high-performance laptops for gaming, work, or study.</p>
    </div>
  </template>
</v-parallax>


              
              <!-- Logos Section -->
              <div class="logo-scroll-container">
                  <div class="logo-container">
                      <img src="https://1000logos.net/wp-content/uploads/2016/09/Acer-Logo.png" alt="Brand Logo 1" class="logo" />
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1008px-Huawei_Standard_logo.svg.png" alt="Brand Logo 2" class="logo" />
                      <img src="https://logos-world.net/wp-content/uploads/2022/07/Lenovo-Symbol.png" alt="Brand Logo 3" class="logo" />
                      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/dell-icon.png" alt="Brand Logo 4" class="logo" />
                      <img src="https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png" alt="Brand Logo 5" class="logo" />
                      <img src="https://cdn.freebiesupply.com/images/large/2x/hewlett-packard-logo-png-transparent.png" alt="Brand Logo 6" class="logo" />
                      <img src="https://cdn.freebiesupply.com/images/large/2x/asus-logo-black-transparent.png" alt="Brand Logo 7" class="logo" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/TOSHIBA_Logo.png/1200px-TOSHIBA_Logo.png" alt="Brand Logo 8" class="logo" />
                  </div>
              </div>



              <v-container id="section2" class="section__base section__kv__2 py-12" fluid>
  <v-row align="center" class="pa-6">
    <!-- Left Column with Image and Pause Button Overlay -->
    <v-col cols="12" md="6">
      <v-hover v-slot:default="{ isHovering }">
        <v-card
          class="pa-4 card-hover-shadow"
          :elevation="isHovering ? 10 : 4"
          color="#1F2833"
          dark
          style="border-radius: 12px; overflow: hidden;"
        >
          <v-img
            src="https://www.zdnet.com/a/img/resize/145a9b73047dc4578af189133c978456b23cf368/2024/01/12/31f51986-0054-4a79-9f41-e634b4d58c49/razer-blade-16.jpg?auto=webp&fit=crop&height=1200&width=1200"
            alt="Zephyrus G14 with accessories"
            lazy-src="path/to/placeholder_image.jpg"
            class="img__kv__2"
            height="450"
            aspect-ratio="16/9"
            role="figure"
          >
          </v-img>
        </v-card>
      </v-hover>
    </v-col>

  <!-- Right Column with Content and Hardware Logos -->
<v-col cols="12" md="6">
  <div class="wd-content text-animate">
    <h2 class="content-title mb-4 text-h4 font-weight-bold text--primary">
      Discover the Ultimate Laptop Rental Experience with LaptopLynx
    </h2>
    <p class="content-info text-subtitle-1 text--white" style="text-align: justify;">
      LaptopLynx is your go-to platform for powerful, high-quality laptop rentals tailored to your needs. Whether you're a professional requiring cutting-edge performance or a student looking for reliable tech on a budget, LaptopLynx has you covered. Our rental lineup includes models equipped with the latest Intel® and AMD processors, NVIDIA® graphics, and high-speed SSDs, ensuring smooth performance for any task.
      <br /><br />
      Our platform offers seamless booking, easy returns, and round-the-clock support, making laptop rentals convenient and accessible. Empower your work, studies, or creativity without the long-term commitment of ownership. With LaptopLynx, experience top-tier technology, whenever and wherever you need it.
      <br /><br />
    </p>
    <v-divider class="my-6"></v-divider>

        <!-- Hardware Logos Section -->
        <v-row justify="center" style="margin-top: -40px;">
          <v-col cols="6" sm="4">
            <v-img
              src="https://images.seeklogo.com/logo-png/35/1/nvidia-rtx-logo-png_seeklogo-356758.png?v=638623504850000000"
              alt="NVIDIA GeForce RTX logo"
              class="hardware__img mb-4"
              height="50"
            ></v-img>
          </v-col>
          <v-col cols="6" sm="4">
            <v-img
              src="https://lifehacker.com/imagery/articles/01J2F8NRT9VGWMNNS1E1KQNHZ0/hero-image.fill.size_1248x702.v1720647076.png"
              alt="Dolby Atmos logo"
              class="hardware__img mb-4"
              height="50"
            ></v-img>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</v-container>



<v-container fluid class="section__4__slick section__base section__nvidia_slick" id="section4__slick">
  <v-row>
    <v-carousel show-arrows-on-hover height="400px" hide-delimiter-background>
      <v-carousel-item v-for="(item, index) in carouselItems" :key="index">
        <v-row class="d-flex justify-center">
          <v-col cols="12" md="6" class="text-center slickTextFrame" style="padding: 8%;">
            <div class="slickText">
              <span class="slickNvidiaTitle">{{ item.title }}</span>
              <span class="slickNvidiaDec">{{ item.description }}</span>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="text-center">
            <v-img
              :src="item.image"
              :alt="item.ariaLabel"
              class="slickImgFrame"
            ></v-img>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-row>
</v-container>



  
              <v-container fluid>
    <v-row justify="center" class="my-12">
      <v-col cols="12">
      <h2 class="section-heading">
        <v-icon class="icon" style="font-size: 2.5rem; color: #66FCF1;">mdi-laptop</v-icon> <!-- Laptop icon -->
        Most Rented Laptops on LaptopLynx
      </h2>
    </v-col>

<!-- Card 1: Predator -->
<v-col cols="12" sm="6" md="3">
  <v-card class="mx-auto my-4 laptop-card" max-width="374">
    <!-- Wrap image with a link -->
    <a href="https://images.acer.com/is/image/acer/predator-helios-neo-16-phn16-72-4zone-backlit-on-wallpaper-black-01-1?$Series-Component-XL$" target="_blank">
      <v-img
        height="250"
        src="https://images.acer.com/is/image/acer/predator-helios-neo-16-phn16-72-4zone-backlit-on-wallpaper-black-01-1?$Series-Component-XL$"
        cover></v-img>
    </a>

    <v-card-item>
      <v-card-title>Acer Predator Helios 300</v-card-title>

      <v-card-subtitle>
        <v-icon class="fire-icon" color="error" icon="mdi-fire-circle" size="small"></v-icon>
        <span class="me-1">Gaming Beast</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text  style="margin-top: -20px;">
      <div class="my-4 text-subtitle-1">₱200 • Gaming Laptop</div>
      <div>Top-tier gaming performance with powerful graphics and cooling.</div>
      <div class="mt-3">
        <div class="specs-title">
          <v-icon >mdi-format-list-bulleted</v-icon> Specs:
        </div>
        <div> <v-icon >mdi-chip</v-icon>Intel i7 11th Gen, NVIDIA RTX 3070, 16GB RAM, 1TB SSD, 15.6" 144Hz Display</div>
      </div>
    </v-card-text>
  </v-card>
</v-col>

<!-- Card 2: Huawei -->
<v-col cols="12" sm="6" md="3">
  <v-card class="mx-auto my-4 laptop-card" max-width="374">
    <!-- Wrap image with a link -->
    <a href="https://img01.huaweifile.com/sg/ms/ph/pms/uomcdn/PH_HW_B2B2C/pms/202407/gbom/6942103123122/428_428_F6FDD46BEA57BE4A04EDB7FD59010BF6mp.png" target="_blank">
      <v-img
        height="250"
        src="https://img01.huaweifile.com/sg/ms/ph/pms/uomcdn/PH_HW_B2B2C/pms/202407/gbom/6942103123122/428_428_F6FDD46BEA57BE4A04EDB7FD59010BF6mp.png"
        cover
      ></v-img>
    </a>

    <v-card-item>
      <v-card-title>Huawei MateBook X Pro</v-card-title>

      <v-card-subtitle>
        <v-icon class="fire-icon" color="error" icon="mdi-fire-circle" size="small"></v-icon>
        <span class="me-1">Premium Choice</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text  style="margin-top: -20px;">
      <div class="my-4 text-subtitle-1">₱150 • Ultrabook</div>
      <div>Stunning display and sleek design with exceptional performance.</div>
      <div class="mt-3">
        <div class="specs-title">
          <v-icon>mdi-format-list-bulleted</v-icon> Specs:
        </div>
        <div><v-icon >mdi-chip</v-icon>Intel i7 10th Gen, 16GB RAM, 512GB SSD, 13.9" 3K Touchscreen</div>
      </div>
    </v-card-text>
  </v-card>
</v-col>

<!-- Card 3: Acer -->
<v-col cols="12" sm="6" md="3">
  <v-card class="mx-auto my-4 laptop-card" max-width="374">
    <!-- Wrap image with a link -->
    <a href="https://images.acer.com/is/image/acer/acer-swift-14-ai-sf14-51-51t-with-fingerprint-with-backlit-on-wp-copilot-steam-blue-01-3?$Series-Component-XL$" target="_blank">
      <v-img
        height="250"
        src="https://images.acer.com/is/image/acer/acer-swift-14-ai-sf14-51-51t-with-fingerprint-with-backlit-on-wp-copilot-steam-blue-01-3?$Series-Component-XL$"
        cover
      ></v-img>
    </a>

    <v-card-item>
      <v-card-title>Acer Swift 3</v-card-title>

      <v-card-subtitle>
        <v-icon class="fire-icon" color="error" icon="mdi-fire-circle" size="small"></v-icon>
        <span class="me-1">Portable Power</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text  style="margin-top: -20px;">
      <div class="my-4 text-subtitle-1">₱150 • Lightweight</div>
      <div>Great performance in a slim and portable design, ideal for everyday use.</div>
      <div class="mt-3">
        <div class="specs-title">
          <v-icon>mdi-format-list-bulleted</v-icon> Specs:
        </div>
        <div> <v-icon >mdi-chip</v-icon>AMD Ryzen 5, 8GB RAM, 512GB SSD, 14" Full HD Display</div>
      </div>
    </v-card-text>
  </v-card>
</v-col>

<!-- Card 4: Lenovo -->
<v-col cols="12" sm="6" md="3">
  <v-card class="mx-auto my-4 laptop-card" max-width="374">
    <!-- Wrap image with a link -->
    <a href="https://p3-ofp.static.pub//fes/cms/2023/11/01/ceirqp6u2otqjfv9zs3b2yfheefuez779683.png" target="_blank">
      <v-img
        height="250"
        src="https://p3-ofp.static.pub//fes/cms/2023/11/01/ceirqp6u2otqjfv9zs3b2yfheefuez779683.png"
        cover
      ></v-img>
    </a>

    <v-card-item>
      <v-card-title>Lenovo Legion 5</v-card-title>

      <v-card-subtitle>
        <v-icon class="fire-icon" color="error" icon="mdi-fire-circle" size="small"></v-icon>
        <span class="me-1">Powerhouse</span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text style="margin-top: -20px;">
      <div class="my-4 text-subtitle-1">₱200 • Gaming Laptop</div>
      <div>Great for both gaming and productivity, with high performance and a sleek design.</div>
      <div class="mt-3">
        <div class="specs-title">
          <v-icon >mdi-format-list-bulleted</v-icon> Specs:
        </div>
        <div> <v-icon >mdi-chip</v-icon>AMD Ryzen 7, NVIDIA GTX 1660Ti, 16GB RAM, 512GB SSD, 15.6" Full HD Display</div>
      </div>
    </v-card-text>
  </v-card>
</v-col>


    </v-row>
  </v-container>



  <v-container class="unique-deals-section" fluid>
  <v-row justify="center">
    <v-col cols="12" class="text-center">
      <h2 class="unique-section-header">
        <i class="mdi mdi-tag-outline discount-icon"></i>
        PREMIUM DEAL JUST FOR YOU!
      </h2>
    </v-col>

    <!-- First Unique Deal Card: First-Time Renters -->
    <v-col cols="12" md="6">
      <v-card class="unique-promo-card" elevation="12">
        <v-row class="unique-promo-images" justify="center">
          <v-col cols="6" xs="6">
            <v-img
              src="https://images.acer.com/is/image/acer/TravelMate-P2-15?$Rectangular-L$"
              aspect-ratio="16/9"
              class="unique-card-img"
            />
          </v-col>
          <v-col cols="6" xs="6">
            <v-img
              src="https://images.acer.com/is/image/acer/acer-spin-3-sp314-55n-fingerprint-backlit-stylus-wallpaper-win11-pure-silver-08?$Series-Component-XL$"
              aspect-ratio="16/9"
              class="unique-card-img"
            />
          </v-col>
        </v-row>
        <v-card-text class="unique-card-text">
          <p>🎉 Special Deals for First-Time Renters!</p>
          <ul>
            <li>💻 Enjoy premium laptops at amazing prices!</li>
            <li>🔥 Limited-time offers with free shipping!</li>
            <li>⚡ Perfect for studying, gaming, and more.</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Second Unique Deal Card: Graduating Students -->
    <v-col cols="12" md="6">
      <v-card class="unique-promo-card" elevation="12">
        <v-row class="unique-promo-images" justify="center">
          <v-col cols="6" xs="6">
            <v-img
              src="https://images.acer.com/is/image/acer/ConceptD-3-Ezel_CC315-73_Bl1_Wh_04a?$Series-Component-XL$"
              aspect-ratio="16/9"
              class="unique-card-img"
            />
          </v-col>
          <v-col cols="6" xs="6">
            <v-img
              src="https://images.acer.com/is/image/acer/conceptd-5-cn516-73g-cn516-73p-fingerprint-backlit-on-wallpaper-black-01?$Series-Component-XL$"
              aspect-ratio="16/9"
              class="unique-card-img"
            />
          </v-col>
        </v-row>
        <v-card-text class="unique-card-text">
          <p>🌟 Get Ready for Your Future</p>
          <ul>
            <li>🚀 High-performance laptops for multitasking.</li>
            <li>✨ Stylish designs to match your vibe.</li>
            <li>🎓 Ideal for final year projects and job hunting.</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>


<br>
<br>

<v-row>
  <!-- Section Title -->
  <v-col cols="12" class="text-center">
    <h2 class="unique-section-header">
      <i class="mdi mdi-account-multiple-outline team-icon"></i>
      Meet the LaptopLynx Team
    </h2>
    <v-divider class="my-4"></v-divider>
  </v-col>

  <!-- Card 1 -->
  <v-col cols="12" sm="6" md="4">
    <v-card
      class="mx-auto text-white card-style"
      max-width="450"
      height="315"
      style="background: linear-gradient(135deg, #1f2833, #0b0c10); box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); border-radius: 15px;"
    >
      <v-card-text class="text-h5 py-4" style="font-style: italic;">
        "I love translating creative ideas into clean and intuitive designs. Seeing users enjoy something I've built keeps me motivated!"
      </v-card-text>

      <v-card-actions>
        <v-list-item class="w-100">
  <template v-slot:prepend>
    <v-avatar
      size="70"
      color="#ffffff"
      image="https://scontent.fmnl9-6.fna.fbcdn.net/v/t39.30808-1/428645010_1116196032717815_9061274676202760255_n.jpg?stp=dst-jpg_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEqz7vd59cTCeqqT6zaTcQIW1ICeIfOrylbUgJ4h86vKZIGVnEpUmm9PSRl2PkFddBVo_Kj59KgqThzJNBlcUPC&_nc_ohc=06kom_q4GHAQ7kNvgHVZxYs&_nc_zt=24&_nc_ht=scontent.fmnl9-6.fna&_nc_gid=AU7d2oX79WYJ7T3TUGijDKr&oh=00_AYB8AR28wJt1kEAGgt4DA5vI5jQUZLOkmDuQS_yJaFckKA&oe=671E9E16"
      style="border: 2px solid #66fcf1; box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);"
    ></v-avatar>
  </template>

  <v-list-item-content>
    <v-list-item-title style="font-weight: bold;">Claire Anne Bohol</v-list-item-title>
    <v-list-item-subtitle style="color: #66fcf1;">Frontend Developer</v-list-item-subtitle>
  </v-list-item-content>
<!-- Social Media Icons aligned to the left -->
<v-list-item-action class="social-icons" style="display: flex; justify-content: flex-start; align-items: center; gap: 10px;">
  <a href="https://www.facebook.com/clair.ann.940/" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-facebook</v-icon>
  </a>
  <a href="https://www.linkedin.com/in/claire-bohol-76a76617b/" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-linkedin</v-icon>
  </a>
  <a href="https://github.com/cabohol" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-github</v-icon>
  </a>
</v-list-item-action>

</v-list-item>

      </v-card-actions>
    </v-card>
  </v-col>

  <!-- Card 2 -->
  <v-col cols="12" sm="6" md="4">
    <v-card
      class="mx-auto text-white card-style"
      max-width="450"
      height="315"
      style="background: linear-gradient(135deg, #1f2833, #0b0c10); box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); border-radius: 15px;"
    >
      <v-card-text class="text-h5 py-4" style="font-style: italic;">
        "Solving challenges through code ignites my passion. Each project is a chance to innovate, grow, and bring ideas to life."
      </v-card-text>

      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar
              size="70"
              color="#ffffff"
              image="https://scontent.fmnl9-1.fna.fbcdn.net/v/t39.30808-6/356900684_3490557554596131_5490992218168981358_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeF_UpcmPqMWY5bfnb0ifX3K-VKQh_IL_T35UpCH8gv9PVfI-odYtOKPwoStjBrjYlQdKlDyCSdekPZ55ocp4jA9&_nc_ohc=2tD6LhYH0dQQ7kNvgFCnZsn&_nc_zt=23&_nc_ht=scontent.fmnl9-1.fna&_nc_gid=AaI3ylKmFa-dRW06j1-zexj&oh=00_AYCctcfMXGGO8GRSI4Rwb7M2KhBK9a8aZDGXDTidfZpLxw&oe=671E91AF"
              style="border: 2px solid #66fcf1; box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);"
            ></v-avatar>
          </template>

          <v-list-item-content>
    <v-list-item-title style="font-weight: bold;">Christine Bersano</v-list-item-title>
    <v-list-item-subtitle style="color: #66fcf1;">Frontend Developer</v-list-item-subtitle>
  </v-list-item-content>
<!-- Social Media Icons aligned to the left -->
<v-list-item-action class="social-icons" style="display: flex; justify-content: flex-start; align-items: center; gap: 10px;">
  <a href="https://www.facebook.com/profile.php?id=100009257626169" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-facebook</v-icon>
  </a>
  <a href="https://www.linkedin.com/in/christinebersano" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-linkedin</v-icon>
  </a>
  <a href="https://github.com/christinebersano" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-github</v-icon>
  </a>
</v-list-item-action>
        </v-list-item>
        

      </v-card-actions>
    </v-card>
  </v-col>

  <!-- Card 3 -->
  <v-col cols="12" sm="6" md="4">
    <v-card
      class="mx-auto text-white card-style"
      max-width="450"
      height="315"
      style="background: linear-gradient(135deg, #1f2833, #0b0c10); box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); border-radius: 15px;"
    >
      <v-card-text class="text-h5 py-4" style="font-style: italic;">
        "As a System Analyst, I thrive on solving complex problems to boost efficiency and enhance user experience."
      </v-card-text>

      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar
              size="70"
              color="#ffffff"
              image="https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/286447752_3252891181661335_3341390978979218536_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeE0GJY5wqa7DOtUBC_5OInDf8WUFO_SGmV_xZQU79IaZdyAwXU4NVE4gbhVNG5nICyMgsXSRIv6F6rWIAUqNXuJ&_nc_ohc=e-1gdrsXNvAQ7kNvgHD6fZu&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AdGZAh1ocmxtgWdL7MoIuJB&oh=00_AYAyL8c5lxWGyoOm5ml3qci9lMapqdCd2gVurKWhcMhvNw&oe=671E9A68"
              style="border: 2px solid #66fcf1; box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);"
            ></v-avatar>
          </template>

          <v-list-item-content>
    <v-list-item-title style="font-weight: bold;">Melvin Jipos</v-list-item-title>
    <v-list-item-subtitle style="color: #66fcf1;">System Analyst</v-list-item-subtitle>
  </v-list-item-content>
<!-- Social Media Icons aligned to the left -->
<v-list-item-action class="social-icons" style="display: flex; justify-content: flex-start; align-items: center; gap: 10px;">
  <a href="https://www.facebook.com/share/WHKhxdxiwcSx6sNC/" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-facebook</v-icon>
  </a>
  <a href="www.linkedin.com/in/melvin-jipos-332845334" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-linkedin</v-icon>
  </a>
  <a href="https://github.com/melvinjipos" target="_blank" class="custom-social-btn" style="text-decoration: none; display: inline-flex; justify-content: center; align-items: center; transition: transform 0.2s ease, color 0.2s ease;">
    <v-icon style="font-size: 35px; color: #66fcf1;">mdi-github</v-icon>
  </a>
</v-list-item-action>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>


<v-container class="laptoplynx-container">
  <!-- Logo and Company Name -->
  <v-row justify="center" align="center" class="my-3 text-center laptoplynx-logo-row">
    <v-col cols="12" md="4" class="text-center laptoplynx-logo-col">
      <v-row justify="center" align="center">
        <v-img
          src="https://scontent.fmnl14-1.fna.fbcdn.net/v/t1.15752-9/462568879_1068096351387700_3074067409424495304_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFucn2vC8_y2RUX7gCXtbUthrz3YobBPg2GvPdihsE-DRdRBgxt66N5RXQFb3CJS2aydhLnPUDOpdiba360L2oK&_nc_ohc=aRc3zdgk7J4Q7kNvgFaTGJg&_nc_zt=23&_nc_ht=scontent.fmnl14-1.fna&_nc_gid=A1vBvxM5mfHNWxBIwrI9TgZ&oh=03_Q7cD1QHWYn60J_Jg1D3UpKhw5ald2tbITJ15FO26uy8g8rJr3Q&oe=67314AF2"
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

<!-- Bottom row with terms and social media -->
<v-row justify="center" align="center" class="mt-4 text-center laptoplynx-bottom-row">
  <v-col cols="12" md="6" class="text-center laptoplynx-bottom-col">
    <p class="laptoplynx-copyright" style="color: #E2DAD6; font-size: 13px;">
      &copy; 2024 LaptopLynx. All rights reserved.
    </p>
  </v-col>
</v-row>
</v-container>
          </v-main>
      </v-app>
  </v-responsive>
</template>





<style scoped>
/* Medium Screens (Tablets) */
@media (max-width: 992px) {

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1rem;
  }
}

/* Small Screens (Phones) */
@media (max-width: 768px) {
  .navbar-menu {
    display: none; /* Hide menu on small screens */
  }

  .navbar-hamburger {
    display: block; /* Show hamburger menu on small screens */
  }

  .card {
    flex: 1 1 100%; /* 1 card per row */
  }

  .hero h1 {
    font-size: 2rem;
  }

  .auth-btn {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}

/* Extra Small Screens (Very Small Phones) */
@media (max-width: 576px) {
  .hero p {
    font-size: 0.9rem;
  }

  .card {
    padding: 10px;
  }

  .social-icon {
    font-size: 1.2rem;
  }
}

/* General Font Settings */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap');

/* Font Families */
body, .description h2, .laptop-lynx-title, .auth-btn, .get-started-btn {
  font-family: 'Poppins', sans-serif; /* Sleek modern font for most elements */
}

.description p, .auth-btn, .get-started-btn {
  font-family: 'Raleway', sans-serif; /* Clean and elegant font for body text */
}
.semi-transparent-bar {
  background: #0B0C10; /* Semi-transparent background */
  padding: 1%;
}




.auth-btn {
  color: #66FCF1; /* Button text color */
  margin-left: 10px; /* Space between buttons */
}

.auth-btn:hover {
  text-decoration: underline; /* Underline effect on hover */
}

.v-icon {
  margin-top: 8px; /* Add 5px top margin to all icons */
}


/* Ensure the v-main and full-screen-image fill the viewport */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Prevent default scrolling */
}

.v-main {
  height: 100%;
  background: #0B0C10;
}

/* Full-Screen Background Image */
.full-screen-image {
  margin-top: -70px;
  position: relative;
  height: 100vh; /* Full height */
  background-size: cover; /* Cover the full area */
  background-position: center; /* Center the image */
  background-color: #0B0C10;
}



body {
    margin: 0; /* Remove default body margin */
    min-height: 100vh; /* Full viewport height */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Space elements evenly */
}


/* Style for the description section */
.laptop-rental-description {
    padding: 20px; /* Padding for spacious feel */
    backdrop-filter: blur(10px); /* Positive blur effect */
    background: rgba(255, 255, 255, 0.1); /* Semi-transparent white background */
    width: 90%; /* Set width to a percentage for responsiveness */
    max-width: 900px; /* Maximum width for larger screens */
    height: auto; /* Adjust height to fit content */
    margin: 20px auto; /* Center align the margin */
    text-align: left; /* Align text to the left */
    position: absolute; /* Absolute positioning for left alignment */
    right: -20px; /* Distance from the right side */
    bottom: -20px; /* Distance from the bottom */
}

/* Title Styles */
.laptop-rental-description h2 {
    font-size: 2.5rem; /* Larger title size */
    font-weight: bold; 
    text-align: center;
    color: #66FCF1; /* Title color */
    margin-bottom: 10px; /* Space below the title */
    letter-spacing: 1.5px; /* Increased letter spacing */
    text-transform: uppercase; /* Uppercase for modern feel */
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Shadow for text visibility */
}

/* Description Text Styles */
.description-text {
    font-size: 1.2rem; /* Slightly larger paragraph size */
    color: #E0F2F1; /* Text color */
    line-height: 1.6; /* Improved line spacing */
    text-align: justify; /* Justify text */
    margin-bottom: 10px; /* Space below the paragraph */
    padding: 0 5px; /* Padding for responsive design */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Shadow for text visibility */
}


/* Responsive Styles */
@media (max-width: 1200px) {
    .laptop-rental-description {
        width: 95%; /* Slightly increase width for medium screens */
    }
    .laptop-rental-description h2 {
        font-size: 2.2rem; /* Slightly smaller title on medium screens */
    }
    .description-text {
        font-size: 1.1rem; /* Slightly smaller paragraph size on medium screens */
    }
}

@media (max-width: 992px) {
    .laptop-rental-description {
        width: 100%; /* Full width on smaller screens */
        right: 0; /* Remove right positioning */
        bottom: 0; /* Adjust bottom positioning */
        margin: 10px 0; /* Reduce margins */
    }
    .laptop-rental-description h2 {
        font-size: 2rem; /* Smaller title on smaller screens */
    }
    .description-text {
        font-size: 1rem; /* Smaller paragraph size on smaller screens */
    }
}

@media (max-width: 768px) {
    .laptop-rental-description {
        padding: 15px; /* Reduce padding for mobile devices */
    }
    .laptop-rental-description h2 {
        font-size: 1.8rem; /* Smaller title for mobile devices */
    }
    .description-text {
        font-size: 0.9rem; /* Smaller paragraph size for mobile devices */
    }
}

@media (max-width: 576px) {
    .laptop-rental-description {
        padding: 10px; /* Further reduce padding for very small devices */
    }
    .laptop-rental-description h2 {
        font-size: 1.6rem; /* Smaller title for very small devices */
    }
    .description-text {
        font-size: 0.8rem; /* Further reduce paragraph size */
    }
}

.section__base {
  background: #0B0C10; /* Dark background */
  border-radius: 12px;
}

.img__kv__2 {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card-hover-shadow:hover .img__kv__2 {
  transform: scale(1.05);
}

.content-title {
  color: #C5C6C7; /* Light gray for title */
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.text-animate {
  opacity: 0;
  animation: fadeIn 1.2s forwards;
}

.text--primary {
  color: #66FCF1; /* Primary accent color */
}

.text--white {
  color: #C5C6C7; /* Soft white/gray for main content */
}

.hardware__img {
  opacity: 0.8;
  transition: opacity 0.3s ease;
  width: 200px; /* Adjust the width to make it bigger */
  height: auto; /* Maintain the aspect ratio */
  max-width: 200%; /* Ensure it scales responsively */
}


.hardware__img:hover {
  opacity: 1;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}




/* Logo Scroll Section */
.logo-scroll-container {
  max-height: 200px; /* Set a max height for the scrollable area */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 20px; /* Padding around the logo section */
  background-color: #1F2833; /* Darker semi-transparent background for contrast */
  border-radius: 15px; /* Rounded corners */
  margin: 20px; /* Spacing around the section */
  margin-top: 35px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
}

/* Logos Container */
.logo-container {
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping for horizontal alignment */
  justify-content: center; /* Center logos within the container */
}

/* Individual Logo */
.logo {
  margin: 0 30px; /* Increased spacing between logos */
  height: 60px; /* Uniform height for logos */
  object-fit: contain; /* Maintain aspect ratio */
  transition: transform 0.3s; /* Smooth transform transition for hover effect */
  opacity: 0; /* Initially hidden for fade-in */
  transform: translateY(20px); /* Slight movement for fade-in effect */
  animation: fadeIn 1s ease-in-out forwards; /* Trigger fade-in animation */
}

/* Logo Hover Effect */
.logo:hover {
  transform: scale(1.1); /* Slightly enlarge logos on hover */
  filter: brightness(1.2); /* Brighten logos on hover */
}

/* Fade-In Animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px); /* Start slightly lower */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Move to final position */
  }
}

/* Staggered Animation Delay for Each Logo */
.logo:nth-child(1) {
  animation-delay: 0.3s;
}
.logo:nth-child(2) {
  animation-delay: 0.6s;
}
.logo:nth-child(3) {
  animation-delay: 0.9s;
}
.logo:nth-child(4) {
  animation-delay: 1.2s;
}
.logo:nth-child(5) {
  animation-delay: 1.5s;
}
.logo:nth-child(6) {
  animation-delay: 1.8s;
}
.logo:nth-child(7) {
  animation-delay: 2.1s;
}
.logo:nth-child(8) {
  animation-delay: 2.4s;
}


.laptop-card {
  display: flex;
  flex-direction: column; /* Make sure content stacks vertically */
  justify-content: space-between; /* Distribute space evenly */
  height: 95%; /* Ensure card takes full height */
  border: 3px solid #1F2833; /* Add a solid border with a specified color and thickness */
  border-radius: 8px; /* Optional: Add rounded corners to the border */
  padding: 10px; /* Optional: Add padding inside the card */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Optional: Add a subtle shadow for depth */
  background-color: #1F2833;
}


.laptop-card {
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.laptop-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  background-color: #1F2833 /* Hover background color */
}

.section-title {
  text-align: center;
  font-size: 2.7rem;
  font-weight: bold;
  color: #66FCF1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.exclusive-deals {
  padding: 20px 0;
}

.subheading {
  font-size: 1.2rem;
  color: #004D40;
}






  /* Zoom effect for logo */
  .hover-zoom:hover {
    transform: scale(1.1);
  }



  /* Hover effect for social media icons */
  .social-icon:hover {
    background-color: #00695C; /* Bright green background on hover */
    transform: scale(1.2); /* Slight zoom-in on hover */
    color: #FFFFFF; /* White icon color */
  }

  /* Divider Style */
  v-divider {
    margin-top: 20px;
    margin-bottom: 20px;
  }







.v-icon {
  margin-bottom: 10px; /* Space between icon and text */
}



.fire-icon {
  font-size: 1.5rem; /* Adjusts the size of the icon */
  color: #ff5722; /* Sets a custom color for the fire icon */
  margin-top: 5px;

}



/* Section header styling with icon */
.unique-section-header {
  text-align: center;
  font-size: 2.7rem;
  font-weight: bold;
  color: #66FCF1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.unique-deal-icon {
  vertical-align: middle;
  margin-right: 15px;
}

/* Unique Deals Section */
.unique-deals-section {
  padding: 50px 20px;
}

/* Unique Promo Cards */
.unique-promo-card {
  border-radius: 15px;
  overflow: hidden;
  background-color: #1F2833;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  margin-bottom: 40px;
  padding: 15px;
  position: relative;
}

.unique-promo-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: #66FCF1;
}

.unique-promo-card:hover {
  transform: scale(1.05) translateY(-5px);
}

/* Unique Card Images */
.unique-promo-images {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

/* Text Styling for Promo Cards */
.unique-card-text p {
  font-size: 1.2rem;
  font-weight: 600;
  color: #C5C6C7; /* Dark teal for text */
}

.unique-card-text ul {
  list-style: none;
  padding-left: 0;
}

.unique-card-text li {
  font-size: 1.1rem;
  color: #C5C6C7;
  margin-bottom: 8px;
}

/* Responsive behavior */
@media screen and (max-width: 1200px) {
  .unique-section-header {
    font-size: 2.4rem; /* Slightly smaller font size */
  }

  .unique-promo-card {
    padding: 12px; /* Adjust padding */
  }

  .unique-card-text p {
    font-size: 1.1rem; /* Smaller text for medium screens */
  }

  .unique-card-text li {
    font-size: 1rem; /* Adjust list item size */
  }
}

@media screen and (max-width: 992px) {
  .unique-promo-images {
    flex-direction: column; /* Stack images on smaller screens */
    align-items: center; /* Center images */
  }

  .unique-promo-images img {
    width: 80%; /* Make images responsive */
    height: auto; /* Maintain aspect ratio */
  }
}

@media screen and (max-width: 768px) {
  .unique-promo-images img {
    height: 120px; /* Specific height for small screens */
  }
  
  .unique-promo-card {
    margin-bottom: 20px; /* Less margin on smaller screens */
  }

  .unique-section-header {
    font-size: 2rem; /* Smaller font size for smaller screens */
  }

  .unique-card-text p {
    font-size: 1rem; /* Further decrease text size */
  }

  .unique-card-text li {
    font-size: 0.9rem; /* Decrease list item size */
  }
}

@media screen and (max-width: 480px) {
  .unique-section-header {
    font-size: 1.8rem; /* Further smaller font for very small screens */
  }

  .unique-promo-card {
    padding: 10px; /* Reduce padding */
  }

  .unique-card-text p {
    font-size: 0.9rem; /* Smaller paragraph size */
  }
}






/* Responsive Styles for LaptopLynx */

@media screen and (max-width: 1200px) {
  .laptoplynx-company-name {
    font-size: 22px;
  }

  .laptoplynx-tagline {
    font-size: 13px;
  }

  .laptoplynx-logo-img {
    max-width: 70px;
  }
}

@media screen and (max-width: 992px) {
  .laptoplynx-company-name {
    font-size: 20px;
  }

  .laptoplynx-tagline {
    font-size: 12px;
  }

  .laptoplynx-logo-img {
    max-width: 60px;
  }
}

@media screen and (max-width: 768px) {
  .laptoplynx-company-name {
    font-size: 18px;
  }

  .laptoplynx-tagline {
    font-size: 11px;
  }

  .laptoplynx-logo-img {
    max-width: 50px;
  }
}

@media screen and (max-width: 480px) {
  .laptoplynx-company-name {
    font-size: 16px;
  }

  .laptoplynx-tagline {
    font-size: 10px;
  }

  .laptoplynx-logo-img {
    max-width: 40px;
  }
}



h2.section-title,
.v-card-title,
.v-card-subtitle span,
.v-card-text,
.v-rating,
.text-grey,
.text-subtitle-1 {
  color: #C5C6C7 !important;
}

.v-icon {
  color: #66FCF1 !important; /* This keeps the icons styled as requested */
}



.section-heading {
  text-align: center;
  font-size: 2.7rem;
  font-weight: bold;
  color: #66FCF1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}


.elegant-app-bar {
  background-color: #0B0C10; /* Dark background for the app bar */
  padding: 0.4%; /* Add padding for better spacing */
}

/* Base Button Styling */
.v-btn {
  position: relative;
  overflow: hidden;
  background-color: #1F2833; /* Dark primary background */
  color: #C5C6C7; /* Light text color */
  border: 2px solid #45A29E; /* Border matches the accent color */
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.4s ease, border-color 0.4s ease, transform 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Subtle shadow */
  display: flex; /* Use flexbox to align icon and text */
  align-items: center; /* Center icon and text vertically */
}

/* Adjust icon size */
.v-icon {
  font-size: 1.2rem; /* Adjust icon size if needed */
  margin-right: 8px; /* Space between icon and text */
}

/* Hover effect: Glow with accent color */
.v-btn:hover {
  background-color: #0B0C10; /* Slightly darker on hover */
  border-color: #66FCF1; /* Accent color on hover */
  transform: scale(1.05); /* Slight zoom on hover */
  box-shadow: 0 0 15px 5px rgba(102, 252, 241, 0.5); /* Soft glow with accent color */
}

/* Unique glowing pulse animation */
.v-btn::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 252, 241, 0.2), transparent);
  transform: scale(0);
  transition: transform 0.5s ease-out;
  border-radius: 50%;
  z-index: 0;
}

/* Animate the pulse when hovering */
.v-btn:hover::before {
  transform: scale(1.5); /* Pulse expands out */
}

/* Text scaling and glow on hover */
.v-btn:hover .v-btn__content {
  color: #66FCF1; /* Change text to accent color on hover */
  transform: translateY(-2px); /* Subtle upward lift */
  text-shadow: 0 0 5px #66FCF1; /* Soft glow on the text */
  transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
}


.lg {
    width: 190px; /* Default width */
    margin-left: -10px; /* Adjust margin */
    margin-top: 7px;
}

/* Responsive Styles */
@media (max-width: 1024px) {
    .lg {
        width: 150px; /* Reduce width for tablets and medium screens */
        margin-left: -5px; /* Adjust margin if necessary */
    }
}

@media (max-width: 600px) {
    .lg {
        width: 120px; /* Further reduce width for mobile devices */
        margin-left: 0; /* Center the logo by removing negative margin */
    }
}


.specs-title {
    font-weight: bold;
    font-size: 1.3rem; /* Adjust font size as needed */
    margin-bottom: 0.5rem; /* Space between title and specs */
    color: #45A29E; /* Use primary color or adjust as needed */
}

.v-card-text div {
    font-size: 0.9rem; /* Adjust font size for specs text */
    line-height: 1.5; /* Line height for better readability */
    margin-bottom: 0.3rem; /* Space between specs */
}



.card-style {
  background: linear-gradient(135deg, #1f2833, #0b0c10);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  height: 300px; /* Default height */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Subtle initial shadow */
  border: 2px solid transparent; /* Initial transparent border */
}

.card-style:hover {
  transform: translateY(-5px); /* Slight upward movement for elegance */
  box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.4); /* Deeper shadow on hover */
  border: 2px solid #45a29e; /* Subtle border color on hover */
  background: linear-gradient(135deg, #2a2e35, #1c1e22); /* Softer background on hover */
}


.avatar-style {
  border: 2px solid #66fcf1;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-weight: bold;
}

.card-subtitle {
  color: #66fcf1;
}

.social-icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.custom-social-btn {
  font-size: 35px;
  color: #66fcf1;
  transition: transform 0.3s ease, color 0.3s ease;
}

.custom-social-btn:hover {
  transform: scale(1.2);
  color: #45a29e;
}

/* Responsive Layout for Tablets and Small Screens */
@media (max-width: 768px) {
  .card-style {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
    padding: 20px;
  }

  .text-h5 {
    font-size: 14px;
    padding: 10px;
  }

  .custom-social-btn {
    font-size: 28px;
  }

  .social-icons {
    gap: 8px;
  }
}

/* Responsive Layout for Phones */
@media (max-width: 600px) {
  .card-style {
    height: auto;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  }

  .text-h5 {
    font-size: 13px;
    padding: 10px 8px;
  }

  .custom-social-btn {
    font-size: 25px;
  }

  .social-icons {
    gap: 6px;
  }

  .avatar-style {
    size: 40px;
  }
}


.animated-parallax {
  animation: flipZoomIn 12s ease-in-out infinite alternate, pulseOpacity 8s ease-in-out infinite alternate;
  background-position: center center;
  background-size: cover;
  perspective: 1000px; /* Adds depth to the flip effect */
}

.parallax-text {
  position: relative;
  color: #66FCF1;
  text-align: center;
  top: 50%;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Enhanced Flip and Zoom Animation */
@keyframes flipZoomIn {
  0% {
    transform: scale(1) rotateY(0deg);
  }
  50% {
    transform: scale(1.05) rotateY(180deg); /* Halfway flip */
  }
  100% {
    transform: scale(1.1) rotateY(360deg); /* Complete flip */
  }
}

/* Pulse Effect for Subtle Opacity Change */
@keyframes pulseOpacity {
  0% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

/* Smooth Fade-in-Up Animation */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure responsive behavior for portrait views */
@media screen and (max-width: 768px) {
  .animated-parallax {
    height: 500px;
    background-position: center;
    background-size: contain;
  }

  .parallax-text {
    padding: 20px;
    font-size: 1.2em;
  }

  h1 {
    font-size: 2em;
  }
  
  p {
    font-size: 1em;
  }
}



/* General Carousel Styling */
.section__4__slick {
  position: relative;
  overflow: hidden;
  max-width: 95%; /* Set a maximum width for the carousel */
  width: 90%; /* Set width to 90% of its container */
  margin: 0 auto; /* Center the carousel */
  padding: 4rem;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  animation: gradientAnimation 10s ease infinite; /* Apply gradient animation */
}

@keyframes gradientAnimation {
  0% {
    background: linear-gradient(45deg, #0B0C10, #1A232B, #2D2E30, #458A8E, #C5D1D2);
    background-size: 500% 500%;
    transform: scale(1.02);
  }
  25% {
    background: linear-gradient(45deg, #101417, #21292E, #333436, #4A9B9E, #BCC4C6);
    background-size: 500% 500%;
    transform: scale(1.03);
  }
  50% {
    background: linear-gradient(45deg, #0C1012, #1E262D, #303234, #47878A, #C5C6C7);
    background-size: 500% 500%;
    transform: scale(1.02);
  }
  75% {
    background: linear-gradient(45deg, #0B0D0F, #1B2429, #292A2D, #468384, #ADB8BB);
    background-size: 500% 500%;
    transform: scale(1.01);
  }
  100% {
    background: linear-gradient(45deg, #0B0C10, #1F2833, #2E2F31, #45A29E, #C5C6C7);
    background-size: 500% 500%;
    transform: scale(1.02);
  }
}

.section__4__slick {
  animation: gradientAnimation 12s ease-in-out infinite;
  padding: 4rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 95%;
  width: 90%;
  margin: 0 auto;
}



/* Keyframes for overlay fade effect */
@keyframes fadeOverlay {
  0%, 100% {
    opacity: 0.5; /* Start and end with a certain opacity */
  }
  50% {
    opacity: 0.8; /* Maximum opacity in the middle of the animation */
  }
}



/* Title Styling */
.slickNvidiaTitle {
  font-weight: bold;                     
  font-size: 1.6rem;                     /* Slightly larger font size */
  color: #66FCF1;                        /* Light cyan for contrast */
  margin-bottom: 0.5rem;                 
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.4); /* Softer shadow for depth */
  padding: 0.5rem 1rem;                  
  border-radius: 8px;                    
  background-color: rgba(31, 40, 51, 0.8);  /* Dark semi-transparent background */
  transition: transform 0.3s ease, background-color 0.3s ease;
}

/* Optional: Add hover effect */
.slickNvidiaTitle:hover {
  transform: scale(1.05);                
  background-color: rgba(102, 252, 241, 0.3); /* Light cyan on hover */
}

/* Image Zoom and Parallax on Hover */
.zoom-on-hover {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  cursor: pointer;
  border-radius: 12px;
}

.zoom-on-hover:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0px 10px 40px rgba(102, 252, 241, 0.5);
}


/* Text Animation Styling */
.slickTextFrame {
  padding: 2rem;
  color: #C5C6C7; /* Light gray for text */
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeInUp 1.5s ease forwards;
}

.slickText {
  background: rgba(20, 28, 38, 0.85); /* Darker, more opaque background */
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.4), inset 0px 0px 15px rgba(50, 70, 90, 0.6); /* Outer shadow and inner glow */
  border: 1px solid rgba(69, 162, 158, 0.2); /* Soft, cool-tone border */

  /* Gradient Border Glow */
  position: relative;
  overflow: hidden;
}
.slickText::before {
  content: '';
  position: absolute;
  top: -5px; left: -5px;
  right: -5px; bottom: -5px;
  background: linear-gradient(135deg, rgba(69, 162, 158, 0.5), rgba(197, 198, 199, 0.4));
  z-index: -1;
  border-radius: 18px;
}


/* Fade In Animation */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Carousel Item with Gradient Border on Hover */
.carousel-item-custom {
  transition: all 0.8s ease;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.carousel-item-custom:hover {
  border: 2px solid #66FCF1; /* Border color matches the title */
  box-shadow: 0px 10px 25px rgba(102, 252, 241, 0.3);
  animation: floating 3s ease-in-out infinite;
}

/* Floating Animation */
@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Image Style */
.carousel-item-custom img {
  border-radius: 12px;
}

/* Small Screens (Mobile) */
@media (max-width: 600px) {
  #section4__slick {
    padding: 10px;
  }

  .slickImgFrame {
    max-height: 200px; /* Adjust image height for smaller screens */
  }

  .slickText {
    font-size: 1rem; /* Smaller font for mobile */
    padding: 10px;
  }

  .slickNvidiaTitle {
    font-size: 1.3rem; /* Smaller title on mobile */
  }

  .slickNvidiaDec {
    font-size: 0.9rem;
  }
}

/* Medium Screens (Tablets) */
@media (min-width: 600px) and (max-width: 960px) {
  #section4__slick {
    padding: 15px;
  }

  .slickImgFrame {
    max-height: 300px; /* Larger image height for tablets */
  }

  .slickText {
    font-size: 1.1rem;
    padding: 12px;
  }

  .slickNvidiaTitle {
    font-size: 1.5rem; /* Adjust title size for tablets */
  }

  .slickNvidiaDec {
    font-size: 1rem;
  }
}




.slickImgFrame {
  border-radius: 15px; /* Rounded corners */
  max-width: 100%; /* Ensure the image is responsive */
  max-height: 400px; /* Adjust height to make the image larger */
  width: auto; /* Maintain width automatically */
  height: auto; /* Maintain aspect ratio */
  transition: transform 0.4s ease, box-shadow 0.4s ease; /* Smooth transition for effects */
  animation: fadeInUp 1.5s ease forwards;
}

/* Centering the image */
.v-img {
  display: flex; /* Use flexbox to center */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

/* Small Screens (Mobile) Adjustments */
@media (max-width: 600px) {
  .slickImgFrame {
    max-height: 250px; /* Limit height for smaller screens */
  }
}

/* Medium Screens (Tablets) Adjustments */
@media (min-width: 600px) and (max-width: 960px) {
  .slickImgFrame {
    max-height: 300px; /* Adjust max-height for tablets */
  }
}


</style>

