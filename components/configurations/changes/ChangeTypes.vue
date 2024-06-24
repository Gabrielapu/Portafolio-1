<template>
  <v-row>
    <v-col cols="3">
      <ConfigurationsChangesMachinesList @selectedMachines="setFilter" />
    </v-col>
    <v-col cols="9">
      <BaseTable 
        :headers="headers"
        :items="changeTypes"
        :loading="loading"
        :dots-menu-items="dotsMenuItems"
        search-bar-label="Buscar"
        filters-container-classes="mx-2"
        table-classes="ma-5"
        edit-mode
        edit-name="Editar tipos de cambio"
        @deleteFile="deleteSelectedItem"
        @addChangeType="showDialog = true"
        @editItem="setItemToEdit"   
      >
      </BaseTable>
      <ConfigurationsChangesManageChangeTypes
        v-model="showDialog" 
        :item="itemToEdit"
        :refresh-data="fetchChangeTypeByConfig"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItemsMixin from '@/components/configurations/mixins/ListItemsMixin'

export default {
  name: 'ChangeTypes',
  mixins: [ListItemsMixin],
  data() {
    return {
      headers: [
        { text: 'Máquina', value: 'equipment_name', divider: true },
        { text: 'Tipo de cambio', value: 'name' },
        { text: 'Tiempo', value: 'time', divider: true },
        { text: 'Unidad', value: 'unit' },
        { text: '', value: 'actions', class: 'd-none', cellClass: 'd-none' }
      ],
      dotsMenuItems: [
        { title: 'Añadir tipo de cambio', action: 'addChangeType', icon: 'mdi-plus' }
      ],
      changeTypes: [],
      filters: [],
    }
  },
  async fetch() {
    await this.fetchChangeTypeByConfig();
  },
  computed: {
    ...mapGetters('configTypeChange', ['getChangeTypeByConfig'])
  },
  methods: {
    async fetchChangeTypeByConfig() {
      await this.$store.dispatch(
        'configTypeChange/fetchChangeTypeByConfig', 
        this.$route.params.config_id
      );
      this.copyTypeChanges()
      this.loading = false
    },
    async deleteSelectedItem(changeTypeId) {
      await this.deleteItem(
        this.fetchChangeTypeByConfig, 
        'configTypeChange/deleteTypeChange', 
        changeTypeId
      )
    },
    setFilter(machines) {
      const arrMachines = machines
        .filter(machine => machine.selected)
        .map(machine => machine.name)

      if(!arrMachines.length) {
        this.copyTypeChanges()
        return
      }
      this.changeTypes = this.getChangeTypeByConfig
        .filter(changeType => arrMachines.includes(changeType.equipment_name))
    },
    copyTypeChanges() {
      this.changeTypes = JSON.parse(JSON.stringify(this.getChangeTypeByConfig))
    }
  },
}
</script>