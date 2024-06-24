<template>
  <v-card flat :class="getBorder">
    <div class="ml-7 mr-5 pt-3 pb-3 d-flex justify-space-between">
      <div>
        <h4 class="text-h4">{{title}}</h4>
        <span class="subtitle-1">{{subtitle}}</span>
      </div>
      <v-btn 
        v-if="inDashboard" 
        class="mt-1" 
        color="primary"
        outlined
        :disabled="loading"
        @click="downloadAllResults"
      >
        <v-icon class="mr-1"> mdi-cloud-download-outline </v-icon> 
        Descargar
        <v-progress-circular
          v-if="loading"
          class="ml-2"
          size="20"
          indeterminate
          color="gray"
        ></v-progress-circular>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ResultsInfoBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    inScenarios() {
      return this.$route.name === 'scenarios-plant-plant_id';
    },
    inDashboard() {
      return this.$route.name === 'results-planification-planification_id-plant-plant_id-dashboard';
    },
    inGantt() {
      return this.$route.name === 'results-planification-planification_id-plant-plant_id-gantt';
    },
    inBatchPlan() {
      return this.$route.name === 'results-planification-planification_id-plant-plant_id-batch_plan';
    },
    inProduction() {
      return this.$route.name === 'results-planification-planification_id-plant-plant_id-production';
    },
    getBorder() {
      if(this.inProduction) {
        return ''
      }
      return 'border-bottom'
    }
  },
  methods: {
    async downloadAllResults() {
      this.loading = true
      await this.$store.dispatch(
        'downloadResults/downloadExcels',
        { 
          planificationId: this.$route.params.planification_id, 
          endpoint: 'download_all' 
        }
      ) 
      this.loading = false
    },
  },
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgb(207, 207, 207);
  border-radius: 0;
}
.v-application .text-h4 {
  font-weight: 500;
}
</style>