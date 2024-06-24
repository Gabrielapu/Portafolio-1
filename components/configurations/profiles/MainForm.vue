<template>
  <v-card :loading="loading" flat outlined class="ma-4">
    <v-container fluid>
      <v-row>
        <v-col cols="3 mt-15">
          <div class="fixed">
            <v-tabs class="mt-5" vertical light>
              <v-tab @click="scrollTo('information')"> Información </v-tab>
              <v-tab @click="scrollTo('steps')"> Etapas </v-tab>
              <v-tab @click="scrollTo('activities')"> Actividades </v-tab>
              <v-tab @click="scrollTo('movements')"> Movimientos </v-tab>
              <v-tab @click="scrollTo('timePerActivity')"> Tiempo por Actividad </v-tab>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="9">
          <v-container fluid>
            <v-breadcrumbs class="pa-0 mb-12" :items="breadcrumbItems"/>
            <ConfigurationsProfilesInformation 
              id="information"
              :refresh-data="fetchProfileData"
            />
            <v-divider class="mb-10"></v-divider>
            <ConfigurationsProfilesStages id="steps"/>
            <v-divider class="mb-10"></v-divider>
            <ConfigurationsProfilesActivities id="activities"/>
            <v-divider class="mb-10"></v-divider>
            <ConfigurationsProfilesMovements id="movements" />
            <v-divider class="mb-10"></v-divider>
            <ConfigurationsProfilesActivityTime id="timePerActivity" />
            <v-divider class="mb-10"></v-divider>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainForm',
  data() {
    return {
      loading: true,
      breadcrumbItems: [
        {
          text: 'Preparaciones',
          disabled: false,
          href: `/plant/${this.$route.params.plant_id}/configurations/${this.$route.params.config_id}/profiles`,
        },
        {
          text: '',
          disabled: true,
          href: '',
        }
      ]
    }
  },
  async fetch() {
    await this.fetchProfileData();
    this.loading = false
  },
  computed: {
    ...mapGetters('configProfile', ['getProfileData']),
  },
  methods: {
    async fetchProfileData() {
      await this.$store.dispatch(
        'configProfile/fetchProfileData', 
        this.$route.params.profile_id
      );
      const item = this.breadcrumbItems.find(item => item.disabled)
      item.text = this.getProfileData.name
    },    
    scrollTo(id) {
      const element = document.getElementById(id);
      const top = element.offsetTop;
      window.scrollTo(0, top);
    }
  },
}
</script>

<style scoped>
.custom {
  max-height: 500px;
}
.fixed {
  position: fixed;
  top: 200px;
  left: 310px;
}
</style>
<style>
.v-application .text-subtitle-1 {
  font-weight: 500;
}
.v-application .text-h5 {
  font-weight: 500;
}
</style>