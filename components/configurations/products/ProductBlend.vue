<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="getProductBlendByConfig"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar Código de Producto o Producto"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar producto - mezcla"
      @deleteFile="deleteSelectedItem"
      @addProductBlend="showDialog = true"
      @editItem="setItemToEdit"
    >
      <template #[`item.units`]="{ item }">
        <div>{{ item.units | thousands_separator }}</div>
      </template>
    </BaseTable>
    <ConfigurationsProductsManageProductBlend 
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchProductBlendByConfig"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ListProductBlends',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Área', value: 'area_name' },
        { text: 'Cod. Producto', value: 'product_code' },
        { text: 'Producto', value: 'product_name' },
        { text: 'Mezcla', value: 'blend_name' },
        { text: 'Unidades por Batch', value: 'units' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir Producto - Mezcla', action: 'addProductBlend', icon: 'mdi-plus' }
      ],
      productBlends: [],
    }
  },
  async fetch() {
    await this.fetchProductBlendByConfig();
    await this.$store.dispatch('configArea/fetchConfigAreas', this.$route.params.config_id);
  },
  computed: {
    ...mapGetters('configProductBlend', ['getProductBlendByConfig'])
  },
  methods: {
    async deleteSelectedItem(productBlendId) {
      await this.deleteItem(
        this.fetchProductBlendByConfig, 
        'configProductBlend/deleteProductBlend', 
        productBlendId
      )
    },
    async fetchProductBlendByConfig() {      
      await this.$store.dispatch(
        'configProductBlend/fetchProductBlendByConfig', 
        this.$route.params.config_id
      );
      this.loading = false
    },
  }
}
</script>
