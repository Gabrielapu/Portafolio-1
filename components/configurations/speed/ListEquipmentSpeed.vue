<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="getEquipmentSpeed"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar velocidad"
      @deleteFile="deleteSelectedItem"
      @addSpeed="showDialog = true"
      @editItem="setItemToEdit"
    >
      <template #[`item.efficiency`]="{ item }">
        <span> {{ `${item.efficiency}%` }}</span>
      </template>
    </BaseTable>
    <ConfigurationsSpeedManageEquipmentSpeed
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchEquipmentSpeed"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ListEquipmentSpeed',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Equipo', value: 'equipment_name' },
        { text: 'Producto', value: 'product_name' },
        { text: 'Velocidad', value: 'speed' },
        { text: 'Velocidad real', value: 'real_speed' },
        { text: 'Unidad', value: 'unit' },
        { text: 'Eficiencia', value: 'efficiency' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir velocidad', action: 'addSpeed', icon: 'mdi-plus' }
      ]
    }
  },
  async fetch() {
    await this.fetchEquipmentSpeed();
    await this.$store.dispatch('configArea/fetchConfigAreas', this.$route.params.config_id);
  },
  computed: {
    ...mapGetters('configEquipmentSpeed', ['getEquipmentSpeed'])
  },
  methods: {
    async deleteSelectedItem(equipmentSpeedId) {
      await this.deleteItem(
        this.fetchEquipmentSpeed, 
        'configEquipmentSpeed/deleteEquipmentSpeed', 
        equipmentSpeedId
      )
    },
    async fetchEquipmentSpeed() { 
      this.loading = true   
      await this.$store.dispatch(
        'configEquipmentSpeed/fetchEquipmentSpeed', 
        this.$route.params.config_id
      );
      this.loading = false
    },
  }
}
</script>
