<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="usefulLife"
      :loading="loading"
      search-bar-label="Buscar Código o Nombre"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar productos"
      @deleteFile="deleteSelectedItem"
      @addFinalProduct="showDialog = true"
      @editItem="setItemToEdit"
    >
    </BaseTable>
    <ConfigurationsProductsManageUsefulLife
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchUsefulLifeProductList"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'UsefulLife',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'SKU', sortable: false, value: 'code' },
        { text: 'Nombre', sortable: false, value: 'name' },
        { text: 'Vida útil original', value: 'useful_life' },
        { text: 'Porcentaje vida útil', value: 'percentage_useful_life' },
        { text: 'Días de seguridad', value: 'safety_days' },
        { text: 'Vida útil final', value: 'end_useful_life' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      usefulLife: [],
      filters: []
    }
  },
  async fetch() {
    await this.fetchUsefulLifeProductList();
  },
  computed: {
    ...mapGetters('configProducts', ['getUsefulLifeProductList'])
  },
  methods: {
    async deleteSelectedItem(productId) {
      await this.deleteItem(
        this.fetchUsefulLifeProductList, 
        'configProducts/deleteFinalProduct', 
        productId
      )
    },
    copyProducts() {
      this.usefulLife = JSON.parse(JSON.stringify(this.getUsefulLifeProductList))
    },
    async fetchUsefulLifeProductList() {
      await this.$store.dispatch(
        'configProducts/fetchUsefulLifeProductList', 
        this.$route.params.config_id
      );
      this.copyProducts()
      this.loading = false
    }
  }
}
</script>
