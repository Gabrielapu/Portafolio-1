<template>
  <ResultsBatchPlanSeeByList
    v-model="selectedItem"
    :items="equipment"
    filter-name="Máquina"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EquipmentFilter',
  data() {
    return {
      selectedItem: { id: 0, name: 'Todas' },
      equipment: []
    }
  },
  async fetch() {
    await this.fetchPlanEquipment();
  },
  computed: {
    ...mapGetters('planEquipment', ['getEquipment']),
  },
  watch: {
    selectedItem(val) {
      this.$emit('equipment', val.name === 'Todas' ? false : val.name)
    }
  },
  methods: {
    async fetchPlanEquipment() {
      await this.$store.dispatch('planEquipment/fetchPlanEquipment');
      this.equipment = JSON.parse(JSON.stringify(this.getEquipment))
        .sort((a, b) => a.name.localeCompare(b.name));
      this.equipment = [{ id: 0, name: 'Todas'}, ...this.equipment]
      this.loading = false
    }
  }
}
</script>
