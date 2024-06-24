<template>
  <div>
    <UiResultsInfoBar 
      title="Actividades" 
      :subtitle="getSubtitle()"
    />
    <ResultsGanttChart />
  </div>
</template>

<script>
export default {
  name: 'GanttView',
  methods: {
    getSubtitle() {
      const firstDayOfWeek = this.capitalizeFirstChar(this.$dayjs(this.$route.query.start_date)
        .day(1).format('dddd D'))
      const lastDayOfWeek = this.capitalizeFirstChar(this.$dayjs(this.$route.query.start_date)
        .day(7).format('dddd D'))
      const actualMonth = this.capitalizeFirstChar(this.$dayjs().format('MMMM'))
      return `${firstDayOfWeek} - ${lastDayOfWeek} de ${actualMonth}`
    }
  }
}
</script>
