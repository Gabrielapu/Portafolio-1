<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="getEquipment"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar equipo"
      @deleteFile="deleteSelectedItem"
      @addEquipment="showDialog = true"
      @editItem="setItemToEdit"   
    >
      <template #[`item.name`]="{ item }">
        <router-link :to="goToEquipmentDetail(item.id)">
          {{item.name}}
        </router-link>
      </template>
      <template #[`item.rated_capacity`]="{ item }">
        <div>{{ item.rated_capacity | thousands_separator }}</div>
      </template>
      <template #[`item.actual_capacity`]="{ item }">
        <div>{{ item.actual_capacity | thousands_separator }}</div>
      </template>
      <template #[`item.efficiency`]="{ item }">
        <div>{{ `${parseInt(item.efficiency)}%` }}</div>
      </template>
    </BaseTable>
    <ConfigurationsEquipmentManageEquipment
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchEquipment"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ListEquipment',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Tipo', value: 'equipment_type' },
        { text: 'Area', value: 'configarea_name' },
        { text: 'Set', value: 'configequipmentset_name' },
        { text: 'Capacidad Nominal', value: 'rated_capacity' },
        { text: 'Capacidad Real', value: 'actual_capacity' },
        { text: 'Eficiencia', value: 'efficiency' },
        { text: 'Unidad', value: 'unit' },
        { text: 'Día de inicio', value: 'start_day_name' },
        { text: 'Hora de inicio', value: 'start_hour' },
        { text: 'Día de fin', value: 'end_day_name' },
        { text: 'Hora de fin', value: 'end_hour' },
        { text: 'Ponderador eficiencia', value: 'efficiency_weighter' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir equipo', action: 'addEquipment', icon: 'mdi-plus' }
      ],
    }
  },
  async fetch() {
    await this.fetchEquipment();
  },
  computed: {
    ...mapGetters('configEquipment', ['getEquipment']),
    goToEquipmentDetail() {
      const plantId = this.$route.params.plant_id
      const configId = this.$route.params.config_id
      return equipmentId => `/plant/${plantId}/configurations/${configId}/equipment/${equipmentId}`
    },
  },
  methods: {
    async fetchEquipment() {
      await this.$store.dispatch(
        'configEquipment/fetchEquipment', 
        this.$route.params.config_id
      );
      this.loading = false
    },
    async deleteSelectedItem(equipmentId) {
      await this.deleteItem(
        this.fetchEquipment, 
        'configEquipment/deleteEquipment', 
        equipmentId
      )
    }
  }
}
</script>

<style scoped>
.tooltip-results {
  padding: 0px !important;
  border: 1px solid gray !important;
}
</style>