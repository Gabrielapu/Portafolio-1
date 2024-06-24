<template>
  <ResultsBatchPlanSeeByList
    v-model="selectedItem"
    :items="getPlanAreas"
    filter-name="Áreas"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AreaSelector',
  data() {
    return {
      selectedItem: {},
      areas: []
    }
  },
  fetch() {
    this.selectedItem = this.getPlanAreas.find(area => area.name === 'Postres')
  },
  computed: {
    ...mapGetters('planArea', ['getPlanAreas'])
  },
  watch: {
    selectedItem(area) {
      this.$emit('onSelectedArea', area )
    }
  },
}
</script>
