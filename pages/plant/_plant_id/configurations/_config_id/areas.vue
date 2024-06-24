<template>
  <div>
    <UiInfoBar 
      title="Áreas" 
      subtitle="Áreas de la planta"
    />
    <ConfigurationsAreas :config-id="$route.params.config_id"/>
  </div>
</template>

<script>
export default {
  name: 'ListConfigAreas' 
}
</script>