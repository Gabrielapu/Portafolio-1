<template>
  <ResultsBatchPlanSeeByList
    v-model="selectedItem"
    :items="days"
    filter-name="Día inicio"
  />
</template>

<script>
export default {
  name: 'DayFilter',
  data() {
    return {
      selectedItem: { id: 0, name: 'Todos' },
      days: [
        { id: 0, name: 'Todos' },
        { id: 1, name: 'Lunes' },
        { id: 2, name: 'Martes' },
        { id: 3, name: 'Miércoles' },
        { id: 4, name: 'Jueves' },
        { id: 5, name: 'Viernes' },
        { id: 6, name: 'Sábado' },
        { id: 7, name: 'Domingo' },
      ]
    }
  },
  watch: {
    selectedItem(val) {
      this.$emit('start_day', val.name === 'Todos' ? false : val.name)
    }
  },
}
</script>
