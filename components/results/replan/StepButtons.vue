<template>
  <div :class="getClass">
    <v-btn v-if="value !== firstStep" color="secondary" outlined @click="stepper = stepper - 1">
      Volver
    </v-btn>
    <v-btn 
      v-if="value !== totalSteps" 
      :disabled="value === 2 && !selectedRows.length"
      color="primary" 
      @click="stepper = stepper + 1"
    >
      Siguiente
    </v-btn>
    <v-btn v-if="value === totalSteps" :disabled="!files.length" color="primary" @click="$emit('replan')">
      <v-icon>mdi-play</v-icon>
      Replanificar
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'StepButtons',
  props: {
    value: { type: Number, default: 1},
    files: { type: Array, default: () => [] },
  },
  data() {
    return {
      stepper: 1,
      selectedRows: [],
      firstStep: 1,
      totalSteps: 4
    }
  },
  computed: {
    getClass() {
      if(this.value === 1) {
        return 'd-flex justify-end'
      }
      return 'd-flex justify-space-between'
    }
  },
  watch: {
    stepper: {
      handler(val) {
        this.$emit('input', val)
      },
      inmediate: true
    }
  },
  mounted() {
    this.$root.$on('selectedRows', (selectedRows) => {
      this.selectedRows = selectedRows;
    });
  }
}
</script>
