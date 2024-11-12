<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      currentImage: 'https://images.acer.com/is/image/acer/swift3_sf31459_wp_fp-bl_silver_01_l-2?$Visual-Filter-XL$',
      images: [
        {
          src: 'https://images.acer.com/is/image/acer/swift3_sf31459_wp_fp-bl_silver_01_l-2?$Visual-Filter-XL$',
          thumbnail: 'https://images.acer.com/is/image/acer/swift3_sf31459_wp_fp-bl_silver_01_l-2?$Visual-Filter-XL$',
          caption: 'Acer Swift 3 - Silver',
        },
        {
          src: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/pdp/laptop-xps-13-9315-pdp-mod03-bl.psd?wid=950&hei=781&fmt=png-alpha&qlt=100%2c0&op_usm=1.75%2c0.3%2c2%2c0&resMode=sharp2&pscan=auto&fit=constrain%2c1&align=0%2c0',
          thumbnail: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/pdp/laptop-xps-13-9315-pdp-mod03-bl.psd?wid=950&hei=781&fmt=png-alpha&qlt=100%2c0&op_usm=1.75%2c0.3%2c2%2c0&resMode=sharp2&pscan=auto&fit=constrain%2c1&align=0%2c0',
          caption: 'Dell XPS 13 - Silver',
        },
        {
          src: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08984340.png',
          thumbnail: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08984340.png',
          caption: 'HP Spectre x360 - Space blue',
        },
        {
          src: 'https://images.acer.com/is/image/acer/nitro-17-an17-72-4zone-backlit-on-wallpaper-black-01-1?$Visual-Filter-XL$',
          thumbnail: 'https://images.acer.com/is/image/acer/nitro-17-an17-72-4zone-backlit-on-wallpaper-black-01-1?$Visual-Filter-XL$',
          caption: 'Nitro 17 Intel - Black',
        },
      ],
      carouselItems: [
        {
          image: 'https://rog.asus.com/media/1578096205427.jpg',
          ariaLabel: 'ROG Zephyrus G14',
          title: 'ROG Zephyrus G14',
          description: "Experience the ultimate blend of power and portability. With a sleek design and high-performance specs, it’s perfect for gaming and content creation on the go."
        },
        {
          image: 'https://m.media-amazon.com/images/I/61XuP8qrI+L._AC_SL1500_.jpg',
          ariaLabel: 'Dell XPS 15',
          title: 'Dell XPS 15',
          description: "Crafted for creators, this laptop boasts a breathtaking 4K display and powerful performance, making it ideal for design, video editing, and more."
        },
        {
          image: 'https://www.notebookcheck.net/uploads/tx_nbc2/4zu3_Lenovo_Legion_5_17IMH05.jpg',
          ariaLabel: 'Lenovo Legion 5',
          title: 'Lenovo Legion 5',
          description: "Unleash your gaming potential with the Legion 5. High refresh rates, robust cooling, and immersive visuals create a gaming experience like no other."
        },
        {
          image: 'https://laptopmedia.com/wp-content/uploads/2021/04/asusrogstrixscar15g533featured.jpg',
          ariaLabel: 'ASUS ROG Strix Scar 15',
          title: 'ASUS ROG Strix Scar 15',
          description: "Elevate your gaming experience with customizable RGB lighting and cutting-edge hardware. Designed for gamers who demand excellence in every match."
        },
        {
          image: 'https://www.pcworld.com/wp-content/uploads/2023/04/hp_omen_15_hero-100759572-orig.jpg?quality=50&strip=all',
          ariaLabel: 'HP Omen 15',
          title: 'HP Omen 15',
          description: "Combine style and performance with the HP Omen 15. Its sleek design, powerful graphics, and immersive audio bring your games to life."
        },
        {
          image: 'https://rukminim2.flixcart.com/image/1000/1000/cms-rpd-img/8e4cdf0afad140d5958311d3517fa1cd_1836129d93f_image.jpeg?q=90',
          ariaLabel: 'Acer Predator Helios 300',
          title: 'Acer Predator Helios 300',
          description: "Get ready for serious gaming with the Helios 300. Its competitive pricing, stunning display, and powerful internals make it a top choice for gamers."
        }
      ]
    };
  },
  methods: {
    selectImage(image) {
      this.currentImage = image;
    },
    openLightbox(index) {
      const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        elements: this.carouselItems.map((item) => ({
          href: item.image,
          title: item.title
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

  <v-spacer></v-spacer>

<v-btn
  class="ml-3"
  large
  to="/LoginView"
>
  <v-icon left>mdi-account</v-icon> 
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
  

<v-container fluid style="background: url('https://images.acer.com/is/image/acer/triton14_beyond%20performance?$responsive$'); background-repeat: repeat;">
  <br>
    <v-row>
      <v-col cols="12" md="4" class="d-flex flex-column align-center">
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

      <v-col cols="12" md="8" class="d-flex justify-center align-center">
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


              <v-container fluid>
    <v-row justify="center" class="my-12">
      <v-col cols="12">
      <h2 class="section-heading">
        <v-icon class="icon" style="font-size: 2.5rem; color: #66FCF1;">mdi-laptop</v-icon> 
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
      <div class="my-4 text-subtitle-1">₱200 • Best For: Gaming, Coding, Projects</div>
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
      <div class="my-4 text-subtitle-1">₱150 • Best For: Gaming, Coding, Projects</div>
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
      <div class="my-4 text-subtitle-1">₱150 • Best For: Gaming, Coding, Projects</div>
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
      <div class="my-4 text-subtitle-1">₱200 • Best For: Gaming, Coding, Projects</div>
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

<!-- Card 5: Acer Nitro 5 -->
<v-col cols="12" sm="6" md="3">
  <v-card class="mx-auto my-4 laptop-card" max-width="374">
    <!-- Wrap image with a link -->
    <a href="https://images.acer.com/is/image/acer/Nitro5-AN515-58-wallpaper-rgbkb-light-on-Black-01?$Series-Component-XL$" target="_blank">
      <v-img
        height="250"
        src="https://images.acer.com/is/image/acer/Nitro5-AN515-58-wallpaper-rgbkb-light-on-Black-01?$Series-Component-XL$"
        cover
      ></v-img>
    </a>

    <v-card-item>
      <v-card-title>Acer Nitro 5</v-card-title>

      <v-card-subtitle>
        <v-icon class="fire-icon" color="error" icon="mdi-fire-circle" size="small"></v-icon>
        <span class="me-1">Budget Gamer</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text style="margin-top: -20px;">
      <div class="my-4 text-subtitle-1">₱180 • Best For: Gaming, Coding, Projects</div>
      <div>Affordable gaming with good performance and smooth visuals.</div>
      <div class="mt-3">
        <div class="specs-title">
          <v-icon>mdi-format-list-bulleted</v-icon> Specs:
        </div>
        <div><v-icon>mdi-chip</v-icon>Intel i5 10th Gen, NVIDIA GTX 1650, 8GB RAM, 512GB SSD, 15.6" Full HD Display</div>
      </div>
    </v-card-text>
  </v-card>
</v-col>

<!-- Card 6: MSI GS66 Stealth -->
<v-col cols="12" sm="6" md="3">
  <v-card class="mx-auto my-4 laptop-card" max-width="374">
    <!-- Wrap image with a link -->
    <a href="https://asset.msi.com/resize/image/global/product/product_164730247617039c3f1bd7445f8f53e96cd736bf7d.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png" target="_blank">
      <v-img
        height="250"
        src="https://asset.msi.com/resize/image/global/product/product_164730247617039c3f1bd7445f8f53e96cd736bf7d.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png"
        cover
      ></v-img>
    </a>

    <v-card-item>
      <v-card-title>MSI GS66 Stealth</v-card-title>

      <v-card-subtitle>
        <v-icon class="fire-icon" color="error" icon="mdi-fire-circle" size="small"></v-icon>
        <span class="me-1">Sleek Performance</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text style="margin-top: -20px;">
      <div class="my-4 text-subtitle-1">₱150 • Best For: Gaming, Coding, Projects</div>
      <div>Powerful hardware with a stylish and slim design.</div>
      <div class="mt-3">
        <div class="specs-title">
          <v-icon>mdi-format-list-bulleted</v-icon> Specs:
        </div>
        <div><v-icon>mdi-chip</v-icon>Intel i7 10th Gen, NVIDIA RTX 2080, 16GB RAM, 1TB SSD, 15.6" 240Hz Display</div>
      </div>
    </v-card-text>
  </v-card>
</v-col>

<!-- Card 7: Asus ROG Zephyrus G14 -->
<v-col cols="12" sm="6" md="3">
  <v-card class="mx-auto my-4 laptop-card" max-width="374">
    <!-- Wrap image with a link -->
    <a href="https://dlcdnwebimgs.asus.com/gain/1991CB0A-20ED-4A95-AD18-88B850288B49" target="_blank">
      <v-img
        margin-top="10px"
        height="250"
        src="https://dlcdnwebimgs.asus.com/gain/1991CB0A-20ED-4A95-AD18-88B850288B49"
        cover
      ></v-img>
    </a>

    <v-card-item>
      <v-card-title>Asus ROG Zephyrus G14</v-card-title>

      <v-card-subtitle>
        <v-icon class="fire-icon" color="error" icon="mdi-fire-circle" size="small"></v-icon>
        <span class="me-1">Compact Powerhouse</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text style="margin-top: -20px;">
      <div class="my-4 text-subtitle-1">₱180 • Best For: Gaming, Coding, Projects</div>
      <div>Compact design with impressive gaming power and great display.</div>
      <div class="mt-3">
        <div class="specs-title">
          <v-icon>mdi-format-list-bulleted</v-icon> Specs:
        </div>
        <div><v-icon>mdi-chip</v-icon>AMD Ryzen 9, NVIDIA RTX 2060, 16GB RAM, 1TB SSD, 14" QHD Display</div>
      </div>
    </v-card-text>
  </v-card>
</v-col>

<!-- Card 8: Razer Blade 15 -->
<v-col cols="12" sm="6" md="3">
  <v-card class="mx-auto my-4 laptop-card" max-width="374">
    <!-- Wrap image with a link -->
    <a href="https://dl.razerzone.com/src/2630/2630-1-en-v2.png" target="_blank">
      <v-img
        height="250"
        src="https://dl.razerzone.com/src/2630/2630-1-en-v2.png"
        cover
      ></v-img>
    </a>

    <v-card-item>
      <v-card-title>Razer Blade 15</v-card-title>

      <v-card-subtitle>
        <v-icon class="fire-icon" color="error" icon="mdi-fire-circle" size="small"></v-icon>
        <span class="me-1">Premium Gaming</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text style="margin-top: -20px;">
      <div class="my-4 text-subtitle-1">₱180 • Best For: Gaming, Coding, Projects</div>
      <div>High-end build with excellent gaming and display quality.</div>
      <div class="mt-3">
        <div class="specs-title">
          <v-icon>mdi-format-list-bulleted</v-icon> Specs:
        </div>
        <div><v-icon>mdi-chip</v-icon>Intel i7 10th Gen, NVIDIA RTX 2070, 16GB RAM, 512GB SSD, 15.6" 144Hz Display</div>
      </div>
    </v-card-text>
  </v-card>
</v-col>

    </v-row>
  </v-container>



  <v-container class="unique-deals-section" fluid style="margin-top: -0px;">
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


<v-container fluid class="section__4__slick section__base section__nvidia_slick" id="section4__slick">
  <v-row>
    <v-carousel hide-delimiter-background height="400" cycle dark show-arrows="hover" interval="3500">
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
              height="400"
              class="slickImgFrame"
            ></v-img>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
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
      image="https://scontent.fcrk2-2.fna.fbcdn.net/v/t39.30808-1/428645010_1116196032717815_9061274676202760255_n.jpg?stp=dst-jpg_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEqz7vd59cTCeqqT6zaTcQIW1ICeIfOrylbUgJ4h86vKZIGVnEpUmm9PSRl2PkFddBVo_Kj59KgqThzJNBlcUPC&_nc_ohc=dA5QnoUE0ycQ7kNvgEgQKN7&_nc_zt=24&_nc_ht=scontent.fcrk2-2.fna&_nc_gid=AfVWLRxG3TNggP2Q-g-GHA2&oh=00_AYAbUPQRWYSF0qWTSeemsgLcUyutrmi3BOkmUHrOkN-Wtw&oe=6731F416"
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
              image="https://scontent.fcrk2-3.fna.fbcdn.net/v/t39.30808-6/356900684_3490557554596131_5490992218168981358_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeF_UpcmPqMWY5bfnb0ifX3K-VKQh_IL_T35UpCH8gv9PVfI-odYtOKPwoStjBrjYlQdKlDyCSdekPZ55ocp4jA9&_nc_ohc=ZVPCqPi-ZQEQ7kNvgGs-GMy&_nc_zt=23&_nc_ht=scontent.fcrk2-3.fna&_nc_gid=AkXhCFB5545Yl94SQ39Pk5O&oh=00_AYBg7j6Jsz-teWLdi7kp-_uMxHKMvenVhVyCFe-TbvK6yA&oe=67321FEF"
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
              image="https://scontent.fcrk2-2.fna.fbcdn.net/v/t39.30808-6/286447752_3252891181661335_3341390978979218536_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeE0GJY5wqa7DOtUBC_5OInDf8WUFO_SGmV_xZQU79IaZdyAwXU4NVE4gbhVNG5nICyMgsXSRIv6F6rWIAUqNXuJ&_nc_ohc=5p7g1YiqaiAQ7kNvgGnfTVo&_nc_zt=23&_nc_ht=scontent.fcrk2-2.fna&_nc_gid=AghNzViNBwtXnbaNasdzWQ-&oh=00_AYAYHFTWEmML_oII-RyMul3CP2BsMnByX1jdQSAoXxghHA&oe=6731F068"
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

   <v-row justify="center" align="center" class="mt-4 text-center laptoplynx-bottom-row">
            <v-col cols="12" md="6" class="text-center laptoplynx-bottom-col">
                <p class="laptoplynx-copyright" style="color: #E2DAD6; font-size: 13px;">
                    &copy; 2024 LaptopLynx. All rights reserved.
                </p>
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
</v-container>

          </v-main>
      </v-app>
  </v-responsive>
</template>





<style scoped>
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



.image-display {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-display:hover {
    transform: scale(1.05);
}

.buttons-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-top: 20px;
    padding: 10px;
    width: 100%;
}

.grid-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(11, 12, 16, 0.75);
    border: 1px solid rgba(102, 252, 241, 0.85);
    border-radius: 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
    padding: 9px;
    width: 100%;
    max-width: 300px;
}

.grid-button:hover {
    background-color: rgba(16, 20, 23, 0.65);
    transform: translateY(-3px);
}

.thumbnail-image {
    border-radius: 10px;
    max-height: 100px;
    transition: transform 0.3s ease;
    width: 70%;
}

.thumbnail-image:hover {
    transform: scale(1.05);
}

.button-caption {
    font-size: 1rem;
    padding: 0.5rem;
    color: rgba(102, 252, 241, 1);
    font-weight: lighter;
    background-color: rgba(26, 35, 43, 0.85);
    border-radius: 0 0 10px 10px;
    text-align: center;
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

@media (max-width: 992px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }

  .navbar-hamburger {
    display: block;
  }

  .card {
    flex: 1 1 100%;
  }

  .hero h1 {
    font-size: 2rem;
  }

  .auth-btn {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}

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

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap');

body, .description h2, .laptop-lynx-title, .auth-btn, .get-started-btn {
  font-family: 'Poppins', sans-serif;
}

.description p, .auth-btn, .get-started-btn {
  font-family: 'Raleway', sans-serif;
}

.semi-transparent-bar {
  background: #0B0C10;
  padding: 1%;
}

.auth-btn {
  color: #66FCF1;
  margin-left: 10px;
}

.auth-btn:hover {
  text-decoration: underline;
}

.v-icon {
  margin-top: 8px;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.v-main {
  height: 100%;
  background: #0B0C10;
}

.full-screen-image {
  margin-top: -70px;
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-color: #0B0C10;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.laptop-rental-description {
  padding: 20px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  width: 90%;
  max-width: 900px;
  height: auto;
  margin: 20px auto;
  text-align: left;
  position: absolute;
  right: -20px;
  bottom: -20px;
}

.laptop-rental-description h2 {
  font-size: 2.5rem;
  font-weight: bold; 
  text-align: center;
  color: #66FCF1;
  margin-bottom: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.description-text {
  font-size: 1.2rem;
  color: #E0F2F1;
  line-height: 1.6;
  text-align: justify;
  margin-bottom: 10px;
  padding: 0 5px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 1200px) {
  .laptop-rental-description {
    width: 95%;
  }
  .laptop-rental-description h2 {
    font-size: 2.2rem;
  }
  .description-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 992px) {
  .laptop-rental-description {
    width: 100%;
    right: 0;
    bottom: 0;
    margin: 10px 0;
  }
  .laptop-rental-description h2 {
    font-size: 2rem;
  }
  .description-text {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .laptop-rental-description {
    padding: 15px;
  }
  .laptop-rental-description h2 {
    font-size: 1.8rem;
  }
  .description-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .laptop-rental-description {
    padding: 10px;
  }
  .laptop-rental-description h2 {
    font-size: 1.6rem;
  }
  .description-text {
    font-size: 0.8rem;
  }
}

.section__base {
  background: #0B0C10;
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
  color: #C5C6C7;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.text-animate {
  opacity: 0;
  animation: fadeIn 1.2s forwards;
}

.text--primary {
  color: #66FCF1;
}

.text--white {
  color: #C5C6C7;
}

.hardware__img {
  opacity: 0.8;
  transition: opacity 0.3s ease;
  width: 200px;
  height: auto;
  max-width: 200%;
}



.hardware__img:hover {
  opacity: 1;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}


.logo-scroll-container {
  max-height: 200px;
  overflow-y: auto;
  padding: 25px;
  background-color: rgba(31, 40, 51, 0.85);
  border-radius: 20px;
  margin: 20px;
  margin-top: 35px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px); 
  border: 1px solid rgba(255, 255, 255, 0.1); 
  transition: background-color 0.3s ease;
}

.logo-scroll-container:hover {
  background-color: rgba(31, 40, 51, 1); 
}

.logo-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  animation: move 10s linear infinite; 
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px); 
  }
  100% {
    transform: translateX(0); 
  }
}

.logo {
  margin: 0 35px;
  height: 60px;
  object-fit: contain;
  transition: transform 0.4s ease, filter 0.4s ease; 
  opacity: 0;
  transform: translateY(30px); 
  animation: fadeIn 1.2s ease-in-out forwards;
}

.logo:hover {
  transform: scale(1.15) rotate(3deg); 
  filter: brightness(1.3) drop-shadow(0px 4px 8px rgba(102, 252, 241, 0.5)); 
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

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
  flex-direction: column; 
  justify-content: space-between; 
  height: 95%; 
  border: 3px solid #1F2833; 
  border-radius: 8px; 
  padding: 10px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  background-color: #1F2833;
}


.laptop-card {
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.laptop-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  background-color: #1F2833 
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


  .hover-zoom:hover {
    transform: scale(1.1);
  }


  .social-icon:hover {
    background-color: #00695C; 
    transform: scale(1.2); 
    color: #FFFFFF; 
  }

  /* Divider Style */
  v-divider {
    margin-top: 20px;
    margin-bottom: 20px;
  }



.v-icon {
  margin-bottom: 10px; 
}



.fire-icon {
  font-size: 1.5rem;
  color: #ff5722;
  margin-top: 5px;

}


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

.unique-deals-section {
  padding: 50px 20px;
}

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

.unique-promo-images {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.unique-card-text p {
  font-size: 1.2rem;
  font-weight: 600;
  color: #C5C6C7; 
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

@media screen and (max-width: 1200px) {
  .unique-section-header {
    font-size: 2.4rem;
  }

  .unique-promo-card {
    padding: 12px;
  }

  .unique-card-text p {
    font-size: 1.1rem;
  }

  .unique-card-text li {
    font-size: 1rem;
  }
}

@media screen and (max-width: 992px) {
  .unique-promo-images {
    flex-direction: column;
    align-items: center;
  }

  .unique-promo-images img {
    width: 80%;
    height: auto;
  }
}

@media screen and (max-width: 768px) {
  .unique-promo-images img {
    height: 120px;
  }
  
  .unique-promo-card {
    margin-bottom: 20px;
  }

  .unique-section-header {
    font-size: 2rem;
  }

  .unique-card-text p {
    font-size: 1rem;
  }

  .unique-card-text li {
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 480px) {
  .unique-section-header {
    font-size: 1.8rem;
  }

  .unique-promo-card {
    padding: 10px;
  }

  .unique-card-text p {
    font-size: 0.9rem;
  }
}



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
  color: #66FCF1 !important; 
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
  background-color: #0B0C10;
  padding: 0.4%;
}

.v-btn {
  position: relative;
  overflow: hidden;
  background-color: #1F2833;
  color: #C5C6C7;
  border: 2px solid #45A29E;
  border-radius: 5px;
  padding: 10px 20px;
  transition: background-color 0.4s ease, border-color 0.4s ease, transform 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}

.v-icon {
  font-size: 1.2rem;
  margin-right: 8px;
}

.v-btn:hover {
  background-color: #0B0C10;
  border-color: #66FCF1;
  transform: scale(1.05);
  box-shadow: 0 0 15px 5px rgba(102, 252, 241, 0.5);
}

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

.v-btn:hover::before {
  transform: scale(1.5);
}

.v-btn:hover .v-btn__content {
  color: #66FCF1;
  transform: translateY(-2px);
  text-shadow: 0 0 5px #66FCF1;
  transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
}

.lg {
  width: 190px;
  margin-left: -10px;
  margin-top: 7px;
}

@media (max-width: 1024px) {
  .lg {
    width: 150px;
    margin-left: -5px;
  }
}

@media (max-width: 600px) {
  .lg {
    width: 120px;
    margin-left: 0;
  }
}

.specs-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #45A29E;
}

.v-card-text div {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.3rem;
}

.card-style {
  background: linear-gradient(135deg, #1f2833, #0b0c10);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  height: 300px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
}

.card-style:hover {
  transform: translateY(-5px);
  box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.4);
  border: 2px solid #45a29e;
  background: linear-gradient(135deg, #2a2e35, #1c1e22);
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
  /* animation: flipZoomIn 12s ease-in-out infinite alternate, pulseOpacity 8s ease-in-out infinite alternate; */
  background-position: center center;
  background-size: cover;
  perspective: 1000px; 
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



.section__4__slick {
  position: relative;
  overflow: hidden;
  max-width: 95%; 
  width: 90%; 
  margin: 0 auto; 
  padding: 4rem;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  animation: gradientAnimation 10s ease infinite; 
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


@keyframes fadeOverlay {
  0%, 100% {
    opacity: 0.5; 
  }
  50% {
    opacity: 0.8;
  }
}


.slickNvidiaTitle {
  font-weight: bold;                     
  font-size: 1.6rem;                    
  color: #66FCF1;                        
  margin-bottom: 0.5rem;                 
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.4);
  padding: 0.5rem 1rem;                  
  border-radius: 8px;                    
  background-color: rgba(31, 40, 51, 0.8);  
  transition: transform 0.3s ease, background-color 0.3s ease;
}


.slickNvidiaTitle:hover {
  transform: scale(1.05);                
  background-color: rgba(102, 252, 241, 0.3);
}


.zoom-on-hover {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  cursor: pointer;
  border-radius: 12px;
}

.zoom-on-hover:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0px 10px 40px rgba(102, 252, 241, 0.5);
}


.slickTextFrame {
  padding: 2rem;
  color: #C5C6C7; 
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeInUp 1.5s ease forwards;
}

.slickText {
  background: rgba(20, 28, 38, 0.85); 
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.4), inset 0px 0px 15px rgba(50, 70, 90, 0.6); 
  border: 1px solid rgba(69, 162, 158, 0.2);
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

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.carousel-item-custom {
  transition: all 0.8s ease;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.carousel-item-custom:hover {
  border: 2px solid #66FCF1;
  box-shadow: 0px 10px 25px rgba(102, 252, 241, 0.3);
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.carousel-item-custom img {
  border-radius: 12px;
}

@media (max-width: 600px) {
  #section4__slick {
    padding: 10px;
  }

  .slickImgFrame {
    max-height: 200px; 
  }

  .slickText {
    font-size: 1rem; 
    padding: 10px;
  }

  .slickNvidiaTitle {
    font-size: 1.3rem; 
  }

  .slickNvidiaDec {
    font-size: 0.9rem;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  #section4__slick {
    padding: 15px;
  }

  .slickImgFrame {
    max-height: 300px;
  }

  .slickText {
    font-size: 1.1rem;
    padding: 12px;
  }

  .slickNvidiaTitle {
    font-size: 1.5rem;
  }

  .slickNvidiaDec {
    font-size: 1rem;
  }
}

.slickImgFrame {
  border-radius: 15px;
  max-width: 100%;
  max-height: 350px;
  width: auto;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  animation: fadeInUp 1.5s ease forwards;
}

.v-img {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .slickImgFrame {
    max-height: 250px;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  .slickImgFrame {
    max-height: 300px;
  }
}


</style>

