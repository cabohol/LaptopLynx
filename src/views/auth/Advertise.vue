<script>
export default {
  data() {
    return {
      showLogo: true,
      showLoading: false,
      showGifs: false,
      gifs: [

        '/src/images/advertise1.webp', 
        'src/images/advertise.gif',
        '/src/images/gif1.gif', 
        'https://cdn.prod.website-files.com/652c101aadcd91f29004ee59/65aec32e1ca1bbfc25eee730_KP9-studio-main.gif',
      ],
      currentGifIndex: 0,
      displayText: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showLogo = false;
      this.showLoading = true;
    }, 5000);

    setTimeout(() => {
      this.showLoading = false;
      this.showGifs = true;
      this.scheduleNextGif();
    }, 5000);
  },
  methods: {
    skipAd() {
      this.$router.push('/showcasepage');
    },
    scheduleNextGif() {
      if (this.currentGifIndex < this.gifs.length - 1) {
        setTimeout(() => {
          this.currentGifIndex++;
          this.scheduleNextGif();
        }, 2000);
      } else {
        setTimeout(() => {
          this.displayText = true;
        }, 2000);
      }
    },
  },
};
</script>




<template>
  <v-app class="full-screen cyber-theme">
    <!-- Logo Display Screen -->
    <div class="logo-screen" v-if="showLogo">
      <img src="/src/images/logolynx.png" alt="LaptopLynx Logo" class="logo-image" />
    </div>

    <!-- Loading Overlay -->
    <!-- <div v-if="showLoading && !showLogo" class="loading-overlay neon-loading">
      <div class="neon-ring"></div>
      <h3 class="loading-title">Welcome to LaptopLynx</h3>
      <p class="loading-text">Bringing cutting-edge laptops to your screen</p>
      <br>
      <v-btn color="cyan darken-2" dark class="cyber-button" @click="skipAd">
        Skip
      </v-btn>
    </div> -->

    <v-container v-if="!showLoading && !showLogo" fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" class="content-wrapper">
          <div class="neon-border"></div>

          <div class="hologram-gif-container" style="margin-top: 20%;">
            <img
              v-if="!displayText"
              :src="gifs[currentGifIndex]"
              alt="Futuristic Laptop GIF"
              class="animated-hologram"
            />
            <p v-if="!displayText && currentGifIndex === 1" class="laptop-saying">
              "Empower your potential with the perfect laptop, your gateway to innovation and creativity."
            </p>
          </div>

          <div v-if="displayText" class="laptoplynx-text">
            <h1>Explore the World of LaptopLynx</h1>
            <p>Dive into LaptopLynx, a seamless blend of front-end finesse and backend precision built for our IT 110 project. Our agile team – two front-end developers pushing the boundaries of UI/UX design and one systems analyst with an eye for architecture – has coded, tested, and optimized every line to deliver an immersive, state-of-the-art experience.</p>
            <p>At LaptopLynx, we’re all about re-engineering the journey of laptop discovery. Featuring smooth animations and responsive interactions, every component is crafted to enhance your UI journey, bringing you an intuitive, high-performance interface that’s sleek, fast, and user-focused.</p>
            <p>So, prepare to engage with technology that isn’t just responsive but alive. This isn’t a simple project; it’s an integrated display of creative coding and practical innovation designed to captivate, inform, and inspire tech enthusiasts everywhere.</p>
          </div>

          <div v-if="displayText" class="button-container">
            <br>
            <v-btn color="cyan darken-2" dark class="cyber-button" @click="skipAd">
              Skip
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>




<style scoped>
.logo-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.logo-image {
  width: 50%; 
  max-width: 550px;
  height: auto;
  animation: fadeIn 1.2s ease-in-out, float 3s ease-in-out infinite;
}

@media (max-width: 1024px) { 
  .logo-image {
    width: 60%;
    max-width: 450px;
  }
}

@media (max-width: 768px) { 
  .logo-image {
    width: 70%;
    max-width: 350px;
  }
}

@media (max-width: 600px) { 
  .logo-image {
    width: 80%;
    max-width: 300px;
  }
}

