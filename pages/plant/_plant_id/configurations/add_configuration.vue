<template>
  <v-container fluid class="pa-0">
    <ConfigurationsMainForm 
    :edited-index="editedIndex"/>
  </v-container>
</template>

<script>
export default {
  name: 'AddConfiguration',
  data() {
    return {
      editedIndex: -1,
    }
  },
  async fetch() {
    await this.fetchPlants();
  },
  methods: {
    async fetchPlants() {
      await this.$store.dispatch('plant/fetchPlants');
    },
  },
}
</script>