<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="getConnections"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar "
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar conexión"
      @deleteFile="deleteSelectedItem"
      @addEquipmentConnection="showDialog = true"
      @editItem="setItemToEdit"   
    >
    </BaseTable>
    <ConfigurationsEquipmentManageConnection
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchConnections"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ListConnections',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Area', sortable: false, value: 'config_area_name' },
        { text: 'Máquina 1', value: 'equipment_name_1' },
        { text: 'Máquina 2', value: 'equipment_name_2' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir conexión', action: 'addEquipmentConnection', icon: 'mdi-plus' }
      ],
    }
  },
  async fetch() {
    await this.fetchConnections();
  },
  computed: {
    ...mapGetters('configEquipmentConnection', ['getConnections'])
  },
  methods: {
    async fetchConnections() {
      await this.$store.dispatch(
        'configEquipmentConnection/fetchConnections', 
        this.$route.params.config_id
      );
      this.loading = false
    },
    async deleteSelectedItem(connectionId) {
      await this.deleteItem(
        this.fetchConnections, 
        'configEquipmentConnection/deleteEquipmentConnection', 
        connectionId
      )
    }
  }
}
</script>
