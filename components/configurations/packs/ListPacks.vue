<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="packs"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar Código de Pack, SKU, Nombre Pack o Producto"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar packs"
      @deleteFile="deleteSelectedItem"
      @addPack="showDialog = true"
      @editItem="setItemToEdit"
    />
    <ConfigurationsPacksManagePacks
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchConfigPacks"
    />
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ListPacks',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Area', value: 'area_name' },
        { text: 'Cod. Pack', value: 'pack_code' },
        { text: 'Nombre Pack', value: 'pack_name' },
        { text: 'SKU', value: 'product_code' },
        { text: 'Producto', value: 'product_name' },
        { text: 'Unidades por batch', value: 'units_per_batch' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir Pack', action: 'addPack', icon: 'mdi-plus' }
      ],
      packs: [],
    }
  },
  async fetch() {
    await this.fetchConfigPacks();
  },
  computed: {
    ...mapGetters('configPack', ['getPacks'])
  },
  methods: {
    async deleteSelectedItem(packId) {
      await this.deleteItem(
        this.fetchConfigPacks, 
        'configPack/deletePack', 
        packId
      )
    },
    async fetchConfigPacks() {
      await this.$store.dispatch(
        'configPack/fetchConfigPacks', 
        this.$route.params.config_id
      );
      this.packs = JSON.parse(JSON.stringify(this.getPacks))
      this.loading = false
    },
  }
}
</script>
