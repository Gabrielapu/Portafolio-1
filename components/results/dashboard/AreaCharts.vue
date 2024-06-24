<template>
  <v-row class="mb-10 mx-2">
    <v-col cols="12">
      <ResultsDashboardApexChart area-name="Yoghurt" />
    </v-col>
    <v-col cols="12">
      <ResultsDashboardApexChart area-name="Postres" />
    </v-col>
    <v-col cols="12">
      <ResultsDashboardApexChart area-name="Manjar" />
    </v-col>
    <v-col cols="12">
      <ResultsDashboardApexChart area-name="Quesillo" />
    </v-col>
    <v-col cols="12">
      <ResultsDashboardApexChart area-name="Margarina" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AreaCharts',
  async fetch() {
    await this.fetchAllProducts();
  },
  methods: {
    async fetchAllProducts() {
      await this.$store.dispatch(
        'planProduct/fetchProductsByPlan',
        this.$route.params.planification_id
      );
    }
  }
}
</script>