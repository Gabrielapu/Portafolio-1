<template>
  <BaseTable 
    v-model="selectedRows"
    :headers="headers"
    :items="batches"
    :loading="loading"
    :show-dots-menu="false"
    search-bar-label="Buscar Mezcla, Producto o Batch"
    class="ma-5"
    :outlined-card="false"
    filters-container-classes="mx-2 pb-0"
    table-classes="ma-5"
    :show-select-from-batches="true"
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
  
    <template #[`item.state`]="{ item }" >
      <div class="d-flex">
        <v-chip
          :color="getStateColor(item.state)"
          :style="`border: 1px solid ${getStateBorder(item.state)}`"
        >
          {{item.state}}
        </v-chip>
      </div>
    </template>
  </BaseTable>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'BatchesTable',
  props: { 
    currentStep: { type: Number, default: 0 }
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
        { text: 'Estado', value: 'state', class: 'font-weight-black black--text' },
        { text: '', value: 'changeState'},
      ],
      states: [
        { id: 1, text: 'En proceso', color: '#E3F2FD', border: '#BBDEFB'},
        { id: 2, text: 'Pendiente', color: '#FFFDE7', border: '#FFF9C4'},
        { id: 3, text: 'Cumplido', color: '#E8F5E9', border: '#C8E6C9'},
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
  computed: {
    ...mapState('replanning', ['firstStepTime']),
    ...mapGetters('resultsBatch', ['getReplanningBatchResults']),
    moreCodes() {
      return codes => codes.slice(this.maxItems, codes.length)      
    },
    moreMachines() {
      return machines => machines.slice(this.maxItems, machines.length)      
    },
  },
  watch: {
    selectedRows: {
      handler() {
        // Con esto StepButtons.vue conoce si hay filas seleccionadas
        this.$root.$emit('selectedRows', this.selectedRows);
      },
      deep: true
    },
    async currentStep(step) {
      // Limpia checkbox seleccionados
      if(step === 1 ) {
        this.selectedRows = []
      }
      if(step === 2) {
        await this.fetchBatchResults();
      }
    }
  },
  methods: {
    async fetchBatchResults() {
      this.batches = []
      this.loading = true
      await this.$store.dispatch(
        'resultsBatch/fetchReplanningBatchList',
        {
          planificationId: this.$route.params.planification_id,
          day: this.firstStepTime.selectedDay.id,
          hour: this.firstStepTime.selectedHour,
        }
      )
      this.batches = JSON.parse(JSON.stringify(this.getReplanningBatchResults))
      this.loading = false
    },
    getStateColor(stateArg) {
      const state = this.states.find(state => state.text === stateArg)
      return state.color
    },
    getStateBorder(stateArg) {
      const state = this.states.find(state => state.text === stateArg)
      return state.border
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

      this.batches = this.getReplanningBatchResults
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