@media (max-width: 480px) { 
  .logo-image {
    width: 85%;
    max-width: 250px;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}




.laptop-saying {
  text-align: center; 
  color: #66FCF1; 
  margin-top: 20px; 
  font-weight: bold; 
  font-size: 1.5em; 
  padding: 15px; 
  border-left: 4px solid #66FCF1;
  font-style: italic; 
}

.full-screen {
  background: 
    linear-gradient(135deg, #1F2833 20%, transparent 20%),
    linear-gradient(135deg, transparent 40%, #0B0C10 40%, #0B0C10 60%, transparent 60%),
    linear-gradient(135deg, #0B0C10 60%, #1F2833 60%);
  background-color: #0B0C10;
  background-size: 100% 100%; 
  height: 100vh; 
  overflow: hidden;
  position: relative;
}

.content-wrapper {
  text-align: center;
  position: relative;
  padding: 20px;
}


.animated-hologram {
  width: 450px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  animation: gifPulse 2s infinite alternate;
}

.cyber-button {
  font-weight: bold;
  text-transform: uppercase;
  padding: 12px 50px; 
  width: 150px; 
  text-align: center; 
  border: none;
  border-radius: 8px;
  color: #1F2833;
  background: linear-gradient(90deg, #1F2833, #66FCF1, #0B0C10);
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease-in-out;
}


.cyber-button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(102, 252, 241, 0.2));
  transform: rotate(45deg);
  transition: all 0.4s ease;
  opacity: 0;
}

.cyber-button:hover::before {
  opacity: 1;
  animation: moveGlow 1s infinite linear;
}

.cyber-button:hover {
  color: #66FCF1;
  background: linear-gradient(90deg, #0B0C10, #45A29E);
}

@keyframes moveGlow {
  0% { transform: translate(-25%, -25%) rotate(45deg); }
  100% { transform: translate(25%, 25%) rotate(45deg); }
}

/* .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: #66FCF1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
}

.neon-loading .neon-ring {
  width: 100px;
  height: 100px;
  border: 6px solid transparent;
  border-top: 6px solid #66FCF1;
  border-right: 6px solid #1F2833;
  border-radius: 50%;
  animation: rotate 1.5s linear infinite;
  position: relative;
}

.neon-loading .neon-ring::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 
    0 0 20px rgba(102, 252, 241, 0.5),
    0 0 30px rgba(102, 252, 241, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
} */

.loading-title {
  margin-top: 30px;
  font-weight: 600;
  font-size: 1.7em;
  color: #66FCF1;
  animation: titlePulse 2s infinite ease-in-out;
}

.laptoplynx-text h1 {
  font-size: 2.7em;
  color: #66FCF1;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #66FCF1;
  animation: typing 4s steps(30, end) infinite alternate, 
             blink-caret 0.75s step-end infinite, 
             deleting 5s steps(30, end) infinite alternate;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes deleting {
  from { width: 100%; }
  to { width: 0; }
}

@keyframes blink-caret {
  50% { border-color: transparent; }
}

.laptoplynx-text p {
  margin-top: 12px;
  color: #C5C6C7;
  text-align: justify;
  line-height: 1.2em;
  font-size: 1.20rem;
  animation: textFadeIn 2.5s ease-in-out infinite alternate;
}

@keyframes textGlow {
  0%, 100% { text-shadow: 0px 0px 15px #66FCF1; }
  50% { text-shadow: 0px 0px 35px #66FCF1; }
}

@keyframes textFadeIn {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes overlayPulse {
  0%, 100% { background: rgba(0, 0, 0, 0.95); }
  50% { background: rgba(31, 40, 51, 0.95); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes ringGlow {
  0%, 100% { box-shadow: 0 0 15px #66FCF1, 0 0 25px #1F2833; }
  50% { box-shadow: 0 0 30px #66FCF1, 0 0 50px #1F2833; }
}

@keyframes titlePulse {
  0%, 100% { color: #66FCF1; }
  50% { color: #45A29E; }
}


@media (max-width: 768px) {
  .animated-hologram {
    width: 90%; 
  }

  .laptoplynx-text h1 {
    font-size: 6vw; 
  }

  .laptoplynx-text p {
    font-size: 4vw;
  }

  .loading-title {
    font-size: 4vw; 
  }
}

@media (max-width: 480px) {
  .laptop-saying {
    font-size: 1.2em; 
    padding: 10px;
  }

  .loading-title {
    font-size: 5vw; 
  }
  .animated-hologram {
    margin-top: 50px !important; 
  }
}
</style>
