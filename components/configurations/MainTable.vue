<template>
  <BaseTable 
    :headers="headers"
    :items="configs"
    :loading="$fetchState.pending"
    :show-dots-menu-items="false"
    search-bar-label="Buscar"
    filters-container-classes="mx-2"
    table-classes="ma-5"
  >
    <template #[`item.name`]="{ item }">
      <span class="cursor-pointer" @click="goToConfiguration(item.id)">{{ item.name }}</span>
    </template>
    <template #[`item.action`]="{ item }">
      <v-tooltip top>
        <template #[`activator`]="{ attrs }">
          <v-btn 
            icon 
            color="grey" 
            v-bind="attrs" 
            @click="deleteThisConfig(item)">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip top>
        <template #[`activator`]="{ attrs }">
          <v-btn
            icon
            color="grey"
            v-bind="attrs"
            @click="copyThisConfig(item)">
            <v-icon> mdi-content-copy </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </template>
  </BaseTable>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainTable',
  data() {
    return {
      search: '',
      headers: [
        { text: 'Nombre', value: 'name', align: 'left' },
        { text: 'Descripción', value: 'description', align: 'left' },
        { text: 'Planta', value: 'plant_name', align: 'left' },
        { text: '', value: 'action', sortable: false, align: 'left' },
      ],
      dialog: false,
      checked: [],
      plant: this.$route.params.plant_id
    };
  },
  async fetch() {
    if (this.plant === 0) {
      await this.configFetch();
    }
    else {
      await this.configByPlantFetch(this.plant);
    }
  },
  computed: {
    ...mapGetters({
      configs: 'configuration/getConfigurations',
    }),
  },

  methods: {
    ...mapActions({
      configFetch: 'configuration/fetchConfigurations',
      configByPlantFetch: 'configuration/fetchConfigurationsByPlant',
      deleteConfig: 'configuration/deleteConfig',
      copyConfig: 'configuration/copyConfig'
    }),
    goToConfiguration(configurationId) {
      this.$router.push(`/plant/${this.$route.params.plant_id}/`
      + `configurations/${configurationId}/general_information`)
    },  
    async deleteThisConfig(item) {
      const result = await this.$swal.fire({
        title: '¿Desea eliminar la configuración?',
        text: `Está a punto de eliminar ${item.name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        try {
          this.$nuxt.$loading.start();
          await this.deleteConfig(item.id);
          this.$swal.fire({
            title: 'Configuración Eliminada',
            text: 'La configuración ha sido borrada exitosamente',
            icon: 'success',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } catch ({ message }) {
          this.$swal.fire({
            title: '¡Error!',
            text: message,
            icon: 'error',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        } finally {
          this.$nuxt.$loading.finish();
        }
      }
    },
    async copyThisConfig(item) {
      const result = await this.$swal.fire({
        title: '¿Desea copiar la configuración?',
        text: `Está a punto de copiar ${item.name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Copiar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        try {
          this.$nuxt.$loading.start();
          await this.copyConfig(item.id);
          this.$swal.fire({
            title: 'Configuración Copiada',
            text: 'La configuración ha sido copiada exitosamente',
            icon: 'success',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } catch ({ message }) {
          this.$swal.fire({
            title: '¡Error!',
            text: message,
            icon: 'error',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        } finally {
          this.$nuxt.$loading.finish();
        }
      }
    }
  },
};
</script>
