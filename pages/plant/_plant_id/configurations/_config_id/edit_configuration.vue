<template>
  <v-container class="pa-6">
    <ConfigurationsMainForm 
      :edited-index="editedIndex"
      :to-edit-config="config"/>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EditConfiguration',
  data() {
    return {
      editedIndex: parseInt(this.$route.params._config_id),
    }
  },
  async fetch() {
    await this.fetchPlants();
  },
  computed: {
    ...mapGetters({
      config: 'configuration/getConfigEdit'
    })
  },
  methods: {
    async fetchPlants() {
      await this.$store.dispatch('plant/fetchPlants');
    }
  },
}
</script>