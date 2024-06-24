<template>
  <div>
    <ResultsProductionTabs @tab="changeData($event)"/>
    <BaseTable 
      :headers="headers"
      :items="productions"
      :loading="loading"
      :show-dots-menu="false"
      search-bar-label="Buscar"
      class="ma-5"
      outlined-card
      filters-container-classes="mx-2"
      table-classes="ma-5"
    >
    </BaseTable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainTable',
  data() {
    return {
      headers: [
        { text: 'SKU', value: 'code', class: 'font-weight-black black--text' },
        { text: 'Producto', sortable: false, value: 'name' },
        { text: 'Lunes', sortable: false, value: 'monday', cellClass: 'text-center' },
        { text: 'Martes', sortable: false, value: 'tuesday', cellClass: 'text-center' },
        { text: 'Miércoles', sortable: false, value: 'wednesday', cellClass: 'text-center' },
        { text: 'Jueves', sortable: false, value: 'thursday', cellClass: 'text-center' },
        { text: 'Viernes', sortable: false, value: 'friday', cellClass: 'text-center' },
        { text: 'Sábado', sortable: false, value: 'saturday', cellClass: 'text-center' },
        { text: 'Domingo', sortable: false, value: 'sunday', cellClass: 'text-center' },
        { 
          text: 'Semana 1', 
          value: 'total_weekly_amount_1', 
          class: 'font-weight-black black--text',
          cellClass: 'text-center'
        },
        { 
          text: 'Semana 2', 
          value: 'total_weekly_amount_2', 
          class: 'font-weight-black black--text',
          cellClass: 'text-center'
        },
        { 
          text: 'Semana 3', 
          value: 'total_weekly_amount_3', 
          class: 'font-weight-black black--text',
          cellClass: 'text-center'
        },
        { 
          text: 'Semana 4', 
          value: 'total_weekly_amount_4', 
          class: 'font-weight-black black--text',
          cellClass: 'text-center'
        },
        { 
          text: 'Inventario Inicial', 
          value: 'initial_inventory', 
          class: 'font-weight-black black--text',
          cellClass: 'text-center'
        },
        { 
          text: 'Inventario Final', 
          value: 'final_inventory', 
          class: 'font-weight-black black--text',
          cellClass: 'text-center'
        },
      ],
      productions: [],
      loading: true
    }
  },
  async fetch() {
    await this.fetchAllProductionData();
  },
  computed: {
    ...mapGetters('resultsProduction', ['getAllProductionResults']),
  },
  methods: {
    async fetchAllProductionData() {
      await this.$store.dispatch(
        'resultsProduction/fetchAllProductionData',
        this.$route.params.planification_id
      );
      this.productions = JSON.parse(JSON.stringify(this.getAllProductionResults))
      this.productions = this.productions.filter(production => production.area === 'Yoghurt')
      this.loading = false
    },
    changeData(areaName) {
      this.productions = this.getAllProductionResults
        .filter(production => production.area === areaName)
    }
  }
}
</script>
