<template>
  <BaseFiltersMenu
    :items="items"
    offset-x
    offset-y
    top
    left
    list-height="250px"
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
    await this.fetchProfiles();
    this.loadItems();
    this.loading = false
  },
  computed: {
    ...mapGetters('configArea', ['getConfigAreas']),
    ...mapGetters('configProfile', ['getProfiles'])
  },
  methods: {
    loadItems() {
      this.items = [
        { 
          name: 'Areas', 
          filterItems: JSON.parse(JSON.stringify(this.getConfigAreas))
            .sort((a, b) => a.name.localeCompare(b.name)) 
        },
        { 
          name: 'Perfiles', 
          filterItems: JSON.parse(JSON.stringify(this.getProfiles))
            .sort((a, b) => a.name.localeCompare(b.name))
        }
      ];
    },
    async fetchConfigAreas() {
      await this.$store.dispatch('configArea/fetchConfigAreas', this.$route.params.config_id);
    },
    async fetchProfiles() {
      await this.$store.dispatch('configProfile/fetchProfiles', this.$route.params.config_id);
    }
  },
}
</script>
