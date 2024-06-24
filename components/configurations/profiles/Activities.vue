<template>
  <div class="mb-5">
    <v-row>
      <v-col cols="12">
        <h5 class="text-h5">Actividades</h5>
        <span class="text-subtitle-2">
          Ordena las actividades de cada etapa
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseTable 
          :headers="headers"
          :items="getActivities"
          :loading="loading"
          :dots-menu-items="dotsMenuItems"
          search-bar-label="Buscar Etapa o Actividad"
          table-classes="outlined"
          edit-mode
          edit-name="Editar actividades"
          @deleteFile="deleteSelectedItem"
          @addActivity="showDialog = true"
          @editItem="setItemToEdit"
        > 
          <template #[`item.successor_name`]="{ item }">
            <span>{{ item.successor_name || 'Sin sucesor' }}</span>
          </template>
          <template #[`item.residence`]="{ item }">
            <div class="d-flex justify-center">
              <v-switch v-model="item.residence" disabled inset dense></v-switch>
            </div>
          </template>
          <template #[`item.allows_waiting`]="{ item }">
            <div class="d-flex justify-center">
              <v-switch v-model="item.allows_waiting" disabled inset dense></v-switch>
            </div>
          </template>
          <template #[`item.set_2_name`]="{ item }">
            <span>{{ item.set_2_name || 'Sin set'}}</span>
          </template>
        </BaseTable>
        <ConfigurationsProfilesManageActivity
          v-model="showDialog" 
          :item="itemToEdit"
          :refresh-data="fetchActivities"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ProfileActivities',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Etapa', value: 'configstage_name' },
        { text: 'Actividad', sortable: false, value: 'name' },
        { text: 'Residencia', sortable: false, value: 'residence' },
        { text: 'Actividad Sucesor', sortable: false, value: 'successor_name' },
        { text: 'Tiempo (Mins.)', sortable: false, value: 'time', class: 'fit-content', align: 'center' },
        { text: 'Espera', sortable: false, value: 'allows_waiting', class: 'fit-content' },
        { text: 'Set 1', sortable: false, value: 'set_1_name' },
        { text: 'Set 2', sortable: false, value: 'set_2_name' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir actividad', action: 'addActivity', icon: 'mdi-plus' }
      ],
    }
  },
  async fetch() {
    await this.fetchActivities();
    this.loading = false
  },
  computed: {
    ...mapGetters('configActivity', ['getActivities'])
  },
  methods: {
    async fetchActivities() {
      await this.$store.dispatch(
        'configActivity/fetchActivities', 
        this.profileId
      );
    },
    async deleteSelectedItem(blendId) {
      await this.deleteItem(this.fetchActivities, 'configActivity/deleteActivity', blendId)
      await this.$store.dispatch('configActivity/fetchSimpleActivities', {
        config: this.$route.params.config_id,
        configprofile: this.profileId
      })
      await this.$store.dispatch('configMovement/fetchActivityMovements', this.profileId);
      await this.$store.dispatch('configActivityTime/fetchActivityTime', this.profileId);
    }
  }
}
</script>
