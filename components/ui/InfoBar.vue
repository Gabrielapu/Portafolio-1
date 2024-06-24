<template>
  <v-card flat :class="getBorder">
    <div class="ml-5 mr-5 pt-3 pb-3 d-flex justify-space-between">
      <div>
        <h4 class="text-h4">{{title}}</h4>
        <span class="subtitle-1">{{subtitle}}</span>
      </div>
      <v-btn v-if="inScenarios" class="mt-1" color="primary" @click="$emit('addPlan')">
        <v-icon> mdi-plus </v-icon> 
        Nuevo Escenario
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'InfoBar',
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
  computed: {
    inScenarios() {
      return this.$route.name === 'scenarios-plant-plant_id';
    },
    inDashboard() {
      return this.$route.name === 'results-dashboard';
    },
    inConfigurationsByPlant() {
      return this.$route.name === 'configurations-plant-plant_id'
    },
    inChanges() {
      return this.$route.name === 'configurations-config_id-changes'
    },
    getBorder() {
      if(this.inConfigurationsByPlant || this.inChanges) {
        return ''
      }
      return 'border-bottom'
    }
  }
}
</script>

<style scoped>
.v-application .text-h4 {
  font-weight: 500;
}
</style>