<template>
  <div class="mb-5">
    <v-row>
      <v-col cols="6" class="pb-0">
        <h5 class="text-h5">Conexiones {{equipmentName}}</h5>
      </v-col>
      <v-col cols="6" class="pb-0 d-flex justify-end">
        <v-btn color="primary" class="d-none">
          <v-icon> mdi-plus </v-icon>
          Añadir
        </v-btn>
        <!-- <BaseDotsMenu :items="dotsMenuItems" /> -->
      </v-col>
      <v-col cols="12" class="pt-0">
        <BaseTable 
          :headers="headers"
          :items="connections"
          :loading="loading"
          :show-dots-menu="false"
          :show-search-bar="false"
          table-classes="outlined"
        >
        </BaseTable>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EquipmentConnections',
  props: {
    equipmentName: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      headers: [
        { text: 'ID', sortable: false, value: 'id', align: 'center' },
        { text: 'Nombre', sortable: false, value: 'name', align: 'center' },
      ],
      dotsMenuItems: [
        { title: 'Descargar Tabla', action: 'downloadTable', icon: 'mdi-download-outline' }
      ],
      loading: true,
      connections: []
    }
  },
  async fetch() {
    await this.fetchConnectionByEquipment();
    this.loading = false
  },
  computed: {
    ...mapGetters('configEquipmentConnection', ['getConnectionByEquipment']),
  },
  methods: {
    deleteSelectedItems() {
      this.connections = this.connections.filter(set => !set.toBeDeleted)
    },
    async fetchConnectionByEquipment() {
      await this.$store.dispatch(
        'configEquipmentConnection/fetchConnectionByEquipment',
        this.$route.params.equipment_id
      );
      this.connections = JSON.parse(JSON.stringify(this.getConnectionByEquipment))
        .map(item => ({
          ...item,
          toBeDeleted: false
        }))
    },
  },
}
</script>
