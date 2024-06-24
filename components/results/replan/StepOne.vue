<template>
  <div class="d-flex flex-column align-center">
    <h5 class="text-h5">
      ¿Desde cuándo realizarás cambios a la planificación programada?
    </h5>
    <span class="subtitle-1"> Selecciona un día y hora. </span>
    <v-card class="mt-10 mb-5 pa-5 rounded-lg" elevation="5" width="450px">
      <v-row>
        <v-col cols="8">
          <span class="subtitle-1"> Selecciona un día de la semana: </span>
        </v-col>
        <v-col cols="4" class="d-flex">
          <v-menu bottom left>
            <template #activator="{ on, attrs }">
              <div class="d-flex justify-space-between align-center" v-bind="attrs" v-on="on">
                <span v-if="selectedTime.selectedDay" class="text-body-2 primary--text">
                  {{selectedTime.selectedDay.text}}
                </span>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
            </template>
            <v-list dense>
              <v-list-item v-for="date in dates" :key="date.id" @change="setDate">
                <v-list-item-title class="cursor-pointer" @click="selectedTime.selectedDay = date">
                  {{ date.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col cols="8">
          <span class="subtitle-1"> Selecciona una hora de inicio: </span>
        </v-col>
        <v-col cols="4" class="d-flex">
          <v-menu bottom left>
            <template #activator="{ on, attrs }">
              <div class="d-flex justify-space-between align-center" v-bind="attrs" v-on="on">
                <span v-if="selectedTime.selectedHour" class="text-body-2 primary--text mr-5">
                  {{selectedTime.selectedHour}}
                </span>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
            </template>
            <div class="custom-height">
              <v-list dense>
                <v-list-item v-for="hour, index in hours" :key="index" @change="setDate">
                  <v-list-item-title class="cursor-pointer" @click="selectedTime.selectedHour = hour">
                    {{ hour }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'StepOne',
  data() {
    return {
      selectedTime: {
        selectedDay: null,
        selectedHour: '00:00',
      },
      dates: []
    }
  },
  computed: {
    hours() {
      return  [...Array(48)].map((_, index) => {
          const previousZero = index / 2 < 10 ? '0' : ''
          const hourNumber = index / 2 - index / 2 % 1
          const minutes = index / 2 % 1 !== 0 ? ':30' : ':00'
          return previousZero + hourNumber + minutes
        }
      )
    }
  },
  created() {
    this.dates = this.getWeekDates()
  },
  methods: {
    getWeekDates() {
      const weekDates = [];
      for (let i = 1; i <= 7; i++) {
        let strDay = this.$dayjs().day(i).format('dddd')
        strDay = strDay.charAt(0).toUpperCase() + strDay.slice(1);
        weekDates.push({
          id: i,
          text: `${strDay} ${this.$dayjs().day(i).format('DD')}`
        }); 
      }
      this.selectedTime.selectedDay = weekDates[0];
      this.setDate();
      return weekDates; 
    },
    setDate() {
      this.$store.dispatch(
        'replanning/setFirstStepTime', 
        JSON.parse(JSON.stringify(this.selectedTime))
      )

    }
  }
}
</script>

<style scoped>
.custom-height {
  height: 300px;
}
</style>
