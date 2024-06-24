<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="changes"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar"
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar envasado"
      @deleteFile="deleteSelectedItem"
      @addChange="showDialog = true"
      @editItem="setItemToEdit"  
    >
      <template #table-actions>     
        <ConfigurationsChangesFiltersMenu :set-loading="setLoading" @toFilter="addFilter"/>
      </template>
    </BaseTable>
    <ConfigurationsChangesManagePacking
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchChangesByConfig"
    /> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'PackingTable',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Máquina', value: 'equipment_name', divider: true },
        { text: 'Producto 1', value: 'product_1_code' },
        { text: 'Nombre', value: 'product_1_name', divider: true },
        { text: 'Producto 2', value: 'product_2_code' },
        { text: 'Nombre', value: 'product_2_name', divider: true },
        { text: 'Tipo de cambio', value: 'type_change_name' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir envasado', action: 'addChange', icon: 'mdi-plus' }
      ],
      changes: [],
      filters: [],
    }
  },
  async fetch() {
    await this.fetchChangesByConfig();
  },
  computed: {
    ...mapGetters('configPackingChange', ['getChangesByConfig'])
  },
  methods: {
    async fetchChangesByConfig() {
      await this.$store.dispatch(
        'configPackingChange/fetchChangesByConfig', 
        this.$route.params.config_id
      );
      this.changes = JSON.parse(JSON.stringify(this.getChangesByConfig))
    },
    async deleteSelectedItem(changeId) {
      await this.deleteItem(
        this.fetchChangesByConfig, 
        'configPackingChange/deletePackingChange', 
        changeId
      )
    },
    setLoading(value) {
      this.loading = value
    },
    addFilter(event) {
      const machines = event.machines
      const products = event.products

      const conditions = {
        machine: change => machines.includes(change.equipment_name),
        products: change => 
          products.includes(change.product_1_name) || 
          products.includes(change.product_2_name)
      }
      const filters = []
      if(machines.length) {
        filters.push(conditions.machine)
      }
      if(products.length) {
        filters.push(conditions.products)
      }

      this.changes = this.getChangesByConfig
        .filter(change => filters.every(filter => filter(change)))
    }
  }
}
</script>