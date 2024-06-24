<template>
  <div>
    <v-btn 
      :disabled="loading || !validForm" 
      outlined 
      color="primary" 
      class="mr-2" 
      @click="$root.$emit('saveScenario')"
    >
      Guardar
    </v-btn>
    <v-btn 
      :disabled="loading || !validForm" 
      color="primary" 
      @click="$root.$emit('calculateScenario')"
    >
      Calcular
      <v-icon v-if="!loading">mdi-play</v-icon>
      <v-progress-circular v-else indeterminate class="ml-3" color="gray" size="20" />
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'SaveButtons',
  data() {
    return {
      loading: false,
      validForm: false,
    }
  },
  mounted() {
    this.$root.$on('creatingPlanification', () => {
      this.loading = true
    })
    this.$root.$on('isValidForm', (isValid) => {
      this.validForm = isValid
    })
  }
}
</script>
