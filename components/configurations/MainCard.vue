<template>
  <v-row>
    <BaseSkeletonLoader v-if="loading" class="mt-5"/>
    <v-col
      v-for="config in configurations"
      v-else
      :key="config.id"
      xl="3"
      lg="4"
      md="6"
      class="mt-5"
    >
      <v-card      
        class="mx-auto"
        min-width="350"
        max-width="350"
        @mouseover="selectItem(config)"
        @mouseleave="unSelectItem()"  
      >
        <v-card-text>
          <div>{{ config.description }}</div>
          <p class="text-h4 text--primary mb-1">
            {{ config.name }}
          </p>
          <div class="d-flex align-center mb-6">
            <v-btn icon>
              <v-icon 
                :color="config.is_master_config ? 'primary' : 'grey lighten-2'"
                @click="config.is_master_config = !config.is_master_config"
              > 
                mdi-star 
              </v-icon>
            </v-btn>
            <span v-if="config.is_master_config">Favorito</span>
          </div>
          <v-chip 
            v-for="tag in config.tags" 
            :key="tag.id" 
            class="mr-1"
            color="orange lighten-4"
            pill
          >
            {{ tag.name }}
          </v-chip>
        </v-card-text>
        <v-divider class="mx-2 mt-10"></v-divider>
        <v-card-actions class="d-flex justify-space-between">
          <v-btn 
            text 
            color="primary" 
            @click="goToConfig(config.id)"
          >
            Abrir
          </v-btn>
          <BaseDotsMenu 
            right
            :left="false"
            :items="dotsMenuItems"
            @action="getEvent($event, config)"
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainCard',
  data() {
    return {  
      selectedItem: false,
      selected: [],
      configurations: [],
      loading: true,
      plant: this.$route.params.plant_id,
      dotsMenuItems: [
        { title: 'Duplicar', action: 'copyConfig', icon: 'mdi-content-copy' },
        { title: 'Eliminar', action: 'deleteConfig', icon: 'mdi-delete-outline' }
      ],
    };
  },
  async fetch() {
    if (this.plant === 0) {
      await this.configFetch();
    }
    else {
      await this.configByPlantFetch(this.plant);
      this.setConfigurations()
    }
    this.loading = false
  },
  computed: {
    ...mapGetters({
      configs: 'configuration/getConfigurations',
    })
  },
  methods: {
    setConfigurations() { 
      this.configurations = JSON.parse(JSON.stringify(this.configs))
    },
    goToConfig(configurationId) {
      this.$router.push(`/plant/${this.$route.params.plant_id}/`
      + `configurations/${configurationId}/general_information`)
    },
    selectItem (item) {
      this.selectedItem = item
    },
    unSelectItem () {
      this.selectedItem = false
    },
    ...mapActions({
      configFetch: 'configuration/fetchConfigurations',
      configByPlantFetch: 'configuration/fetchConfigurationsByPlant',
    }),
    async getConfirmation(action, configName, btnText) {
      return await this.$swal.fire({
        title: `¿Desea ${action} la configuración?`,
        text: `Está a punto de ${action} ${configName}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: btnText,
        cancelButtonText: 'Cancelar',
      });
    },
    notifySuccess(action) {
      this.$swal.fire({
        title: `Configuración ${action}`,
        text: `La configuración ha sido ${action} exitosamente`,
        icon: 'success',
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
      });
    },
    async getEvent(event, config) {
      const actionObj = event === 'copyConfig' 
        ? { action: 'duplicar', btnText: 'Duplicar', successText: 'duplicada' } 
        : { action: 'eliminar', btnText: 'Eliminar', successText: 'eliminada' }
      const result = await this.getConfirmation(actionObj.action, config.name, actionObj.btnText)
      if(result.isConfirmed) {
        await this.$store.dispatch(`configuration/${event}`, config.id)
        await this.$store.dispatch(
          'configuration/fetchConfigurationsByPlant', 
          this.$route.params.plant_id
        )
        this.setConfigurations()
        this.notifySuccess(actionObj.successText)
      }  
    }
  },
};
</script>

