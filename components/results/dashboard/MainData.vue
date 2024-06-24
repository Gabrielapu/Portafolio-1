<template>
  <div>
    <v-row class="mx-2 pt-5">
      <ResultsDashboardInfoCard 
        v-for="kpiResult, index in getKpiResults" 
        :key="index"
        :kpi-result="kpiResult"
      />
    </v-row>
    <ResultsDashboardAreaCharts />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'MainData',
  async fetch() {
    await this.fetchKpiResults();
  },
  computed: {
    ...mapGetters('resultsKpi', [
      'getKpiResults'
    ])
  },
  methods: {
    async fetchKpiResults() {
      await this.$store.dispatch(
        'resultsKpi/fetchKpiResults',
        this.$route.params.planification_id
      );
    }
  }
}
</script>
