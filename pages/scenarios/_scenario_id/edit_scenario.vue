<template>
  <ScenariosMainForm :edited-index="editedIndex" :to-edit-scenario="plan"/>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EditScenario',
  data() {
    return {
      editedIndex: parseInt(this.$route.params.plan_id),
    }
  },
  async fetch() {
    await this.fetchPlants();
    await this.fetchPlanGroups();
    await this.fetchPlanTags();
    await this.fetchConfigurations();
  },
  computed: {
    ...mapGetters({
      plan: 'planification/getPlan'
    })
  },
  beforeMount() {
    this.changeTitle();
  },
  methods: {
    changeTitle() {
      this.$store.commit('global/setNavTitle', 'Editar Escenario')
    },
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