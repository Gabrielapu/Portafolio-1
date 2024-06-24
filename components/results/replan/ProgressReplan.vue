<template>
  <div>
    <v-card
      class="d-flex justify-center align-center flex-column" 
      :min-height="fullscreen ? '95vh' : '75vh'"
    >
      <div class="d-flex justify-center align-center flex-column">
        <v-progress-circular
          :size="70"
          color="primary"
          indeterminate
          width="7"
        ></v-progress-circular>
        <h6 class="text-h6 mt-5">Calculando replanificación...</h6>
        <span> 
          En 10 segundos serás redirigido a los escenarios. El proceso seguirá en segundo plano.
        </span>
        <br>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ProgressReplan',
  props: {
    fullscreen: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      confirm: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.goToResults()
    }, 10000);
  },
  methods: {
    goToResults() {
      this.$router.push(`/scenarios/plant/${this.$route.params.plant_id}`)
    }
  }
}
</script>
