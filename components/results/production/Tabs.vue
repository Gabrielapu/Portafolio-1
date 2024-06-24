<template>
  <v-card flat class="border-bottom">
    <v-tabs class="pl-10">
      <v-tab @click="$emit('tab', 'Yoghurt')">Yoghurt</v-tab>
      <v-tab @click="$emit('tab', 'Postres')">Postres</v-tab>
      <v-tab @click="$emit('tab', 'Manjar')">Manjar</v-tab>
      <v-tab @click="$emit('tab', 'Quesillo')">Quesillo</v-tab>
      <v-tab @click="$emit('tab', 'Margarina')">Margarina</v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: 'ProductionsTabs'
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgb(207, 207, 207);
  border-radius: 0;
}
</style>