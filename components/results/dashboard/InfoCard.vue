<template>
  <v-col v-if="indicator" cols="6">
    <v-card outlined flat>
      <v-card-title>
        {{indicator.name}}
      </v-card-title>
      <v-card-subtitle>
        {{indicator.unit}}
      </v-card-subtitle>
      <v-card-text class="text-h4 black--text">
        <span v-if="indicator.unit ==='Unidades'">
          {{indicator.value | thousands_separator}}
        </span>
        <span v-else>
          {{indicator.value}}
        </span>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    kpiResult: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    indicator() {
      return this.kpiResult;
    }
  }
}
</script>

<style scoped>
.text-h4 {
  font-size: 34px;
}
</style>