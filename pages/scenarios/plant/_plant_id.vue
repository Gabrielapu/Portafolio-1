<template>
  <div>
    <UiInfoBar 
      title="Escenarios" 
      subtitle="Seleccionar un escenario para ver resultados"
      @addPlan="goToAddPlan"
    />
    <ScenariosMainTable/>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    goToAddPlan() {
      this.$router.push({ 
        path: '/scenarios/add_scenario/', 
        query: { plant: this.$route.params.plant_id} 
      });
    }
  }
}
</script>

<style scoped>
  .button-end{
    justify-content: end;
  }
</style>