<template>
  <div>
    <v-tabs v-model="tab" class="border-bottom">
      <v-tab href="#tab-1"> Preparación </v-tab>
      <v-tab href="#tab-2"> Envasado </v-tab>
      <v-tab href="#tab-3"> Tipos de cambio </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="ma-5">
      <v-tab-item value="tab-1" class="outlined border-radius-5">
        <ConfigurationsChangesPreparationTable />
      </v-tab-item>
      <v-tab-item value="tab-2" class="outlined border-radius-5">
        <ConfigurationsChangesPackingTable />
      </v-tab-item>
      <v-tab-item value="tab-3" class="outlined border-radius-5">
        <ConfigurationsChangesChangeTypes />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'MainTabs',
  data() {
    return {
      tab: null
    }
  },
}
</script>