<template>
  <div class="mb-5">
    <v-row>
      <v-col cols="12">
        <h5 class="text-h5">Etapas</h5>
        <span class="text-subtitle-2">Ordenas las etapas del perfil.</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <BaseTable 
          :headers="headers"
          :items="getStages"
          :loading="loading"
          :dots-menu-items="dotsMenuItems"
          :show-search-bar="false"
          table-classes="outlined"
          edit-mode
          edit-name="Editar etapa"
          @deleteFile="deleteSelectedItem"
          @addStage="showDialog = true"
          @editItem="setItemToEdit"
        >
          <template #[`item.successor_name`]="{ item }">
            {{ item.successor_name || 'Sin sucesor'}}
          </template>
        </BaseTable>
        <ConfigurationsProfilesManageStage
          v-model="showDialog" 
          :item="itemToEdit"
          :refresh-data="fetchProfileStages"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ProfileStages',
  mixins: [ListItemsMixin],
  data() {
    return { 
      loading: true,
      headers: [
        { text: 'Etapa', sortable: false, value: 'name', align: 'center' },
        { text: 'Etapa Sucesor', sortable: false, value: 'successor_name', align: 'center' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir etapa', action: 'addStage', icon: 'mdi-plus' }
      ]
    }
  },
  async fetch() {
    await this.fetchProfileStages();
    this.loading = false
  },
  computed: {
    ...mapGetters('configStage', ['getStages']),
  },
  methods: {
    async fetchProfileStages() {
      await this.$store.dispatch(
        'configStage/fetchProfileStages', 
        this.profileId
      );
    },
    async deleteSelectedItem(stageId) {
      await this.deleteItem(this.fetchProfileStages, 'configStage/deleteStage', stageId)
      await this.$store.dispatch('configStage/fetchSimpleProfileStages', {
        config: this.$route.params.config_id,
        configprofile: this.profileId
      })
      await this.$store.dispatch('configActivity/fetchActivities', this.profileId);
      await this.$store.dispatch('configMovement/fetchActivityMovements', this.profileId);
      await this.$store.dispatch('configActivityTime/fetchActivityTime', this.profileId);
    }
  }
}
</script>

