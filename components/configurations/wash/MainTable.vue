<template>
  <div>
    <BaseTable
      :headers="headers"
      :items="getWash"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar"
      filters-container-classes="mx-2"
      table-classes="ma-5"
      class="ma-5"
      outlined-card
      edit-mode
      edit-name="Editar lavado"
      @deleteFile="deleteSelectedItem"
      @addWash="showDialog = true"
      @editItem="setItemToEdit"
    >
    </BaseTable>
    <ConfigurationsWashManageWash
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchWashByConfig"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'MainTable',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Equipo', value: 'equipment_name', divider: true },
        { text: 'Tiempo de lavado (minutos)', value: 'timewashed', divider: true },
        { text: 'Tipo de lavado', value: 'type_washed_description', divider: true },
        { text: 'N', value: 'number', divider: true },
        { text: 'Días', value: 'days', divider: true },
        { text: 'Horario', value: 'hour', divider: true },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir lavado', action: 'addWash', icon: 'mdi-plus' }
      ],
      wash: [],
      washTypes: []
    }
  },
  async fetch() {
    await this.fetchWashByConfig();
    this.loading = false
  },
  computed: {
    ...mapGetters('configWash', ['getWash'])
  },
  methods: {
    async deleteSelectedItem(washId) {
      await this.deleteItem(this.fetchWashByConfig, 'configWash/deleteWash', washId)
    },
    async fetchWashByConfig() {
      await this.$store.dispatch(
        'configWash/fetchWashByConfig', 
        this.$route.params.config_id
      );
    },
  }
}
</script>