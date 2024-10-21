<template>
  <v-row style="background-color: #0B0C10; min-height: 100vh;">
    <v-col cols="12" md="6" class="mx-auto">
      <v-card class="mx-auto" style="background-color: #1F2833;">
        <v-card-title class="text-center">
          <br>
          <v-img class="mx-auto" src="/src/images/logolynx.png" width="30%"></v-img>
          <h2 class="white--text" style="color: #C5C6C7;">Make your Laptop Appointment</h2>
          <h4 class="white--text" style="color: #C5C6C7; text-align: center;">
            <span style="display: flex; align-items: center; justify-content: center;">
              <hr style="flex-grow: 1; margin-right: 10px; border-color: #C5C6C7;" />
              Book Now!
              <hr style="flex-grow: 1; margin-left: 10px; border-color: #C5C6C7;" />
            </span>
          </h4>
        </v-card-title>
        <v-card-text class="pt-4" style="background-color: #1F2833;">
          <v-form fast-fail @submit.prevent="submitForm">
            <v-text-field
              label="Enter Name:"
              v-model="name"
              :rules="[() => !!laptop || 'This field is required']"
              outlined
              style="background-color:#1F2833; color: #fff;"
              class="white--text"
            ></v-text-field>
            <v-autocomplete
              ref="laptop"
              v-model="laptop"
              :items="laptopModels"
              :rules="[() => !!laptop || 'This field is required']"
              label="Select Laptop"
              placeholder="Select..."
              required
              outlined
              style="background-color: #1F2833; color: #fff;"
              class="white--text"
            ></v-autocomplete>
            <v-text-field
              label="Meetup Place:"
              v-model="meetupPlace"
              outlined
              style="background-color:#1F2833; color: #fff;"
              class="white--text"
              value="CSU (Hiraya Hall)"
              readonly
            ></v-text-field>
            <v-container>
              <v-row justify="space-around">
                <!-- Date Picker -->
                <v-col cols="6">
                  <v-date-picker
                    v-model="selectedDate"
                    color="cyan-accent-2"
                    label="Select Date"
                    :min="new Date().toISOString().substr(0, 10)"
                    @input="handleDateChange"
                    class="white--text"
                  ></v-date-picker>
                </v-col>
                <v-col cols="6" class="mt-4">
                  <span class="font-weight-black" style="padding-left: 50px; color: #fff;">Select Time:</span>
                  <v-row class="pt-2" style="padding-left: 50px;">
                    <v-col cols="5" v-for="time in timeOptions" :key="time">
                      <v-btn
                        :class="{'primary--text': selectedTime === time}"
                        color="cyan-accent-2"
                        block
                        @click="selectTime(time)"
                        class="my-2"
                      >
                        {{ time }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <!-- Display Selected Date and Time -->
              <v-alert v-if="selectedDate && selectedTime" type="info" class="mt-4" style="background-color: #0B0C10; color: #fff;">
                Selected Time: {{ selectedTime }} on {{ selectedDate }}
              </v-alert>
            </v-container>
            <v-btn class="mt-2" type="submit" block color="cyan-accent-2"> <RouterLink to="/dashboard">SUBMIT</RouterLink> </v-btn>
          </v-form>
        </v-card-text>
        <br>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      selectedTime: null,
      laptop: null,
      selectedDate: null,
      meetupPlace: 'CSU (Hiraya Hall)', // Pre-filled with CSU (Hiraya Hall)
      timeOptions: [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM',
        '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
      ],
      laptopModels: [
        'Acer Aspire 5', 'Dell XPS 13', 'HP Pavilion', 'Lenovo ThinkPad X1',
        'Asus ZenBook 14', 'MacBook Air', 'Razer Blade 15', 'Microsoft Surface Laptop',
        'Acer Swift 3', 'Dell Inspiron 15', 'HP Envy', 'Lenovo IdeaPad',
        'Asus VivoBook', 'LG Gram 17', 'Samsung Galaxy Book', 'Toshiba Tecra',
        'MSI Prestige 14', 'Huawei MateBook X Pro', 'Alienware m15',
        'Fujitsu Lifebook', 'Gigabyte AERO 15'
      ],
    };
  },
  methods: {
    selectTime(time) {
      this.selectedTime = time;
    },
    handleDateChange(date) {
      this.selectedDate = date;
    },
    submitForm() {
      console.log('Form Submitted:', {
        name: this.name,
        laptop: this.laptop,
        selectedDate: this.selectedDate,
        selectedTime: this.selectedTime,
        meetupPlace: this.meetupPlace
      });
    }
  }
};
</script>
