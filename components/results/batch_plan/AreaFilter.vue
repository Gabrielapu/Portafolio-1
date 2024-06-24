<template>
  <ResultsBatchPlanSeeByList
    v-model="selectedItem"
    :items="areas"
    filter-name="Areas"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AreaFilter',
  data() {
    return {
      selectedItem: { id: 0, name: 'Todas' },
      areas: []
    }
  },
  fetch() {
    this.areas = JSON.parse(JSON.stringify(this.getPlanAreas))
    this.areas = [{ id: 0, name: 'Todas'}, ...this.areas]
  },
  computed: {
    ...mapGetters('planArea', ['getPlanAreas']),
  },
  watch: {
    selectedItem(val) {
      this.$emit('area', val.name === 'Todas' ? false : val.name)
    }
  },
  methods: {
    async fetchPlanAreas() {
      await this.$store.dispatch(
        'planArea/fetchPlanAreas',
        this.$route.params.planification_id
      );
      this.areas = JSON.parse(JSON.stringify(this.getPlanAreas))
      this.areas = [{ id: 0, name: 'Todas'}, ...this.areas]
      this.loading = false
    }
  }
}
</script>
