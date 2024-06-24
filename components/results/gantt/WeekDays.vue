<template>
  <v-menu bottom left>
    <template #activator="{ on, attrs }">
      <div class="d-flex justify-start align-center" v-bind="attrs" v-on="on">
        <span class="text-body-2 text--secondary mr-2">Día:</span>
        <span v-if="selectedDay" class="primary--text text-body-2 font-weight-black">
          {{selectedDay.text}}
        </span>
        <v-icon>mdi-chevron-down</v-icon>
      </div>
    </template>
    <v-list dense>
      <v-list-item v-for="date in dates" :key="date.id">
        <v-list-item-title 
          class="cursor-pointer font-weight-medium" 
          @click="setDay(date)"
        >
          {{ date.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'WeekDays',
  data() {
    return {
      selectedDay: null,
    }
  },
  mounted() {
    this.$root.$on('today-gantt-chart', () => {
      const weekDay = this.$dayjs().day()
      const strDay = this.capitalizeFirstChar(this.$dayjs().day(weekDay).format('dddd'))
      this.selectedDay = {
        i: weekDay,
        text: `${strDay} ${this.$dayjs().day(weekDay).format('DD')}`
      }
    })
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
          text: `${strDay} ${this.$dayjs(this.$route.query.start_date).day(i).format('DD')}`
        });
      }
      /* Busca el día de la semana (de 1 a 7) a que corresponde start_date y en base a eso se elige
      el dia seleccionado al cargar la gantt */
      const weekDay = this.$dayjs(this.$route.query.start_date).format('d')
      this.selectedDay = weekDates.find(date => date.id === parseInt(weekDay))
      return weekDates; 
    },
    setDay(date) {
      this.selectedDay = date
      this.$root.$emit('gantt-range', {
        start: `${this.$dayjs(this.$route.query.start_date).day(date.id).format('YYYY-MM-DD')} 00:00`,
        end: `${this.$dayjs(this.$route.query.start_date).day(date.id+1).format('YYYY-MM-DD')} 00:00`
      })
    }
  },
}
</script>
