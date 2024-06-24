<template>
  <ScenariosMainForm :edited-index="editedIndex"/>
</template>

<script>
export default {
  name: 'AddScenario',
  data () {
    return {
      editedIndex: -1,
    }
  },
  async fetch() {
    await this.fetchPlants();
    await this.fetchPlanGroups();
    await this.fetchPlanTags();
    await this.fetchConfigurations();
  },
  methods: {
    async fetchPlants() {
      await this.$store.dispatch('plant/fetchPlants');
    },
    async fetchPlanGroups() {
      await this.$store.dispatch('planGroup/fetchPlanGroups');
    },
    async fetchPlanTags() {
      await this.$store.dispatch('planTag/fetchPlanTags');
    },
    async fetchConfigurations() {
      await this.$store.dispatch('configuration/fetchConfigurations');
    },
  },
}
</script>

