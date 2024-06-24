<template>
  <div class="mb-5">
    <v-row>
      <v-col cols="12">
        <h5 class="text-h5">Tiempo por Actividad</h5>
        <span class="text-subtitle-2">
          Personaliza el tiempo de actividad por mezcla o producto
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseTable 
          :headers="headers"
          :items="getActivityTime"
          :loading="loading"
          :dots-menu-items="dotsMenuItems"
          search-bar-label="Buscar Nombre o Actividad"
          table-classes="outlined"
          edit-mode
          edit-name="Editar tiempo por activdad"
          @deleteFile="deleteSelectedItem"
          @addActivityTime="showDialog = true"
          @editItem="setItemToEdit"
        >
        </BaseTable>
        <ConfigurationsProfilesManageActivityTime
          v-model="showDialog" 
          :item="itemToEdit"
          :refresh-data="fetchActivityTime"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ActivityTime',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Tipo', value: 'activity_type' },
        { text: 'Nombre', sortable: false, value: 'name' },
        { text: 'Actividad', sortable: false, value: 'configactivity_name' },
        { text: 'Tiempo (Mins.)', sortable: false, value: 'time' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' }
      ],
      dotsMenuItems: [
        { title: 'Añadir tiempo por actividad', action: 'addActivityTime', icon: 'mdi-plus' }
      ],
    }
  },
  async fetch() {
    await this.fetchActivityTime();
  },
  computed: {
    ...mapGetters('configActivityTime', ['getActivityTime'])
  },
  methods: {
    async fetchActivityTime() {
      await this.$store.dispatch(
        'configActivityTime/fetchActivityTime',
        this.profileId
      );
      this.loading = false
    },
    async deleteSelectedItem(activityTimeId) {
      await this.deleteItem(
        this.fetchActivityTime, 
        'configActivityTime/deleteActivityTime', 
        activityTimeId
      )
    }
  }
}
</script>
