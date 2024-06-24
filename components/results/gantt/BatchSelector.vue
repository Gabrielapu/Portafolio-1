<template>
  <ResultsBatchPlanSeeByList
    v-model="selectedItem"
    :items="batch"
    filter-name="Batch"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BatchSelector',
  data() {
    return {
      loading: true,
      selectedItem: {
        id: 0, 
        name: 'Todos'
      },
      batch: []
    }
  },
  async fetch() {
    await this.fetchBatchList();
    this.loading = false
  },
  computed: {
    ...mapGetters('resultsBatch', ['getBatchList'])
  },
  watch: {
    selectedItem(batch) {
      this.$emit('onSelectedBatch', batch.name === 'Todos' ? false : batch )
    }
  },
  methods: {
    async fetchBatchList() {
      await this.$store.dispatch(
        'resultsBatch/fetchBatchList',
        this.$route.params.planification_id 
      );
      this.batch = this.getBatchList
      this.batch = [{ id: 0, name: 'Todos'}, ...this.batch]
    }
  }
}
</script>
