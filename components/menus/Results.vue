<template>
  <v-list class="menu-list" rounded>
    <ResultsReplanMainModal :mini="mini"/>
    <v-subheader v-if="!mini">Resultados del Plan</v-subheader>
    <v-list-item-group >
      <v-list-item
        v-for="(item, i) in resultsItems"
        :key="i"
        color="primary"
        @click="$router.push(item.to)"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'ResultsMenu',
  props: {
    mini: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resultsItems: [
        { 
          name: 'Dashboard', 
          icon: 'mdi-view-dashboard-outline',
          to: `/results/planification/${this.$route.params.planification_id}`
            + `/plant/${this.$route.params.plant_id}/dashboard`
            + `?start_date=${this.$route.query.start_date}&` 
            + `end_date=${this.$route.query.end_date}&` 
            + `plan_end_date=${this.$route.query.plan_end_date}`
        },
        { 
          name: 'Gantt Actividades', 
          icon: 'mdi-note-text',
          to: `/results/planification/${this.$route.params.planification_id}` 
            + `/plant/${this.$route.params.plant_id}/gantt`
            + `?start_date=${this.$route.query.start_date}&` 
            + `end_date=${this.$route.query.end_date}&` 
            + `plan_end_date=${this.$route.query.plan_end_date}`
        },
        { 
          name: 'Plan de Batches', 
          icon: 'mdi-layers',
          to: `/results/planification/${this.$route.params.planification_id}` 
            + `/plant/${this.$route.params.plant_id}/batch_plan`
            + `?start_date=${this.$route.query.start_date}&` 
            + `end_date=${this.$route.query.end_date}&` 
            + `plan_end_date=${this.$route.query.plan_end_date}`
        },
        { 
          name: 'Producción', 
          icon: 'mdi-store',
          to: `/results/planification/${this.$route.params.planification_id}` 
            + `/plant/${this.$route.params.plant_id}/production`
            + `?start_date=${this.$route.query.start_date}&` 
            + `end_date=${this.$route.query.end_date}&` 
            + `plan_end_date=${this.$route.query.plan_end_date}`
        },
      ]
    }
  },
}
</script>

<style scoped>
.menu-list {
  background: inherit;
}
</style>