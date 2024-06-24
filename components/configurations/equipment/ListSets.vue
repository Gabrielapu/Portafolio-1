<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="getEquipmentSet"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar set"
      @deleteFile="deleteSelectedItem"
      @addEquipmentSet="showDialog = true"
      @editItem="setItemToEdit"   
    >
      <template #[`item.code`]="{ item }">
        <v-chip
          class="ma-2"
          :color="item.color_code"
          :style="`border: 1px solid ${item.border_color_code}`"
        >
          {{item.code}}
        </v-chip>
      </template>
    </BaseTable>
    <ConfigurationsEquipmentManageEquipmentSet
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchEquipmentSet"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ListSets',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'ID', width: '70px', value: 'id' },
        { text: 'Código', width: '200px', value: 'code' },
        { text: 'Descripción', value: 'description' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir Set', action: 'addEquipmentSet', icon: 'mdi-plus' }
      ],
    }
  },
  async fetch() {
    await this.fetchEquipmentSet();
    this.loading = false
  },
  computed: {
    ...mapGetters('configEquipmentSet', ['getEquipmentSet'])
  },
  methods: {
    async fetchEquipmentSet() {
      await this.$store.dispatch(
        'configEquipmentSet/fetchEquipmentSet', 
        this.$route.params.config_id
      );
    },
    async deleteSelectedItem(equipmentSetId) {
      await this.deleteItem(
        this.fetchEquipmentSet, 
        'configEquipmentSet/deleteEquipmentSet', 
        equipmentSetId
      )
    }
  }
}
</script>
