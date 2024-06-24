<template>
  <v-card flat outlined min-height="400px">
    <v-card-title class="title-background subtitle-2">
      {{areaName}}
    </v-card-title>
    <ResultsDashboardFilterByProduct 
      :area-name="areaName"
      :products="products"
      :first-product="firstProduct"
      @selectedProduct="fetchData"
    />
    <v-divider class="mb-5"></v-divider>
      <div id="canvas" class="text-center">
        <v-progress-circular
          v-if="loading"
          class="mb-15"
          :size="30"
          :width="5"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <VueApexCharts
          v-show="!loading"
          type="line" 
          width="100%" 
          height="350" 
          :options="options" 
          :series="series"
        ></VueApexCharts>
      </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'ApexChart',
  components: { VueApexCharts },
  props: {
    areaName: { type: String, default: '' }
  },
  data() {
    return {
      loading: false,
      thousandSeparatorRegex: /\B(?=(\d{3})+(?!\d))/g,
      series: [],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false,
          }
        },
        noData: {
          text: 'No hay datos disponibles'
        },
        colors: ['#C5CAE9', '#90CAF9', '#EF9A9A', '#A5D6A7'],
        stroke: {
          curve: 'straight',
          width: [2, 5, 5, 5],
        },
        title: {
          text: ''
        },
        dataLabels: {
          enabled: false,
        },
        labels: [],
        legend: {
          position: 'top'
        },
        xaxis: {
          type: 'category',
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return value.toString().replace(this.thousandSeparatorRegex, '.')
            }
          }
        },
        tooltip: {
          y: {
            formatter(value) {
              return value.toString().replace(this.thousandSeparatorRegex, '.');
            }
          }
        }
      }
    }
  },
  fetch() {
    this.setDatesAsCategories()
  },
  computed: {
    ...mapGetters('resultsStock', ['getStockResults']),
    ...mapGetters('planProduct', ['getProductsByPlan']),
    products() {
      return this.getProductsByPlan
        .filter(product => product.planarea_name === this.areaName)
    },
    firstProduct() {
      return this.products.find(p => p)?.id
    },
  },
  methods: {
    setDatesAsCategories() {
      const dates = []
      const numbers = [...Array(29).keys()].slice(1)
      numbers.forEach(n => 
        dates.push(this.$dayjs(this.$route.query.start_date).day(n).format('dd DD/MM'))
      )
      this.options.xaxis.categories = dates
    },
    async fetchData(productId) {
      if(!productId) {
        this.series = []
        return
      }
      this.loading = true
      this.series = []
      await this.$store.dispatch('resultsStock/fetchStockResults', productId);
      this.setData();
      this.loading = false
    },
    setData() {
      this.series = [
        {
          name: this.getStockResults.production.name,
          type: 'column',
          data: this.getStockResults.production.data
        }, 
        {
          name: this.getStockResults.stock.name,
          type: 'line',
          data: this.getStockResults.stock.data
        },
        {
          name: this.getStockResults.min_stock.name,
          type: 'line',
          data: this.getStockResults.min_stock.data
        },
        {
          name: this.getStockResults.max_stock.name,
          type: 'line',
          data: this.getStockResults.max_stock.data
        }, 
      ]
    }
  },
}
</script>

<style scoped>
.title-background {
  background: #F8F8F8;
}
</style>