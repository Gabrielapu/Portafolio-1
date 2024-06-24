<template>
  <BaseTable 
    :headers="headers"
    :items="activities"
    :loading="loading"
    :show-dots-menu="false"
    search-bar-label="Buscar "
    class="ma-5"
    :outlined-card="false"
    filters-container-classes="mx-2 pb-0"
    table-classes="ma-5"
  >
    <template #[`item.activity`]="{ item }">
      <ResultsReplanActivitySelector
        v-if="getActivitiesList.length"
        v-model="item.activity_id"
        :activity-by-batch="item"
        :items="filteredActivities(item)"
        related-name=" Seleccione actividad"
        @selectedItem="changeActivity(item, $event)"
      />
    </template>

    <template #[`item.starting_day`]="{ item }" >
      <ResultsReplanWeekdayPicker v-model="item.starting_day"/>
    </template>

    <template #[`item.starting_time`]="{ item }" >
      <ResultsReplanTimePicker v-model="item.starting_time"/>
    </template>

    <template #[`item.ending_day`]="{ item }" >
      <ResultsReplanWeekdayPicker v-model="item.ending_day"/>
    </template>

    <template #[`item.ending_time`]="{ item }" >
      <ResultsReplanTimePicker v-model="item.ending_time"/>
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
import { mapGetters, mapState } from 'vuex'
import weekdays from '@/components/utils/weekdays'
export default {
  name: 'ActivitiesByBatches',
  data() {
    return {
      headers: [
        { text: 'ID', value: 'id', },
        { text: 'Area', value: 'area', class: 'font-weight-black black--text' },
        { text: 'Mezcla', value: 'blend', width: '200px', class: 'font-weight-black black--text' },
        { text: 'Batch', value: 'batch', class: 'font-weight-black black--text' },
        { text: 'Actividad', value: 'activity', class: 'font-weight-black black--text' },
        { text: 'Día Inicio', value: 'starting_day', class: 'font-weight-black black--text' },
        { text: 'Hora Inicio', value: 'starting_time', class: 'font-weight-black black--text' },
        { text: 'Día Fin', value: 'ending_day', class: 'font-weight-black black--text' },
        { text: 'Hora Fin', value: 'ending_time', class: 'font-weight-black black--text' },
        { text: 'Máquinas', value: 'machines', class: 'font-weight-black black--text' },
      ],
      weekdays,
      loading: false,
      maxItems: 3,
      activities: [],
      selectedBatches: [],
    }
  },
  async fetch() {
    this.loading = true
    await this.fetchPlanActivitiesList();
    this.loading = false
  },
  computed: {
    ...mapState('replanning', ['firstStepTime']),
    ...mapGetters('planActivity', ['getActivitiesList']),
    moreMachines() {
      return machines => machines.slice(this.maxItems, machines.length)      
    },
    filteredActivities() {
      return item => this.getActivitiesList
        .filter(activity => activity.planprofile === item.planprofile)
    },
  },
  watch: {
    selectedBatches() {
      if(this.selectedBatches.length) {
        this.fetchActivitiesByBatches()
      }
    }
  },
  mounted() {
    this.$root.$on('selectedRows', (selectedRows) => {
        this.selectedBatches = selectedRows.map(row => row.batch)
      }
    )
  },
  methods: {
    changeActivity(activityByParam, selectedActivity) {
      activityByParam.activity = selectedActivity.name
      activityByParam.sku = selectedActivity.sku
      this.emitActivities()
    },
    emitActivities() {
      this.$root.$emit('activities', this.activities)
    },
    async fetchActivitiesByBatches() {
      this.loading = true
      const data = await this.$store.dispatch(
        'resultsProduction/fetchActivitiesByBatches',
        { 
          planificationId: this.$route.params.planification_id, 
          batches: this.selectedBatches,
          day: this.firstStepTime.selectedDay.id,
          hour: this.firstStepTime.selectedHour
        }
      )
      this.activities = JSON.parse(JSON.stringify(data))
      this.emitActivities()
      this.loading = false
    },
    async fetchPlanActivitiesList() {
      await this.$store.dispatch(
        'planActivity/fetchPlanActivitiesList',
        this.$route.params.planification_id
      );
    },
  },
}
</script>

<style scoped>
.max-height {
  max-height: 400px;
}
</style>
