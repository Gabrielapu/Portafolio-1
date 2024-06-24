<template>
  <div>
    <UiInfoBar 
      title="Velocidad" 
      subtitle="Velocidad de equipos"
    />
    <ConfigurationsSpeedListEquipmentSpeed :config-id="$route.params.config_id"/>
  </div>
</template>

<script>
export default {
  name: 'ListEquipmentSpeed' 
}
</script>