<template>
  <div>
    <UiResultsInfoBar 
      title="Plan de Batches" 
      subtitle="Actividades de producción de batches planificados."
    />
    <ResultsBatchPlanBatchesTable />
  </div>
</template>

<script>
export default {
  name: 'BatchPlanView'
}
</script>
