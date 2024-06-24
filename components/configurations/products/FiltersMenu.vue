<template>
  <BaseFiltersMenu
    :items="items"
    min-width="200px"
    offset-y
    bottom
    left
    @toFilter="$emit('toFilter', $event)"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FiltersMenu',
  data() {
    return {
      items: []
    }
  },
  async fetch() {
    await this.fetchConfigAreas();
    this.loadItems()
  },
  computed: {
    ...mapGetters('configArea', ['getConfigAreas']),
  },
  methods: {
    async fetchConfigAreas() {
      await this.$store.dispatch(
        'configArea/fetchConfigAreas', 
        this.$route.params.config_id
      );
      this.loading = false
    },
    loadItems() {
      this.items = [
        { 
          name: 'Areas', 
          filterItems: JSON.parse(JSON.stringify(this.getConfigAreas))
            .sort((a, b) => a.name.localeCompare(b.name)) },
      ];
    }
  },
}
</script>

<style scoped>
.areas { max-height: 410px;}
</style>