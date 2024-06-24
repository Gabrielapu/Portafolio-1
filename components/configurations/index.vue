<template>
  <v-container class="pa-0">
    <v-card light tile>
      <v-row class="px-6 pt-6 justify-space-between mb-2">
        <v-card-title>
          Parámetros Globales
        </v-card-title>
        <div class="ma-3">
          <v-btn color="light-blue darken-2 white--text" @click="goToAddConfig()">
            <v-icon> mdi-plus </v-icon> Nuevo
          </v-btn>
        </div>
      </v-row>
      <v-row class="px-6 justify-space-between"></v-row>
      <div class="d-flex">
        <v-flex>
          <v-tabs
            background-color="white"
            center-active
            light
            left
          >
            <v-tab @click="config_cards = !config_list"><v-icon>mdi-apps</v-icon></v-tab>
            <v-tab @click="config_list = !config_cards"><v-icon>mdi-menu</v-icon></v-tab>
          </v-tabs>
        </v-flex>
      </div>
    </v-card>
    <v-container class="grey lighten-5">
      <ConfigurationsMainTable v-if="config_list" />
      <ConfigurationsMainCard v-if="config_cards" />
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'ConfigurationPage',
  data() {
    return {
      config_cards: true,
      config_list: false
    }
  },
  methods: {
    goToAddConfig() {
      this.$router.push(`/plant/${this.$route.params.plant_id}/configurations/add_configuration/`);
    }
  }
}
</script>

<style scoped>
  .button-end{
    justify-content: end;
  }
</style>