<template>
  <div>
    <BaseTable 
      :headers="headers"
      :items="getPreparations"
      :loading="loading"
      :dots-menu-items="dotsMenuItems"
      search-bar-label="Buscar"
      filters-container-classes="mx-2"
      table-classes="ma-5"
      edit-mode
      edit-name="Editar preparación"
      @deleteFile="deleteSelectedItem"
      @addPreparation="showDialog = true"
      @editItem="setItemToEdit" 
    >
    </BaseTable>
    <ConfigurationsChangesManagePreparation
      v-model="showDialog" 
      :item="itemToEdit"
      :refresh-data="fetchPreparationChangesByConfig"
    />  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'PreparationTable',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Máquina', value: 'equipment_name' },
        { text: 'Nombre Mezcla 1', value: 'blend_1_name' },
        { text: 'Nombre Mezcla 2', value: 'blend_2_name' },
        { text: 'Tipo de cambio', value: 'type_change_name' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' },
      ],
      dotsMenuItems: [
        { title: 'Añadir preparación', action: 'addPreparation', icon: 'mdi-plus' }
      ],
    }
  },
  async fetch() {
    await this.fetchPreparationChangesByConfig();
  },
  computed: {
    ...mapGetters('configPrepChange', ['getPreparations'])
  },
  methods: {
    async fetchPreparationChangesByConfig() {
      await this.$store.dispatch(
        'configPrepChange/fetchPreparationChangesByConfig', 
        this.$route.params.config_id
      );
      this.loading = false
    },
    async deleteSelectedItem(changeTypeId) {
      await this.deleteItem(
        this.fetchPreparationChangesByConfig, 
        'configPrepChange/deletePrepChange', 
        changeTypeId
      )
    },
  }
}
</script>