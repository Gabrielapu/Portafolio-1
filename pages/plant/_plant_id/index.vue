<template>
  <div>
    <UiInfoBar
      :title="`Configuraciones de ${getTitle}`" 
      subtitle="Seleccionar un escenario para ver resultados"
    />
    <v-card flat class="pt-4 border-bottom">
      <div class="d-flex justify-space-between">
        <div class="d-flex">
          <v-tabs>
            <v-tab @click="config_cards = true; config_list = false">
              <v-icon>mdi-apps</v-icon>
            </v-tab>
            <v-tab @click="config_list = true; config_cards = false">
              <v-icon>mdi-menu</v-icon>
            </v-tab>
          </v-tabs>
        </div>
        <v-btn color="primary" class="mr-5" @click="goToAddConfig()">
          <v-icon> mdi-plus </v-icon> 
          Nuevo
        </v-btn>
      </div>
    </v-card>
    <ConfigurationsMainTable v-if="config_list"/>
    <ConfigurationsMainCard v-if="config_cards"/>
  </div>
</template>

<script>
export default {
  name: 'ConfigurationPage',
  data() {
    return {
      config_cards: true,
      config_list: false,
    }
  },
  computed: {
    getTitle() {
      return this.$route.params.plant_id === '1' ? 'Planta 3' : 'Planta 4'
    }
  },
  methods: {
    goToAddConfig() {
      const plantId = this.$route.params.plant_id;
      this.$router.push(`/plant/${plantId}/configurations/add_configuration/`);
    }
  }
}
</script>

<style scoped>
.button-end{
  justify-content: end;
}
</style>