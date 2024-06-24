<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="finalProducts"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar Código o Nombre"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar productos"
      @cleanFilters="cleanFilters"
      @deleteFile="deleteSelectedItem"
      @addFinalProduct="showDialog = true"
      @editItem="setItemToEdit"
    >
      <template #table-actions>     
        <ConfigurationsProductsFiltersMenu ref="filterComponent" @toFilter="addFilter"/>
      </template>
      <template #[`item.has_blends`]="{ item }">
        <v-icon class="ml-5" :color="item.has_blends ? 'success' : 'error'"> 
          {{ item.has_blends ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }} 
        </v-icon>
      </template>
      <template #[`item.has_compatibilities`]="{ item }">
        <v-icon class="ml-10" :color="item.has_compatibilities ? 'success' : 'error'"> 
          {{ item.has_compatibilities ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }} 
        </v-icon>
      </template>
    </BaseTable>
    <ConfigurationsProductsManageFinalProduct 
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchFinalProducts"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'FinalProducts',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'SKU', sortable: false, value: 'code' },
        { text: 'Nombre', sortable: false, value: 'name' },
        { text: 'Área', value: 'configarea_name' },
        { text: 'Min. Stock (Días)', value: 'min_stock' },
        { text: 'Max. Stock (Días)', value: 'max_stock' },
        { text: 'Unidades por pack', value: 'units_per_pack' },
        { text: 'Desfase', value: 'gap_days' },
        { text: 'Tiempo mínimo', value: 'minimum_production_time' },
        { text: 'Priorización', value: 'priorization' },        
        { text: 'Tiene mezclas', value: 'has_blends' },
        { text: 'Tiene compatibilidades', value: 'has_compatibilities' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir Producto', action: 'addFinalProduct', icon: 'mdi-plus' }
      ],
      finalProducts: [],
      filters: []
    }
  },
  async fetch() {
    await this.fetchFinalProducts();
  },
  computed: {
    ...mapGetters('configProducts', ['getFinalProducts'])
  },
  methods: {
    async deleteSelectedItem(productId) {
      await this.deleteItem(
        this.fetchFinalProducts, 
        'configProducts/deleteFinalProduct', 
        productId
      )
    },
    addFilter(event) {
      const arrAreas = event.find(area => area.name === 'Areas').filterItems

      if(!arrAreas.length) {
        this.copyProducts()
        return
      }
      this.finalProducts = this.getFinalProducts
        .filter(product => arrAreas.includes(product.configarea_name))
    },
    cleanFilters() {
      this.copyProducts()
      this.filters = []
    },
    copyProducts() {
      this.finalProducts = [...this.getFinalProducts]
    },
    async fetchFinalProducts() {
      await this.$store.dispatch(
        'configProducts/fetchFinalProducts', 
        this.$route.params.config_id
      );
      this.copyProducts()
      this.$refs.filterComponent.loadItems()
      this.loading = false
    }
  }
}
</script>
