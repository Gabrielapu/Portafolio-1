<template>
  <v-card flat class="border-bottom px-5 py-5 d-flex alig-center">
    <ResultsBatchPlanSeeByList
      v-model="selectedItem"
      :items="items"
      filter-name="Ver por"
    />

    <div class="selector">
      <span class="body-2"> Año: </span>
      <div class="d-flex align-center">
        <v-icon @click="year--"> mdi-menu-left </v-icon>
        <span class="body-2"> {{year}} </span>
        <v-icon @click="year++"> mdi-menu-right </v-icon>
      </div>
    </div>

    <div v-if="selectedItem.name === 'Meses'" class="selector">
      <span class="body-2"> Mes: </span>
      <div class="d-flex align-center">
        <v-icon :disabled="month === 0" @click="month--">
          mdi-menu-left
        </v-icon>
        <span class="body-2"> {{months[month]}} </span>
        <v-icon :disabled="month === 11" @click="month++">
          mdi-menu-right
        </v-icon>
      </div>
    </div>

    <div v-if="selectedItem.name === 'Semanas'" class="selector">
      <span class="body-2"> Semana: </span>
      <div class="d-flex align-center">
        <v-icon :disabled="week === 1" @click="week--; calculateMonth();">
          mdi-menu-left
        </v-icon>
        <span class="body-2"> 
          {{`${currentWeek.monday} a ${currentWeek.sunday}`}}
        </span>
        <v-icon :disabled="week === 52" @click="week++; calculateMonth();">
          mdi-menu-right
        </v-icon>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'DateFilter',
  data() {
    return {
      selectedItem: { id: 3, name: 'Año' },
      items: [
        { id: 1, name: 'Semanas' },
        { id: 2, name: 'Meses' },
        { id: 3, name: 'Año' },
      ],
      months: {
        0: 'Enero',
        1: 'Febrero',
        2: 'Marzo',
        3: 'Abril',
        4: 'Mayo',
        5: 'Junio',
        6: 'Julio',
        7: 'Agosto',
        8: 'Septiembre',
        9: 'Octubre',
        10: 'Noviembre',
        11: 'Diciembre'
      },
      month: this.$dayjs().month(),
      week: this.$dayjs().week(),
      year: this.$dayjs().year(),
    }
  },
  fetch() {
    this.emitDate()
  },
  computed: {
    currentWeek() {
      return {
        monday: this.$dayjs().week(this.week).day(1).format('DD MM').replace(' ','/'),
        sunday: this.$dayjs().week(this.week).day(7).format('DD MM').replace(' ','/'),
      }
    },
    getDate() {
      return { 
        seeBy: this.selectedItem.name, 
        year: this.year, 
        month: (this.month + 1).toString().length === 1 
          ? parseInt('0' + (this.month + 1)) 
          : this.month + 1,
        firstDateOfWeek: this.$dayjs().week(this.week).day(1).format('YYYY-MM-DD'),
        lastDateOfWeek: this.$dayjs().week(this.week).day(7).format('YYYY-MM-DD')
      }
    }
  },
  watch: {
    getDate: {
      handler() {
        this.emitDate()
      },
      inmediate: true
    }
  },
  methods: {
    emitDate() {
      this.$emit('date', this.getDate)
    },
    calculateMonth() {
      this.month = parseInt(this.currentWeek.monday.slice(3, 5)) - 1;
    }
  }
}
</script>

<style scoped>
.selector {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
</style>