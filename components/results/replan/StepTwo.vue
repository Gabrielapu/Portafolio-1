<template>
  <div class="d-flex flex-column">
    <div class="d-flex flex-column align-center">
      <span class="text-h5 d-flex"> Selección de Batches </span>
      <span class="subtitle-1">
        Seleccionar batches realmente en curso, al cambiar estado 
        a “en curso”.
      </span>
    </div>
    <ResultsReplanBatchesTable :current-step="currentStep"/>
  </div>
</template>

<script>
export default {
  name: 'StepTwo',
  props: { 
    currentStep: { type: Number, default: 0 }
  }
}
</script>

