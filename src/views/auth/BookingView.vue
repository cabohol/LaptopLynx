<template>
  <v-row style="background-color: #0B0C10; min-height: 100vh;">
    <v-col cols="12" md="6" class="mx-auto">
      <v-card class="mx-auto" style="background-color: #1F2833;">
        <template v-slot:title>
          <span class="font-weight-black" style="color: #fff;">LaptopLynx Appointment Form</span>
        </template>

        <v-card-text class="bg-surface-light pt-4">
          <v-form fast-fail @submit.prevent="submitForm">
        
            <v-text-field label="Enter Name:" v-model="name" outlined></v-text-field>

            <v-autocomplete
              ref="laptop"
              v-model="laptop"
              :items="laptopModels"
              :rules="[() => !!laptop || 'This field is required']"
              label="Select Laptop"
              placeholder="Select..."
              required
              outlined
            ></v-autocomplete>

            <v-container>
              <v-row justify="space-around">
                <!-- Date Picker -->
                <v-col cols="6">
                  <v-date-picker
                    v-model="selectedDate"
                    color="cyan-accent-2"
                    label="Select Date"
                    @input="handleDateChange"
                  ></v-date-picker>
                </v-col>
                
                <v-col cols="6" class="mt-4">
                  <span class="font-weight-black" style="padding-left: 50px; color: ba;">Select Time:</span>
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
              <v-alert v-if="selectedDate && selectedTime" type="info" class="mt-4">
                Selected Time: {{ selectedTime }} on {{ selectedDate }}
              </v-alert>
            </v-container>

            <v-btn class="mt-2" type="submit" block color="cyan-accent-2">SUBMIT</v-btn>
          </v-form>
        </v-card-text>
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
      // When a time is selected, it only updates the time without resetting the form
      this.selectedTime = time;
    },
    handleDateChange(date) {
      // When the date is changed, update it without affecting other fields
      this.selectedDate = date;
    },
    submitForm() {
      // Logic to handle form submission
      console.log('Form Submitted:', {
        name: this.name,
        laptop: this.laptop,
        selectedDate: this.selectedDate,
        selectedTime: this.selectedTime,
      });
    }
  }
};
</script>
