<template>
  <div class="mb-5">
    <v-row>
      <v-col cols="6" class=" pb-0">
        <h5 class="text-h5">Cambios {{equipmentName}}</h5>
      </v-col>
      <v-col cols="6" class="d-flex justify-end pb-0">
        <v-btn class="d-none" color="primary">
          <v-icon> mdi-plus </v-icon>
          Añadir
        </v-btn>
        <!-- <BaseDotsMenu :items="dotsMenuItems" /> -->
      </v-col>
      <v-col cols="12" class="pt-0">
        <BaseTable 
          :headers="headers"
          :items="getChangesByEquipment"
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
  name: 'EquipmentChanges',
  props: {
    equipmentName: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      headers: [
        { text: 'Producto 1', sortable: false, value: 'product_1_code' },
        { text: 'Nombre Producto 1', divider: true, sortable: false, value: 'product_1_name' },
        { text: 'Producto 2', sortable: false, value: 'product_2_code' },
        { text: 'Nombre Producto 2', divider: true, sortable: false, value: 'product_2_name' },
        { text: 'Tipo', value: 'type_change_name' },
      ],
      dotsMenuItems: [
        { title: 'Descargar Tabla', action: 'downloadTable', icon: 'mdi-download-outline' }
      ],
      loading: true,
    }
  },
  async fetch() {
    await this.fetchChangesByEquipment();
    this.loading = false
  },
  computed: {
    ...mapGetters('configPackingChange', ['getChangesByEquipment'])
  },
  methods: {
    deleteSelectedItems() {
      this.changes = this.changes.filter(set => !set.toBeDeleted)
    },
    async fetchChangesByEquipment() {
      await this.$store.dispatch(
        'configPackingChange/fetchChangesByEquipment',
        this.$route.params.equipment_id
      );
    }
  },
}
</script>
