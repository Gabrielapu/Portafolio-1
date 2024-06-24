<template>
  <BaseTable 
    v-model="selectedRows"
    :headers="headers"
    :items="batches"
    :loading="loading"
    :show-dots-menu="false"
    search-bar-label="Buscar Mezcla, Producto o Batch"
    class="ma-5"    
    :outlined-card="outlinedCard"
    filters-container-classes="mx-2 pb-0"
    table-classes="ma-5"
    :show-select-from-batches="showSelect"
  >
    <template #table-actions>         
      <ResultsBatchPlanAreaFilter class="mr-2" @area="addFilter('area', $event)" />
      <ResultsBatchPlanDayFilter class="mr-2" @start_day="addFilter('start_day', $event)"/>
      <ResultsBatchPlanEquipmentFilter @equipment="addFilter('equipment', $event)"/>
    </template>
    <template #[`item.codes`]="{ item }" >
      <span>{{item.codes.slice(0, maxItems).join(', ')}}</span>
      <v-menu v-if="item.codes.length > maxItems" top left>
        <template #activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on"> mdi-dots-horizontal </v-icon>
        </template>
        <v-card class="sku-height">
          <v-list dense>
            <v-list-item v-for="code, index in moreCodes(item.codes)" v-show="!!code" :key="index">
              <span>{{code}}</span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>

    <template #[`item.machines`]="{ item }" >
      <span>{{item.machines.slice(0, maxItems).join(', ')}}</span>
      <v-menu v-if="item.machines.length > maxItems" top left>
        <template #activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on"> mdi-dots-horizontal </v-icon>
        </template>
        <v-card class="machines-height">
          <v-list dense>
            <v-list-item v-for="machine, index in moreMachines(item.machines)" :key="index">
              <span>{{machine}}</span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>
  
  </BaseTable>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BatchesTable',
  props: {
    outlinedCard: { type: Boolean, default: true },
    showSelect: { type: Boolean, default: false },
  },
  data() {
    return {
      headers: [
        { text: 'Area', value: 'area', class: 'font-weight-black black--text' },
        { text: 'SKU', value: 'codes', width: '200px', class: 'font-weight-black black--text' },
        { text: 'Mezcla', value: 'blend', class: 'font-weight-black black--text' },
        { text: 'Batch', value: 'batch', class: 'font-weight-black black--text' },
        { text: 'Día Inicio', value: 'inic_day', class: 'font-weight-black black--text' },
        { text: 'Hora Inicio', value: 'inic_hour', class: 'font-weight-black black--text' },
        { text: 'Día Fin', value: 'end_day', class: 'font-weight-black black--text' },
        { text: 'Hora Fin', value: 'end_hour', class: 'font-weight-black black--text' },
        { text: 'Máquinas', value: 'machines', class: 'font-weight-black black--text' },
      ],
      loading: true,
      maxItems: 3,
      batches: [],
      selectedRows: [],
      activeFilters: {
        area: false,
        start_day: false,
        equipment: false
      }

    }
  },
  async fetch() {
    await this.fetchBatchResults();
  },
  computed: {
    ...mapGetters('resultsBatch', ['getBatchResults']),
    moreCodes() {
      return codes => codes.slice(this.maxItems, codes.length)      
    },
    moreMachines() {
      return machines => machines.slice(this.maxItems, machines.length)      
    }
  },
  watch: {
    selectedRows: {
      handler() {
        this.$root.$emit('selectedRows', this.selectedRows);
      },
      deep: true
    },
  },
  methods: {
    async fetchBatchResults() {
      await this.$store.dispatch(
        'resultsBatch/fetchBatchResults',
        this.$route.params.planification_id
      );
      this.batches = JSON.parse(JSON.stringify(this.getBatchResults))
      this.loading = false
    },
    addFilter(filter, value) {
      this.activeFilters[filter] = value

      const conditions = {
        area: batch => batch.area === this.activeFilters.area,
        start_day: batch => batch.inic_day === this.activeFilters.start_day,
        equipment: batch => batch.machines.includes(this.activeFilters.equipment)
      }
      const selectedFilters = []

      Object.keys(this.activeFilters).forEach(filter => {
        if(this.activeFilters[filter])
          selectedFilters.push(conditions[filter])
      })

      this.batches = this.getBatchResults
        .filter(batch => selectedFilters.every(filter => filter(batch)))
    }
  }
}
</script>

<style scoped>
.machines-height {
  max-height: 500px;
}
.main-table-height {
  max-height: 500px;
}
.sku-height {
  max-height: 500px;
}
</style>
