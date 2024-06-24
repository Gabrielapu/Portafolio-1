<template>
  <div class="mb-5">
    <v-row>
      <v-col cols="12">
        <h5 class="text-h5">Movimientos</h5>
        <span class="text-subtitle-2">
          Actividades simultáneas
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseTable 
        :headers="headers"
        :items="getMovements"
        :loading="loading"
        :dots-menu-items="dotsMenuItems"
        :show-search-bar="false"
        table-classes="outlined"
        edit-mode
        edit-name="Editar movimiento"
        @deleteFile="deleteSelectedItem"
        @addMovement="showDialog = true"
        @editItem="setItemToEdit"
      >
      </BaseTable>
      <ConfigurationsProfilesManageMovement
        v-model="showDialog" 
        :item="itemToEdit"
        :refresh-data="fetchActivityMovements"
      />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ProfileMovements',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Actividad 1', sortable: false, value: 'configactivity_1_name' },
        { text: 'Etapa 1', sortable: false, value: 'configstage_1_name' },
        { text: 'Actividad 2', sortable: false, value: 'configactivity_2_name' },
        { text: 'Etapa 2', sortable: false, value: 'configstage_2_name' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir movimiento', action: 'addMovement', icon: 'mdi-plus' }
      ],
    }
  },
  async fetch() {
    await this.fetchActivityMovements();
  },
  computed: {
    ...mapGetters('configMovement', ['getMovements'])
  },
  methods: {
    async fetchActivityMovements() {
      await this.$store.dispatch(
        'configMovement/fetchActivityMovements',
        this.profileId
      );
      this.loading = false
    },
    async deleteSelectedItem(movementId) {
      await this.deleteItem(this.fetchActivityMovements, 'configMovement/deleteMovement', movementId)
    }
  }
}
</script>
